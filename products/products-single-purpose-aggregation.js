//
// The Products Database
// ==================
// Single-Purpose-Aggregation Products

// How many products are there?

db.products.count();

// How many products are out of stock?

db.products.count({ stock: 0 });

// How many products are fully stocked? (100)

db.products.count({ stock: { $gte: 100 } });

// How many products are almost out of stock? (>= 5)

db.products.count({ stock: { $lte: 5 } });

// What are all the unique names of all the departments?

db.products.distinct("department");

// What are all the unique names of product colors?

db.products.distinct("color");

// Find the total number of out of stock products for each department.

db.products.group({
	key: { department: 1 },
	cond: { stock: { $lte: 0 } },
	reduce: function(cur, result) {
		result.count += 1;
	},
	initial: { count: 0 }
});
