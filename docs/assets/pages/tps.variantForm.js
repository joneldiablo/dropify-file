$(document).ready(function(e){
	$('#cost').on('change', function(event) {										
		estimatePrice();
	});
	
	$('#utility').on('change', function(event) {										
		estimatePrice();
	});
	
	$('#price').on('change', function(event) {										
		estimateUtility();
	});
	
	//EXTRAS
	  
	var itemsExtra =  [];//[{value: "10.00",label: "Bolsa"},{value: "20.00",label: "Caja"},{value: "50",label: "Bordado"}];
	//Autocomplete Cat_ToppingList
	 getCatalogList("Cat_ToppingList", "es").done(function(data){			
         console.log("Cat_ToppingList: " + JSON.stringify(data)); 
         $( data.Cat_ToppingList ).each(function( index ) {						
			 //console.log( "this.doubleValue: " + this.doubleValue == 0 || this.doubleValue == "0" ? "0.00" : this.doubleValue);  			
			 //console.log( "this.value: " + this.value );              	
        	 itemsExtra.push( {value: this.doubleValue == 0 ? "0.00" : this.doubleValue , label: this.value} );
		 });  
     });		 
	//Autocomplete INPUT Extras
	$( ".label-extra" ).autocomplete({
	  minLength: 0,
	  source: itemsExtra,
	  focus: function( event, ui ) {
		$( ".label-extra" ).val( ui.item.label );
		return false;
	  },
	  select: function( event, ui ) {
		$( ".label-extra" ).val( ui.item.label );
		$( ".value-extra" ).val( ui.item.value );	 
		return false;
	  }
	});
	
	//Show row-extras to add new Extra Item
	$('#add-extras').click(function() {
		$("#add-extra-div").show();				
		$("#row-extras").show();
		$("#card-extras").removeClass("card-box-empty");
		
		var extrasLeft = $( "div[id^='extraIdNew']" ).length;						
		//console.log("extrasLeft... "+extrasLeft);
		if( extrasLeft > 0 ) {
			$("#remove-extras").show();	
			}
		
	});
		
	var extraIdNew = 0;		
	//Add Extra Item 
	$('#btn-add-extra').click(function() {
			//Validate input fields of extraForm
		var $valid = $('#extraForm').parsley().validate({group: 'block-1'});
				if(!$valid) {
					return false;
				}else{							
					//console.log("itemsExtra: ",JSON.stringify(itemsExtra));
					//console.log("label: ", $( ".label-extra" ).val() );
					//console.log("price: ", $( ".value-extra" ).val() 
					
					var extraLabel = $( ".label-extra" ).val();
					var extraPrice = $( ".value-extra" ).val();
						
					var newDiv = '<div class="form-group clearfix" id="extraIdNew' + extraIdNew + '"data-reference="extraIdNew">'+
									'<div class="col-sm-7">'+
										'<input type="text" class="form-control" readonly value="'+ extraLabel +'" id="extraName' + extraIdNew + '"/>'+
									'</div>'+
									'<div class="col-sm-3">'+
										'<input type="number" class="form-control" readonly value="'+ extraPrice +'" id="extraPrice' + extraIdNew + '"/>'+
									'</div>'+
									'<div class="col-sm-1">'+
										'<button type="button" class="btn btn-icon waves-effect waves-light btn-danger m-b-5" id="btnId' + extraIdNew + '" data-reference="extraIdNew">'+
											'<i class="fa fa-remove" id="removeIconId' + extraIdNew + '" data-reference="extraIdNew"></i>'+
										'</button>'+
									'</div>'+
								'</div>';
											
					$('#extras-div').append(newDiv);
						
					$( ".label-extra" ).val( "" );
					$( ".value-extra" ).val( "" );
		
					var extrasLeft = $( "div[id^='extraIdNew']" ).length;						
					//console.log("extrasLeft... "+extrasLeft);
					if( extrasLeft > 0 ) {
						$("#row-extras").show();
						$("#extras-headers").show();
						$("#remove-extras").show();	
						$("#card-extras").removeClass("card-box-empty");
						}			
						
					 $("#add-extra-div").hide();
					 
					 extraIdNew++;	
					return false;								
				}
	});
		
	//Hide add-extra-div
	$('#btn-remove-extra').click(function() {
		$( ".label-extra" ).val( "" );
		$( ".value-extra" ).val( "" );
		$("#add-extra-div").hide();			
		hideExtraItems();			
		return false;
	});
	
	//Hide all Extra Items
	$('#remove-extras').click(function() {
		$("#row-extras").hide();		
		$("#remove-extras").hide();						
		$("#card-extras").addClass("card-box-empty");
	});
		
		
	$('#extras-div').on('click','div.form-group button', function(event) {
		 // console.log("btnId... "+event.target.id);
		var btnId = event.target.id.substring(5);
		 // console.log("id... "+btnId);
		
		var extraReference = $("#"+event.target.id).data( "reference" );			
		 // console.log("data-reference: "+ extraReference );
		
		//$("#extraIdNew"+btnId).remove();	
		$("#" + extraReference + btnId).remove();			
		hideExtraItems();
		return false;					
	});
		
	$('#extras-div').on('click','div.form-group i', function(event) {
		 // console.log("removeIconId... "+event.target.id);
		var removeIconId = event.target.id.substring(12);
		 // console.log("id... "+removeIconId);
		
		var extraReference = $("#"+event.target.id).data( "reference" );
		 // console.log("data-reference: "+extraReference);
		
		$("#" + extraReference + removeIconId).remove();	
		
		hideExtraItems(); 
		return false;
	});
		
	//END EXTRAS
	
	var collectionsList = [];
	//Autocomplete Cat_CollectionList
	getCatalogList("Cat_CollectionList", "es").done(function(data){			
        // // console.log("Cat_CollectionList: " + JSON.stringify(data));      
		$( data.Cat_CollectionList ).each(function( index ) {						
			// // console.log( index + ": " + this.id );					
			collectionsList.push( this.value );
		}); 
    }); 
	
	// SELECT Colections
	$('#colections').select2({
	  tags: collectionsList, //["Navidad", "Primavera", "Día de la Madre"],
	  tokenSeparators: [","],
	  placeholder: "Selecciona o escribe una colección",
	  formatNoMatches: function() {
	        return '';
	    },
	  });
});

