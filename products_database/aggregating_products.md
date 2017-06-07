## With the Aggregation Pipeline

1. Find the total number of sales each department made and sort the results by the department name

```js
db.products.aggregate([
    { $group: { _id: "$department", total_sales: {$sum: "$sales"}}},
    { $sort: { _id: 1}}
    ])
```

2. Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

```js
db.products.aggregate([
    { $match: {price: {$gte: 100}}},
    { $group: { _id: '$department', total_sales: {$sum: '$sales'}}},
    {$sort: {_id: 1}}
    ])
```

3. Find the number of out of stock products in each department and sort the results by the department name

```js
db.products.aggregate([
   { $match: { stock:0 } },
   {$group: {_id: '$department', count: {$sum: 1}}},
    {$sort: {_id: 1}}
    ])
```

## With Map-Reduce

1. Find the number of products with each color

```js
db.products.mapReduce(
    function(){ emit(this.color, 1); },
    function(keys, values){ return Array.sum(values);},
    {
        query: { },
        out: 'blah'
    }
    ).find()
```

2. Find the total revenue of each department (how much did each department make in sales?)

```js
db.products.mapReduce(
    function(){ emit(this.department, this.sales * this.price);},
    function(keys, values){ return Array.sum(values); },
    { 
        query: {},
        out: 'amt_made'
    }
    ).find();
```

3. Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)

```js
db.products.mapReduce(
    function(){ emit(this.name, (this.price * this.stock))},
    function(keys, values){ return Array.sum(values);},
    {
        query: {},
        out: 'potential_revenue'
    }
    ).find()
```

4. Find the sum of the total and potential revenue for each product

```js
db.products.mapReduce(
    function(){ emit(this.name, (this.sales * this.price + this.stock * this.price))},
    function(key, values){ return Array.sum(values)},
    {
        out: 'total_plus_potential_revenue'
    }
    ).find()
```


## With Single Purpose Aggregation Operations

1. How many products are there?

```js
db.products.count();
```

2. How many products are out of stock?

```js
db.products.count({ stock: 0})
```

3. How many products are fully stocked? (100)

```js
db.products.count({sales:0, stock: {$gt: 0}})
```

4. How many products are almost out of stock? (<= 5)

```js
db.products.count({ stock : {$lte: 5}})
```

5. What are all the unique names of all the departments?

```js
db.products.distinct('department')
```

6. What are all the unique names of product colors?

```js
db.products.distinct('color')
```

7. Find the total number of out of stock products for each department using the db.collection.group() method

```js
db.products.group({
    key: { department: 1},
    cond: { stock: 0},
    reduce: function(cur, result){ result.count += 1},
    initial: {count: 0}
}
    )
```