<?php
namespace OCA\Discount_Cards\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Utility\ITimeFactory;
use OCA\Discount_Cards\Controller\CardsController;
use OCP\IContainer;
use OCP\IUser;

class Application extends App {
	public function __construct(array $urlParams = array()) {
		parent::__construct('discount_cards', $urlParams);
		$container = $this->getContainer();
		/**
		 * Controllers
		 * @param IContainer $c The Container instance that handles the request
		 */
		$container->registerService('CardsController', function($c) {
			/** @var IContainer $c */
			$user = $c->query('ServerContainer')->getUserSession()->getUser();
			$uid = is_null($user) ? null : $user->getUID();
			return new CardsController(
				$c->query('AppName'),
				$c->query('Request'),
				$uid,
				$c->query('ServerContainer')->getDatabaseConnection()
			);
		});
	}
}