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

## Restaurants

Restaurant data is imported from the MongoDB test database provide [here](https://docs.mongodb.com/getting-started/shell/import-data/).

Import the data from the `__restaurants__.js` file.

```bash
$ mongoimport --db test --collection products --file __restaurants__.js
```
