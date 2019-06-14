/*
Products Fields
----------------
name: String
price: Number
department: String
color: String
sales: Number
stock: Number
*/

// -----------------------------------------
// Inserting Products
// -----------------------------------------

// 1. Insert a product with the following properties
// name: "Hammer"
// price: 9.99
// department: "Hardware"
// color: "red"
// sales: 80
// stock: 50

db.products.insert({
  name: "Small Steel Bacon",
  price: 879,
  department: "Home",
  color: "indigo",
  sales: 1,
  stock: 91
});

// 2. Insert the following products in a single query
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
db.products.find( {department: "Hardware"} ).pretty();


// -----------------------------------------
// Updating Products
// -----------------------------------------
// Note for some of these you may have to refer to update operators like $min and $max.

// 1. Change the department of all products in the "Hardware" department to "Hardware Tools"
db.products.update(
  { department: "Hardware" },
  { $set: { department: "Hardware Tools" } },
  { multi: true }
);
db.products.find( {department: "Hardware Tools"} ).pretty();


// 2. Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price
db.products.update(
  { department: "Hardware Tools" },
  { $inc: { price: 10 } },
  { multi: true }
);
db.products.find( {department: "Hardware Tools"} ).pretty();


// 3. Update the sales of all the products in the "Hardware Tools" department to be at least 50
db.products.updateMany(
  { department: "Hardware Tools", sales: { $lt: 50 } },
  { $set: { sales: 50 } }
);
db.products.find( {department: "Hardware Tools"} ).pretty();


// 4. Change the department of all the products in the "Hardware Tools" department to be "Hardware" again
db.products.update(
  { department: "Hardware Tools" },
  { $set: { department: "Hardware" } },
  { multi: true }
);
db.products.find( {department: "Hardware"} ).pretty();


// 5. Change the price of all the products in the "Hardware" department to be $10 less than their current price
db.products.update(
  { department: "Hardware" },
  { $inc: { price: -10 } },
  { multi: true }
);
db.products.find( {department: "Hardware"} ).pretty();


// 6. Change the sales of all the products in the "Hardware" department to be at most 10
db.products.updateMany(
  { department: "Hardware", sales: { $gt: 10 } },
  { $set: { sales: 10 } }
);
db.products.find( {department: "Hardware"} ).pretty();


// 7. Update the first product in the "Hardware" department to have one more sale
db.products.update(
  { department: "Hardware" },
  { $inc: { sales: 1 } }
);
db.products.find( {department: "Hardware"} ).pretty();


// -----------------------------------------
// Removing Products
// -----------------------------------------

// 1. Remove the first product in the "Hardware" department
db.products.remove(
  { department: "Hardware" },
  { justOne: true }
);
db.products.find( {department: "Hardware"} ).pretty();


// 2. Remove all products in the "Hardware" department
db.products.remove(
  { department: "Hardware" }
);
db.products.find( {department: "Hardware"} ).pretty();


// -----------------------------------------
// Finding Products
// -----------------------------------------
// Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

// 1. Find the names of all the products that are out of stock
db.products.find({
  stock: { $lte: 0 },
},
  { _id:0, name:1 }
);


// 2. Find the stock count of all the products with a price below $100
db.products.find(
  { price: { $lt: 100 } },
  { _id:0, stock:1 }
);


// 3. Find the name, color and department of all the products with a price between $100 and $1000
db.products.find(
  { $and: [
    { price: { $gte: 100 } },
    { price: { $lte: 1000 } },
  ]},
  { _id:0, name:1, color:1, department:1 }
);


// 4. Find the names of all the red products
db.products.find(
  { color: 'red' },
  { _id:0, name:1 }
);


// 5. Find only the IDs of all the red and blue products
db.products.find(
  { $or: [
    { color: 'red' },
    { color: 'blue' }
  ]},
  { _id:1 }
);


// 6. Find the names of all the products that are not red or blue
db.products.find(
  { $nor: [
    { color: 'red' },
    { color: 'blue' }
  ]},
  { _id:0, name:1 }
);


// 7. Find the names of all the products that are not in the Sports or Games departments
db.products.find(
  { $nor: [
    { department: 'Sports' },
    { department: 'Games' }
  ]},
  { _id:0, name:1, department:1 }
);


// 8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case
db.products.find(
  { name: { $regex: /^F.*S$/i } },
  { _id:0, name:1 }
);


