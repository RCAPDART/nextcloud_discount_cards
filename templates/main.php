<input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>" id="requesttoken" ref="requesttoken">
<div id="cardsContent" style="height: 100%;overflow: auto;">
<?php 
	// script($_['appId'], 'main'); 
	script('discount_cards', 'main'); 
?>
<?php 
	// style($_['appId'], 'main'); 
	style('discount_cards', 'main'); 
?>
</div>
