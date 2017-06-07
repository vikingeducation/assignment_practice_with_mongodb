## Finding Products

1. Find the names of all the products that are out of stock

```js
db.products.find({stock: 0}, {_id: 0, name: 1, stock: 1})
```

2. Find the stock count of all the products with a price below $100

```js
db.products.find({ price: {$lt: 100}}, {_id: 0, name: 1, stock: 1, price: 1})
```

3. Find the name, color and department of all the products with a price between $100 and $1000

```js
db.products.find(
    { $and: [
        {price: {$lt: 1000}},
        {price: {$gt: 100}}
        ]
        },
    {  _id: 0, 
        name: 1,
        color: 1,
        department: 1,
        price: 1
    }
    )
```

4. Find the names of all the red products

```js
db.products.find(
    { color: 'red'},
    {
        _id: 0,
        name: 1,
        color: 1
    }
    )
```

5. Find only the IDs of all the red and blue products

```js
db.products.find(
    { color: { $in: ['red', 'blue']}
    },
    {
        _id: 1,
        color: 1,
    }
    )
```

6. Find the names of all the products that are not red or blue

```js
db.products.find(
    { color: { $nin: ['red', 'blue']}
    },
    {
        _id: 1,
        color: 1,
    }
    )
```

7. Find the names of all the products that are not in the Sports or Games departments

```js
db.products.find(
    { department: { $nin: ['Sports', 'Games']}
    },
    {
        _id: 1,
        department: 1
    }
    )
```

8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

```js
db.products.find(
    {
        $and: [
        {name: {$regex: /^F|^f/}},
        {name: {$regex: /s$|S$/}}
            ]
        },
    { _id: 0, 
        name: 1,
        price: 1}
    )
```

9. Using $where, find all the product names that begin with T

```js
db.products.find(
    {$where: "this.name.match(/^T/)"},
    {_id: 0,
        name: 1}
    )
```

10. Using $where, find all the product names that begin with capital F or end with lowercase S

```js
db.products.find(
    {
        $and: [
        { $where: "this.name.match(/^F|^f/) && this.name.match(/s$|S$/)"},
        ]
        },
        {_id: 0,
            name: 1}
    )
```

11. Using $where, find all the product names that begin with capital T and have a price less than $100

```js
db.products.find(
    {$where: "this.name.match(/^T/) && this.price < 100"},
    {_id: 0,
        name: 1,
    price: 1
    }
    )
```

12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100

```js
db.products.find(
    {$where: "(this.name.match(/^A/) && this.price >= 100) || (this.name.match(/^B/) && this.price <= 100)" },
    { _id: 0,
    name: 1,
    price: 1
    }
    )
```
