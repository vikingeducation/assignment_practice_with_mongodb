//––––––––––––––––––––––
//--Inserting Products--
//––––––––––––––––––––––
db.products.insert({
  name: "Hammer",
  price: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});

var productsToInsert = [
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

db.products.insert(productsToInsert);

//––––––––––––––––––––––
//--Updating Products--
//––––––––––––––––––––––
db.products.update(
  { department: "Hardware" },
  { $set: { department: "Hardware Tools" } },
  { multi: true }
);

db.products.update(
  { department: "Hardware Tools" },
  { $inc: { price: 10 } },
  { multi: true }
);

db.products.update(
  { $and: [{ department: "Hardware Tools" }, { sales: { $lt: 50 } }] },
  { $set: { sales: 50 } },
  { multi: true }
);

db.products.update(
  { department: "Hardware Tools" },
  { $set: { department: "Hardware" } },
  { multi: true }
);

db.products.update(
  { department: "Hardware" },
  { $inc: { price: -10 } },
  { multi: true }
);

db.products.update(
  { $and: [{ department: "Hardware" }, { sales: { $gt: 10 } }] },
  { $set: { sales: 10 } },
  { multi: true }
);

db.products.update({ department: "Hardware" }, { $inc: { sales: 1 } }, {});
//––––––––––––––––––––––
//--Removing Products--
//––––––––––––––––––––––
db.products.remove({ department: "Hardware" }, { justOne: true });

db.products.remove({ department: "Hardware" });
//––––––––––––––––––––––
//--Finding Products--
//––––––––––––––––––––––
db.products.find({ stock: 0 }, { _id: 0, name: 1 });

db.products.find({ price: { $lt: 100 } }, { _id: 0, stock: "$stock" });

db.products.find(
  {
    $and: [{ price: { $gt: 100 } }, { price: { $lt: 1000 } }]
  },
  { _id: 0, name: 1, color: 1, department: 1 }
);

db.products.find({ color: "red" }, { _id: 0, name: 1 });

db.products.find(
  {
    $or: [{ color: "red" }, { color: "blue" }]
  },
  { _id: 1 }
);

db.products.find(
  {
    $and: [{ color: { $ne: "red" } }, { color: { $ne: "blue" } }]
  },
  { _id: 0, name: 1 }
);

db.products.find(
  {
    $and: [{ department: { $ne: "Sports" } }, { department: { $ne: "Games" } }]
  },
  { _id: 0, name: 1 }
);

db.products.find(
  {
    $and: [
      { name: { $regex: /^F/, $options: "i" } },
      { name: { $regex: /S$/, $options: "i" } }
    ]
  },
  { _id: 0, name: 1, price: 1 }
);

db.products.find({ $where: "this.name[0] === 'T'" }, { _id: 0, name: 1 });

db.products.find(
  {
    $and: [
      {
        $where: "this.name[0] === 'F'"
      },
      { name: { $regex: /s$/ } }
    ]
  },
  { _id: 0, name: 1 }
);

db.products.find(
  {
    $where: "this.name[0] === 'T' && this.price < 100"
  },
  { _id: 0, name: 1 }
);

db.products.find(
  {
    $where:
      "(this.name[0] === 'A' && this.price >= 100) || (this.name[0] === 'B' && this.price <= 100) "
  },
  { _id: 0, name: 1, price: 1 }
);
//––––––––––––––––––––––
//--Aggregating Products--With the Aggregation Pipeline--
//––––––––––––––––––––––
db.products.aggregate([
  {
    $group: {
      _id: "$department",
      total: { $sum: "$price" }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
]);

db.products.aggregate([
  {
    $match: {
      price: { $gt: 100 }
    }
  },
  {
    $group: {
      _id: "$department",
      "total(>100)": { $sum: { $multiply: ["$price", "$sales"] } }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
]);

db.products.aggregate([
  {
    $match: {
      stock: 0
    }
  },
  {
    $project: {
      department: 1,
      name: 1
    }
  },
  {
    $sort: {
      department: 1
    }
  }
]);

//––––––––––––––––––––––
//--Aggregating Products--With Map-Reduce--
//––––––––––––––––––––––
db.products.mapReduce(
  function() {
    emit(this.color, 1);
  },
  function(k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

db.products.mapReduce(
  function() {
    emit(this.department, this.sales * this.price);
  },
  function(k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

db.products.mapReduce(
  function() {
    emit(this.name, this.stock * this.price);
  },
  function(k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

db.products.mapReduce(
  function() {
    emit(this.name, this.sales + this.stock * this.price);
  },
  function(k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);
//––––––––––––––––––––––
//--Aggregating Products--With Single Purpose Aggregation Operations--
//––––––––––––––––––––––
db.products.count();

db.products.count({ stock: 0 });

db.products.count({ stock: 100 });

db.products.count({ stock: { $lte: 5 } });

db.products.distinct("department");

db.products.distinct("color");

db.products.group({
  key: { stock: 1, department: 1 },
  cond: { stock: { $eq: 0 } },
  reduce: function(curr, result) {
    result.OutOfStockTotal += 1;
  },
  initial: { OutOfStockTotal: 0 }
});
