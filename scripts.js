//Inserts
//1

db.products.insert({
  name: "Hamma",
  price: 3.5,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50
});

//2
db.products.insert([
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
]);

//Updates

//1
db.products.update(
  {
    department: "Hardware"
  },
  { $set: { department: "Hardware Tools" } },
  { multi: true }
);
//2
db.products.update(
  { department: "Hardware Tools" },
  { $inc: { price: 10 } },
  { multi: true }
);
//3
db.products.update(
  { department: "Hardware Tools", sales: { $lt: 50 } },
  { $set: { sales: 50 } },
  { multi: true }
);
// 4
db.products.update(
  { department: "Hardware Tools" },
  { $set: { department: "Hardware" } },
  { multi: true }
);
// 5. Change the price of all the products in the "Hardware" department to be $10 less than their current price
db.products.update(
  { department: "Hardware" },
  { $inc: { price: -10 } },
  { multi: true }
);
// 6. Change the sales of all the products in the "Hardware" department to be at most 10
db.products.update(
  { department: "Hardware", sales: { $gt: 10 } },
  { $set: { sales: 10 } },
  { multi: true }
);
// 7. Update the first product in the "Hardware" department to have one more sale
db.products.update({ department: "Hardware" }, { $inc: { sales: 1 } });

// Deletions
// 1. Remove the first product in the "Hardware" department
db.products.remove({ department: "Hardware" }, { justOne: true });

// 2. Remove all products in the "Hardware" department
db.products.remove({ department: "Hardware" });

// Finding
// 1. Find the names of all the products that are out of stock
db.products.find({ stock: 0 }, { _id: 0, name: 1 });

// 2. Find the stock count of all the products with a price below $100
db.products.find({ price: { $lt: 100 } }, { _id: 0, name: 1, stock: 1 });

// 3. Find the name, color and department of all the products with a price between $100 and $1000
db.products.find(
  { price: { $gt: 100, $lt: 1000 } },
  { _id: 0, name: 1, color: 1, department: 1 }
);

// 4. Find the names of all the red products
db.products.find({ color: "red" }, { _id: 0, name: 1 });

// db.products.find({ department: "Hardware Tools" })

// db.products.update(
//   {
//     department: "Hardware Tools"
//   },
//   { department: "Dank Memes" }
// );
