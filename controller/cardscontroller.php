<?php

namespace OCA\DiscountCards\Controller;

use OCP\IDBConnection;
use OCP\IL10N;
use \OCP\IRequest;
use \OCP\AppFramework\ApiController;
use \OCP\AppFramework\Http\JSONResponse;
use \OCP\AppFramework\Http;
use \OC\User\Manager;
use OCP\Util;

class CardsController extends ApiController  {

    private $userId;
	private $db;
	private $l10n;
	private $userManager;

	public function __construct($appName, IRequest $request, $userId, IDBConnection $db, IL10N $l10n, Bookmarks $bookmarks, Manager $userManager) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->db = $db;
		$this->request = $request;
		$this->l10n = $l10n;
		$this->bookmarks = $bookmarks;
		$this->userManager = $userManager;
	}

	/**
	 * @param string $id
	 * @return JSONResponse
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @CORS
	 */
	public function test($id = 0) {

		$response = new JSONResponse(
			$this->appName,
			'index',
			[
				'appId' => $this->appName
			],
			$id
		);

		return $response;
	}


}
