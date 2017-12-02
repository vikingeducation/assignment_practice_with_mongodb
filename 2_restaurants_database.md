### Finding Restaurants

Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

Note that queries from these point on may require you to use field path syntax which can be done using dot syntax like this "grades.grade" or "$grades.grade". This is done to target nested documents.

1. Find the first 5 restaurants returning only the name

```
db.restaurants.find({},{name:1, _id:0}).limit(5);
```

2. Find the name of all restaurants with at least 1 grade of A or B

```
db.restaurants.find({$or: [{"grades.grade": 'A'}, {"grades.grade": 'B'}]},{name:1, _id: 0});
```

3. Find the name of all restaurants with at least 1 score above 20

```
db.restaurants.find({"grades.score": {$gt: 20}},{name:1, _id: 0});
```

4. Find the unique types of cuisine in restaurants in the Bronx

```
db.restaurants.aggregate([
{$match: {borough: "Bronx"}},
{$group: {_id: "$cuisine"}}
]);
```

5. Find all the names and addresses of all the Spanish restaurants in Queens

```
db.restaurants.find({borough: "Queens"},{name: 1, address:1, _id:0}).pretty();
```

6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

```
db.restaurants.find({$and: [{borough: "Manhattan"},{cuisine: {$nin: ['Bakery','Spanish','Italian','Irish']}}]},{name: 1, address:1, _id:0});
```

7. Find the name and address of the first alphabetically named Asian restaurant a grade of A

```
db.restaurants.aggregate([
{$match: {"grades.grade": "A", cuisine: "Asian"}},
{$sort: {name:1}},
{$project: {name: 1, address: 1, _id: 0}},
{$limit:1}
]);
```
