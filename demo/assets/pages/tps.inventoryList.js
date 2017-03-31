// Variables
        var metaToken = $("meta[name='_csrf']").attr("content");
        var timeOutFilterVar;         
        var table;
        var editor;

		// Filters
		var typingFilter = function (){
			table.search( this.value ).draw();			
		};

        $('#target1').on( 'change', function () {
            table.search( this.value ).draw();
        } );

        $('#target2').on( 'keyup', function () {
        	clearTimeout(timeOutFilterVar);
            timeOutFilterVar = setTimeout(typingFilter.bind(this), 800);
        } );

        $('#target3').on( 'change', function () {
            table.search( this.value ).draw();
        } );
		// End Filters
		
		
		

		
        $(document).ready(function() {
            
        	editor = new $.fn.dataTable.Editor( {
//         		ajax: '/api/datatable_inventory',
        		ajax: {
					url: 'ajaxinventoryupdate',
					method: 'POST',
					async: true,
					contentType: "application/json",
					dataType: "json",
					mimeType: "application/json",
					data: function ( d ) {
							var idName = Object.getOwnPropertyNames(d.data)[0];
							d.id = idName;
							d.branchName 	= d.data[idName].branchName;
							d.productName 	= d.data[idName].productName;
							d.maxQuantity 	= d.data[idName].maxQuantity;
							d.minQuantity 	= d.data[idName].minQuantity;
							d.stockQuantity = d.data[idName].stockQuantity;
							d.cost 			= d.data[idName].cost;
							d.publicPrice 	= d.data[idName].publicPrice;
							return JSON.stringify( d );
							}, 
					headers: { 'X-CSRF-TOKEN': metaToken }
					},
        		table: '#datatable-inventory',
        		idSrc:  'id',
        		fields: [
        			{
//         				"label": "Sucursal:",
        				"name": "branchName",
        				"type": "readonly"
        			},
        			{
//         				"label": "Producto:",
        				"name": "productName",
        				"type": "readonly"
        			},
        			{
//         				"label": "Existencia:",
        				"name": "stockQuantity"
        			},
        			{
//         				"label": "M&iacute;nimo:",
        				"name": "minQuantity"
        			},
        			{
//         				"label": "M&aacute;ximo:",
        				"name": "maxQuantity"
        			},
        			{
//         				"label": "Costo:",
        				"name": "cost"
        			},
        			{
//         				"label": "Precio Publico:",
        				"name": "publicPrice"
        			}
        		]
        	} );


        	editor.on( 'preSubmit', function ( e, o, action ) {
        		console.log("On preSubmit");
        		
                if ( action !== 'remove' ) {
                    
                	var stockQuantity = editor.field( 'stockQuantity' );
                	var stockVal = stockQuantity.val();
                    // Only validate user input values - different values indicate that
                    // the end user has not entered a value
                    if ( ! stockQuantity.isMultiValue() ) {
//						console.log("multi: ", stockQuantity.isMultiValue() );
						
						var typeOfStock = stockQuantity.val()*1;
						
//							console.log("stockQuantity", stockQuantity.val() );
//							console.log("typeOfStock", typeOfStock);
//							console.log("type", typeof typeOfStock);
//							console.log("equal", typeof typeOfStock);

                        if (typeof typeOfStock != 'number' || isNaN(typeOfStock) ) {

                        	stockQuantity.error( 'Solo números' );
                        }
                        else if( stockVal.indexOf(".") != -1 && (stockVal.substring(stockVal.indexOf(".")+1,stockVal.length) ).length > 2 ) { stockQuantity.error( 'Máximo dos decimales' ); }
                        
                    }
                    
                    
                    
                    
                    var minQuantity = editor.field( 'minQuantity' ); var minVal = minQuantity.val();                   
                    // Only validate user input values - different values indicate that
                    // the end user has not entered a value
                    if ( ! minQuantity.isMultiValue() ) {						
						var typeOfMin = minQuantity.val()*1;
                        if (typeof typeOfMin != 'number' || isNaN(typeOfMin)  || minQuantity.val()*1 < 0 ) {
                        	minQuantity.error( 'Solo números' );
                        }                        
                        else if( minVal.indexOf(".") != -1 && (minVal.substring(minVal.indexOf(".")+1,minVal.length) ).length > 2 ) { minQuantity.error( 'Máximo dos decimales' ); }
                    }
                    
                    
                    
                    
                    var maxQuantity = editor.field( 'maxQuantity' );   var maxVal = maxQuantity.val();                 
                    // Only validate user input values - different values indicate that
                    // the end user has not entered a value
                    if ( ! maxQuantity.isMultiValue() ) {						
						var typeOfMax = maxQuantity.val()*1;
                        if (typeof typeOfMax != 'number' || isNaN(typeOfMax)  || maxQuantity.val()*1 < 0 ) {
                        	maxQuantity.error( 'Solo números' );
                        }                        
                        else if( maxVal.indexOf(".") != -1 && (maxVal.substring(maxVal.indexOf(".")+1,maxVal.length) ).length > 2 ) { maxQuantity.error( 'Máximo dos decimales' ); }                       
                                                
                    }
                    
                    
                    
                    var cost = editor.field( 'cost' );     var costVal = cost.val();               
                    // Only validate user input values - different values indicate that
                    // the end user has not entered a value
                    if ( ! cost.isMultiValue() ) {						
						var typeOfCost = cost.val()*1;
                        if (typeof typeOfCost != 'number' || isNaN(typeOfCost) || cost.val()*1 < 0  ) {
                        	cost.error( 'Solo números' );
                        }                         
                        else if( costVal.indexOf(".") != -1 && (costVal.substring(costVal.indexOf(".")+1,costVal.length) ).length > 2 ) { cost.error( 'Máximo dos decimales' ); }                      
                        
                    }
                    
                    
                    
                    
                    var publicPrice = editor.field( 'publicPrice' );  var priceVal = publicPrice.val();                  
                    // Only validate user input values - different values indicate that
                    // the end user has not entered a value
                    if ( ! publicPrice.isMultiValue() ) {						
						var typeOfPrice = publicPrice.val()*1;
                        if (typeof typeOfPrice != 'number' || isNaN(typeOfPrice) || publicPrice.val()*1 < 0  ) {
                        	publicPrice.error( 'Solo números' );
                        }                                               
                        else if( priceVal.indexOf(".") != -1 && (priceVal.substring(priceVal.indexOf(".")+1,priceVal.length) ).length > 2 ) { publicPrice.error( 'Máximo dos decimales' ); }
                        
                    }
         
                    
                    
                    // ... additional validation rules
         
                    // If any error was reported, cancel the submission so it can be corrected
                    if ( this.inError() ) {
                        return false;
                    }
                }
            } );

        	// Activate an inline edit on click of a table cell
            $('#datatable-inventory').on( 'click', 'tbody td:not(:first-child)', function (e) {
            	editor.inline( this, {
                    submit: 'allIfChanged',
                    onReturn: 'submit',
                    onBlur: 'submit',
                    onEsc: 'blur',
                    drawType: 'none'
                } );
            } );

            
        	table = $('#datatable-inventory').DataTable( {
        				keys: false,
						"searching": false,
						"ordering": false,
						"processing": true,
						"serverSide": true,
						"responsive": true,
						"bInfo" : false,
						"ajax": {
								url: 'ajaxinventorylist',
								method: 'POST',
								async: true,
								contentType: "application/json",
								dataType: "json",
								mimeType: "application/json",
								"data": function ( d ) {
										d.target1 = $('#target1').val();
										d.target2 = $('#target2').val();
										d.target3 = $('#target3').val();
										d.totalRecords = $('#totalRecords').val();
										return JSON.stringify( d );
										}, 
								headers: { 'X-CSRF-TOKEN': metaToken }
								},
						"language": {
						            "url": "../resources/assets/plugins/datatables/json/Spanish.json"
						        },
						"columns":	[
									//{ "orderable": false },
									{ "data": "branchName", }, //"orderable": false
									{ "data": "productName"  },
									{ "data": "stockQuantity", "defaultContent": "", render: $.fn.dataTable.render.number( ',', '.', 2, '' ) },
									{ "data": "minQuantity", "defaultContent": "", render: $.fn.dataTable.render.number( ',', '.', 2, '' ) },
									{ "data": "maxQuantity", "defaultContent": "", render: $.fn.dataTable.render.number( ',', '.', 2, '' ) },
									{ "data": "cost", "defaultContent": "", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
									{ "data": "publicPrice", "defaultContent": "", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
									//{ "orderable": false  }
									],
						"columnDefs": [
						               { className: "dt-body-rigth", "targets": [ 2,3,4,5,6 ] }
						             ],
						"select": false,
						"lengthChange": false
            } );

       	// Catalog Request  'ajaxSimpleCatalogRequest'
   		var catalogName = "Cat_Branch"; //"Cat_User_Role"; // 
        var catalogData = { "catalogName":catalogName,
                			"language": "es" };
        var $target1 = $("#target1");
        var catalogList = []; 
   		$.ajax( { 
   				url:  'ajaxBranchSimpleCatalogRequest',
   		  		type: 'POST', 
   		  		dataType: 'json', 
   		  		cache: false, 
   		  		async: true, 
   		  		headers: { 'X-CSRF-TOKEN': metaToken },
   		  		data:       JSON.stringify( catalogData ),
   		  		beforeSend: function( xhr  ) { xhr.setRequestHeader("Content-Type", "application/json"); },
   		  		success:    function( data )             
   		  			{ 
   		  			
   		  		// console.log("on ajaxBranchSimpleCatalogRequest... data", JSON.stringify(data) );
    			if ( data.response != undefined && data.response.responseCode == "99999" ) window.location.replace( '/TPSUserPortal/sec/logout_forced' );
   		  			
   		  			catalogList = data[catalogName];
   		  			var i = 0;
   		  			for ( i = 0 ; i < catalogList.length; i++ )    
   			  			{
   				  		$target1.append("<option value="+ catalogList[i].id +" >" + catalogList[i].value + "</option>");    
   				  		}                               
   		  			},
   		  		error:      function( xhr, status, err ) { console.error( 'simpleCatalog', status, err.toString() ); }.bind( this ) 
   		  		} );

   		// End Catalog Request

        } );
            
