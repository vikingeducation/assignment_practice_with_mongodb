//With Aggregate Pipeline
#1. Find the total number of sales each department made and sort the results by the department name

    db.products.aggregate([
      {$group: {_id: '$department', total_sales: {$sum: '$sales'}}},
      {$sort: {_id:1}}
    ]);

#2. Find the total number of sales each department made of a product with a price of at least $100 and sort the results by the department name

    db.products.aggregate([
      {$match: {price: {$gt: 100}}},
      {$group: {_id: '$department', total_sales: {$sum: '$sales'}}},
      {$sort: {_id:1}}
    ]);

#3. Find the number of out of stock products in each department and sort the results by the department name

    db.products.aggregate([
      {$match: {stock: 0}},
      {$group: {_id: '$department', total_out_of_stock_products: {$sum: 1}}},
      {$sort: {_id:1}}
    ]);


//With mapReduce
#1. Find the number of products with each color

    db.products.mapReduce(
      function(){emit(this.color, this.product);},
      function(k,v){ return ;},
      {out: {inline: 1}}
    );

#2. Find the total revenue of each department (how much did each department make in sales?)

    db.products.mapReduce(
      function(){ emit(this.department, this.sales);},
      function(k,v){ return Array.sum(v);},
      { query: {department: {$ne: null}},
        out: {inline: 1}
      }
    );


#3. Find the potential revenue of each product (how much can each product make if the entire remaining stock is sold?)


    db.products.mapReduce(
      function(){  emit(this.name, this.stock * this.price ); },
      function(k,v){ return Array.sum(v); },
      {
        out: {inline: 1}
      }
    );

#4. Find the sum of the total and potential revenue for each product

    db.products.mapReduce(
      function(){  emit(this.name, (this.stock * this.price) + this.sales ); },
      function(k,v){ return Array.sum(v); },
      {
        out: {inline: 1}
      }
    );
