Insert a product with the following properties

name: "Hammer"
price: 9.99
department: "Hardware"
color: "red"
sales: 80
stock: 50

```javascript
db.products.insert({
  name: "Hammer",
  price: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});
```

Insert the following products in a single query

name: "Screwdriver"
price: 19.99
department: "Hardware"
color: "green"
sales: 75
stock: 50

name: "Wrench"
price: 21.99
department: "Hardware"
color: "orange"
sales: 70
stock: 50

```javascript
var products = [
  {name: "Screwdriver",
  price: 19.99,
  department: "Hardware",
  color: "green",
  sales: 75,
  stock: 50},
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
```

Note for some of these you may have to refer to update operators like $min and $max.
Change the department of all products in the "Hardware" department to "Hardware Tools"
db.products.find({department:'Hardware'});

```javascript
db.products.updateMany(
  { department: 'Hardware' },
  { $set: { department: 'Hardware Tools' } }
);
```

Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

```javascript
db.products.updateMany(
  { department: 'Hardware Tools'},
  { $inc: {price: 10}}
);
```

Update the sales of all the products in the "Hardware Tools" department to be at least 50

```javascript
db.products.updateMany(
  {$and: [
    { department: 'Hardware Tools' },
    { sales: { $lt: 50 } }
  ]},
  {$set: {sales: 50}}
);
```

Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

```javascript
db.products.updateMany(
  { department: 'Hardware Tools' },
  { $set: { department: 'Hardware' } }
);
```

Change the price of all the products in the "Hardware" department to be $10 less than their current price

```javascript
db.products.updateMany(
  { department: 'Hardware' },
  { $inc: { price: -10 } }
);
```

Change the sales of all the products in the "Hardware" department to be at most 10

```javascript
db.products.updateMany(
  {$and: [
    { department: 'Hardware'},
    { sales: { $gt: 10 } }
  ]},
  { $set: { sales: 10 } }
);
```

Update the first product in the "Hardware" department to have one more sale

```javascript
db.products.updateOne(
  { department: 'Hardware' },
  { $inc: { sales: 1 } }
);
```

Remove the first product in the "Hardware" department

```javascript
db.products.remove(
  { department: 'Hardware' },
  { justOne: 1 }
);
```

Remove all products in the "Hardware" department

```javascript
db.products.remove(
  { department: 'Hardware' }
);
```

Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

Find the names of all the products that are out of stock

```javascript
db.products.find(
  { stock: 0 },
  { _id: 0, name: 1 }
);
```

Find the stock count of all the products with a price below $100

```javascript
db.products.find(
  { price: { $lt: 100 } },
  { _id: 0, stock: 1 }
);
```

Find the name, color and department of all the products with a price between $100 and $1000

```javascript
db.products.find(
  { $and: [
    { price: { $gte: 100 } },
    { price: { $lte: 1000 } }
  ]},
  { _id: 0, name: 1, color: 1, department: 1 }
);
```

Find the names of all the red products

```javascript
db.products.find(
  { color: 'red' },
  { _id: 0, name: 1 }
);
```

Find only the IDs of all the red and blue products

```javascript
db.products.find(
  { $or: [
    { color: 'red' },
    { color: 'blue' }
  ]},
  { _id: 1 }
);
```

Find the names of all the products that are not red or blue

```javascript
db.products.find(
  { $nor: [
    { color: 'red' },
    { color: 'blue' }
  ]},
  { _id: 0, name: 1 }
);
```

Find the names of all the products that are not in the Sports or Games departments

```javascript
db.products.find(
  { $nor: [
    { department: 'Sports' },
    { department: 'Games' }
  ]},
  { _id: 0, name: 1 }
);
```

Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

```javascript
db.products.find(
  { name: { $regex: /^F.*S$/i }},
  { _id: 0, name: 1, price: 1 }
);
```

Using $where, find all the product names that begin with T

```javascript
db.products.find(
  { $where: "this.name[0] === 'T'" },
  { _id: 0, name: 1 }
);
```

