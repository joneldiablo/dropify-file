$('#tbody-variants').on('click','tr.variant-to-click', function(e) {
	eventObj = e;
	
	var entityId = $("#"+e.currentTarget.id).data( "entityid" );
	var variantId = $("#"+e.currentTarget.id).data( "variantid" );
	
	$('#entityId').val(entityId);
	$('#variantId').val(variantId);
	
	$('#entityForm').submit();
});