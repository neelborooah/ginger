
$(document).ready(function() {

	var app = new App();
	app.store.url = "http://localhost:3000/payments";
	app.store.node_id = "main_content";

	$("#btn_callback").on("click", function(e) {
		$("#btn_payment").val("");
		var filters = {
			'_sort': 'amount',
			'_order': 'DESC',
			'_limit': 20 
		}
		app.store.filters = filters;
		app.populateRecords();

	});


	$("#btn_payment").on("change", function() {
		var val = $("#btn_payment option:selected").attr("val");

		if(val.length == 0) return;

		app.store.filters = {
			'method': val
		};

		app.populateRecords();

	});

	new Promise(function(resolve, reject) {
	
		$("#btn_promise").on("click", function() {
			$("#btn_payment").val("");
			resolve();
		
		}.bind(this));
		
	}).then(function() {
		var filters = {
			'merchant': 'Ginger',
		};
		app.store.filters = filters;
		app.populateRecords();

	}).catch(function(err) {
		console.log(err);
		alert("An error occured");
	});

	$("#btn_add_payment").on("click", function(e) {
		$("#add-payment-container").modal();

	});


	$("#add-payment-container form").on("submit", function(e) {
		e.preventDefault();
		console.log("clicked");

		var record = {
			merchant: $("#add_merchant").val().trim(),
			method: $("#add_method option:selected").attr("val"),
			amount: $("#add_amount").val().trim(),
			currency: $("#add_currency").val().trim(),
			created: new Date(),
			status: 'pending',
		}

		app.store.new_record = record;

		app.addRecord();

		$("#add-payment-container").modal('hide');
	});


});
