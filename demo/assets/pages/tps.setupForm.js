/**
* SetupFormComponent
* Author: TPS
* Module/App: TPS Components js
*/

!function($) {
    "use strict";
	 
	 /**
			  *	Function updateEntity
			  */
			
			function updateEntity(entity, urlWS){
		    		var d = $.Deferred();
		
		    		var metaToken = $("meta[name='_csrf']").attr("content");		    		 
		    		
		    		//console.log("JSON.stringify(jsonObj): ",JSON.stringify(jsonObj));
		    		
		    		$.ajax( urlWS,
		            {method:'POST', 
		    			data: JSON.stringify(entity),
		    	        dataType: 'json',
		    	        contentType: "application/json", 
		    	        mimeType: 'application/json',
		    	        headers:{'X-CSRF-TOKEN':metaToken}}  
		    		).done(function(data){
		    			d.resolve(data);
		    		}).fail(d.reject); 
		    		return d.promise();
		    	}
				
	  /**
		  *	Functions
		  */
	  
	
		
            function updateControls(addressComponents) {
				$('#street').val(addressComponents.streetName);
				$('#outdoorNumber').val(addressComponents.streetNumber);
				$('#city').val(addressComponents.city);
				$('#state').val(addressComponents.stateOrProvince);
				$('#zipCode').val(addressComponents.postalCode);
				$('#countryCode').val(addressComponents.country);
				$('#country').val(addressComponents.country);
				$('#reference').val(addressComponents.country);
				//console.log(JSON.stringify( addressComponents));
			}

            
				
				function check_cantidad(element)
					{
					var cant = element.value;
					var cant_es_flotante = isFloat(cant);
					// alert('Valor introducido: '+cant+' \n\n ID: '+element.id+' | Es flotante? '+cant_es_flotante);
					// descomentar si quieres revisar los valores del id, value y si es flotante
					 
					if (isNaN(cant))
					{
					
					document.getElementById(element.id).value = "";
					}
					else if (cant < 1 )
					{
					
					document.getElementById(element.id).value = "";
					}
					else if (cant_es_flotante == true)	
					{
					
					cant = parseInt(cant);
					document.getElementById(element.id).value = cant;
					}
					}
					
					
					function isFloat(myNum) 
						{
						// es true si es 1, osea si es flotante
						var myMod = myNum % 1;
						 
						if (myMod == 0) 
						{ return false; } 
						else { return true; }
						}
						
					function limita(maximoCaracteres) {
							var elemento = document.getElementById("texto");
							if(elemento.value.length >= maximoCaracteres ) {
							return false;
							}
							else {
								return true;
							}
						}
				
		
	
				
    /**
	 * SetupFormComponent
	 */	
    var SetupFormComponent = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };
     //on doc load
    SetupFormComponent.prototype.onDocReady = function(e) {	
	
		
            	var x = document.getElementById("lastName").value;
            	if(x.length <= 1){
                	document.getElementById("lastName").value = "";
                    document.getElementById("lastName").placeholder = "Apellido de tu Usuario";
                }
                
                var y = document.getElementById("userName").value;
            	if(y === 'Usuario'){
                	document.getElementById("userName").value = "";
                    document.getElementById("userName").placeholder = "Nombre de tu Usuario";
                }

            	var z = document.getElementById("businessName").value;
            	if(z === 'Mi Negocio'){
                	document.getElementById("businessName").value = "";
                    document.getElementById("businessName").placeholder = "Nombre de tu negocio";
                }
            		
			
			$('form').parsley({
						excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], :hidden, .ignore-validation'
					});

			
                $('#basicwizard').bootstrapWizard({onNext: function(tab, navigation, index) {
						console.log("onTabShow");
						if(index==1) {
							// Make sure we entered the name
							//$('#businessForm').parsley();
							//var $valid = $("#businessForm").valid();
							
							var $valid = $('#businessForm').parsley().validate({group: 'block-' + index});
      
							if(!$valid) {
								$('#businessName').focus();
								return false;
							}else{
							var business = {};
							
							business.tradeMark = $("#businessName").val();
							business.description = $("#description").val();
							
							business.street = $("#street").val();
							business.zipCode = $("#zipCode").val();
							business.city = $("#city").val();
							business.state = $("#state").val();
							business.reference = $('#reference').val();
							business.outdoorNumber = $('#outdoorNumber').val();
							
							
							console.log("Send to WS Business/Branch: " + JSON.stringify(business));
							
							var dropifyObject = $("#_file").dropifyGallery("getImages"); 							  
							  
							var imgBusiness = dropifyObject[0].src;

							var index = imgBusiness.indexOf("base64,");
								
							if( index != -1) 
								{
								console.log("on change image.. ", imgBusiness.substring(0,27) );
								
								imgBusiness = imgBusiness.substring(index+7);
								}
									
							console.log("after  imgBusiness: " + imgBusiness.substring(0,27) );
							business.photoFileData = imgBusiness;									
							

							updateEntity(business, 'stepOne').done(function(data){
									console.log("updateEntity stepOne: " + JSON.stringify(data))							
								}.bind(this));
							}
						}
						else if(index==2) {
							// Make sure we entered the name
							var $valid = $('#businessForm').parsley().validate({group: 'block-' + index});
							if(!$valid) {
								$('#userName').focus();
								return false;
							}else{
							var user = {};
							
							user.firstName = $("#userName").val();
							user.lastName = $("#lastName").val();
							user.barCode = $("#phone").val();							
							
							console.log("Send to WS User: " + JSON.stringify(user));

							var dropifyObject = $("#_fileUser").dropifyGallery("getImages"); 							  
							  
							var imgBusiness = dropifyObject[0].src;

							var index = imgBusiness.indexOf("base64,");
								
							if( index != -1) 
								{
								console.log("on change image.. ", imgBusiness.substring(0,27) );
								
								imgBusiness = imgBusiness.substring(index+7);
								}
									
							console.log("after  imgBusiness: " + imgBusiness.substring(0,27) );
							user.photoFileData = imgBusiness;
							
							updateEntity(user, 'stepTwo').done(function(data){
					            console.log("updateEntity stepTwo: " + JSON.stringify(data))							
					        }.bind(this));
							
							}
							
						}
						// Set the name for the next tab
						//$('#tab3').html('Hello, ' + $('#name').val());
			 
					}, onTabShow: function(tab, navigation, index) {
						console.log("onTabShow");
						var $total = navigation.find('li').length;
						var $current = index+1;
						console.log("$current: ",$current);
					}, onTabClick: function(tab, navigation, index) {
						//alert('on tab click disabled');
						return false;
					},
					'tabClass': 'nav nav-tabs navtab-wizard nav-justified bg-muted'});

				
				$('#basicwizard .finish').click(function() {
					var $valid = $('#businessForm').parsley().validate({group: 'block-3'});
							if(!$valid) {
								return false;
							}else{
							var product ={};
							
							product.name = $("#productName").val();
							product.description = $("#productDescription").val();
							product.barCode = $("#barCode").val();
							product.price = $("#price").val();
							product.stock = $("#productStock").val();
							product.photoFileData = "";
							
							console.log("Send to WS Product: " + JSON.stringify(product));

							var dropifyObject = $("#_fileProduct").dropifyGallery("getImages"); 							  
							  
							var imgBusiness = dropifyObject[0].src;

							var index = imgBusiness.indexOf("base64,");
								
							if( index != -1) 
								{
								console.log("on change image.. ", imgBusiness.substring(0,27) );
								
								imgBusiness = imgBusiness.substring(index+7);
								}
									
							console.log("after  imgBusiness: " + imgBusiness.substring(0,27) );
							product.photoFileData = imgBusiness;
							
							updateEntity(product, 'stepThree').done(function(data){
								
					            console.log("updateEntity stepThree: " + JSON.stringify(data))
					            							
					        });
							
							$('#end-close-modal').modal('show');
							}
					//$('#rootwizard').find("a[href*='tab1']").trigger('click');
					//window.location.replace("/PortalTPS3/dashboard");
				});
	
	
	
		
				$('#somecomponent').locationpicker({
					location: {
						latitude: 19.4302623,
						longitude: -99.1582451
					},
					radius: 300,
					inputBinding: {
						latitudeInput: $('#latitude'),
						longitudeInput: $('#longitude'),
						locationNameInput: $('#address')
					},
					enableAutocomplete: false,
					onchanged: function (currentLocation, radius, isMarkerDropped) {
						var addressComponents = $(this).locationpicker('map').location.addressComponents;
						updateControls(addressComponents);
					}
				});
				
				$('#con-close-modal').on('shown.bs.modal', function () {
				    $('#somecomponent').locationpicker('autosize');
				});
				
				$('#end-close-modal').on('shown.bs.modal', function () {			
							
					console.log("modal close at 3 seconds... ");
					
				    setTimeout(function() {								  				 
					window.location.replace("/TPSUserPortal/sec/dashboard");	
					}, 3000);
				});

				$('#end-close-modal').on('hidden.bs.modal', function () {
				   window.location.replace("/TPSUserPortal/sec/dashboard");
				})
				
				 
					$('#price').keypress(function (tecla) {
						 
			            if ((tecla.charCode < 48 || tecla.charCode > 57) && (tecla.charCode != 46) && (tecla.charCode != 8)) {
			                return false;
			            }else {
			                     var len   = $('#price').val().length;
			                     var index = $('#price').val().indexOf('.');
			 
			                     if (index > 0 && tecla.charCode == 46) {
			                         return false;
			                     }
			 
			                     if (index > 0) {
			                         var CharAfterdot = (len + 1) - index;
			                         if (CharAfterdot > 3) {
			                             return false;
			                         }
			                     }
			            }
			 
			            return true;
			        });
    },
    //initilizing
    SetupFormComponent.prototype.init = function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
    },

    $.SetupFormComponent = new SetupFormComponent, $.SetupFormComponent.Constructor = SetupFormComponent

}(window.jQuery),
    //initializing main application module
function($) {
    "use strict";
    $.SetupFormComponent.init();
    
}(window.jQuery);




