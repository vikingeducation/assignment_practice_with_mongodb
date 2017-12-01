Insert a product with the following properties




db.products.insert({
  name: "Hammer",
  price: 9.99,
  department: "Hardware",
  color: "red",
  sales: 80,
  stock: 50,
})


db.products.insert(
[
{name: "Screwdriver",
price: 19.99,
department: "Hardware",
color: "green",
sales: 75,
stock: 50}
,
{name: "Wrench",
price: 21.99,
department: "Hardware",
color: "orange",
sales: 70,
stock: 50}])

db.products.find({name:"Hammer"})
db.products.find({department:"Hardware"})
db.products.find({department:"Hardware Tools"})


// Change the department of all products in the "Hardware" department to "Hardware Tools"
db.products.update({department:"Hardware"},{"$set":{department:"Hardware Tools"}}, {multi:true} )


// Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

db.products.update({department:"Hardware Tools"},{ $inc: { price: 10 } }, {multi:true} )
// return value afterwards -> 19.990000000000002 ??

// Update the sales of all the products in the "Hardware Tools" department to be at least 50

db.products.update({department:"Hardware Tools"},{ $inc: { sales: 50 } }, {multi:true} )

// Change the department of all the products in the "Hardware Tools" department to be "Hardware" again
// Change the price of all the products in the "Hardware" department to be $10 less than their current price
// Change the sales of all the products in the "Hardware" department to be at most 10
// Update the first product in the "Hardware" department to have one more sale
db.products.update({department:"Hardware Tools"},{"$set":{department:"Hardware"}}, {multi:true} )
db.products.update({department:"Hardware"},{ $inc: { price: -10 } }, {multi:true} )
db.products.update({department:"Hardware"},{ $inc: { sales: 10 } }, {multi:true} )
db.products.update({department:"Hardware"},{ $inc: { sale: 1 } }, {multi:false} )
db.products.remove({department:"Hardware"},{justOne: true})
db.products.remove({department:"Hardware"},{justOne: false})
db.products.find({stock: 0}, 
	{name: 1});
db.products.find({price: {$lt: 100 }},
	{stock:1});
db.products.find({$or: [
  { price: { $gte: 100} },
  { price: { $lte: 1000 } }
  ]},
	{name:1, color: 1, department: 1});

db.products.find({color: "red"},
	{name:1});

db.products.find({$or: [
  { color: "red" },
  { color: "red"}
  ]},
	{name:1});

db.products.find({$or: [
  { color: {$ne: "red" }},
  { color: {$ne: "blue"}},
  ]},
	{name:1});
db.products.find({$or: [
  { department: {$ne: "Sports" }},
  { department: {$ne: "Games"}},
  ]},
	{name:1});
db.products.find({$and: [
  { name:  { $regex: /^F/, $options: 'i'}},
  { name:  { $regex: /S$/, $options: 'i' }},
  ]},
	{name:1});

db.products.find({
   $where: {name: {$regex: /^S/}},
	{name:1});



