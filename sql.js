// The Products Database
// =====================

// The products database is a collection of products each with fields of:

// name: String
// price: Number
// department: String
// color: String
// sales: Number
// stock: Number
// The sales are the number of times that particular product has been sold. The stock is the number of units in stock of that product.

// To get started import __products__.js into your MongoDB database with the following command:

// $ mongoimport --db test --collection products --file __products__.js



// Inserting Products
// ==================

// Insert a product with the following properties

// name: "Hammer"
// price: 9.99
// department: "Hardware"
// color: "red"
// sales: 80
// stock: 50

db.products.insert({
	name: "Hammer",
	price: 9.99,
	department: "Hardware",
	color: "red",
	sales: 80,
	stock: 50
});


// Insert the following products in a single query

// -
// name: "Screwdriver"
// price: 19.99
// department: "Hardware"
// color: "green"
// sales: 75
// stock: 50
// -
// name: "Wrench"
// price: 21.99
// department: "Hardware"
// color: "orange"
// sales: 70
// stock: 50

db.products.insertMany([
	{name: "Screwdriver", price: 19.99, department: "Hardware", color: "green", sales: 75, stock: 50},
	{name: "Wrench", price: 21.99, department: "Hardware", color: "orange", sales: 70, stock: 50}
]);



// Updating Products
// =================

// Note for some of these you may have to refer to update operators like $min and $max.

// Change the department of all products in the "Hardware" department to "Hardware Tools"
db.products.update(
	{ department: "Hardware" }, 
	{ $set: { department: "Hardware Tools" } },
	{ multi: true }
);

// Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price
db.products.update(
	{ department: "Hardware Tools" }, 
	{ $inc: { price: 10 } },
	{ multi: true }
);

// Update the sales of all the products in the "Hardware Tools" department to be at least 50
db.products.update(
	{ $and: [
		{ department: "Hardware Tools"}, 
		{ sales: { $lt: 50 } }
	]}, 
	{ $set: { sales: 50 } },
	{ multi: true }
);

// Change the department of all the products in the "Hardware Tools" department to be "Hardware" again
db.products.update(
	{ department: "Hardware Tools" }, 
	{ $set: { department: "Hardware" } },
	{ multi: true }
);


// Change the price of all the products in the "Hardware" department to be $10 less than their current price
db.products.update(
	{ department: "Hardware" }, 
	{ $inc: { price: -10 } },
	{ multi: true }
);

// Change the sales of all the products in the "Hardware" department to be at most 10
db.products.update(
	{ $and: [
		{ department: "Hardware"}, 
		{ sales: { $gt: 10 } }
	]}, 
	{ $set: { sales: 10 } },
	{ multi: true }
);


// Update the first product in the "Hardware" department to have one more sale
db.products.update(
	{ department: "Hardware" }, 
	{ $inc: { sales: 1 } }
);



// Removing Products
// =================

// Remove the first product in the "Hardware" department
db.products.remove({ department: "Hardware" }, { justOne: true });

// Remove all products in the "Hardware" department
db.products.remove({ department: "Hardware" });



// Finding Products
// ================

// Note that you should use projection for these queries to filter the returned fields to only those
// fields described in each problem.

// Find the names of all the products that are out of stock
db.products.find({ stock: 0 }, { name: 1, _id: 0 });

// Find the stock count of all the products with a price below $100
db.products.find({ price: { $lt: 100 }}, { stock: 1, _id: 0 });

// Find the name, color and department of all the products with a price between $100 and $1000
db.products.find({ price: { $lt: 1000, $gte: 100 }}, { name: 1, color: 1, department: 1, _id: 0 });

// Find the names of all the red products
db.products.find({ color: "red" }, { name: 1, _id: 0 });

// Find only the IDs of all the red and blue products
db.products.find({ color: { $in: ["red", "blue"] } }, { _id: 1 });

// Find the names of all the products that are not red or blue
db.products.find({ color: { $nin: ["red", "blue"] } }, { _id: 0, name: 1 });

