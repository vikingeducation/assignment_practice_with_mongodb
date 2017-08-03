//////////////////////////
//	Inserting Products
//////////////////////////

1;

db.products.insert({
	name: "Hammer",
	price: 9.99,
	department: "Hardware",
	color: "red",
	sales: 80,
	stock: 50
});

2;

db.products.insert([
	{
		name: "Screwdriver",
		price: 19.99,
		department: "Hardware",
		color: "green",
		sales: 75,
		stock: 50
	},
	{
		name: "Wrench",
		price: 21.99,
		department: "Hardware",
		color: "orange",
		sales: 70,
		stock: 50
	}
]);

//////////////////////////
//	Updating Products
//////////////////////////

1;

db.products.update(
	{ department: "Hardware" },
	{ $set: { department: "Hardware Tools" } },
	{ multi: true }
);

2;

db.products.update(
	{ department: "Hardware Tools" },
	{ $inc: { price: 10 } },
	{ multi: true }
);

3;

db.products.update(
	{
		sales: { $lt: 50 },
		department: "Hardware Tools"
	},
	{ $set: { sales: 50 } },
	{ multi: true }
);

4;

db.products.update(
	{ department: "Hardware Tools" },
	{ $set: { department: "Hardware" } },
	{ multi: true }
);

5;

db.products.update(
	{ department: "Hardware" },
	{ $inc: { price: -10 } },
	{ multi: true }
);

6;

db.products.update(
	{
		sales: { $gt: 10 },
		department: "Hardware"
	},
	{ $set: { sales: 10 } },
	{ multi: true }
);

7;

db.products.update({ department: "Hardware" }, { $inc: { sales: 1 } });

//////////////////////////
//	Removing Products
//////////////////////////

1;

db.products.remove({ department: "Hardware" }, { justOne: true });

2;

db.products.remove({ department: "Hardware" });

//////////////////////////
//	Finding Products
//////////////////////////

1;

db.products.find({ stock: 0 }, { _id: 0, name: 1 });

2;

db.products.find({ price: { $lt: 100 } }, { _id: 0, stock: 1 });

3;

db.products.find(
	{
		$and: [{ price: { $gt: 100 } }, { price: { $lt: 1000 } }]
	},
	{ _id: 0, name: 1, color: 1, department: 1 }
);

4;

db.products.find({ color: "red" }, { _id: 0, name: 1 });

5;

db.products.find({ $or: [{ color: "red" }, { color: "blue" }] }, { id: 1 });

6;

db.products.find(
	{
		$and: [{ color: { $ne: "red" } }, { color: { $ne: "blue" } }]
	},
	{ _id: 0, name: 1 }
);

7;

db.products.find(
	{
		$and: [{ department: { $ne: "Sports" } }, { department: { $ne: "Games" } }]
	},
	{ _id: 0, name: 1 }
);

8;

db.products.find(
	{
		$and: [
			{ name: { $regex: /^F/, $options: "i" } },
			{ name: { $regex: /S$/, $options: "i" } }
		]
	},
	{ _id: 0, name: 1, price: 1 }
);

9;

db.products.find(
	{
		$where: "this.name.match(/^T/)"
	},
	{ _id: 0, name: 1 }
);

10;

db.products.find(
	{
		$where: "this.name.match(/^F/) || this.name.match(/s$/)"
	},
	{ _id: 0, name: 1 }
);

11;

db.products.find(
	{
		$where: "this.name.match(/^T/) && this.price < 100"
	},
	{ _id: 0, name: 1 }
);

12;

db.products.find(
	{
		$where:
			"(this.name.match(/^A/) && this.price >= 100) || (this.name.match(/^B/) && this.price <= 100)"
	},
	{ _id: 0, name: 1, prices: 1 }
);

//////////////////////////
//	Aggregation Pipeline
//////////////////////////

1;

db.products.aggregate([
	{ $group: { _id: "$department", totalSales: { $sum: "$sales" } } },
	{ $sort: { _id: 1 } }
]);

2;

db.products.aggregate([
	{ $group: { _id: "$department", totalSales: { $sum: "$sales" } } },
	{ $sort: { _id: 1 } }
]);

3;

db.products.aggregate([
	{ $match: { stock: 0 } },
	{ $group: { _id: "$department", "Out of Stock": { $sum: 1 } } },
	{ $sort: { _id: 1 } }
]);

//////////////////////////
//	   mapReduce
//////////////////////////

1;

db.products
	.mapReduce(
		function() {
			emit(this.color, 1);
		},
		function(keys, values) {
			return Array.sum(values);
		},
		{
			query: {},
			out: "Number of Products by Color"
		}
	)
	.find({});

2;

db.products
	.mapReduce(
		function() {
			emit(this.department, this.sales);
		},
		function(keys, values) {
			return Array.sum(values);
		},
		{ query: {}, out: "Total Revenue by Department" }
	)
	.find({});

3;

db.products
	.mapReduce(
		function() {
			emit(this.name, this.price * this.stock);
		},
		function(keys, values) {
			return Array.sum(values);
		},
		{ query: {}, out: "Total Revenue by Department" }
	)
	.find({});

4;

db.products
	.mapReduce(
		function() {
			emit(this.department, this.sales * this.price + this.price * this.stock);
		},
		function(keys, values) {
			return Array.sum(values);
		},
		{ query: {}, out: "Total Revenue by Department" }
	)
	.find({});

/////////////////////////////////////////////////
//	   Single-Purpose Aggregation Operations
/////////////////////////////////////////////////

1;

db.products.count();

2;

db.products.find({ stock: 0 }).count();

3;

db.products.find({ stock: 100 }).count();

4;

db.products.find({ stock: { $lte: 5 } }).count();

5;

db.products.distinct("department");

6;

db.products.distinct("color");

7;

