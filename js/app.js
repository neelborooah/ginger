function App() {

	this.store = {

		url: null,

		node_id: null,

		records: [],

		filters: {

		},

		new_record: null
	};

}


App.prototype._get = function(resolve, reject) {

	$.ajax({
		url: this.store.url,
		method: 'GET',
		data: this.store.filters,
		success: function(result) {
			this.store.records = result;
			if(resolve) resolve();
		}.bind(this),
		error: function(err) {
			if(reject) reject();
		}.bind(this)

	});
};

App.prototype._send = function(resolve, reject) {
	$.ajax({
		url: this.store.url,
		method: 'POST',
		data: this.store.new_record,
		accept: 'application/json',
		success: function(result) {
			console.log(result);
			if(resolve) resolve();
		}.bind(this),
		error: function(err) {
			console.log(err);
			if(reject) reject();
		}.bind(this)
	});
}

App.prototype.addRecord = function() {

	new Promise(function(resolve, reject) {

		this._send(resolve, reject);

	}.bind(this)).then(function() {

		this.store.new_record = null;

		alert("saved successfully");
	
	}.bind(this)).catch(function(err) {

		console.log(err);
		alert("An error occured");

	});
}


App.prototype.populateRecords = function() {
	new Promise(function(resolve, reject) {

		this._get(resolve, reject);

	}.bind(this)).then(function() {

		this.render();

	}.bind(this)).catch(function(err) {

		console.log(err);
		alert("An error occured");

	});
}

App.prototype.render = function() {

	if(this.store.records.length == 0) return;

	var htmlString = "<table class='table table-striped table-bordered'>";

	htmlString += "<tr>";
	for(var key in this.store.records[0]) {

		if(this.store.records[0].hasOwnProperty(key)) {
			htmlString += "<th>"+key+"</th>";
		}

	}
	htmlString += "</tr>";

	this.store.records.forEach(function(r) {

		htmlString += "<tr>";

		for(var key in r) {
			if(r.hasOwnProperty(key)) {
				htmlString += "<td>"+r[key]+"</td>";
			}
		}

		htmlString += "</tr>";
	
	});

	$("#"+this.store.node_id).html(htmlString);
}