// Find the names of all the products that are not in the Sports or Games departments
db.products.find({ department: { $nin: ["Sports", "Games"] } }, { name: 1, _id: 0 });

// Find the name and price of all the products with names that begin with the letter F and 
// end with the letter S and ignore case
db.products.find({ name: { $regex: /^F.*S$/, $options: 'i' } }, { name: 1, price: 1, _id: 0});

// Using $where, find all the product names that begin with T
db.products.find({ $where: "this.name[0] === 'T'" }, { name: 1, _id: 0 });

// Using $where, find all the product names that begin with capital F or end with lowercase S
db.products.find(
  { $where: "this.name[0] === 'F' || this.name[this.name.length - 1] === 's'" },
  { name: 1, _id: 0 }
);

// Using $where, find all the product names that begin with capital T and have a price less than $100
db.products.find({ $where: "this.name[0] === 'T' && this.price < 100" }, { name: 1, _id: 0 });

// Using $where, find all the product names and prices of products that either start with A 
// and have a price of at least $100 or start with B and have a price of at most $100
db.products.find(
  { $or: [
    { $and: [
      { $where: "this.price >= 100" },
      { name: { $regex: /^A/ } }
     ]
    },  
    { $and: [
      { $where: "this.price <= 100" },
      { name: { $regex: /^B/ } }
      ]
    }
  ]}, { name: 1, price: 1,  _id: 0}
);



// Aggregating Products
// ====================

// With the Aggregation Pipeline
// =============================
// For each of these challenges use the Aggregation Pipeline to create a query that returns the described results.

// Find the total number of sales each department made and sort the results by the department name
db.products.aggregate([
	{ $group: { _id: "$department", sum: { $sum: "$sales" } } }, 
	{ $sort: { _id: 1 } }
]);

// Find the total number of sales each department made of a product with a price of at least $100 and 
// sort the results by the department name
db.products.aggregate([
  { $match: { price: { $gte: 100 } } },
  { $group: { _id: "$department", sum: { $sum: "$sales" } } },
  { $sort: { _id: 1 } }
]);

