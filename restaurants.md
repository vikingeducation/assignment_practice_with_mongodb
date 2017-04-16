## Restaurants

Find the first 5 restaurants returning only the name

```javascript
db.restaurants.find(
  {},
  { _id: 0, name: 1 }
).limit(5);
```

Find the name of all restaurants with at least 1 grade of A or B

```javascript
db.restaurants.find(
  { $or: [
    { "grades.grade": 'A' },
    { "grades.grade": 'B' },
  ]},
  { _id: 0, name: 1 }
);
```

Find the name of all restaurants with at least 1 score above 20

```javascript
db.restaurants.find(
  { "grades.score": { $gt: 20 } },
  { _id: 0, name: 1 }
);

```

Find the unique types of cuisine in restaurants in the Bronx

```javascript
db.restaurants.distinct("cuisine");
```

Find all the names and addresses of all the spanish restaurants in Queens

```javascript
db.restaurants.find(
  { $and: [
    { cuisine: "Spanish" },
    { borough: "Queens" }
  ]},
  { _id: 0, name: 1, address: 1 }
);
```

Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

```javascript
db.restaurants.find(
  { $and: [
    { borough: 'Manhattan' },
    { $nor: [
      { cuisine: 'Bakery' },
      { cuisine: 'Spanish' },
      { cuisine: 'Italian' },
      { cuisine: 'Irish' },
    ]}
  ]},
  { _id: 0, name: 1, address: 1 }
);
```

Find the name and address of the first alphabetically named Asian restaurant a grade of A

```javascript
db.restaurants.find(
  { $and: [
    { cuisine: 'Asian' },
    { 'grades.0.grade': 'A' }
  ]},
  { _id: 0, name: 1, address: 1 }
).sort({ name: 1 }).limit(1);
```

### Aggregating Restaurants

List the number of restaurants under each zipcode

```javascript
db.restaurants.group({
  key: { 'address.zipcode': 1 },
  reduce: function(curr, result) { result.count += 1; },
  initial: { count: 0 }
});
```

List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order

```javascript
db.restaurants.aggregate(
  { $match:
    { $or: [
      { 'grades.grade': 'A' },
      { 'grades.grade': 'B' }
    ]}
  },
  { $group: { _id: '$name' } },
  { $sort: { _id: -1 } }
);
```

### $unwinding Restaurant Grades

Sum the scores for each restaurant

```javascript
db.restaurants.aggregate(
  { $unwind: '$grades' },
  { $group:
    {
      _id: '$restaurant_id',
      name: { $first: '$name' },
      'total score': { $sum: '$grades.score' }
    }
  },
  { $project: { _id: 0, name: 1, 'total score': 1 } }
);
```

Sum the scores for each restaurant show only restaurants with scores above 50

```javascript
db.restaurants.aggregate(
  { $unwind: '$grades' },
  { $group:
    {
      _id: '$restaurant_id',
      name: { $first: '$name' },
      'total score': { $sum: '$grades.score' }
    }
  },
  { $match: { 'total score': { $gt: 50 } } },
  { $project: { _id: 0, name: 1, 'total score': 1 } }
);
```

Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"

```javascript
db.restaurants.aggregate(
  { $unwind: '$grades' },
  { $match:
    { 'grades.grade': { $ne: 'Not Yet Graded'} }
  },
  { $group:
    {
      _id: '$restaurant_id',
      name: { $first: '$name' },
      'grade count': { $sum: 1 }
    }
  },
  { $project: { _id: 0, name: 1, 'grade count': 1 } },
  { $sort: { 'grade count': -1 } }
);
```

Show a count of each grade for each restaurant excluding entries with only 1 grade

```javascript
db.restaurants.aggregate(
  { $unwind: '$grades' },
  { $group:
    {
      _id: '$restaurant_id',
      name: { $first: '$name' },
      'grade count': { $sum: 1 }
    }
  },
  { $match:
    { 'grade count': { $ne: 1 } }
  },
  { $project: { _id: 0, name: 1, 'grade count': 1 } },
  { $sort: { 'grade count': 1 } }
);
```
