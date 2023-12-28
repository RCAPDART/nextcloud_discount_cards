<?php

namespace OCA\Discount_Cards\Controller;

use OCA\Discount_Cards\AppInfo\Application;
use OCA\Discount_Cards\Service\Cards;

use OCP\IRequest;
use OCP\Util;
use \OC\User\Manager;

use OCP\AppFramework\ApiController ;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IDBConnection;

class CardsController extends ApiController {
    private $userId;
	private $db;
	private $userManager;
	protected $request;
	
	/** @var Cards */
	private $cards;

	public function __construct(
		IRequest $request,
		IDBConnection $db,
		Cards $cards,
		$userId
		) {
			parent::__construct(Application::APP_ID, $request);
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
	public function uploadImage($title='') {
		$image = $_FILES['image'];
		$userId = $this->userId;
		return $this->cards->UploadFile($title, $image, $userId);
	}

	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return JSONResponse
	*/
	public function getCards($tags = null) {
		$filterTags = $this->cards->AnalyzeTagRequest($tags);
		$result = $this->cards->FindCards($this->userId, 'lastmodified', $filterTags);
		return new JSONResponse(array('data' => $result, 'status' => 'success'));
	}

	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return JSONResponse
	*/
	public function deleteCard($cardId) {
		$result = $this->cards->DeleteCard($this->userId, $cardId);
		return new JSONResponse(array('data' => $result, 'status' => 'success'));
	}

	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return JSONResponse
	*/
	public function addUpdateCard($card) {
		$result = $this->cards->AddUpdateCard($this->userId, $card);
		return new JSONResponse(array('data' => $result, 'status' => 'success'));
	}

	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return JSONResponse
	*/
	public function click($cardId) {
		$result = $this->cards->Click($this->userId, $cardId);
		return new JSONResponse(array('data' => $result, 'status' => 'success'));
	}
}
