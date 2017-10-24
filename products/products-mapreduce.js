//
// The Products Database
// ==================
// Map-Reduce Products

// Find the number of products with each color

db.products.mapReduce(
	function() {
		emit(this.color, 1);
	},
	function(k, v) {
		return Array.sum(v);
	},
	{ out: { inline: 1 } }
);

// Find the total revenue of each department
// (how much did each department make in sales?)

db.products.mapReduce(
	function() {
		emit(this.department, this.price * this.sales);
	},
	function(k, v) {
		return Array.sum(v);
	},
	{ out: { inline: 1 } }
);

// Find the potential revenue of each product
// (how much can each product make if the entire
// remaining stock is sold?)

db.products.mapReduce(
	function() {
		emit(this.name, this.price * this.stock);
	},
	function(k, v) {
		return Array.sum(v);
	},
	{ out: { inline: 1 } }
);

// Find the sum of the total and potential
// revenue for each product

db.products.mapReduce(
	function() {
		emit(this.name, this.price * this.stock + this.price * this.sales);
	},
	function(k, v) {
		return Array.sum(v);
	},
	{ out: { inline: 1 } }
);
