// answers.js
//
// Inserting products
//

// Insert a product with the following properties
db.products.insert({
  name: "Hammer",
  price: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});

db.products.insert([
{ name: "Screwdriver",
  price: 19.99,
  department: "Hardware",
  color: "green",
  sales: 75,
  stock: 50},
  {name: "Wrench",
  price: 21.99,
  department: "Hardware",
  color: "orange",
  sales: 70,
  stock: 50}]
);
// 1. Change the department of all products in the "Hardware"
// department to "Hardware Tools"
db.products.update({department: "Hardware"}, { $set: {department: "Hardware Tools"}}, {multi: true})

// 2. Change the price of all products in the "Hardware Tools"
// department to cost $10 more than their current price
db.products.update({}, { $inc: { price: 10}}, {multi: true})

// 3. Update the sales of all the products in the "Hardware Tools"
// department to be at least 50
db.products.update({department: "Hardware Tools", sales: {$lt: 50}}, {$set: {sales: 50}}, {multi:true});

// 4. Change the department of all the products in the "Hardware Tools"
// department to be "Hardware" again
db.products.update({department: "Hardware Tools"}, { $set: {department: "Hardware"}}, {multi: true})

// 5. Change the price of all the products in the "Hardware" department
// to be $10 less than their current price
db.products.update({department: "Hardware"}, {$inc: {price: -10}}, {multi: true});

// 6. Change the sales of all the products in the "Hardware" department
// to be at most 10
db.products.update({department: "Hardware", sales: {$gt: 10}}, {$set: {sales: 10}}, {multi:true});

// 7. Update the first product in the "Hardware" department to have one more sale
db.products.update({department: "Hardware"}, {$inc: {sale: 1}});

//
// Removing Products
//
// 1. Remove the first product in the "Hardware" department
db.products.remove({department: "Hardware"}, {justOne: true});
// 2. Remove all products in the "Hardware" department
db.products.remove({department: "Hardware"});


//
// Finding Products
//
// Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

// 1 Find the names of all the products that are out of stock
db.products.find({stock: 0});

// 2 Find the stock count of all the products with a price below $100
db.products.find({price: {$lt: 100}}, {_id: 0, name: 1, stock: 1});

// 3 Find the name, color and department of all the products
// with a price between $100 and $1000
db.products.find({price: {$lt: 1000, $gt: 100}}, {_id: 0, name: 1, color: 1, department: 1});

// 4 Find the names of all the red products
db.products.find({color: "red"}, {_id: 0, name: 1});

// 5 Find only the IDs of all the red and blue products
db.products.find({$or: [{color: "red"}, {color: "red"}]}, {_id: 1})

// 6 Find the names of all the products that are not red or blue
db.products.find({$or: [{color: {$ne: "red"}}, {color: {$ne: "red"}}]}, {_id: 0, name: 1})

// 7 Find the names of all the products that are not in the Sports
// or Games departments
db.products.find({$or: [{department: {$ne: "Sports"}}, {department: {$ne: "Games"}}]}, {_id: 0, name: 1})

// 8 Find the name and price of all the products with names that
// begin with the letter F and end with the letter S and ignore case
db.products.find({name: { $regex: /^f.*s\b/, $options: 'i' }}, {_id: 0, name: 1});

// 9 Using $where, find all the product names that begin with T
db.products.find({$where: "this.name[1] = 'T'"});

// 10 Using $where, find all the product names that begin with capital
// F or end with lowercase S

// 11 Using $where, find all the product names that begin
// with capital T and have a price less than $100


// 12 Using $where, find all the product names and prices of products
// that either start with A and have a price of at least $100 or start
// with B and have a price of at most $100

//
// Aggregating Products
//
// With the Aggregation Pipeline
//
// For each of these challenges use the Aggregation Pipeline to create a query that returns the described results.

// 1 Find the total number of sales each department made and sort
// the results by the department name
db.products.aggregate([{$group: { _id: "$department", sum: { $sum:
"$sales"}}}]);
// 2 Find the total number of sales each department made of a
// product with a price of at least $100 and sort the results
// by the department name
db.products.aggregate([
  { $match: {price: { $gte: 100}}},
  { $group: { _id: "$department", sum: { $sum:
  "$sales"}}},
  { $sort: { _id: 1 } }
])
// 3 Find the number of out of stock products in
// each department and sort the results by
// the department name
db.products.aggregate([
  { $match: { stock: 0}},
  { $group: { _id: "$department", sum: { $sum: 1}}},
  { $sort: { _id: 1}}
])
db.products.find({
  $and: [
    {stock: 0},
    {department: "Beauty"}
  ]
});

//
// With Map-Reduce
//
// For each of these challenges use the Map-Reduce to create a query that returns the described results.

// 1 Find the number of products with each color
db.products.mapReduce(
  function() { emit(this.color, this.stock);},
  function(keys, values) { return Array.sum(values);},
  {
    query: {},
    out: "product_totals_by_color"
  }
).find();

// 2 Find the total revenue of each department (how much did each
//   department make in sales?)
db.products.mapReduce(
  function() { emit(this.department, this.sales, this.price);},
  function(key, values) {return Array.sum(values)},
  {
    query: {},
    out: "sales_totals_by_department"
  }
).find();

// 3 Find the potential revenue of each product (how much can each
//   product make if the entire remaining stock is sold?)
// 4 Find the sum of the total and potential revenue for each product
// 5 With Single Purpose Aggregation Operations


// For each of these challenges use the Single Purpose Aggregation Operations to create a query that returns the described results.

// 1 How many products are there?
// 2 How many products are out of stock?
// 3 How many products are fully stocked? (100)
// 4 How many products are almost out of stock? (>= 5)
// 5 What are all the unique names of all the departments?
// 6 What are all the unique names of product colors?
// 7 Find the total number of out of stock products for each department.
