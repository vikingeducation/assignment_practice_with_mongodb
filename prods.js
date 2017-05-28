Insert
1.
db.products.insert({
  name: 'Hammer',
  price: 9.99,
  department: 'Hardware',
  color: 'red',
  sales: 80,
  stock: 50
})

2.
var items = [
  {name: 'Screwdriver', price: 19.99, department: 'Hardware', color: 'green', sales: 75, stock: 50 },
  {name: 'Wrench', price: 21.99, department: 'Hardware', color: 'orange', sales: 70, stock: 50}
]
db.products.insert(items)

Update
1.
db.products.update(
  {$set:{department: 'Hardware'}},
  {$set:{department: 'Hardware Tools'}},
  {multi: true}
);

2.
db.products.update(
  if department: 'Hardware Tools'(
  {$inc:{price: 10}},
  {multi: true})
);

3.
db.products.update(
  if sales < 50(
    {sales = 50}
  )
);
4.
db.products.update(
  {$set:{department:'Hardware Tools'}},
  {$set: {department:'Hardware'}},
  {multi:true}
);
5.
db.products.update(
  if department: 'Hardware' (
    {$inc: {price: -10}},
    {multi: true}
  )
);

6.
db.products.update(
  if sales > 10 (
    {sales = 10}
  )
);
7.
db.products.update(
  if department: 'Hardware' (
    {$inc: {sales: 1}}
  )
);

/*Removing products*/
1.
db.products.drop(
  if department: 'Hardware' (
    {products.drop}
  )
);
2.
db.products.drop(
  if department: 'Hardware' (
    {products.drop},
    {multi: true}
  )
);

/*Finding Products */
1.
db.products.find(
  {stock: 0},
  {project: {products:{name}}}
);
2.
db.products.find(
  {price < 100},
  {project: {products:{name}}}
);
3.
db.products.find(
  {(price > 100) && (price < 1000)},
  {project; {products:{name}, products:{color}, products:{department}}}
);
4.
db.products.find(
  {color: 'red'},
  {project: {products: name}}
);
5.
db.products.find(
  {(color:'red') || (color:'blue')},
  {project: {products: id}}
);
6.
db.products.find(
  {(color != 'red') && (color != 'blue')}
  {project: {products: {name}}}
);
7.
db.products.find(
  {(department != 'Sports') && (department != 'Games')}
  {project: {products: {name}}}
);
8.
db.products.find(
  {(name[0]: 'F') && (name[last]: 'S')},
  {project: {products:{name}, products: {price}}}
);
9.
db.products.find{
  {$where name[0] = 'T'},
  {project: {projdcts:{name}}}
};
10.
db.products.find{
  {$where (name[0] = 'F') || (name[last] = 's')},
  {project: {projdcts:{name}}}
};
11.
db.products.find{
  {$where (name[0] = 'T') && (price < 100)},
  {project: {projdcts:{name}}}
};
12.
db.products.find{
  {$where ((name[0] = 'A') && (price >= 100)) || ((name[0] = 'B') && (price <= 100))},
  {project: {projdcts:{name}, products:{price}}}
};

/*aggregating products */
1.
db.products.aggregate(
  {sales: sum(sales)},
  {sort: {department:{name}}}
);
2.
db.products.aggregate(
  {$where: price >= 100},
  {sales: sum(sales)},
  {sort: {department:{name}}}
);
3.
db.products.aggregate(
  {$where: stock = 0},
  {stock: sum(sales)},
  {sort: {department:{name}}}
);
1.
db.products.mapReduce(
  {$where: color = 'red'}
  {color: sum(sales)}
);
2.
db.products.mapReduce(
  {$where: color = 'red'}
  {color: sum(sales)}
);
3.
db.products.mapReduce(
  {group: products}
  {rev = sum(stock) * price}
);
4.
db.products.mapReduce(
  {group: products}
  {rev = sum(stock) * price}
);
1.
db.products.count(
  {products}
);
2.
db.products.count(
  {products: stock: 0}
);
3.
db.products.count(
  {products: stock : 100}
);
4.
db.products.count(
  {products: stock >= 5}
);
5.
db.products.distinct.count(
  {products: names}
);
6.
db.products.distinct.count(
  {products: colors}
);
7.
db.products.group(
  {products: department},
  {products: stock: 0}
);

/*restaurants*/
1.
db.restaurants.find(
  {limit: 5},
  {project: name}
);
2.
db.restaurants.find(
  {grade >= 'B'},
  {project: name}
);
3.
db.restaurants.find(
  {score > 20},
  {project: name}
);
4.
db.restaurants.distince.find(
  {group: cuisine},
  {project: name, address}
);
5.
db.restaurants.find(
  {$where (bourogh: 'Queens') && (cuisine: 'Spanish')},
  {project: name, address}
);
6.
db.restaurants.find(
  {$where (bourogh!= 'Manhattan') && (cuisine != 'Spanish') && (cuisine != 'Bakery') && cuisine != 'Italian') && (cuisine != 'Irish')},
  {project: name, address}
);
7.
db.restaurants.find(
  {$where (grade: 'A') && (cuisine: 'Asian')},
  {limit: 1}
);
