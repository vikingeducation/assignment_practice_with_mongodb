#1. Insert a product

  db.products.insert({
    name: "Hammer",
    price: 9.99,
    department: "Hardware",
    color: "red",
    sales: 80,
    stock: 50
  });

#2. Insert products in a single query

  var new_products = [
    { name: "Screwdriver",
      price: 19.99,
      department: "Hardware",
      color: "green",
      sales: 75,
      stock: 50
    },
    { name: "Wrench",
      price: 21.99,
      department: "Hardware",
      color: "orange",
      sales: 70,
      stock: 50
    } ]

  db.products.insert(new_products);
