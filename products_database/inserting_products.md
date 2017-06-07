1. Insert a product with the following properties

name: "Hammer"
price: 9.99
department: "Hardware"
color: "red"
sales: 80
stock: 50

```js
db.products.insert({
name: "Hammer",
price: 999,
department: "Hardware",
color: "red",
sales: 80,
stock: 50,
  })
```


2. Insert the following products in a single query

-
name: "Screwdriver"
price: 19.99
department: "Hardware"
color: "green"
sales: 75
stock: 50
-
name: "Wrench"
price: 21.99
department: "Hardware"
color: "orange"
sales: 70
stock: 50

```js
db.products.insert([
  {name: "Screwdriver",
  price: 1999,
  department: "Hardware",
  color: "green",
  sales: 75,
  stock: 50},
  {name: "Wrench",
  price: 2199,
  department: "Hardware",
  color: "orange",
  sales: 70,
  stock: 50}
  ])
```