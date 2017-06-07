## `$unwinding` Restaurant Grades

1. Sum the scores for each restaurant

```js
db.restaurants.aggregate([
    { $unwind: "$grades"},
    { $group: {_id: '$name', sum: {$sum: '$grades.score'}}},
    ])
```

2. Sum the scores for each restaurant show only restaurants with scores above 
50

```js
db.restaurants.aggregate([
    { $unwind: '$grades'},
    { $match: {'grades.score': {$gt: 50}}},
    { $group: {_id: '$name', sum: {$sum: '$grades.score'}}}
    ])
```

3. Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"

```js
db.restaurants.aggregate([
    { $unwind: '$grades'},
    { $match: { 'grades.grade': { $ne: 'Not Yet Graded'}}},
    { $group: {_id: { name: '$name', grade: '$grades.grade' }, sum: {$sum: 1}}},
    { $sort: {'_id.name': 1, '_id.grade': 1}}
    ])
```

4. Show a count of each grade for each restaurant excluding entries with only 1 grade

```js
db.restaurants.aggregate([
    { $project: { gradecount: { $size: "$grades" }, grades: 1, name: 1}},
     { $match: { gradecount: {$gt: 1}}},
         { $unwind: '$grades'},
    { $group: { _id: { name: '$name', grade: '$grades.grade' }, count: {$sum: 1}}},
     { $sort: { '_id.name': 1, '_id.grade': 1}},
    ])
```
