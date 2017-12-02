### Inserting Products

1. Insert a product with the following properties
* name: "Hammer"
* price: 9.99
* department: "Hardware"
* color: "red"
* sales: 80
* stock: 50

```
db.products.insertOne(
	{name: "Hammer", price: 9.99, department: "Hardware", color: "red", sales: 80, stock:50 }
);
```

2. Insert the following products in a single query
* name: "Screwdriver"
* price: 19.99
* department: "Hardware"
* color: "green"
* sales: 75
* stock: 50


* name: "Wrench"
* price: 21.99
* department: "Hardware"
* color: "orange"
* sales: 70
* stock: 50

```
db.products.insertMany([
	{name: "Hammer", price: 9.99, department: "Hardware", color: "red", sales: 80, stock:50 }, 
	{name: "Hammer", price: 9.99, department: "Hardware", color: "red", sales: 80, stock:50 }
]);
```

### Updating Products

Note for some of these you may have to refer to update operators like $min and $max.

1. Change the department of all products in the "Hardware" department to "Hardware Tools"

```
db.products.updateMany(
	{department: "Hardware"},
	{$set: { department: "Hardware Tools" }}
);
```

2. Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

```
db.products.updateMany(
	{department: "Hardware Tools"},
	{$inc: { price:10 }}
);
```

3. Update the sales of all the products in the "Hardware Tools" department to be at least 50

```
db.products.updateMany(
	{department: "Hardware Tools", sales: {$lt: 50}},
	{$set: {sales: 50}}
);
```

4. Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

```
db.products.updateMany(
	{department: "Hardware Tools"},
	{$set: {department: "Hardware"}}
);
```

5. Change the price of all the products in the "Hardware" department to be $10 less than their current price

```
db.products.updateMany(
	{department:"Hardware"},
	{$inc: {price: -10}}
);
```

6. Change the sales of all the products in the "Hardware" department to be at most 10

```
db.products.updateMany(
	{sales: {$gt: 10},department:"Hardware"},
	{$set: {sales: 10}}
);
```

7. Update the first product in the "Hardware" department to have one more sale

```
db.products.updateOne(
	{department:"Hardware"},
	{$inc: {sales:1}}
);
```

### Removing Products

1. Remove the first product in the "Hardware" department

```
db.products.deleteOne(
	{department: "Hardware"}
);
```

2. Remove all products in the "Hardware" department

```
db.products.deleteMany(
	{department: "Hardware"}
);
```

### Finding Products

Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

1. Find the names of all the products that are out of stock

```
db.products.find({stock:0}, {name:1,_id:0});
```

2. Find the stock count of all the products with a price below $100

```
db.products.find({price:{$lt:100}}).count();
```

3. Find the name, color and department of all the products with a price between $100 and $1000

```
db.products.find({$and:[{price:{$gt:100}},{price:{$lt:1000}}]},{name:1,color:1,department:1,_id:0});
```

4. Find the names of all the red products

```
db.products.find({color:"red"},{name:1,_id:0});
```

5. Find only the IDs of all the red and blue products

```
db.products.find({$or:[{color:"red"},{color:"blue"}]},{_id:1});
```

6. Find the names of all the products that are not red or blue

```
db.products.find({$nor:[{color:"red"},{color:"blue"}]},{_id:1}).count();
```

7. Find the names of all the products that are not in the Sports or Games departments

```
db.products.find({department:{$nin:['Sports','Games']}},{name:1,_id:0});
```

8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

```
db.products.find({name: {$regex: /^f.*s$/, $options: 'i'}},{name:1, price:1, _id:0});
```

9. Using $where, find all the product names that begin with T

```
db.products.find({$where: "this.name[0] === 'T'"},{name:1, _id:0});
```

10. Using $where, find all the product names that begin with capital F or end with lowercase S

```
db.products.find({$where: "this.name[0] === 'F' && this.name[this.name.length-1] === 's'"},{name:1, _id:0});
```

