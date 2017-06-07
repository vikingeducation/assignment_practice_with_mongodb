## Aggregating Restaurants

1. List the number of restaurants under each zipcode

```js
db.restaurants.aggregate([
  {$match: {'address.zipcode': {$ne: ''} } },
  {$group: {_id: '$address.zipcode', count: {$sum: 1}}},
  {$sort: {_id: 1}}
  ])
```

2. List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order

```js
db.restaurants.aggregate([
  { $match: {'grades.grade': {$in: ['A', 'B']}}},
  {$group: { _id: '$name'}},
  { $sort: {_id: -1}}
  ]
  )
```
