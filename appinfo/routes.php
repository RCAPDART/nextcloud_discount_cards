<?php
/**
 * Copyright (c) 2015 Robin Appelman <icewind@owncloud.com>
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 * See the COPYING-README file.
 */

/** @var $this OC\Route\Router */

return ['routes' => [
	// page
	['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
	['name' => 'cards#test', 'url' => '/cards/test', 'verb' => 'GET'],
	['name' => 'cards#getCards', 'url' => '/cards/getCards', 'verb' => 'GET'],
	['name' => 'cards#uploadImage', 'url' => '/cards/uploadImage', 'verb' => 'POST']
]];
