// -------------------
// Inserting products
// -------------------

// #1
db.products.insert(
  {
    name: 'Hammer',
    price: 999,
    department: 'Hardware',
    color: 'red',
    sales: 80,
    stock: 50
  }
);

// #2
var hardware = [
  {
    name: 'Screwdriver',
    price: 1999,
    department: 'Hardware',
    color: 'green',
    sales: 75,
    stock: 50
  },
  {
    name: 'Wrench',
    price: 2199,
    department: 'Hardware',
    color: 'orange',
    sales: 70,
    stock: 50
  }
];

db.products.insert(hardware);

// -------------------
// Updating products
// -------------------

// 1. Change the department of all products in the "Hardware" department to "Hardware Tools"
db.products.update(
  { department: 'Hardware' },
  { $set: { department: 'Hardware Tools' } },
  { multi: true }
);

// 2. Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price
db.products.update(
  { department: 'Hardware Tools' },
  { $inc: { price: 10 } },
  { multi: true }
);

// 3. Update the sales of all the products in the "Hardware Tools" department to be at least 50
db.products.update(
  { department: 'Hardware Tools' },
  { $max: { sales: 50 } },
  { multi: true }
);

// 4. Change the department of all the products in the "Hardware Tools" department to be "Hardware" again
db.products.update(
  { department: 'Hardware Tools' },
  { $set: { department: 'Hardware' } },
  { multi: true }
);

// 5. Change the price of all the products in the "Hardware" department to be $10 less than their current price
db.products.update(
  { department: 'Hardware' },
  { $inc: { price: -10 } },
  { multi: true }
);

// 6. Change the sales of all the products in the "Hardware" department to be at most 10
db.products.update(
  { department: 'Hardware' },
  { $min: { sales: 10 } },
  { multi: true }
);

// 7. Update the first product in the "Hardware" department to have one more sale
db.products.update(
  { department: 'Hardware' },
  { $inc: { sales: 1 } }
);

// -------------------
// Updating products
// -------------------

// 1. Remove the first product in the "Hardware" department
db.products.remove(
  { department: 'Hardware' },
  { justOne: true }
);

// 2. Remove all products in the "Hardware" department
db.products.remove({ department: 'Hardware' });

// -------------------
// Finding products
// -------------------

// 1. Find the names of all the products that are out of stock
db.products.find({ stock: 0 });

// 2. Find the stock count of all the products with a price below $100
db.products.find(
  { price: { $lt: 100 } },
  { _id: 0, stock: 1 }
);

// 3. Find the name, color and department of all the products with a price between $100 and $1000
db.products.find(
  { price: { $gte: 100, $lte: 1000 } },
  { _id: 0, name: 1, color: 1, department: 1 }
);

// 4. Find the names of all the red products
db.products.find(
  { color: { $regex: /^red/i } }, // mongo 3.4 allows 'i' modifier within regex
  { _id: 0, name: 1 }
);

// 5. Find only the IDs of all the red and blue products
db.products.find(
  {
    $or: [
      { color: { $regex: /^red/i } },
      { color: { $regex: /^blue/i } }
    ]
  },
  { _id: 1 }
);

// 6. Find the names of all the products that are not red or blue
db.products.find(
  {
    $and: [
      { color: { $ne: 'red' } },
      { color: { $ne: 'blue' } }
    ]
  },
  { _id: 0, name: 1 }
);

// 7. Find the names of all the products that are not in the Sports or Games departments
db.products.find(
  {
    $and: [
      { department: { $ne: { $regex: /^Sports/i } } },
      { department: { $ne: { $regex: /^Games/i } } }
    ]
  },
  { _id: 0, name: 1 }
);

// 8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case
db.products.find(
  {
    $and: [
      { name: { $regex: /^F/i } },
      { name: { $regex: /S$/i } }
    ]
  },
  { _id: 0, name: 1, price: 1 }
);

// 9. Using $where, find all the product names that begin with T
db.products.find(
  { $where: "this.name[0] === 'T'" },
  { _id: 0, name: 1 }
);

// 10. Using $where, find all the product names that begin with capital F or end with lowercase S
db.products.find(
  { $where: "this.name[0] === 'F' || this.name.slice(-1) === 's'" },
  { _id: 0, name: 1 }
);

// 11. Using $where, find all the product names that begin with capital T and have a price less than $100
db.products.find(
  { $where: 'this.name[0] === "T" && this.price < 100' },
  { _id: 0, name: 1 }
);

// 12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100
db.products.find(
  { $where: '(this.name[0] === "A" && this.price >= 100) || (this.name[0] === "B" && this.price <= 100)' },
  { _id: 0, name: 1, price: 1 }
);

// ----------------------------------
// Aggregating products with pipeline
// ----------------------------------

// 1. Find the total number of sales each department made and sort the results by the department name
db.products.aggregate([
  {
    $group: {
      _id: '$department',
      departmentSales: { $sum: '$sales' }
    }
  },
  {
    $sort: { department: 1 }
  }
]);

// 2. Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name
db.products.aggregate([
  { $match: { price: { $gte: 100 } } },
  {
    $group: {
      _id: '$department',
      productSales: { $sum: '$sales' }
    }
  },
  {
    $sort: { department: 1 }
  }
]);

// 3. Find the number of out of stock products in each department and sort the results by the department name
db.products.aggregate([
  { $match: { stock: 0 } },
  { $sort: { department: 1 } },
  { $group: { _id: '$department', productsNoStock: { $sum: 1 } } }
]);

// ------------------------------------
// Aggregating products with map-reduce
// ------------------------------------

// 1. Find the number of products with each color
db.products.mapReduce(
  function () {
    emit(this.color, 1);
  },
  function (k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

// 2. Find the total revenue of each department (how much did each department make in sales?)
db.products.mapReduce(
  function () {
    emit(this.department, (this.price * this.sales));
  },
  function (k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

// 3. Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)
db.products.mapReduce(
  function () {
    emit(this.name, this.price * this.stock);
  },
  function (k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

// 4. Find the sum of the total and potential revenue for each product
db.products.mapReduce(
  function () {
    var revenue = this.price * this.sales;
    var potentialRevenue = this.price * this.stock;

    emit(this.name, revenue + potentialRevenue);
  },
  function (k, v) {
    return v[0];
  },
  { out: { inline: 1 } }
);