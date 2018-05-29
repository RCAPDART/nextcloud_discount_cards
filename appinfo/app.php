<?php


namespace OCA\Bookmarks\AppInfo;

use OCA\DiscountCards\Controller;
use \OCP\AppFramework\App;
use OCP\AppFramework\Utility\ITimeFactory;
use \OCP\IContainer;
use \OCA\Bookmarks\Controller\WebViewController;
use OCA\Bookmarks\Controller\Rest\TagsController;
use OCA\Bookmarks\Controller\Rest\BookmarkController;
use OCA\Bookmarks\Controller\Rest\InternalTagsController;
use OCA\Bookmarks\Controller\Rest\InternalBookmarkController;
use OCA\Bookmarks\Controller\Rest\PublicController;
use OCP\IUser;

$c = \OC::$server;

$appId = 'discount_cards';
$appName = 'Discount cards';

\OC::$server->getNavigationManager()->add(function () use ($appId, $appName) {
	return [
		'id' => $appId,
		'order' => 22,
		'name' => $appName,
		'href' => \OC::$server->getURLGenerator()->linkToRoute($appId . '.page.index'),
		'icon' => \OC::$server->getURLGenerator()->imagePath($appId, 'app.svg')
	];
});
