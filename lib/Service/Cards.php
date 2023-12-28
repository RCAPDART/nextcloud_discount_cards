<?php
namespace OCA\Discount_Cards\Service;

use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\IDBConnection;
use OCP\IConfig;
use OCP\Files\IRootFolder;
use \OC\Files\Filesystem;

class Cards {
	/** @var IDBConnection */
	private $db;
	/** @var IConfig */
	private $config;
	/** @var Filesystem */
	private $fs;
	private $storage;
	private $rootFolder;

	public function __construct(IDBConnection $db, IConfig $config, Filesystem $fs, IRootFolder $rootFolder) {
		$this->db = $db;
		$this->config = $config;
		$this->fs = $fs;
		$this->rootFolder = $rootFolder;
	}

	public function GetTags($userId) {
		$qb = $this->db->getQueryBuilder();
		$qb->selectAlias('tag', 'title');
		$qb->selectAlias('tag', 'id');
		$qb->selectAlias($qb->createFunction('COUNT(' . $qb->getColumnName('tags.tag') . ')'), 'count');
		$qb->from('discount_cards', 'cards');
		$qb->leftJoin('cards', 'discount_cards_tags', 'tags', $qb->expr()->eq('tags.card_id', 'cards.id'));
		//$qb->where('user_id = :user_id_in AND tag IS NOT NULL');
		//$qb->setParameters(array(':user_id_in' => $userId));
		$qb->groupBy('tag');
		$results = $qb->execute()->fetchAll();
		return $results;
	}

	 /**
	 * @brief Separate Url String at comma character
	 * @param $userId String of user id
	 * @param $cardId String of card id
	 * */
	public function AddUpdateCard($userId, $card) {
		if($this->CardExists($userId, $card['id'])) {
			// Update
			$this->UpdateCard($card);
			return true;
		}

		if($card['id'] != "0")
		{
			// If card is not exists and it is not 0 (adding new card) - user tried
			// to update deleted card, or card, which is related to other user.
			// This is not allowed
			return false;
		}

		$this->AddCard($card, $userId);
		return true;
	}

	 /**
	 * @brief Separate Url String at comma character
	 * @param $userId String of user id
	 * @param $cardId String of card id
	 * */
	public function Click($userId, $cardId) {
		if($this->CardExists($userId, $cardId) == false) {
			// Card is not exists, or user has no access to it
			return false;
		}

		$this->ClickCard($cardId);
		return true;
	}

    /**
    * @param $userId String of user id
    * @param $cardId String of card id
    * */
	public function DeleteCard($userId, $cardId) {
		// Check, that card is exist and user has access to it
		if($this->CardExists($userId, $cardId) == false){
			return false;
		}
		$this->DeleteCardById($cardId);
		return true;
	}

    /**
    * @brief Separate Url String at comma character
    * @param $userId String of user id
    * @param $sqlSortColumn String of name of column, which will be used for sorting
    * @param $tags Array (Strings) of Tags
    * @return array Array of Tags
    * */
	public function FindCards($userId, $sqlSortColumn, $tags) {
		$dbType = $this->config->getSystemValue('dbtype', 'sqlite');
		$qb = $this->db->getQueryBuilder();
		$tableAttributes = array('id', 'user_id', 'title', 'description', 'code', 'codeType',
			'color', 'url', 'added', 'lastmodified', 'clickcount', 'image');
		$qb->select($tableAttributes);

		if ($dbType == 'pgsql') {
			$qb->selectAlias($qb->createFunction("array_to_string(array_agg(" . $qb->getColumnName('tags.tag') . "), ',')"), 'tags');
		}else{
			$qb->selectAlias($qb->createFunction('GROUP_CONCAT(' . $qb->getColumnName('tags.tag') . ')'), 'tags');
		}

		$qb->from('discount_cards', 'cards');
		$qb->leftJoin('cards', 'discount_cards_tags', 'tags', $qb->expr()->eq('tags.card_id', 'cards.id'));
		$qb->where($qb->expr()->eq('user_id', $qb->createPositionalParameter($userId)));
		$qb->groupBy(array_merge($tableAttributes, [$sqlSortColumn]));
		$qb->orderBy('cards.clickcount', 'DESC');
		if (count($tags) > 0) {
			$this->FindCardsBuildFilter($qb, $tags);
		}

		$cardsResults = $qb->execute()->fetchAll();
		$result = array();
		$result['cards'] = $cardsResults;

		if (count($tags) > 0) {
			$ids = array();
			foreach ($cardsResults as $cardResult) {
				array_push($ids, $cardResult['id']);
			}
			$qbTags = $this->db->getQueryBuilder();
			$qbTags->selectAlias('tags.tag', 'title');
			$qbTags->selectAlias('tags.tag', 'id');
			$qbTags->selectAlias($qbTags->createFunction('COUNT(' . $qbTags->getColumnName('tags.card_id') . ')'), 'count');
			$qbTags->from('discount_cards_tags', 'tags');
			$qbTags->where('tags.card_id IN (' . implode (", ", $ids) . ')');
			$qbTags->groupBy('tags.tag');
			$qbTags->orderBy('tags.tag');
			$tagsResults = $qbTags->execute()->fetchAll();
			$result['tags'] = $tagsResults;
		} else {
			$result['tags'] = $this->GetTags($userId);
		}

		return $result;
	}