Using $where, find all the product names that begin with capital F or end with lowercase S

```javascript
db.products.find(
  { $where: "this.name[0] === 'F' || this.name[this.name.length - 1] === 's'"},
  { _id: 0, name: 1 }
);
```

Using $where, find all the product names that begin with capital T and have a price less than $100

```javascript
db.products.find(
  { $where: "this.name[0] === 'T' && this.price < 100" },
  { _id: 0, name: 1 }
);
```

Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100

```javascript
db.products.find(
  { $or: [
    { $where: "this.name[0] === 'A' && this.price >= 100" },
    { $where: "this.name[0] === 'B' && this.price <= 100" }
  ]},
  { _id: 0, name: 1, price: 1 }
);
```

### Aggregating Products

Find the total number of sales each department made and sort the results by the department name

```javascript
db.products.aggregate([
  { $match: { department: { $ne: null } } },
  { $group: { _id: '$department', sales: { $sum: '$sales' }} },
  { $sort: { sales: 1 } }
]);
```

Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

```javascript
db.products.aggregate([
  { $match: { price: { $gte: 100 } } },
  { $group: { _id: '$department', sales: { $sum: '$sales' }} },
  { $sort: { sales: 1 } }
]);
```

Find the number of out of stock products in each department and sort the results by the department name

```javascript
db.products.aggregate([
  { $match: { stock: 0 } },
  { $group: { _id: '$department', outOfStock: { $sum: 1 }} },
  { $sort: { _id: 1 } }
]);

```

For each of these challenges use the Map-Reduce to create a query that returns the described results.

Find the number of products with each color
```javascript
db.products.mapReduce(
  function() { emit(this.color, 1); },
  function(keys, value) { return Array.sum(value); },
  {
    query: {},
    out: "colors"
  }
).find();

```
Find the total revenue of each department (how much did each department make in sales?)
```javascript
db.products.mapReduce(
  function() { emit(this.department, (this.price * this.sales)); },
  function(keys, value) { return Array.sum(value); },
  {
    query: {},
    out: "RevenuePerDepartment"
  }
).find();

```
Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)

```javascript
db.products.mapReduce(
  function() { emit(this.name, (this.price * this.stock)); },
  function(keys, value) { return Array.sum(value); },
  {
    query: {},
    out: "ProductPotentialRevenue"
  }
).find();
```

Find the sum of the total and potential revenue for each product
```javascript
db.products.mapReduce(
  function() { emit(this.name, (this.price * this.stock + this.price * this.sales)); },
  function(keys, value) { return Array.sum(value); },
  {
    query: {},
    out: "ProductPotentialRevenue"
  }
).find();
```

### Restaurants

Find the first 5 restaurants returning only the name

```javascript
db.restaurants.find(
  {},
  { _id: 0, name: 1 }
).limit(5);
```

Find the name of all restaurants with at least 1 grade of A or B

```javascript
db.restaurants.find(
  { $or: [
    { "grades.grade": 'A' },
    { "grades.grade": 'B' },
  ]},
  { _id: 0, name: 1 }
);
```

Find the name of all restaurants with at least 1 score above 20

```javascript
db.restaurants.find(
  { "grades.score": { $gt: 20 } },
  { _id: 0, name: 1 }
);

```

Find the unique types of cuisine in restaurants in the Bronx

```javascript
db.restaurants.distinct("cuisine");
```

Find all the names and addresses of all the spanish restaurants in Queens

```javascript
db.restaurants.find(
  { $and: [
    { cuisine: "Spanish" },
    { borough: "Queens" }
  ]},
  { _id: 0, name: 1, address: 1 }
);
```

Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

```javascript
db.restaurants.find(
  { $and: [
    { borough: 'Manhattan' },
    { $nor: [
      { cuisine: 'Bakery' },
      { cuisine: 'Spanish' },
      { cuisine: 'Italian' },
      { cuisine: 'Irish' },
    ]}
  ]},
  { _id: 0, name: 1, address: 1 }
);
```
