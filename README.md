Dave Hail
Will Whitworth

# assignment_practice_with_mongodb


Querying with the MongoDB shell


## Getting Started

**IMPORTANT** don't run `__seeds__.js`. It is there only to generate `__products__.js` in the case that it **MUST** be regenerated. Regenerating that data will make query results different across instances of this assignment.


## Products

To get started import `__products__.js` into your MongoDB database with the following command:

```bash
$ mongoimport --db test --collection products --file __products__.js
```

1.

  db.products.insert({
    name: "Hammer",
    price: 9.99,
    department: "Hardware",
    color: "red",
    sales: 80,
    stock: 50
  });

2.

var products = [
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
];

db.products.insert(products);


Change the department of all products in the "Hardware" department to "Hardware Tools"


    db.products.update({
      department: "Hardware"},
      { $set: {department: "Hardware Tools"}},
      { multi: true }
      );

Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

    db.products.update({
      department: "Hardware Tools"},
      {$inc:{price:10}},
      { multi: true }
      );




Update the sales of all the products in the "Hardware Tools" department to be at least 50


db.products.update({
  department: "Hardware Tools"},
  {$max: {price: 50}},
  { multi: true }
  );


Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

db.products.update({
  department: "Hardware Tools"},
  {$set : {department:"Hardware"}},
  { multi: true }
  );




Change the price of all the products in the "Hardware" department to be $10 less than their current price

    db.products.update({
      department: "Hardware"},
      {$inc:{price:-10}},
      { multi: true }
      );

Change the sales of all the products in the "Hardware" department to be at most 10

    db.products.update({
      department: "Hardware"},
      {$min:{sales:10}},
      { multi: true }
    );


  Remove the first product in the "Hardware" department
    db.products.remove(
      {department:"Hardware"},
      {justOne: true}
      );
  Remove all products in the "Hardware" department

    db.products.remove(
      {department:"Hardware"}
      );

Find the names of all the products that are out of stock

    db.products.find(
      {stock : 0}
      ).pretty();

Find the stock count of all the products with a price below $100

    db.products.aggregate([
      { $match: {price: {$lt: 100}}},
      { $group: {_id: 'Stock Count', stock_count: { $sum: '$stock'}}},
      { $project: {_id:0, stock_count:1}}
    ]);

Find the name, color and department of all the products with a price between $100 and $1000

    db.products.find({
      price: {$gt: 100, $lt: 1000}
    });

Find the names of all the red products

    db.products.find({
      color: "red"
      });

Find only the IDs of all the red and blue products

    db.products.find({
      $or: [
       {color: "red"},
       {color: "blue"}
       ]
      });

Find the names of all the products that are not red or blue

    db.products.find({
      $and: [
       {color: {$ne: "red"}},
       {color: {$ne: "blue"}}
       ]
      });


Find the names of all the products that are not in the Sports or Games departments

  db.products.find({
    $and: [
     {department: {$ne: "Sports"}},
     {department: {$ne: "Games"}}
     ]
    });


Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

    db.products.find({
      $and: [
        { name: { $regex: /^F/ , $options: 'i'} },
        { name: { $regex: /S$/ , $options: 'i'} }
      ]
    });


Using $where, find all the product names that begin with T

    db.products.find({
      $where: "/^T/.test(this.name)"
    });


Using $where, find all the product names that begin with capital F or end with lowercase S

    db.products.find({
      $and: [
      { $where: "/^F/.test(this.name)" },
      { $where: "/s$/.test(this.name)" },
      ]
    });

Using $where, find all the product names that begin with capital T and have a price less than $100

    db.products.find({
      $and: [
      { $where: "/^B/.test(this.name)" },
      { $where: "this.price < 100" },
      ]
    });

Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100


    db.products.find{
      $or: [
        { $and: [
          { $where: "/^A/.test(this.name)" },
          { $where: "this.price >= 100" }
        ]},
        { $and: [
          { $where: "/^B/.test(this.name)" },
          { $where: "this.price <= 100" }
        ]}
      ]
    });

Aggregating

Find the total number of sales each department made and sort the results by the department name

    db.products.aggregate([{
      $group: { _ id: "$department", sum: { $sum: "$sales" } }
    }]);


Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

    db.products.aggregate([
      { $match: { price: {$gte: 100}}},
      { $group: { _ i d: "$department", sum: { $sum: "$sales" }}},
      { $sort: {_id:1} }
    ]);

Find the number of out of stock products in each department and sort the results by the department name

    db.products.aggregate([
      { $match: { stock: 0}},
      { $group: { _ id: "$department", sum: { $sum: 1 }}},
      { $sort: {_id:1} }
    ]);


Map-Reduce

Find the number of products with each color

    db.products.mapReduce(
      function() { emit(this.color, 1); },
      function(keys, values) { return Array.sum(values); },
      {
        query: {},
        out: "products by color"
      }
    ).find();

Find the total revenue of each department (how much did each department make in sales?)

db.products.mapReduce(
  function() { emit(this.department, this.sales * this.price); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "Sales by department"
  }
).find();


Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)

db.products.mapReduce(
  function() { emit(this.department, this.stock * this.price); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "Potential sales by department"
  }
).find();


Find the sum of the total and potential revenue for each product

db.products.mapReduce(
  function() { emit(this.department, this.stock * this.price + this.sales * this.price); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "Potential and actual sales by department"
  }
).find();


How many products are there?

db.products.count();

How many products are out of stock?

db.products.count({stock : 0});

How many products are fully stocked? (100)

db.products.count({stock : 100});

How many products are almost out of stock? (>= 5)

db.products.count({stock : {$lte:5}});

What are all the unique names of all the departments?

db.products.distinct('department');

What are all the unique names of product colors?

db.products.distinct('color');

Find the total number of out of stock products for each department using the db.collection.group() method

db.products.group({
  key: { department: ''},
  cond: { stock: 0 },
  reduce: function(cur, result) { result.count += 1; },
  initial: { count: 0 }
});




## Restaurants

Restaurant data is imported from the MongoDB test database provide [here](https://docs.mongodb.com/getting-started/shell/import-data/).

Import the data from the `__restaurants__.js` file.

```bash
$ mongoimport --db test --collection restaurants --file __restaurants__.js
```
