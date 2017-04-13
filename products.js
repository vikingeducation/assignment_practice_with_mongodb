// Inserting Products

// Insert a product with the following properties
db.products.insert({
  name: "Hammer",
  score: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});

// Insert the following products in a single query
var inserts = [{
name: "Screwdriver",
price: 19.99,
department: "Hardware",
color: "green",
sales: 75,
stock: 50
}, {
name: "Wrench",
price: 21.99,
department: "Hardware",
color: "orange",
sales: 70,
stock: 50
}];

db.products.insert(inserts)


###############################################################
// Updating Products

// Change the department of all products in the "Hardware" department to "Hardware Tools"
db.products.update(
  { department: {$eq: "Hardware"} },
  { $set: {department: "Hardware Tools"} },
  { multi: true }
);

// Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price
db.products.update(
  { department: {$eq: "Hardware Tools"} },
  { $inc: { price: 10 } },
  { multi: true }
);

