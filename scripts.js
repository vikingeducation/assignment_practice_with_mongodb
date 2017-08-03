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

//
// db.products.find(
// { department: "Hardware Tools" },)

// db.products.update(
//   {
//     department: "Hardware Tools"
//   },
//   { department: "Dank Memes" }
// );
