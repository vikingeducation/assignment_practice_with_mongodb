## Finding Restaurants

(Database imported into `restaurants` instead of `products`)

1. Find the first 5 restaurants returning only the name

```js
db.restaurants.find(
    {},
    {_id: 0, name: 1}
    ).limit(5)
```

2. Find the name of all restaurants with at least 1 grade of A or B

```js
db.restaurants.find(
    { "grades.grade": { $in: ['A', 'B'] } },
    { _id: 0, name: 1}
    )
```

3. Find the name of all restaurants with at least 1 score above 20

```js
db.restaurants.find(
    { "grades.score": {$gt: 20}},
    { _id: 0, name: 1}
    )
```

4. Find the unique types of cuisine in restaurants in the Bronx

```js
db.restaurants.distinct('cuisine', {borough: 'Bronx'})
```

5. Find all the names and addresses of all the spanish restaurants in Queens

```js
db.restaurants.find(
    {cuisine: 'Spanish', borough: 'Queens'},
    {_id: 0, name: 1, address: 1}
    )
```

6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

```js
db.restaurants.find(
    {cuisine: { $nin: ['Bakery', 'Spanish', 'Italian', 'Irish']}, borough: 'Manhattan' },
    {_id: 0, name: 1, address: 1}
    )
```

7. Find the name and address of the first alphabetically named Asian restaurant a grade of A

```js
db.restaurants.find(
    { cuisine: 'Asian', 'grades.grade': 'A', name: /^A/},
    { _id: 0, name: 1}
    ).sort({name: 1}).limit(1)
```
