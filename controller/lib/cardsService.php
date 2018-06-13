<?php
namespace OCA\Discount_Cards\Controller\Lib;

use OCP\IRequest;
use OCP\Util;
use \OC\User\Manager;

use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IDBConnection;

/**
 * Class CardsController
 *
 * @package OCA\Discount_Cards\Controller
 */
class Cards {
	private $db;

	public function __construct(IDBConnection $db) {
		parent::__construct($appName, $request);
		$this->db = $db;
	}

	public function FindCards($userId, $sqlSortColumn) {
		$qb = $this->db->getQueryBuilder();
		$tableAttributes = array('id', 'user_id', 'title', 'description', 'code',
			'color', 'url', 'added', 'lastmodified', 'clickcount', 'image');
		$qb->select($tableAttributes);
		$qb->selectAlias($qb->createFunction('GROUP_CONCAT(' . $qb->getColumnName('tags.tag') . ')'), 'tags');
		$qb->from('discount_cards', 'cards');
		$qb->leftJoin('cards', 'discount_cards_tags', 'tags', $qb->expr()->eq('tags.card_id', 'cards.id'));
		$qb->where($qb->expr()->eq('user_id', $qb->createPositionalParameter($this->userId)));
		$qb->groupBy(array_merge($tableAttributes, [$sqlSortColumn]));
		$qb->setMaxResults(1000);
		$results = $qb->execute()->fetchAll();
		return $results;
	}
}
