<?php
namespace OCA\Discount_Cards\Controller\Lib;

use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\IDBConnection;
use OCP\IConfig;

/**
 * Class CardsController
 *
 * @package OCA\Discount_Cards\Controller
 */
class Cards {
	/** @var IDBConnection */
	private $db;
	/** @var IConfig */
	private $config;

	public function __construct(IDBConnection $db, IConfig $config) {
		$this->db = $db;
		$this->config = $config;
	}

	public function GetTags($userId) {
		$qb = $this->db->getQueryBuilder();
		$qb->select('tag');
		$qb->selectAlias($qb->createFunction('COUNT(' . $qb->getColumnName('tags.tag') . ')'), 'count');
		$qb->from('discount_cards', 'cards');
		$qb->leftJoin('cards', 'discount_cards_tags', 'tags', $qb->expr()->eq('tags.card_id', 'cards.id'));
		$qb->where('user_id = :user_id_in AND tag IS NOT NULL');
		$qb->setParameters(array(':user_id_in' => $userId));
		$qb->groupBy('tag');
		$results = $qb->execute()->fetchAll();
		return $results;
	}

	public function FindCards($userId, $sqlSortColumn, $tags) {
		$dbType = $this->config->getSystemValue('dbtype', 'sqlite');
		$qb = $this->db->getQueryBuilder();
		$tableAttributes = array('id', 'user_id', 'title', 'description', 'code',
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
		if (count($tags) > 0) {
			$this->findCardsBuildFilter($qb, $tags);
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
			$qbTags->select('tags.tag');
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
		//return $qb->getSQL();
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
	private function findCardsBuildFilter(&$qb, $filters) {
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
}

//SELECT * FROM
//(SELECT cards.title, cards.code, GROUP_CONCAT(tags.tag) AS tags
//FROM oc_discount_cards AS cards
//LEFT JOIN oc_discount_cards_tags AS tags
//ON tags.card_id = cards.id
//GROUP BY cards.title, cards.code) T
//WHERE FIND_IN_SET("Russia", tags) > 0
//AND FIND_IN_SET("Shops", tags) > 0

//SELECT cards.*
//FROM oc_discount_cards_tags AS tags
//LEFT JOIN oc_discount_cards AS cards
//WHERE tags.tag in ("Russia", "Yaroslavl")
//GROUP BY card_id
//HAVING count(tag)=2

//SELECT tag, COUNT(card_id) AS 'count'
//FROM oc_discount_cards_tags
//WHERE card_id in ('2')
//GROUP BY tag
//ORDER BY tag