11. Using $where, find all the product names that begin with capital T and have a price less than $100

```
db.products.find({$where: "this.name[0] === 'T' && this.price < 100"});
```

12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100

```
db.products.find({$where: "(this.name[0] === 'A' && this.price >= 100) || (this.name[0] === 'B' && this.price <= 100)"});
```

### Aggregating Products

> With the Aggregation Pipeline

For each of these challenges use the Aggregation Pipeline to create a query that returns the described results.

1. Find the total number of sales each department made and sort the results by the department name

```
db.products.aggregate([
{$group: {_id: "$department", sales: {$sum: "$sales"}}},{$sort: {_id: 1}}
]);
```

2. Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

```
db.products.aggregate([
{$match: {price: {$gte: 100}}},
{$group: {_id: "$department", sales: {$sum: "$sales"}}},
{$sort: {_id: 1}}
]);
```

3. Find the number of out of stock products in each department and sort the results by the department name

```
db.products.aggregate([
{$match: {stock:0}},
{$group: {_id: "$department", count: {$sum: 1}}},
{$sort: {_id: 1}}
]);
```

> With Map-Reduce

For each of these challenges use the Map-Reduce to create a query that returns the described results.

1. Find the number of products with each color
2. Find the total revenue of each department (how much did each department make in sales?)
3. Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)
4. Find the sum of the total and potential revenue for each product

> With Single Purpose Aggregation Operations

For each of these challenges use the Single Purpose Aggregation Operations to create a query that returns the described results.

1. How many products are there?

```
db.products.count();
```

2. How many products are out of stock?

```
db.products.count({stock: 0});
```

3. How many products are fully stocked? (100)

```
db.products.count({stock: {$gt: 0}});
```

4. How many products are almost out of stock? (>= 5)

```
db.products.count({$and:[{stock: {$lte: 5}},{stock: {$gt:0}}]});
```

5. What are all the unique names of all the departments?

```
db.products.distinct('department');
db.runCommand({ distinct: "products", key: "department" });
```

6. What are all the unique names of product colors?

```
db.products.distinct('color');
db.runCommand({ distinct: "products", key: "color" });
```

7. Find the total number of out of stock products for each department.
```
db.products.group({
  key: { department: 1 },
  cond: { stock: 0 },
  reduce: function(cur, result) { result.count += 1; },
  initial: { count: 0 }
});
```

### Finding Restaurants

Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

Note that queries from these point on may require you to use field path syntax which can be done using dot syntax like this "grades.grade" or "$grades.grade". This is done to target nested documents.

1. Find the first 5 restaurants returning only the name

```
db.restaurants.find({},{name:1, _id:0}).limit(5);
```

2. Find the name of all restaurants with at least 1 grade of A or B

```
db.restaurants.find({$or: [{"grades.grade": 'A'}, {"grades.grade": 'B'}]},{name:1, _id: 0});
```

3. Find the name of all restaurants with at least 1 score above 20

```
db.restaurants.find({"grades.score": {$gt: 20}},{name:1, _id: 0});
```

4. Find the unique types of cuisine in restaurants in the Bronx

```
db.restaurants.aggregate([
{$match: {borough: "Bronx"}},
{$group: {_id: "$cuisine"}}
]);
```

5. Find all the names and addresses of all the Spanish restaurants in Queens

```
db.restaurants.find({borough: "Queens"},{name: 1, address:1, _id:0}).pretty();
```

6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

```
db.restaurants.find({$and: [{borough: "Manhattan"},{cuisine: {$nin: ['Bakery','Spanish','Italian','Irish']}}]},{name: 1, address:1, _id:0});
```

7. Find the name and address of the first alphabetically named Asian restaurant a grade of A

```
db.restaurants.aggregate([
{$match: {"grades.grade": "A", cuisine: "Asian"}},
{$sort: {name:1}},
{$project: {name: 1, address: 1, _id: 0}},
{$limit:1}
]);
```