    /**
    * @brief Separate Url String at comma character
    * @param $line String of Tags
    * @return array Array of Tags
    * */
	public function AnalyzeTagRequest($line) {
		$tags = explode(',', $line);
		$filterTags = array();
		foreach ($tags as $tag) {
			if (trim($tag) != '')
				$filterTags[] = trim($tag);
		}
		return $filterTags;
	}

	/**
	 * @param IQueryBuilder $qb
	 * @param array $filters
	 * @param bool $filterTagOnly
	 */
	private function FindCardsBuildFilter(&$qb, $filters) {
		if (count($filters) == 0)
			return;

		$dbType = $this->config->getSystemValue('dbtype', 'sqlite');
		$filterExpressions = [];

		foreach ($filters as $filter) {
      		$expr = [];
			if ($dbType == 'pgsql') {
				$expr[] = $qb->expr()->iLike(
					$qb->createFunction("array_to_string(array_agg(" . $qb->getColumnName('tags.tag') . "), ',')"),
					$qb->createPositionalParameter('%'.$this->db->escapeLikeParameter($filter).'%')
				);
			} else {
				$expr[] = $qb->expr()->iLike('tags', $qb->createPositionalParameter('%'.$this->db->escapeLikeParameter($filter).'%'));
			}

			$filterExpressions[] = call_user_func_array([$qb->expr(), 'orX'], $expr);
		}
		$filterExpression = call_user_func_array([$qb->expr(), 'andX'], $filterExpressions);

		$qb->having($filterExpression);
	}

	public function UploadFile($title, $file, $userId) {
		$this->StorageInit($userId);

		$extension = $this->GetExtension($file['type']);
		$fileName = $this->GetFileName($title).'.'.$extension;

		$data = file_get_contents($file['tmp_name'], FILE_USE_INCLUDE_PATH);
		$this->saveFile($data, $fileName);

		$result = array();
		array_push($result, $fileName, $file, strlen($data));
		return '/remote.php/webdav'.$this->GetPath().$fileName;
	}

	private function SaveFile($data, $fileName) {
		//$this->fs->touch($this->GetPath().$fileName);
		//$this->fs->file_put_contents($this->GetPath().$fileName, $data);
		$filePath = $this->GetPath().$fileName;
		
		try {
			$file = $this->storage->get($filePath);
		} catch(\OCP\Files\NotFoundException $e) {
			$this->storage->newFile($filePath);
			$file = $this->storage->get($filePath);
		}
		$file->putContent($data);
	}

	private function GetExtension ($mime_type) {
		$extensions = array(
			'image/jpeg' => 'jpeg',
			'image/gif' => 'gif',
			'image/png' => 'png',
			'image/svg+xml' => 'svg',
			'image/webp' => 'webp'
		);
		return $extensions[$mime_type];
	}

	private function GetFileName($title = 'empty') {
		return date('Y-m-d_h-i-s').'_'.$title;
	}

	private function StorageInit($userId) {
		$this->storage = $this->rootFolder->getUserFolder($userId);
		// $this->fs = new Filesystem();
		//if(!$this->fs->file_exists($this->GetPath().'init')){
		//	$this->fs->mkdir($this->GetPath());
		//	$this->fs->touch($this->GetPath().'init');
		//}
		try {
			$file = $this->storage->get($this->GetPath().'init');
		} catch(\OCP\Files\NotFoundException $e) {
			$this->storage->touch($this->GetPath().'init');
		}
	}

	private function GetPath() {
		return '/.discount_cards/';
	}

	private function CardExists($userId, $cardId){
		$qbCard = $this->db->getQueryBuilder();
		$qbCard->select('id');
		$qbCard->from('discount_cards');
		$qbCard->where($qbCard->expr()->eq('user_id', $qbCard->createPositionalParameter($userId)));
		$qbCard->andWhere($qbCard->expr()->eq('id', $qbCard->createPositionalParameter($cardId)));
		$cards = $qbCard->execute()->fetchAll();

		if (count($cards) == 0) {
			// Card is not exist, or user has no access to it
			return false;
		}
		return true;
	}

	private function DeleteCardById($cardId){
		$qbDeleteCard = $this->db->getQueryBuilder();
		$qbDeleteCard->delete('discount_cards');
		$qbDeleteCard->where($qbDeleteCard->expr()->eq('id', $qbDeleteCard->createPositionalParameter($cardId)));
		$qbDeleteCard->execute();

		$this->DeleteTagsByCardId($cardId);
	}

