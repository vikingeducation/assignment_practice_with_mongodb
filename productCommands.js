// A series of 

// INSERTING PRODUCTS
// Insert a hammer
db.products.insert({
   name: "Hammer",
   price: 9.99,
   department: "Hardware",
   color: "red",
   sales: 80,
   stock: 50
});

// Insert two products in a single query
var newProducts = [
   { name: "Screwdriver",
    price: 19.99,
    department: "Hardware",
    color: "green",
    sales: 75,
    stock: 50 },
   { name: "Wrench",
   price: 21.99,
   department: "Hardware",
   color: "orange",
   sales: 70,
   stock: 50 }
];

db.products.insert(newProducts);

// UPDATING PRODUCTS
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
      { department: "Hardware Tools" },
      { price: { $lt: 50 } } 
   ] },
   { $set: { price: 50 } },
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
   { $inc: { price: -10} },
   { multi: true }
);

// Change the sales of all the products in the "Hardware" department to be at most 10
db.products.update(
   { $and: [
      { department: "Hardware" },
      { price: { $gt: 10 } }
   ] },
   { $set: { price: 10} },
   { multi: true }
);

// Update the first product in the "Hardware" department to have one more sale
db.products.update(
   { department: "Hardware" },
   { $inc: { sales: 1} }
);

// REMOVING PRODUCTS 
// Remove the first product in the "Hardware" department
db.products.remove(
   { department: "Hardware" },
   { justOne: true }
);

// Remove all products in the "Hardware" department
db.products.remove(
   { department: "Hardware" }
);


// FINDING PRODUCTS 
// Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

// Find the names of all the products that are out of stock
db.products.find(
   { stock: 0 },
   { _id: 0, price: 0, department: 0, color: 0, sales: 0, stock: 0}
);

// Find the stock count of all the products with a price below $100
db.products.find(
      { price: { $lt: 100 } },
      { _id: 0, price: 0, department: 0, color: 0, sales: 0 }
);

// Find the name, color and department of all the products with a price between $100 and $1000
db.products.find({
   $and: [
      { price: { $lt: 1000 } },
      { price: { $gt: 100 } }
   ] },
   { id: 0, sales: 0, stock: 0, price: 0 }
);


// Find the names of all the red products
db.products.find(
   { color: "red" }, 
   { id: 0, sales: 0, color: 0, stock: 0, price: 0, department: 0 }
);

// Find only the IDs of all the red and blue products
db.products.find({
   $or: [
      { color: "red" },
      { color: "blue" }
   ] },
   { sales: 0, stock: 0, price: 0, department: 0, color: 0, name: 0 }
);

// Find the names of all the products that are not red or blue
db.products.find({
   $nor: [
      { color: "red" },
      { color: "blue" }
   ] },
   { _id: 0, sales: 0, stock: 0, price: 0, department: 0, color: 0 }
);


// Find the names of all the products that are not in the Sports or Games departments
db.products.find({
   $nor: [
      { department: "Sports" },
      { department: "Games" }
   ] },
   { _id: 0, sales: 0, stock: 0, price: 0, department: 0, color: 0 }
);

// Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case
db.products.find({
   $and: [
      { name: { $regex: /^f/, $options: 'i' } },
      { name: { $regex: /s$/, $options: 'i' } }
   ] },
   { _id: 0, sales: 0, stock: 0, department: 0, color: 0 }
);

// Using $where, find all the product names that begin with T
db.products.find(
   { $where: "this.name.charAt(0) === 'T'" },
   { _id: 0, sales: 0, stock: 0, department: 0, color: 0, price: 0 }
);

// Using $where, find all the product names that begin with capital F or end with lowercase S
// ??
db.products.find({
   $or: [ 
      { $where: "this.name.charAt(0) === 'F'" },
      { $where: "this.name.charAt(this.length - 1) === 's'" }
     ] }, 
   { _id: 0, sales: 0, stock: 0, department: 0, color: 0, price: 0 }
);

// Using $where, find all the product names that begin with capital T and have a price less than $100

// Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100


// AGGREGATING PRODUCTS
// With the Aggregation Pipeline
// For each of these challenges use the Aggregation Pipeline to create a query that returns the described results.

// Find the total number of sales each department made and sort the results by the department name

// Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

// Find the number of out of stock products in each department and sort the results by the department name


// With Map-Reduce
// For each of these challenges use the Map-Reduce to create a query that returns the described results.

// Find the number of products with each color

// Find the total revenue of each department (how much did each department make in sales?)

// Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)

// Find the sum of the total and potential revenue for each product


// With Single Purpose Aggregation Operations
// For each of these challenges use the Single Purpose Aggregation Operations to create a query that returns the described results.

// How many products are there?

// How many products are out of stock?

// How many products are fully stocked? (100)

// How many products are almost out of stock? (>= 5)

// What are all the unique names of all the departments?

// What are all the unique names of product colors?

// Find the total number of out of stock products for each department.
