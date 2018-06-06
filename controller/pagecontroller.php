<?php
namespace OCA\Discount_Cards\Controller;

use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\TemplateResponse;

/**
 * Class PageController
 *
 * @package OCA\Discount_Cards\Controller
 */
class PageController extends ApiController {
	/**
	* @NoCSRFRequired
	* @NoAdminRequired
	*
	* @return TemplateResponse
	*/
	public function index() {
		$response = new TemplateResponse(
			$this->appName,
			'index',
			[
				'appId' => $this->appName
			]
		);
		return $response;
	}
}