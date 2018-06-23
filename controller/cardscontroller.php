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

	public function __construct(
		$appName,
		IRequest
		$request,
		$userId,
		IDBConnection
		$db,
		$cards
		) {
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
	public function uploadImage($title='') {
		$image = $_FILES['image'];
		return $this->cards->UploadFile($title, $image);
	}

	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return JSONResponse
	*/
	public function getCards($tags = null) {
		$filterTags = $this->cards->AnalyzeTagRequest($tags);
		$cards = $this->cards->FindCards($this->userId, 'lastmodified', $filterTags);
		return new JSONResponse(array('data' => $cards, 'status' => 'success'));
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
	public function getTags() {
		$tags = $this->cards->GetTags($this->userId);
		return new JSONResponse(array('data' => $tags, 'status' => 'success'));
	}
}