	private function DeleteTagsByCardId($cardId) {
		$qbDeleteTags = $this->db->getQueryBuilder();
		$qbDeleteTags->delete('discount_cards_tags');
		$qbDeleteTags->where($qbDeleteTags->expr()->eq('card_id', $qbDeleteTags->createPositionalParameter($cardId)));
		$qbDeleteTags->execute();
	}

	private function InsertTags($tags, $cardId){
		foreach ($tags as $tag) {
			$qbTag = $this->db->getQueryBuilder();
			$qbTag->insert('discount_cards_tags');
			$qbTag->values(array(
				'card_id' => $qbTag->createNamedParameter($this->GetValue($cardId)),
				'tag' => $qbTag->createNamedParameter($this->GetValue($tag))
			));
			$qbTag = $qbTag->execute();
		}
	}

	private function ClickCard($cardId) {
		$qbCard = $this->db->getQueryBuilder();
		$qbCard->select('clickcount');
		$qbCard->from('discount_cards');
		$qbCard->where($qbCard->expr()->eq('id', $qbCard->createPositionalParameter($cardId)));
		$cards = $qbCard->execute()->fetchAll();
		$card = $cards[0];
		$clickCount = intval($card['clickcount']) + 1;

        $qbCardUpdate = $this->db->getQueryBuilder();
        $qbCardUpdate->update('discount_cards');
        $qbCardUpdate->set('clickcount', $qbCardUpdate->createNamedParameter($clickCount));
        $qbCardUpdate->where($qbCardUpdate->expr()->eq('id', $qbCardUpdate->createNamedParameter($cardId)));
        $qbCardUpdate->execute();
	}

	private function AddCard($card, $userId){
		$card = $this -> FillUndefinedCardValues($card);
		$tags = $card["tags"];
		$qbCard = $this->db->getQueryBuilder();
		$qbCard->insert('discount_cards');
		$qbCard->values(array(
			'title'=>$qbCard->createParameter('title'),
			'description'=>$qbCard->createParameter('description'),
			'code'=>$qbCard->createParameter('code'),
			'codeType'=>$qbCard->createParameter('codeType'),
			'color'=>$qbCard->createParameter('color'),
			'url'=>$qbCard->createParameter('url'),
			'image'=>$qbCard->createParameter('image'),
			'user_id'=>$qbCard->createParameter('user_id')
		));

		$qbCard->setParameters(array(
			'title' => $this->GetValue($card['title']),
			'description' => $this->GetValue($card['description']),
			'code' => $this->GetValue($card['code']),
			'codeType' => $this->GetValue($card['codeType']),
			'color' => $this->GetValue($card['color']),
			'url' => $this->GetValue($card['url']),
			'image' => $this->GetValue($card['image']),
			'user_id' => $this->GetValue($userId)
		));

		$qbCard->execute();
		$insertId = $qbCard->getLastInsertId();

		$this->InsertTags($tags, $insertId);

		return $insertId;
	}

	private function UpdateCard($card){
		$card = $this -> FillUndefinedCardValues($card);
		$this->DeleteTagsByCardId($card['id']);
		$this->InsertTags($card['tags'], $card['id']);

		$qbCard = $this->db->getQueryBuilder();
		$qbCard->update('discount_cards');
		$qbCard->set('title', $qbCard->createNamedParameter($this->GetValue($card['title'])));
		$qbCard->set('description', $qbCard->createNamedParameter($this->GetValue($card['description'])));
		$qbCard->set('code', $qbCard->createNamedParameter($this->GetValue($card['code'])));
		$qbCard->set('codeType', $qbCard->createNamedParameter($this->GetValue($card['codeType'])));
		$qbCard->set('color', $qbCard->createNamedParameter($this->GetValue($card['color'])));
		$qbCard->set('url', $qbCard->createNamedParameter($this->GetValue($card['url'])));
		$qbCard->set('image', $qbCard->createNamedParameter($this->GetValue($card['image'])));

		$qbCard->where($qbCard->expr()->eq('id', $qbCard->createNamedParameter($card['id'])));
		$cards = $qbCard->execute();

		return true;
	}

	private function FillUndefinedCardValues($card){
		if(!array_key_exists('title', $card))
			$card['title'] = '';
		if(!array_key_exists('description', $card))
			$card['description'] = '';
		if(!array_key_exists('code', $card))
			$card['code'] = '';
		if(!array_key_exists('codeType', $card))
			$card['codeType'] = 'code128';
		if(!array_key_exists('color', $card))
			$card['color'] = '';
		if(!array_key_exists('url', $card))
			$card['url'] = '';
		if(!array_key_exists('image', $card))
			$card['image'] = '';

		return $card;
	}

	private function GetValue($value){
		if(strlen($value) == 0) {
			return '';
		}

		return htmlspecialchars_decode($value);
	}
}