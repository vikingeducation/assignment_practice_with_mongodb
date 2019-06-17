//
// The Products Database
// ==================
// Aggregating Products

// Find the total number of sales each department
// made and sort the results by the department name
db.products.aggregate([
	{
		$group: {
			_id: "$department",
			sum: { $sum: "$sales" }
		}
	},
	{ $sort: { _id: 1 } }
]);

// Find the total number of sales each department
//  made of a product with a price of at least $100
//  and sort the results by the department name

db.products.aggregate([
	{ $match: { price: { $gte: 100 } } },
	{
		$group: {
			_id: "$department",
			sum: { $sum: "$sales" }
		}
	},
	{ $sort: { _id: 1 } }
]);

// Find the number of out of stock products in each
// department and sort the results by the department name

db.products.aggregate([
	{ $match: { stock: { $lte: 0 } } },
	{
		$group: {
			_id: "$department",
			sum: { $sum: 1 }
		}
	},
	{ $sort: { _id: 1 } }
]);
