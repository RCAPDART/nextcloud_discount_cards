<input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>" id="requesttoken">
<div id="cardsContent">
	<?php script($_['appId'], ['../build/main']); ?>
</div>