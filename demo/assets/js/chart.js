/*-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 - Copyright (c) 2015 GoNet Mexico S. A. de C. V.
 - Calle Lucerna N° 80, Col. Juarez CP 06600. Mexico D.F. +52 (55) 5570 5100
 -
 - La marca es una marca registrada a nombre de GoNet Mexico S.A. de C.V. queda prohibido su uso por cualquier tercero sin 
 - autorizacion de su titular.
 - 
 - Este software contiene informacion totalmente confidencial propiedad de GoNet Mexico S. A. de C. V. 
 - Queda totalmente prohibido su uso o divulgacion en forma parcial o total y solamente podra ser utilizada de acuerdo a 
 - los terminos y estatutos que determine la empresa.
 -      
 - Configuracion Inicial:     Miguel Ángel Valente Vargas
 -                            miguel.valente@gonet.us
 -                            Digital Business - GoNet Mexico S.A. de C.V.
 -
 - Feb 08, 2017, 14:57:00 PM
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function getDataChart(period, startDate, endDate, urlWS) {
	var d = $.Deferred();
	var metaToken = $("meta[name='_csrf']").attr("content");
	
	var jsonObj = new Object();
	jsonObj.period = period;
	jsonObj.startDate = startDate;
	jsonObj.endDate = endDate;
	
	console.log("JSON.stringify(jsonObj): ", JSON.stringify(jsonObj));
	
	$.ajax(urlWS, {
		method : 'POST',
		data : JSON.stringify(jsonObj),
		dataType : 'json',
		contentType : "application/json",
		mimeType : 'application/json',
		headers : {
			'X-CSRF-TOKEN' : metaToken
		}
	}).done(function(data) {
		d.resolve(data);
		console.log("dataChart: " + JSON.stringify(data.dataChart));
		var dataChart = data.dataChart;
		var intervalType = data.intervalType;
		//creating bar chart
		var $barData = [];
		
		dataChart.map(function(i) {
			console.log("description: "+ i.description);
			console.log("quantity: "+ i.quantity);
			
			var labelY = "";
			
			switch(i.description*1) {
			    case 1:
			    	labelY = "ENE";
			        break;
			    case 2:
			    	labelY = "FEB";
			        break;
			    case 3:
			    	labelY = "MAR";
			        break;
			    case 4:
			    	labelY = "ABR";
			        break;
			    case 5:
			    	labelY = "MAY";
			        break;
			    case 6:
			    	labelY = "JUN";
			        break;
			    case 7:
			    	labelY = "JUK";
			        break;
			    case 8:
			    	labelY = "AGO";
			        break;
			    case 9:
			    	labelY = "SEP";
			        break;
			    case 10:
			    	labelY = "OCT";
			        break;
			    case 11:
			    	labelY = "NOV";
			        break;
			    case 12:
			    	labelY = "DIC";
			        break;
			    default:
			    	labelY = i.description;
			}
			
			$barData.push({y : labelY, a : i.quantity});
		});
		
		$.Dashboard1.createBarChart('morris-bar-example', $barData, 'y', [ 'a' ], [ 'Total' ], [ '#188ae2' ]);
	}).fail(d.reject);
	return d.promise();
}

// Render Data by Category
function renderCategory(jsonObj, urlWS) {
	var d = $.Deferred();
	var metaToken = $("meta[name='_csrf']").attr("content");
	// AJAX Request
	$.ajax(urlWS, {
		method : 'POST',
		data : JSON.stringify(jsonObj),
		dataType : 'json',
		contentType : "application/json",
		mimeType : 'application/json',
		headers : {
			'X-CSRF-TOKEN' : metaToken
		}
	}).done(function(data) {
		d.resolve(data);
		console.log("dataChart for " +  data.category + " category:" + JSON.stringify(data));
		$("h2#totalSales" +  data.category).html(data.totalSales+".00");
		$("p#totalSales" + data.category + "Desc").html(data.description);
	}).fail(d.reject);
	return d.promise();
}

function getDataChart2(period, startDate, endDate, urlWS) {
	// Array of categories
	var category = ["Business", "Branch", "Seller", "Product"];
	var catLength = category.length;
	// JSON Object for the data request
	var jsonObj = new Object();
	jsonObj.period = period;
	jsonObj.startDate = startDate;
	jsonObj.endDate = endDate;
	// Loop for Request of Categories
	for (i = 0; i < catLength; i++) {
		jsonObj.category =  category[i];
		renderCategory(jsonObj, urlWS);
	}
}

//Render Data by Payment
function renderPayment(jsonObj, urlWS) {
	var d = $.Deferred();
	var metaToken = $("meta[name='_csrf']").attr("content");
	// AJAX Request
	$.ajax(urlWS, {
		method : 'POST',
		data : JSON.stringify(jsonObj),
		dataType : 'json',
		contentType : "application/json",
		mimeType : 'application/json',
		headers : {
			'X-CSRF-TOKEN' : metaToken
		}
	}).done(function(data) {
		d.resolve(data);
		console.log("dataChart for " +  data.category + " payment:" + JSON.stringify(data));
		$("h2.totalSales" +  data.category).html(data.stringPayment+".00");
	}).fail(d.reject);
	return d.promise();
}
	
function getDataChart3(period, startDate, endDate, urlWS) {
	// Array of categories
	var payment = ["Card", "Cash", "Other"];
	var payLength = payment.length;
	// JSON Object for the data request
	var jsonObj = new Object();
	jsonObj.period = period;
	jsonObj.startDate = startDate;
	jsonObj.endDate = endDate;
	// Loop for Request of Categories
	for (i = 0; i < payLength; i++) {
		jsonObj.category =  payment[i];
		renderPayment(jsonObj, urlWS);
	}
}