// -------------------
// Inserting products
// -------------------

db.products.insert(
  {
    name: 'Hammer',
    price: 999,
    department: 'Hardware',
    color: 'red',
    sales: 80,
    stock: 50
  }
);

var hardware = [
  {
    name: 'Screwdriver',
    price: 1999,
    department: 'Hardware',
    color: 'green',
    sales: 75,
    stock: 50
  },
  {
    name: 'Wrench',
    price: 2199,
    department: 'Hardware',
    color: 'orange',
    sales: 70,
    stock: 50
  }
];

db.products.insert(hardware);