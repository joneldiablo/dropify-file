$(document).ready(function(e){
	var validProductsList = null;
	var invalidProductsList = null;
	var duplicateProductsList = null;
	var errorList = null;
});

$("#saveExcelResponse").on("click", function(e){
	e.preventDefault();
	var metaToken = $("meta[name='_csrf']").attr("content");
	
	var jsonObj = new Object();
	jsonObj.invalidProductsList = invalidProductsList;
	jsonObj.duplicateProductsList = duplicateProductsList;
	jsonObj.errorList = errorList;
	
	$.ajax("downloadInvalidRegs", {
		method: "POST",
		data : JSON.stringify(jsonObj),
		dataType : 'text',
		contentType: "application/json",
	    headers : {
			'X-CSRF-TOKEN' : metaToken
	    },
	    success: function(data){
	    	window.location.href = 'downloadExcel/' + data;
        }
	});
});

function chargeRegsData(validProductsList, invalidProductsList, duplicateProductsList, errorList){
	var invalidRegs = 0;
	var duplicateRegs = 0;
	var validRegs = 0;
	var serverErrors = 0;
	var totalErrors = 0;
	/** Get the invalidProductsList length */
	if (invalidProductsList != null){
		invalidRegs = invalidProductsList.length;
	}
	
	/** Get the duplicateProductsList length */
	if (duplicateProductsList != null){
		duplicateRegs = duplicateProductsList.length;
	}
	
	/** Get the errorList length */
	if (errorList != null){
		serverErrors = errorList.length;
	}
	
	/** Get the validProductsList length */
	if (validProductsList != null){
		validRegs = validProductsList.length;
		var totalCharged = validRegs - serverErrors;
		/** Render the total charged products into the bussines */
		if (totalCharged == 1){
			$("#valids").attr("title", "1 producto agregado al negocio.");
		} else if (totalCharged > 1) {
			$("#valids").attr("title", totalCharged + " productos agregados al negocio.");
		} else {
			$("#valids").attr("data-rows", 0);
			$("#valids").attr("title", "No se agregó ningún producto al negocio.");
		}
		
		$("#validRegs").show();
	}
	
	totalErrors = invalidRegs + serverErrors + duplicateRegs;
	if ( totalErrors > 0){
		$("#errors").attr("title", totalErrors + " " + $("#errors").attr("title") + ".");
		$("#ServerResponse").show();
		$(".invalidRegs_container").show();
	}
}

function ChargeResults(errorLevel, message, dataJson){
	console.log("ErrorLevel: " + errorLevel + "\nMessage: " + message);
	
	validProductsList = dataJson.validProductsList;
	duplicateProductsList = dataJson.duplicateProductsList;
	invalidProductsList = dataJson.invalidProductsList;
	errorList = dataJson.errorList;
	
	console.log("validProductsList:\n" + JSON.stringify(validProductsList));
	console.log("invalidProductsList:\n" + JSON.stringify(invalidProductsList));
	console.log("duplicateProductsList:\n" + JSON.stringify(duplicateProductsList));
	console.log("errorList:\n" + JSON.stringify(errorList));
	
	chargeRegsData(validProductsList, invalidProductsList, duplicateProductsList, errorList);
	
//	switch (errorLevel){
//    	case 0:
//    		/* Creación de las tablas con registros válidos, inválidos y duplicados */
//    		chargeRegsData(validProductsList, invalidProductsList, duplicateProductsList);
//    	break;
//    	case 1:
//    		/* Creación de las tablas con registros válidos y duplicados */
//    		chargeRegsData(validProductsList, invalidProductsList, duplicateProductsList);
//    	break;
//    	case 2:
//    		/* Todos los registros son válidos, se envía el Request y se mapea el resultado */
//    		$("#ServerResponse").html("<hr><h3>" + message + "</h3>");
//    		$("#ServerResponse").show();
//    	break;
//    	case 3:
//    		/* Existe algun error en el procesamiento del Request, se mapea el errorList */
//    		errorList = dataJson;
//    		
//    		
//    	break;
//	}
}