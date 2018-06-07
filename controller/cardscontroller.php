<?php
namespace OCA\Discount_Cards\Controller;

use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http;
use OCP\IDBConnection;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Util;
use \OC\User\Manager;

/**
 * Class CardsController
 *
 * @package OCA\Discount_Cards\Controller
 */
class CardsController extends ApiController  {

    private $userId;
	private $db;
	private $l10n;
	private $userManager;

	public function __construct($appName, IRequest $request, $userId, IDBConnection $db) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->db = $db;
		$this->request = $request;
	}

	/**
	 * @return JSONResponse
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @CORS
	 */
	public function test() {
		$response = new JSONResponse("COOL");
		return $response;
	}


}
