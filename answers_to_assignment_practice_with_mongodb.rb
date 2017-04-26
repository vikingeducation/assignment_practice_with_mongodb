answers_to_assignment_practice_with_mongodb.js 

Inserting Products
------------------

1. 
db.products.insert ({
  name: "Hammer",
  price: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});

2.
var items = [
  {name: "Screwdriver",
  price: 19.99,
  department: "Hardware",
  color: "green",
  sales: 75,
  stock: 50},
  {name: "Wrench",
  price: 21.99,
  department: "Hardware",
  color: "orange",
  sales: 70,
  stock: 50}
];

db.products.insert(items)

Updating Products
------------------

1.
db.products.update(
  {department: "Hardware"},
  {$set: {department: "Hardware Tools"}},
  {multi: true}
  );

2.
db.products.update(
  {department: "Hardware Tools"},
  {$inc: {price: $10} },
  {multi: true}
  );

3.
db.products.update(
  {department: "Hardware Tools"},
  {$min: {stock: 50} },
  {multi: true },
  );

4.
db.products.update(
  {department: "Hardware Tools"},
  {$set: {department: "Hardware"} },
  {multi: true }
  );

5. 
db.products.update(
  {department: "Hardware"},
  {$inc: {price: -10} },
  {multi: true}
  );

6. 
db.products.update(
  {department: "Hardware"},
  {$max: {sales: 10)} },
  {multi: true}
  );

7. 
db.products.update(
  {department: "Hardware"},
  {$inc: {sales: 1} },
);

Removing Products
------------------

0.
db.products.copyTo(products_copy)

1.
db.product.remove(
  {},
  {justOne: true}
); 

2. db.products.remove({});

Finding Products
----------------

1. 
db.products.find({stock: 0});

2.
db.products.find({price :{$lt: 100});

db.products.find({ $where "this.price < 100" });

3.
db.products.find(
  { price: {$gte: 100, $lte: 1000} },
  {_id: 0, name: 1, color: 1, department: 1}
  );

4. 
db.products.find(
  {color: red},
  {_id: 0, name: 1, color: 1}
  );

5.
db.products.find(
  {color: {red, blue}},
  {name: 1, color: 1}
  );

6.
db.products.find(
  {color: {$ne: {red, blue}} }
  {_id: 0, name: 1, color: 1}
  );

7.
db.products.find(
  {department: {$ne: {"Sports", "Games"}} },
  {name: 1, department: 1}
  );

8.
db.products.find(
  {name: { $regex: /^F.*S$/, $options: 'i' } },
  {_id: 0, name: 1, price: 1}
  );

9.
Using $where, find all the product names that begin with T
db.products.find(
  {where: "this.name[0] === 'T'"},
  {_id: 0, name: 1}
  );

10. ... find all the product names that begin with capital T or end with lowercase f
db.products.find(
  { $where: "this.name[0] === 'T' || this.name[this.name.length - 1] === 'f'"},
  {_id: 0, name: 1}
  );

11. ... find all the product names that begin with capital T and  where price < 100
db.products.find(
  {$where: "this.name[0] === 'T' && this.price < 100"},
  {_id: 0, name: 1}
  );

12. ... find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100
db.products.find(
  {$or: [
    {$and: [
      {$where: "this.price >= 100"},
      {name: {$regex: /^A/}}
      ]},  
    {$and: [
      {$where: "this.price <= 100"},
      {name: {$regex: /^B/}}
      ]
  ]},
  {_id: 0, name: 1, price: 1}
  );


Aggregating Products -- Pipeline
--------------------------------

1.
db.products.aggregate([
  {$group: {_id: "$department", sum: {$sum: "$sales"}}},
  {$sort: {_id: 1}}
  ]);

2.
db.products.aggregate([
  {$match: {price: {$gte: 100}}},
  {$group: {_id: "$department", sum: {$sum: "$sales"}}},
  {$sort: {_id: 1}}
  ]);

3.
db.products.aggregate([
  {$match: {stock: 0}},
  {$group: {_id: "$department", sum: {$sum: 1}}},
  {$sort: {_id: 1}}
  ]);

Aggregating Products -- Map Reduce
----------------------------------
**** Do not understand ...

1. 
db.products.mapReduce(
  function() {emit(this.color, this.stock);},
  function(keys, values) {return Array.sum(values);},
  {
    query: {},
    out: "stock_totals_by_color"
  }
).find();

2. 
db.products.mapReduce(
  function() {emit(this.department, this.sales);},
  function(keys, values) {return Array.sum(values);},
  {
    query: {},
    out: "total_revenue_by_department"
  }
).find();

3. 
db.products.mapReduce(
  function() {emit( this.name, this.(stock*price) );},
  function(keys, values) {return Array.sum(values);},
  {
    query: {},
    out: "potential_revenue_by_product_name"
  }
).find();

# check this (stock*product)

4. 
db.products.mapReduce(
  function() {emit( this.name, this.(50*price) );},
  function(keys, values) {return Array.sum(values);},
  {
    query: {},
    out: "total_plus_potential_revenue_by_product_name"
  }
).find();

# Note: meaning of total revenue unclear. Assume it means revenue to date from initial stock of 50. So Total + Potential Revenue = 50 * Price. (Ask at Office Hours.)

With Single Purpose Aggregation Operations
------------------------------------------

1.
db.products.count();

2.
db.products.count({stock: 0});

3.
db.products.count({stock: 100});

4.
db.products.count({stock: {$lte: 5} });

5.
db.products.distinct('department');

6.
db.products.distinct('color');

7.
db.products.group({
  key: {department: 1},
  cond: {stock: 0},
  reduce: function(cur, result) {result.count += 1; },
  initial: { count: 0 }
  });
**** Do not understand ...