/**
 * Function estimatePrice
 */
function estimatePrice() {
	var cost = parseFloat( $('#cost').val() ).toFixed(2) ;
	var utility = parseFloat( $('#utility').val() ).toFixed(2);
	
	if(cost=="" || cost== undefined || cost == NaN || cost == "NaN") cost = 0;
	if(utility=="" || utility== undefined || utility == NaN || utility == "NaN") utility = 0;
	
	cost = cost * 1;
	utility = utility * 1;
	
	var price = cost + ( cost * (utility/100) );
	
	$('#price').val( parseFloat( price ).toFixed(2) );
}
		
/**
 * Function estimatePrice
 */
function estimateUtility() {
	var cost = parseFloat( $('#cost').val() ).toFixed(2) ;
	var price = parseFloat( $('#price').val() ).toFixed(2);	
	
	if(cost=="" || cost== undefined || cost == NaN || cost == "NaN") cost = 0;
	if(price=="" || price== undefined || price == NaN || price == "NaN") price = 0;
				
	cost = cost * 1;
	price = price * 1;
	
	var utility = ((price - cost) /cost )* (100) ;	
	$('#utility').val( parseFloat( utility ).toFixed(2));	
}

/**
* Function SPINNER
*/
  
function spinner() {
	swal({
		title: "Guardando Producto",
		text: "Espera un momento",
		imageUrl: "/TPSUserPortal/resources/assets/images/spinner.gif",
		showConfirmButton: false
	});
}

