
// 1.
db.products.insert({
    name: "Hammer",
    price: 9.99,
    department: "Hardware",
    color: "red",
    sales: 80,
    stock: 50
  }
);

// 2.
var productArray = [
  {
  name: "Screwdriver",
  price: 9.99,
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

db.products.insert(productArray);


// 1.
db.products.update(
  { department: "Hardware" },
  { $set: { department: "Hardware Tools"} },
  { multi: true}
);

// 2.
db.products.update(
  { department: "Hardware Tools"},
  { $inc: { price: 10 } },
  { multi: true}
);

// 3.
db.products.update(
  { department: "Hardware Tools", sales: { $lt: 50} },
  { $set: { sales: 50} },
  { multi: true }
);

// 4.
db.products.update(
  { department: "Hardware Tools" },
  { $set: { department: "Hardware"} },
  { multi: true}
);

// 5.
db.products.update(
  { department: "Hardware"},
  { $inc: { price: -10 } },
  { multi: true}
);

// 6.
db.products.update(
  { department: "Hardware", sales: { $gt: 10} },
  { $set: { sales: 10} },
  { multi: true }
);

// 7.
db.products.update(
  { department: "Hardware" },
  { $inc: { sales: 1 } }
)


// 1.
db.products.remove(
  { department: "Hardware" },
  { justOne: true }
);

// 2.
db.products.remove(
  { department: "Hardware" }
);

// FINDING PRODUCTS

// 1.
db.products.find(
  { stock: { $lte: 0 } },
  { _id: 0, name: 1}
);

// 2.
db.products.find(
  { price: { $lt: 100 } },
  { _id: 0, stock: 1}
);

// 3.
db.products.find(
  { price: { $gte: 100 }, price: { $lte: 1000 } },
  { _id: 0, name: 1, color: 1, department: 1, price: 1 }
)

// 4.
db.products.find(
  { color: "red" },
  { _id: 0, name: 1 }
)

// 5.
db.products.find(
  { color: "red", color: "blue"},
  { _id: 1 }
)

// 6.
db.products.find(
  { $where: "this.color != 'red' && this.color != 'blue'"},
  { _id: 0, name: 1 }
)

// 7.
db.products.find(
  { $where: "this.department != 'Sports' && this.department != 'Games'"},
  { _id: 0, name: 1 }
)

// 8.
db.products.find(
  { name: { $regex: /^F/, $options: "i" },
   name: { $regex: /S$/, $options: "i" } },
  { _id: 0, name: 1, price: 1}
)

// 9.
db.products.find(
  { $where: "this.name[0] === 'T'" },
  { _id: 0, name: 1}
)

// 10.
db.products.find(
  { $where: "this.name[0] === 'F' || this.name[this.name.length - 1] === 's'" },
  { _id: 0, name: 1}
)

// 11.
db.products.find(
  { $where: "this.name[0] === 'F' && this.price < 100" },
  { _id: 0, name: 1}
)

// 12. &&
db.products.find(
  { $where: "(this.name[0] === 'A' && this.price >= 100) || (this.name[0] === 'B' && this.price <= 100)"},
  { _id: 0, name: 1, price: 1 }
)

// AGGREGATE Products
// 1.
db.products.aggregate([
  { $group: { _id: "$department", sum: { $sum: 1 } } },
  { $sort: { _id: 1} }
]);

// 2.
db.products.aggregate([
  { $match: { price: { $gte: 100 } } },
  { $group: { _id: "$department" , sum: { $sum: "$sales" } } },
  { $sort: { _id: 1} }
]);

// 3.
db.products.aggregate([
  { $match: { stock: { $lte: 0 } } },
  { $group: { _id: "$department", sum: { $sum: 1} } },
  { $sort: { _id: 1} }
]);

// WITH MAP-REDUCE
// 1.
db.products.mapReduce(
  function() { emit( this.color, 1 ) },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "products_by_color"
  }
).find();

// 2.
db.products.mapReduce(
  function() { emit( this.department, this.sales ) },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: "total_revenue"
  }
).find();


// 3.
db.products.mapReduce(
  function() { emit( this.name, this.stock * this.price ) },
  function(keys, values) { return this.values; },
  {
    query: {},
    out: "potential_revenue"
  }
).find();


// 4.
db.products.mapReduce(
  function() { emit( this.name, this.stock * this.price + this.sales) },
  function(keys, values) { return Array.sum(values) },
  {
    query: {},
    out: "sum_of_total_and_potential_revenue"
  }
).find();

db.products.find({name: "Awesome Frozen Soap"}).pretty();

// Single Purpose Aggregation Operations
// 1.
db.products.count({});

// 2.
db.products.find({
  stock: 0
}).count()

// 3.
db.products.find({
  stock: 100
}).count()

// 4.
db.products.find({
  stock: { $lte: 5}
}).count()

// 5.
db.products.distinct('department');

// 6.
db.products.distinct('color');

// 7.
db.products.group({
  key: { department: 1 },
  cond: { stock: { $lte: 0 } },
  reduce: function(cur, result) { result.count += 1;},
  initial: { count: 0 }
});
