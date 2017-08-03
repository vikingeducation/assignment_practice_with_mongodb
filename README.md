Dan Ian


col.insert({"name":"Hammer","price":999,"department":"Hardware","color":"red","sales":80,"stock":50});
col.find({name:"Hammer"});
Insert the following products in a single query
col.insert([{"name":"Screwdriver","price":1999,"department":"Hardware","color":"green","sales":75,"stock":50},
{"name":"Wrench","price":2199,"department":"Hardware","color":"orange","sales":70,"stock":50}]);
col.find({$or: [{name:"Wrench"}, {name:"Hammer"}]});
col.find({name:"Wrench"});
col.find({department:"Hardware"});
Change the department of all products in the "Hardware" department to "Hardware Tools"
col.update(
   { department: "Hardware"  },
      {$set:{
        department: "Hardware Tools"
      }},{multi:true}
)
col.find({department: "Hardware Tools"});
Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price
col.update(
   { department: "Hardware Tools"  },
      {$inc:{
        price: 10
      }},{multi:true}
)
Update the sales of all the products in the "Hardware Tools" department to be at least 50
col.update(
   { department: "Hardware Tools" ,sales:{$lt: 50} },
      {$set:{
        sales: 50
      }},{multi:true}
)

Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

col.update(
   { department: "Hardware Tools"  },
      {$set:{
        department: "Hardware"
      }},{multi:true}
)

Change the price of all the products in the "Hardware" department to be $10 less than their current price
col.update(
   { department: "Hardware" },
      {$inc:{
        price: -1000
      }},{multi:true}
)
col.find({department:"Hardware"});

Change the sales of all the products in the "Hardware" department to be at most 10
col.update(
   { department: "Hardware" ,sales:{$gt: 10} },
      {$set:{
        sales: 10
      }},{multi:true}
)

Update the first product in the "Hardware" department to have one more sale

col.update(
   { department: "Hardware"  },
      {$inc:{
        sales: 1
      }},{multi:false} //or leave multi out entirely
)

col.remove( { department: "Hardware"  },{justOne:true})

col.remove( { department: "Hardware"  })

col.find({stock:0},{_id:0,price:0,department:0,color:0,sales:0,stock:0});
col.find({stock:0},{_id:0,name:1});
//^^^^ both of these do the same thing
Find the stock count of all the products with a price below $100
col.find({price:{$lt:100}},{_id:0,stock:1});

Find the name, color and department of all the products with a price between $100 and $1000
col.find({$and:[{price:{$lt:100}},{price:{$gt:10}}]},{_id:0,name:1,color:1,department:1});

col.find({color:"red"},{_id:0,name:1});
col.find({$or:[{color:"red"},{color:"blue"}]},{_id:1});

Find the names of all the products that are not red or blue

col.find({$and:[{color:{$ne:"red"}},{color:{$ne:"blue"}}]},{_id:1});

Find the names of all the products that are not in the Sports or Games departments
col.find({$and:[{department:{$ne:"Sports"}},{department:{$ne:"Games"}}]},{_id:1});

Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case
col.find({$and:[{name: {$regex : /^f[\w]/}},{name: {$regex : /s$/}}]},{_id:1});
col.find({name: {$regex: /^f[\w" "]+s$/i}},{name: 1, price: 1, _id: 0});

Using $where, find all the product names that begin with T
col.find({$where: "this.name[0].toLowerCase() === 't'"})

Using $where, find all the product names and prices of products that either start with A and have
a price of at least $100 or start with B and have a price of at most $100

col.find({$or:[
  {$where: "this.name[0] === 'A' && this.price >= 100"},
  {$where: "this.name[0] === 'S' && this.price <= 100"}
]}
  ,
  {_id:0,name:1,price:1});

col.find(
  {$where: "(this.name[0] === 'A' && this.price >= 100) || (this.name[0] === 'S' && this.price <= 100)"},
  {name: 1, price: 1, _id: 0});
Find the total number of sales each department made and sort the results by the department name
col.aggregate([{ $sort : { department:-1 } },{
$group: {_id: "$department", sum: {$sum: "$sales"}}
}])
{price:{$gt:100}}

col.find().
col.aggregate([
  { $sort : { department:-1 } },{
$group: {_id: "$department", sum: {$sum: "$sales"}}
}])

col.aggregate([{$match: {price: {$gt: 100}}},
  { $sort : { department:-1 } },
  {$group: {_id: "$department", sum: {$sum: "$sales"}}}]);

  col.aggregate([{$match: {stock: 0}},
    { $sort : { department:-1 } },
    {$group: {_id: "$department", sum: {$sum: 1}}}]);

  col.find({stock:0})

# assignment_practice_with_mongodb


Querying with the MongoDB shell


## Getting Started

**IMPORTANT** don't run `__seeds__.js`. It is there only to generate `__products__.js` in the case that it **MUST** be regenerated. Regenerating that data will make query results different across instances of this assignment.


## Products

To get started import `__products__.js` into your MongoDB database with the following command:

```bash
$ mongoimport --db test --collection products --file __products__.js
```


## Restaurants

Restaurant data is imported from the MongoDB test database provide [here](https://docs.mongodb.com/getting-started/shell/import-data/).

Import the data from the `__restaurants__.js` file.

```bash
$ mongoimport --db test --collection restaurants --file __restaurants__.js
```



