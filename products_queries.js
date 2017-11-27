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


/*  --------- Inserting Products --------- */
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


/*  --------- Updating Products --------- */
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

// 7. Update the first product in the "Hardware" department to have one more sale
db.products.update(
  { department: "Hardware" },
  { $inc: { sales: 1 } }
);
db.products.find( {department: "Hardware"} ).pretty();

/*  --------- Removing Products --------- */
// 1. Remove the first product in the "Hardware" department

// 2. Remove all products in the "Hardware" department


/*  --------- Finding Products --------- */
// Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

// 1. Find the names of all the products that are out of stock

// 2. Find the stock count of all the products with a price below $100

// 3. Find the name, color and department of all the products with a price between $100 and $1000

// 4. Find the names of all the red products

// 5. Find only the IDs of all the red and blue products

// 6. Find the names of all the products that are not red or blue

// 7. Find the names of all the products that are not in the Sports or Games departments

// 8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

// 9. Using $where, find all the product names that begin with T

// 10. Using $where, find all the product names that begin with capital F or end with lowercase S

// 11. Using $where, find all the product names that begin with capital T and have a price less than $100

// 12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100


/*  --------- Aggregating Products --------- */

// With the Aggregation Pipeline
// For each of these challenges use the Aggregation Pipeline to create a query that returns the described results.

// 1. Find the total number of sales each department made and sort the results by the department name

// 2. Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

// 3. Find the number of out of stock products in each department and sort the results by the department name


// With Map-Reduce
// For each of these challenges use the Map-Reduce to create a query that returns the described results.

// 1. Find the number of products with each color

// 2. Find the total revenue of each department (how much did each department make in sales?)

// 3. Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)

// 4. Find the sum of the total and potential revenue for each product


// With Single Purpose Aggregation Operations
// For each of these challenges use the Single Purpose Aggregation Operations to create a query that returns the described results.

// 1. How many products are there?

// 2. How many products are out of stock?

// 3. How many products are fully stocked? (100)

// 4. How many products are almost out of stock? (>= 5)

// 5. What are all the unique names of all the departments?

// 6. What are all the unique names of product colors?

// 7. Find the total number of out of stock products for each department.
