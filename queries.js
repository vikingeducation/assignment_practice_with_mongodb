//INsert 1)
db.products.insert({
  name: "Hammer",
  price: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});

//2)
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

//Update 1)

db.products.update(
  { department: "Hardware" },
  { $set: { department: "Hardware Tools" } },
  { multi: true }
);

//2)

db.products.update(
  { department: "Hardware Tools" },
  { $inc: { price: 10 } },
  { multi: true }
);

//3) Update the sales of all the products in the "Hardware Tools" department to be at least 50

db.products.update(
  {
    $and: [{ department: "Hardware Tools" }, { sales: { $lt: 50 } }]
  },
  { $set: { sales: 50 } },
  { multi: true }
);

//4)Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

db.products.update(
  { department: "Hardware Tools" },
  { $set: { department: "Hardware" } },
  { multi: true }
);

//5)Change the price of all the products in the "Hardware" department to be $10 less than their current price

db.products.update(
  { department: "Hardware" },
  { $inc: { price: -10 } },
  { multi: true }
);

//6) Change the sales of all the products in the "Hardware" department to be at most 10

db.products.update(
  { department: "Hardware", sales: { $gt: 10 } },
  { $set: { sales: 10 } },
  { multi: true }
);

//7) Update the first product in the "Hardware" department to have one more sale

db.products.update({ department: "Hardware" }, { $inc: { sales: 1 } });

//Remove 1) Remove the first product in the "Hardware" department

db.products.remove(
  { department: "Hardware" }, 
  { justOne: true }
);


//2) remmove all

db.products.remove(
  { department: "Hardware" }, 
  { justOne: false }
);

//Finding Products 
//1)Find the names of all the products that are out of stock

db.products.find(
  { stock: 0 }, 
  { _id: 0, stock:1, name:1 }
);

//2) Find the stock count of all the products with a price below $100

db.products.find(
  { price: {$lt: 100 }}, 
  { _id: 0, stock:1, name:1, price:1 }
);

//3) Find the name, color and department of all the products with a price between $100 and $1000

db.products.find(
  { price: {$gt: 100, $lt: 1000 }}, 
  { _id: 0, color:1, name:1, department:1 }
).pretty();


//4) Find the names of all the red products

db.products.find(
  { color: "red"}, 
  { _id: 0, name:1}
).pretty();

//5) Find only the IDs of all the red and blue products
//Logic and English have different semantics for 'and' & 'or'
db.products.find(
{$or: [
  { color: "red"}, 
  {color: "blue"}
]},
  { _id: 1}
).pretty();

//6) Find the names of all the products that are not red or blue

db.products.find(
{$and: [
  { color: {$ne:"red"}}, 
  {color: {$ne:"blue"}}
]},
  { _id: 0, name:1}
).pretty();

//7) Find the names of all the products that are not in the Sports or Games departments

db.products.find(
{$and: [
  {department: {$ne:"Sports"}}, 
  {department: {$ne:"Games"}}
]},
  { _id: 0, name:1}
).pretty();

//8) Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

db.products.find(
{$and: [
  {name: {$regex:/^F/i}}, 
  {name: {$regex:/S$/i}}
]},
  { _id: 0, name:1, price:1}
).pretty();

//9) Using $where, find all the product names that begin with T

db.products.find(
  {$where: `this.name[0] = "T"`},
  {_id:0, name:1}
).pretty();

//10) Using $where, find all the product names that begin with capital F or end with lowercase S

db.products.find(
  {$where: `this.name.match(/^F.+s$/)`},
  {_id:0, name:1}
).pretty();


//11) Using $where, find all the product names that begin with capital T and have a price less than $100

db.products.find(
  {$where: `this.name.match(/^T/) && this.price<100`},
  {_id:0, name:1}
).pretty();

//12) Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100

db.products.find(
  {$where: `(this.name.match(/^A/) && this.price>=100) || (this.name.match(/^B/) && this.price<=100)`},
  {_id:0, name:1, price:1}
).pretty();


//Agregation
//1) Find the total number of sales each department made and sort the results by the department name

db.products.aggregate([
  {$group: {_id: '$department', total_sales: {$sum: "$sales"}}},
  {$sort: {_id: 1}}
]).pretty();


//2) Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

db.products.aggregate([
  {$match: {price: {$gte: 100}}},
  {$group: {_id: '$department', total_sales: {$sum: "$sales"}}},
  {$sort: {_id: 1}}
]).pretty();

db.products.aggregate([
  {$group: {_id: '$department', total_sales: {$sum: "$sales"}}},
  {$sort: {_id: 1}}
]).pretty();

//3) Find the number of out of stock products in each department and sort the results by the department name

db.products.aggregate([
  {$match: {stock: 0}},
  {$group: {_id: '$department', Out_Of_Stock_Products: {$sum: 1}}},
  {$sort: {_id: 1}}
]).pretty();



//Map-Reduce
//1)Find the number of products with each color

db.products.mapReduce(
  function() {emit(this.color, 1);},
  function(key, values) {return Array.sum(values)},
  {
    query: {},
    out: "product_total_by_color"
  }
).find({}).pretty();


//2) Find the total revenue of each department (how much did each department make in sales?)

db.products.mapReduce(
  function() {emit(this.department, (this.price*this.sales));},
  function(key, values) {return Array.sum(values)},
  {
    query: {},
    out: "total_revenue_by_department"
  }
).find({}).pretty();



//3) Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)

db.products.mapReduce(
  function() {emit(this.name, (this.price*this.stock));},
  function(key, values) {return Array.sum(values)},
  {
    query: {},
    out: "potential_revenue_by_product"
  }
).find({}).pretty();


//4) Find the sum of the total and potential revenue for each product

db.products.mapReduce(
  function() {emit(this.name, this.price*(this.stock+this.sales));},
  function(key, values) {return Array.sum(values)},
  {
    query: {},
    out: "Actual_plus_potential_revenue_by_product"
  }
).find({}).pretty();


//With Single Purpose Aggregation Operations
//1) How many products are there?
db.products.count();

//2) How many products are out of stock?

db.products.find(
  {stock:0}
).count();

//3)How many products are fully stocked? (100)

db.products.find(
  {stock:0}
).count();


//4) How many products are almost out of stock? (>= 5)

db.products.find(
  {stock: {$lte:5}}
).count();


//5) What are all the unique names of all the departments?

db.products.distinct('department')


//6) What are all the unique names of product colors?

db.products.distinct('color')

//7) Find the total number of out of stock products for each department using the db.collection.group() method

db.products.group()




