<?php

namespace OCA\Discount_Cards\AppInfo;

use OCP\AppFramework\App;

class Application extends App {
	public const APP_ID = 'discount_cards';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}
}