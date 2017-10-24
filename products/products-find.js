//
// The Products Database
// ==================
// Finding Products

// Find the names of all the products that are out of stock

db.products.find({ stock: 0 }).pretty();

//Find the stock count of all the products with a price below $100

db.products.find({ price: { $lt: 100 } }).pretty();

//Find the name, color and department of all the products
//with a price between $100 and $1000

db.products.find(
	{ $and: [{ price: { $gte: 100 } }, { price: { $lte: 1000 } }] },
	{
		_id: 0,
		name: 1,
		color: 1
	}
);

// Find the names of all the red products

db.products.find(
	{ color: "pink" },
	{
		_id: 0,
		name: 1,
		color: 1
	}
);

// LOL
// { "name" : "Generic Concrete Sausages", "color" : "pink" }
// { "name" : "Awesome Concrete Bike", "color" : "pink" }
// { "name" : "Ergonomic Cotton Bike", "color" : "pink" }
// { "name" : "Practical Steel Hat", "color" : "pink" }
// { "name" : "Intelligent Rubber Bacon", "color" : "pink" }
// { "name" : "Tasty Steel Mouse", "color" : "pink" }
// { "name" : "Gorgeous Cotton Chips", "color" : "pink" }
// { "name" : "Ergonomic Cotton Salad", "color" : "pink" }
// { "name" : "Gorgeous Granite Cheese", "color" : "pink" }

// Find only the IDs of all the red and blue products

db.products.find(
	{
		$or: [{ color: "red" }, { color: "blue" }]
	},
	{
		_id: 1
	}
);

// Find the names of all the products that are not red or blue

db.products.find(
	{
		$nor: [{ color: "red" }, { color: "blue" }]
	},
	{
		_id: 0,
		name: 1
	}
);

// Find the names of all the products that are not in the
// Sports or Games departments

db.products.find(
	{
		$nor: [{ department: "Sports" }, { department: "Games" }]
	},
	{
		_id: 0,
		name: 1
	}
);

// Find the name and price of all the products with names that
// begin with the letter F and end with the letter S and ignore case

db.products.find(
	{
		$and: [
			{ name: { $regex: /^F/, $options: "i" } },
			{ name: { $regex: /S$/, $options: "i" } }
		]
	},
	{
		_id: 0,
		name: 1
	}
);

// Using $where, find all the product names that begin with T

db.products.find(
	{
		$where: "/^T/i.test(this.name)"
	},
	{
		_id: 0,
		name: 1
	}
);

// Using $where, find all the product names that begin with
// capital F or end with lowercase S

db.products.find(
	{
		$and: [
			{ $where: "/^F/.test(this.name)" },
			{ $where: "/s$/.test(this.name)" }
		]
	},
	{
		_id: 0,
		name: 1
	}
);

// Using $where, find all the product names that begin with
// capital T and have a price less than $100

db.products.find(
	{
		$and: [{ $where: "/^T/.test(this.name)" }, { $where: "this.price < 100" }]
	},
	{
		_id: 0,
		name: 1,
		price: 1
	}
);

// Using $where, find all the product names and prices of
// products that either start with A and have a price of at
// least $100 or start with B and have a price of at most $100

db.products.find(
	{
		$or: [
			{
				$and: [
					{ $where: "/^A/i.test(this.name)" },
					{ $where: "this.price >= 100" }
				]
			},
			{
				$and: [
					{ $where: "/^B/i.test(this.name)" },
					{ $where: "this.price <= 100" }
				]
			}
		]
	},
	{
		_id: 0,
		name: 1,
		price: 1
	}
);

//there are no products that start with "B"
db.products.find({ $where: "/^B/i.test(this.name)" });
