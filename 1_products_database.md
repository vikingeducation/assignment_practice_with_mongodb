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
8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case
9. Using $where, find all the product names that begin with T
10. Using $where, find all the product names that begin with capital F or end with lowercase S
11. Using $where, find all the product names that begin with capital T and have a price less than $100
12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100