/**
 * Function continueToList
*/
function continueToList( message ){
	swal({ title: 'Error al guardar',
		text:  message,
		type:  'error',
		confirmButtonClass: 'btn-success waves-effect waves-light',
		confirmButtonText:  'Continuar' },
		function (){
			//swal( 'Cancelado', 'Se dirigirá a Listado', 'success' );
			// setTimeout( function() { window.location.replace( '/TPSUserPortal/sec/promotionlist' ); }, 1000 );
		});
}

/**
 *	Function updateEntity
 */
function updateEntity(entity, urlWS){
	var d = $.Deferred();
	var metaToken = $("meta[name='_csrf']").attr("content");
	
	$.ajax( urlWS, {
		method:'POST',
		data: JSON.stringify(entity),
		dataType: 'json',
		contentType: "application/json",
		mimeType: 'application/json',
		headers:{
			'X-CSRF-TOKEN':metaToken
		}
	}).done(function(data){
		d.resolve(data);
	}).fail(d.reject);
	
	return d.promise();
}

/**
 *	Function updateEntityAlert
 */
function updateEntityAlert(entityId, action, message) {
	swal({
		title: "¿Estás Seguro?",
		text: message,
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: 'btn-warning',
		confirmButtonText: "Si, "+ action,
		cancelButtonText: "No",
		closeOnConfirm: false
	}, function () {
		swal({
			title: "Actualizando Variante",
			text: "Espera un momento",
			imageUrl: "/TPSUserPortal/resources/assets/images/spinner.gif",
			showConfirmButton: false
		})
		updateStatusEntity(entityId);
	});
}

/**
 *	Function updateStatusEntity
 */

function updateStatusEntity(variantId){
	var entityToUpdate = {};
	entityToUpdate.action = "u";
	entityToUpdate.entityName = "Product";
	entityToUpdate.entityId = variantId;
	enableDisableEntity(entityToUpdate).done(function(data){
		if(data.response.responseCode == "0001")
			$('#entityForm').submit();
		else
			continueToList( data.response.responseMessage );
	}).fail(function() {
		continueToList();
   });
}

/**
 *	Function enableDisableEntity
 */
function enableDisableEntity(entity){
	var d = $.Deferred();
	var metaToken = $("meta[name='_csrf']").attr("content");
	
	$.ajax( 'updateDisabledRemoved', {
		method:'POST',
		data: JSON.stringify(entity),
		dataType: 'json',
		contentType: "application/json",
		mimeType: 'application/json',
		headers:{
			'X-CSRF-TOKEN':metaToken
		}
	}).done(function(data){
		d.resolve(data);
	}).fail(d.reject); 
	return d.promise();
}

/**
 *	Function getCatalogList
 */
function getCatalogList(catalogName, language){
	var d = $.Deferred();
	var metaToken = $("meta[name='_csrf']").attr("content");
	var catalogData = { "catalogName":catalogName, "language": language };
	
	$.ajax( 'ajaxCatalogRequest', {
		method:'POST',
		data: JSON.stringify(catalogData),
		dataType: 'json',
		contentType: "application/json",
		mimeType: 'application/json',
		headers:{
			'X-CSRF-TOKEN':metaToken
		}
	}).done(function(data){
		d.resolve(data);
	}).fail(d.reject);
	
	return d.promise();
}

/**
 * Function to update the variant info Form
 */
