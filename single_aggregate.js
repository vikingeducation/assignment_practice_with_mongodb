#1. How many products are there?

    db.products.count({});

#2. How many products are out of stock?

    db.products.count({stock: 0});

#3. How many products are fully stocked? (100)

    db.products.count({stock: 100});

#4. How many products are almost out of stock? (>= 5)

    db.products.count({stock: {$lte: 5}});

#5. What are all the unique names of all the departments?

    db.products.distinct("department");

#6. What are all the unique names of product colors?

    db.products.distinct("color");

#7. Find the total number of out of stock products for each department.

    db.products.group({
      key: {department: 1},
      cond: {stock: 0},
      reduce: function(c, r) {
        r.count += 1;
      },
      initial: {count: 0 }
    });
