<?php
/* @var $this OC\Route\Router */

return ['routes' => [
	// page
	['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
	['name' => 'cards#getCards', 'url' => '/cards/getCards', 'verb' => 'GET'],
	['name' => 'cards#deleteCard', 'url' => '/cards/deleteCard', 'verb' => 'GET'],
	['name' => 'cards#addUpdateCard', 'url' => '/cards/addUpdateCard', 'verb' => 'POST'],
	['name' => 'cards#uploadImage', 'url' => '/cards/uploadImage', 'verb' => 'POST'],
	['name' => 'cards#click', 'url' => '/cards/click', 'verb' => 'POST']
]];
