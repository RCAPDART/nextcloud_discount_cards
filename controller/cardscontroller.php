<?php
namespace OCA\Discount_Cards\Controller;

use OCA\Discount_Cards\Controller\Lib\Cards;

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
class CardsController extends ApiController  {
    private $userId;
	private $db;
	private $userManager;
	protected $request;
	private $cards;

	public function __construct($appName, IRequest $request, $userId, IDBConnection $db, Cards $cards) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->db = $db;
		$this->request = $request;
		$this->cards = $cards;
	}

	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return JSONResponse
	*/
	public function test() {
        $bookmarks = $this->cards->FindCards($this->userId, 'lastmodified');
		return new JSONResponse(array('data' => $bookmarks, 'status' => 'success'));
	}
}
