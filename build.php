<style>
	body{
		margin: 25px;
	}
	*{
		background: black;
		color: white;
	}
	
	span.built{
		color: green;
	}
	span.zero{
		color: yellow;
	}
	span.error{
		color: red;
		font-weight: bold;
	}
</style>
<pre>
<?php
	$path = realpath(dirname(__FILE__));
	$commandChangePath = 'cd '.$path;
	$commandBuild = 'npm run build';

	// Change folder
	$output = null;
	$val = null;
	exec($commandChangePath, $output, $val);
	exec($commandBuild, $output, $val);

	foreach ($output as $value){
		$line = cleanString($value);
		echo(replaceStyler($line).'<br>');
	}

	function replaceStyler($line){
		$styles = array(
			"[built]"  => "<span class='built'>[built]</span>",
			"{0}" => "[<span class='zero'>0</span>]",
			"error" => "<span class='error'>error</span>"
		);

		return str_replace(
			array_keys($styles),
			array_values($styles),
			$line
		);
	}

	function cleanString($string) {
		$styleCodes = array(
			"[1m"  => "",
			"[22m" => "",
			"[32m" => "",
			"[33m" => "",
			"[35m" => "",
			"[36m" => "",
			"[39m" => ""
		);

		return escapeText(
			utf8_clean(
				str_replace(
					array_keys($styleCodes),
					array_values($styleCodes),
					urldecode($string)
				)
		));
	}

	function utf8_clean($text) {
		$utf8 = array(
			'/[áàâãªä]/u'   =>   'a',
			'/[ÁÀÂÃÄ]/u'    =>   'A',
			'/[ÍÌÎÏ]/u'     =>   'I',
			'/[íìîï]/u'     =>   'i',
			'/[éèêë]/u'     =>   'e',
			'/[ÉÈÊË]/u'     =>   'E',
			'/[óòôõºö]/u'   =>   'o',
			'/[ÓÒÔÕÖ]/u'    =>   'O',
			'/[úùûü]/u'     =>   'u',
			'/[ÚÙÛÜ]/u'     =>   'U',
			'/ç/'           =>   'c',
			'/Ç/'           =>   'C',
			'/ñ/'           =>   'n',
			'/Ñ/'           =>   'N',
			'/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
			'/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
			'/[“”«»„]/u'    =>   ' ', // Double quote
			'/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
		);
		return preg_replace(array_keys($utf8), array_values($utf8), $text);
	}

	function escapeText ($text) {
		$length = strlen($text);
		$word = '';
		for ($i=0; $i<$length; $i++) {
			$char = $text[$i];
			$code = ord($char);
			if(mustSkip($code))
				continue;
			$word.= $char;
		}
		return $word;
	}

	function mustSkip($code) {
		if($code == 32) return false; //  
		if($code == 45) return false; // -
		if($code == 46) return false; // .
		if($code == 47) return false; // /
		if($code >= 48 && $code <= 57) return false; // 0-9
		if($code == 58) return false; // :
		if($code == 62) return false; // >
		if($code >= 65 && $code <= 90) return false; // A-Z
		if($code == 91) return false; // [
		if($code == 93) return false; // ]
		if($code == 95) return false; // _
		if($code >= 97 && $code <= 122) return false; // a-z
		if($code == 123) return false; // {
		if($code == 125) return false; // }
		
		
		return true;
	}
?>
</pre>