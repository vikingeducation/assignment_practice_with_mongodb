#1. Find the names of all the products that are out of stock

    db.products.find(
      { stock: 0 },
      {_id: 0, name: 1}
    );

#2. Find the stock count of all the products with a price below $100

    db.products.find(
      {price: {$lt: 100}},
      {_id: 0, stock: 1}
    );

#3. Find the name, color and department of all the products with a price between $100 and $1000

    db.products.find(
      {$and: [{price: {$gte: 100}}, {price: {$lt: 1000}}]},
      {_id: 0, name: 1, color: 1, department: 1}
    );

#4. Find the names of all the red products

    db.products.find(
      {color: 'red'},
      {_id: 0, name: 1}
    );

#5. Find only the IDs of all the red and blue products

    db.products.find(
      { $or: [{color: 'red'}, {color: 'blue'}] },
      {_id: 1}
    );

#6. Find the names of all the products that are not red or blue

    db.products.find(
      {$or: [{color: {$ne: 'red'}}, {color: {$ne: 'blue'}}] },
      {_id: 0, name: 1}
    );

#7. Find the names of all the products that are not in the Sports or Games departments

    db.products.find(
      {$and: [{department: {$ne: 'Sports'}}, {department: {$ne: 'Games'}}] },
      { _id: 0, name: 1}
    );

#8. Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

    db.products.find(
      {$and: [{name: {$regex: /^F/i}}, {name: {$regex: /S$/i}}] },
      {_id: 0, name: 1, price: 1}
    );

#9. Using $where, find all the product names that begin with T

    db.products.find(
      {$where: "this.name.startsWith('T'); " },
      {_id: 0, name: 1}
    );

#10. Using $where, find all the product names that begin with capital F or end with lowercase S

    db.products.find(
      {$where: "this.name.endsWith('s'); "},
      {_id: 0, name: 1}
    );

#11. Using $where, find all the product names that begin with capital T and have a price less than $100

    db.products.find(
      {$where: "this.price < 100 && this.name.startsWith('R')"},
      {_id: 0, name: 1}
    );

#12. Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100

    db.products.find(
      {$where: "(this.price <= 100 && this.name.startsWith('A')) || (this.price <= 100 && this.name.startsWith('B'));"},
      {_id: 0, name: 1, price: 1}

    );
