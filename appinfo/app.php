<?php

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