// 9. Using $where, find all the product names that begin with T
db.products.find(
  { $where: function(){ return (this.name >= 'T' && this.name < 'U') } },
  { _id:0, name:1 }
);


// 10. Using $where, find all the product names that begin with capital F or end with lowercase S
db.products.find(
  { $or: [
    { $where: "this.name.match(/^F/)" },
    { $where: "this.name.match(/s$/)" }
  ]},
  { _id:0, name:1 }
);


// 11. Using $where, find all the product names that begin with capital T and have a price less than $100
db.products.find(
  { $and: [
    { $where: "this.name.match(/^T/)" },
    { $where: "this.price < 100" },
  ]},
  { _id:0, name:1, price:1 }
);

// without where:
db.products.find(
  { $and: [
    { name: { $regex: /^T/ } },
    { price: { $lt: 100} }
  ]},
  { _id:0, name:1, price:1 }
);


// 12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with T and have a price of at most $100
db.products.find(
  { $or: [
    { $and: [
      { $where: "this.name.match(/^A/)" },
      { $where: "this.price >= 100" }
    ]},
    { $and: [
      { $where: "this.name.match(/^T/)" },
      { $where: "this.price <= 100" }
    ]}
  ]},
  { _id:0, name:1, price:1 }
);


// -----------------------------------------
// Aggregating Products
// -----------------------------------------

// With the Aggregation Pipeline
// For each of these challenges use the Aggregation Pipeline to create a query that returns the described results.

// 1. Find the total number of sales each department made and sort the results by the department name
db.products.aggregate([
  { $group: { _id: '$department', total_sales: { $sum: '$sales' } } },
  { $sort: { _id:1 } }
]);


// 2. Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name
db.products.aggregate([
  { $match: { price: { $gte: 100 } } },
  { $group: { _id: '$department', total_sales: { $sum: '$sales'}} },
  { $sort: { _id:1 } }
]);

// 3. Find the number of out of stock products in each department and sort the results by the department name
db.products.aggregate([
  { $match: { stock: 0 } },
  { $group: { _id: '$department', total_products: {$sum: 1} }},
  { $sort: { _id:1 } }
]);

// using group() -- though does not sort
db.products.group({
  // set up the department name as the key by which we'll group
  key: { department: 1 },
  // filter the results to only those that have a stock of 0
  cond: { stock: 0 },
  // for each grouped department, count the records
  reduce: function(current, result) { result.count += 1; },
  // set the initial count at 0
  initial: { count: 0 },
});


// With Map-Reduce
// For each of these challenges use the Map-Reduce to create a query that returns the described results.

// 1. Find the number of products for each color
db.products.mapReduce(
  // the map function:
  function() { emit(this.color, 1); }, // this points to this record
  // the reduce function:
  function(keys, values) { return Array.sum(values); },
  // the optional options object:
  {
    query: {}, // empty because we want to get all the records
    out: "product_totals_by_color" // the name we've given the result object
  }
).find();

db.products.count({color: 'azure'});


// 2. Find the total revenue of each department (how much did each department make in sales?)
db.products.mapReduce(
  function() { emit(this.department, this.price * this.sales); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "revenue_by_department"
  }
).find();


// 3. Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)
db.products.mapReduce(
  function() { emit(this.department, this.price * this.stock); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "potential_revenue_by_department"
  }
).find();


// 4. Find the sum of the total and potential revenue for each product
db.products.mapReduce(
  function() { emit(this.name, (this.price * this.sales) + (this.price * this.stock)); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "total_revenues_by_department"
  }
).find();


// With Single Purpose Aggregation Operations
// For each of these challenges use the Single Purpose Aggregation Operations to create a query that returns the described results.

// 1. How many products are there?
db.products.count({});


// 2. How many products are out of stock?
db.products.count({ stock: 0 });


// 3. How many products are fully stocked? (100)
db.products.count({ stock: { $gte: 100 } });


// 4. How many products are almost out of stock? (<= 5)
db.products.count({ stock: { $lte: 5 } });


// 5. What are all the unique names of all the departments?
db.products.distinct('department');


// 6. What are all the unique names of product colors?
db.products.distinct('color');


// 7. Find the total number of out of stock products for each department.
db.products.group({
  key: { department: 1 },
  cond: { stock: 0 },
  reduce: function(current, result) { result.count += 1; },
  initial: { count: 0 }
});