function UpdateFormVariantUnique(entity, variant){
	var price = variant[0].inventory.priceList[0].value;
	var cost = variant[0].inventory.cost;
	var utility = ((price - cost) /cost ) * (100);
	var brand = entity.brandId;
	var name = entity.name;
	// Set the Product Parent info
	$("#productParentId").val(entity.id);
//	$('#name').val(entity.name);
//    $('#brand').val(entity.brandId);
    // Set the Variant Info
	$("#variantId").val(variant[0].id);
	$("#barcode").val(variant[0].barCode);
	$("#sku").val(variant[0].sku);
	$("#stock").val(variant[0].inventory.stockQuantity);
	$('#hasTax').prop('checked', variant[0].hasTax);
	$('#utility').val(parseFloat( utility ).toFixed(2));
	$("#cost").val(parseFloat( cost ).toFixed(2));
	$("#price").val(parseFloat( price ).toFixed(2));
	
	// Set the featureList
	var features = "";
	$.each(variant[0].featureList, function(i, elem){
		var name = elem.name;
		var value = elem.value;
		
		features += " - " + name + " " + value;
	});
	
	$("#variantFeatures").html( name + " " + features);
	// Set the Variant Images
	if(variant[0].photoFileList.length){
		var imagesList=[];
		$.each(variant[0].photoFileList, function(i,elem){
			var image = {};
			image.src = elem.url;
			image.sortValue = elem.priority;
			imagesList.push(image);
		});
		$("#entityImage").dropifyGallery({imgs:imagesList});
		$("#entityImage").parent().find(".dropify-preview").show();
	}
	// Set the Variant Extras
	if(variant[0].toppingList != null && variant[0].toppingList.length){
		$("#row-extras").show();
		$("#card-extras").removeClass("card-box-empty");
		var extraId = 1000;
		$(variant[0].toppingList).each(function( index ){
			var newDiv = '<div class="form-group clearfix" id="extraId' + extraId + '" data-reference="extraId">'
						 + '<div class="col-sm-7">'
						 +   '<input type="text" class="form-control" readonly value="'+ this.name +'" id="extraName' + extraId + '"/>'
						 + '</div>'
						 + '<div class="col-sm-3">'
						 +   '<input type="number" class="form-control" readonly value="'+ this.price +'" id="extraPrice' + extraId + '"/>'
						 + '</div>'
						 + '<div class="col-sm-1">'
						 +   '<button type="button" class="btn btn-icon waves-effect waves-light btn-danger m-b-5" id="btnId' + extraId + '" data-reference="extraId">'
						 +      '<i class="fa fa-remove" id="removeIconId' + extraId + '" data-reference="extraId"></i>'
						 +   '</button>'
						 + '</div>'
						 +'</div>';
			$('#extras-div').append(newDiv);
			extraId++;
		});
    }
}

/**
 * Function to save the variant info
 */
$("#save-form-editVariant").click(function(e){
	var imagesList 		= [];
	// Spinner effect
	spinner();
	// Get the Image List
	var base64Imgs = $("#entityImage").dropifyGallery("getImages");
	$.each(base64Imgs,function(i,elem){
		var indexBase = elem.src.indexOf("base64,");
		var imagen = {};
		imagen.priority = elem.sortValue;
		if(elem.base64){
			imagen.data = elem.src.substring(indexBase + 7);
		}else{
			imagen.url = elem.src;
		}
		imagesList.push(imagen);
	});
	// Set the values for the Product Variant
	var variant = new Object();
	variant.productParentId = $("#productParentId").val();
	variant.variantId 		= $("#variantId").val();
	variant.barCode 		= $("#barcode").val();
	variant.sku 			= $("#sku").val();
	variant.cost 			= $("#cost").val();
	variant.price 			= $("#price").val();
	variant.stockQuantity 	= $("#stock").val();
	
	variant.hasTax	 		= $("#hasTax").is(':checked');
	variant.hasStock 		= $("#stock4All").is(':checked');
	
	variant.photoFileList	= imagesList;
	variant.featureList		= featureList;
	
	console.log("Variant Data:\n" + JSON.stringify(variant));
	
	// Update Variant
	updateEntity(variant, "variantEditForm").done(function(data){
		if(data.response.responseCode == "0000"){
			$('#entityForm').submit();
		} else {
			continueToList( data.response.responseMessage );
		}
    }).fail(function() {
    	continueToList();
    });
});

$("#cancel-form-variant").click(function(e){
	$('#entityForm').submit();
});

$('#disable-form-edit').click(function () {
	var entityId = $('#variantId').val();
	updateEntityAlert(entityId, "Deshabilitar", "Este producto ya no aparecerá en el cátalogo de la APP");			
});
	

$('#enable-form-edit').click(function () {
	var entityId = $('#variantId').val();
	updateEntityAlert(entityId, "Habilitar", "Este producto aparecerá en el cátalogo de la APP");						
});