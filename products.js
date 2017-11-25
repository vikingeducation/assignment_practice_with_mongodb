// Inserting Products
// 1.
db.products.insert({
  name: 'Hammer',
  price: 9.99,
  department: 'Hardware',
  color: 'red',
  sales: 80,
  stock: 50
});

// 2.
const products = [
  {
    name: 'Screwdriver',
    price: 19.99,
    department: 'Hardware',
    color: 'green',
    sales: 75,
    stock: 50
  },
  {
    name: 'Wrench',
    price: 21.99,
    department: 'Hardware',
    color: 'orange',
    sales: 70,
    stock: 50
  }
];

db.products.insert(products);

// Updating Products
// 1.
db.products.update(
  { department: 'Hardware' },
  { $set: { department: 'Hardware Tools' } },
  { multi: true }
);

// 2.
db.products.update(
  { department: 'Hardware Tools' },
  { $inc: { price: 10 } },
  { multi: true }
);

// 3.
db.products.update(
  { department: 'Hardware Tools' },
  { $max: { sales: 50 } },
  { multi: true }
);

// 4.
db.products.update(
  { department: 'Hardware Tools' },
  { $set: { department: 'Hardware' } },
  { multi: true }
);

// 5.
db.products.update(
  { department: 'Hardware' },
  { $inc: { price: -10 } },
  { multi: true }
);

// 6.
db.products.update(
  { department: 'Hardware' },
  { $min: { sales: 10 } },
  { multi: true }
);

// 7.
db.products.update({ department: 'Hardware' }, { $inc: { sales: 1 } });

// Removing Products
// 1.
db.products.remove({ department: 'Hardware' }, { justOne: true });

// 2.
db.products.remove({ department: 'Hardware' });

// Finding Products
// 1.
db.products.find(
  {
    stock: 0
  },
  { _id: 0, name: 1 }
);

// 2.
db.products.find(
  {
    price: { $lt: 100 }
  },
  { _id: 0, stock: 1 }
);

// 3.
db.products.find(
  {
    price: { $gte: 100, $lte: 1000 }
  },
  { _id: 0, name: 1, color: 1, department: 1 }
);

// 4.
db.products.find(
  {
    color: 'red'
  },
  { _id: 0, name: 1 }
);

// 5.
db.products.find(
  {
    $or: [{ color: 'red' }, { color: 'blue' }]
  },
  { name: 0, price: 0, department: 0, color: 0, sales: 0, stock: 0 }
);

// 6.
db.products.find(
  {
    $nor: [{ color: 'red' }, { color: 'blue' }]
  },
  { _id: 0, name: 1 }
);

// 7.
db.products.find(
  {
    $nor: [{ department: 'Sports' }, { department: 'Games' }]
  },
  { _id: 0, name: 1 }
);

// 8.
db.products.find(
  {
    name: { $regex: /^f.*s$/, $options: 'i' }
  },
  { _id: 0, name: 1, price: 1 }
);

// 9.
db.products.find(
  {
    $where: "this.name[0] === 'T'"
  },
  { _id: 0, name: 1 }
);

// 10.
db.products.find(
  {
    $where: "this.name[0] === 'F' || this.name[this.name.length - 1] === 's'"
  },
  { _id: 0, name: 1 }
);

// 11.
db.products.find(
  {
    $where: "this.name[0] === 'T' && this.price < 100"
  },
  { _id: 0, name: 1 }
);

// 12.
db.products.find(
  {
    $where:
      "(this.name[0] === 'A' && this.price >= 100) || (this.name[0] === 'B' && this.price <= 100)"
  },
  { _id: 0, name: 1, price: 1 }
);

// Aggregating Products
// With the Aggregation Pipeline
// 1.
db.products.aggregate([
  { $group: { _id: '$department', total_sales: { $sum: '$sales' } } },
  { $sort: { _id: 1 } }
]);

// 2.
db.products.aggregate([
  { $match: { price: { $gte: 100 } } },
  { $group: { _id: '$department', total_sales: { $sum: '$sales' } } },
  { $sort: { _id: 1 } }
]);

// 3.
db.products.aggregate([
  { $match: { stock: 0 } },
  { $group: { _id: '$department', out_of_stock: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// With Map-Reduce
// 1.
db.products.mapReduce(
  function() { emit(this.color, 1); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: 'product_totals_by_color'
  }
).find();

// 2.
db.products.mapReduce(
  function() { emit(this.department, this.price * this.sales); },
  function(keys, values) { return Array.sum(values); },
  {
    query: {},
    out: 'revenue_totals_by_department'
  }
).find();

// 3.
db.products.mapReduce(
  function() { emit(this.name, this.price * this.stock); },
  function(keys, values) { return values[0]; },
  {
    query: {},
    out: 'potential_revenue_by_product'
  }
).find();

// 4.
db.products.mapReduce(
  function() { emit(this.name, (this.price * this.sales) + (this.price * this.stock)); },
  function(keys, values) { return values[0]; },
  {
    query: {},
    out: 'total_plus_potential_revenue_by_product'
  }
).find();

// With Single Purpose Aggregation Operations
// 1.
db.products.count();

// 2.
db.products.count({ stock: 0 });

// 3.
db.products.count({ stock: 100 });

// 4.
db.products.count({ stock: { $lte: 5 } });

// 5.
db.products.distinct('department');

// 6.
db.products.distinct('color');

// 7.
db.products.group({
  key: { department: 1 },
  cond: { stock: 0 },
  reduce: function(cur, result) { result.count += 1; },
  initial: { count: 0 }
});