// Find the number of out of stock products in each department and sort the results by the department name
db.products.aggregate([
  { $match: { stock: 0 } },
  { $group: { _id: "$department", sum: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);



// With Map-Reduce
// ===============
// For each of these challenges use the Map-Reduce to create a query that returns the described results.

// Find the number of products with each color
db.products.mapReduce(
  function() { emit(this.color, this.stock); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "number_product_by_colors"
  }
).find();

// Find the total revenue of each department 
// (how much did each department make in sales?)
db.products.mapReduce(
  function() { emit(this.department, this.sales); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "total_sales_by_department"
  }
).find();

// Find the potential revenue of each product 
// (how much can each product make if the entire remaining stock is sold?)
db.products.mapReduce(
  function() { emit( this.name, (this.stock * this.price) ); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "potential_revenue_by_product"
  }
).find();


// Find the sum of the total and potential revenue for each product
db.products.mapReduce(
  function() { emit( this.name, (this.sales + (this.stock * this.price)) ); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "sum_total_and_potential_revenue_by_product"
  }
).find();



// With Single Purpose Aggregation Operations
// ==========================================
// For each of these challenges use the Single Purpose Aggregation Operations to create a query that returns the described results.

// How many products are there?
db.products.count();

// How many products are out of stock?
db.products.count({ stock: 0 });

// How many products are fully stocked? (100)
db.products.count({ stock: 100 });

// How many products are almost out of stock? (>= 5)
db.products.count({ stock: { $lte: 5 } });

// What are all the unique names of all the departments?
db.products.distinct('department');

// What are all the unique names of product colors?
db.products.distinct('colors');

// Find the total number of out of stock products for each department.
db.products.group({
  key: { department: 1 },
  cond: { stock: 0 },
  reduce: function(cur, result) { result.count += 1; },
  initial: { count: 0 }
});



// The MongoDB Restaurants Database
// ================================
// Import the data from the __restaurants__.js file.

// $ mongoimport --db test --collection restaurants --file __restaurants__.js

// to get column names in restaurants
// mr = db.runCommand({
//   "mapreduce" : "restaurants",
//   "map" : function() {
//     for (var key in this) { emit(key, null); }
//   },
//   "reduce" : function(key, stuff) { return null; }, 
//   "out": "restaurants" + "_keys"
// })
// db[mr.result].distinct("_id");

// result:

// [
// 	"_id",
// 	"address" : {
// 		"building",
// 		"coord",
// 		"street",
// 		"zipcode"
// 	},
// 	"borough",
// 	"cuisine",
// 	"grades":
// 		{
// 			"date",
// 			"grade",
// 			"score"
// 		},
// 	"name",
// 	"restaurant_id"
// ]

// Finding Restaurants
// ===================
// Note that you should use projection for these queries to filter the returned fields 
// to only those fields described in each problem.
// Note that queries from these point on may require you to use field path syntax 
// which can be done using dot syntax like this "grades.grade" or "$grades.grade". 
// This is done to target nested documents.

// Find the first 5 restaurants returning only the name
db.restaurants.find({}, { name: 1, _id: 0 }).limit(5);

// Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find({ "grades.grade": { $in: ['A', 'B'] } }, { name: 1, _id: 0 });

// Find the name of all restaurants with at least 1 score above 20
db.restaurants.find({ "grades.score": { $gte: 20 } }, { name: 1, _id: 0 });

// Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct("cuisine", {borough: "Bronx"});

// Find all the names and addresses of all the Spanish restaurants in Queens
db.restaurants.find(
	{ cuisine: 'Spanish', borough: 'Queens' }, 
	{ name: 1, address: 1, _id: 0 }
);

// Find all the names and addresses of all the restaurants in Manhattan that are not 
// a Bakery, Spanish, Italian or Irish
db.restaurants.find(
  { cuisine: { $nin: ['Bakery','Spanish', 'Italian', 'Irish'] }, borough: 'Manhattan' },   
  { name: 1, address: 1, _id: 0 }
);

// Find the name and address of the first alphabetically named Asian restaurant a grade of A
db.restaurants.aggregate([
  { $match: {cuisine: 'Asian', "grades.grade": 'A' } },   
  { $sort: { name: 1 } },
  { $limit: 1 },
  { $project: { name: 1, address: 1, _id: 0 }}
]);



// Aggregating Restaurants
// =======================

// List the number of restaurants under each zipcode
db.restaurants.aggregate([{ $group: { _id: "$address.zipcode", sum: { $sum: 1 } } }]);

// List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.distinct('name', { "grades.grade": { $in: ['A', 'B'] } }).sort().reverse();



// Aggregating Restaurants with $unwind (Optional)
// ===============================================

// $unwinding Restaurant Grades

// Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:

// Sum the scores for each restaurant
db.restaurants.aggregate([
	{ $unwind: "$grades" },
  { $group: { _id: "$name", sum_of_scores: { $sum: "$grades.score" } } },
  { $project: { _id: 1, sum_of_scores: 1} }
]);

// Sum the scores for each restaurant show only restaurants with scores above 50
db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$name",  sum_of_scores: { $sum: "$grades.score" } } },
  { $match: { sum_of_scores: { $gt: 50 } } },
  { $project: { _id: 1, sum_of_scores: 1 } }
]);

// Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"
db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $match: { "grades.grade": { $ne: "Not Yet Graded" } } },
  { $group: { _id: { name: "$name", grade: "$grades.grade" }, count: { $sum: 1 } } },
  { $project: { _id: 1, name: 1, grade: 1, count: 1 } },
  { $sort: { _id: 1 } }
]);

// Show a count of each grade for each restaurant excluding entries with only 1 grade
db.restaurants.aggregate([
	{ $unwind: "$grades" },
  { $match: { grades: { $ne: { $size: 1 } } } },
  { $group: { _id: {  name: "$name", grade: "$grades.grade" }, count: { $sum: 1 } } },
  { $project: { _id: 1, name: 1, grade: 1, count: 1 } },
  { $sort: { _id: 1 } }
]);

