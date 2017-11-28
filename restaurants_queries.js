// ------------------------------------
// Restaurants fields
// ------------------------------------

/* {
  "address": {
      "building": "1007",
      "coord": [-73.856077, 40.848447],
      "street": "Morris Park Ave",
      "zipcode": "10462"
    },
    "borough": "Bronx",
    "cuisine": "Bakery",
    "grades": [
      {"date": {"$date": 1393804800000}, "grade": "A", "score": 2},
      {"date": {"$date": 1378857600000}, "grade": "A", "score": 6},
      {"date": {"$date": 1358985600000}, "grade": "A", "score": 10},
      {"date": {"$date": 1322006400000}, "grade": "A", "score": 9},
      {"date": {"$date": 1299715200000}, "grade": "B", "score": 14}
    ],
    "name": "Morris Park Bake Shop",
    "restaurant_id": "30075445"
} */

// ------------------------------------
// Finding Restaurants
// ------------------------------------
// Note that queries from this point on may require you to use field path syntax which can be done using dot syntax like this "grades.grade" or "$grades.grade". This is done to target nested documents.

// 1. Find the first 5 restaurants returning only the name
db.restaurants.find(
  { },
  { _id:0, name:1 }
).limit(5);


// 2. Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find(
  { $or: [
    { 'grades.grade': 'A'},
    { 'grades.grade': 'B'}
  ]},
  { _id:0, name:1 }
);


// 3. Find the name of all restaurants with at least 1 score above 20
db.restaurants.find(
  { 'grades.score': { $gt: 20} },
  { _id:0, name:1 }
);


// 4. Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct(
  'cuisine',
  { borough: "Bronx" }
);


// 5. Find all the names and addresses of all the Spanish restaurants in Queens
db.restaurants.find(
  { borough: "Queens", cuisine: 'Spanish' },
  { _id:0, name:1, address:1 }
).pretty();


// 6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian, or Irish
db.restaurants.find(
  {
    borough: "Manhattan",
    cuisine: { $nin: ['Bakery', 'Spanish', 'Italian', 'Irish'] }
  },
  { _id:0, name:1, cuisine:1, address:1 }
).pretty();


// 7. Find the name and address of the first alphabetically named Asian restaurant a grade of A
db.restaurants.find(
  { cuisine: 'Asian', 'grades.grade': 'A' },
  { _id:0, name:1, address:1 }
).sort({name: 1}).limit(1).pretty();

// checking results
db.restaurants.find(
  { name: '100 Fun' },
  { _id:0, name:1, grades:1 }
);


// ------------------------------------
// Aggregating Restaurants
// ------------------------------------

// 1. List the number of restaurants under each zipcode
db.restaurants.aggregate([
  { $group: {
    _id: '$address.zipcode', qty: { $sum: 1 }
  }}
]);


// 2. List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.aggregate([
  { $match: {
    $or: [
      {'grades.grade': 'A'},
      {'grades.grade': 'B'}
    ]
  }},
  { $group: { _id: '$name' } },
  { $sort: {_id: -1}}
]);


/* Aggregating Restaurants with $unwind (Optional) */

// How to Use $unwind
// The following queries will help you get oriented with the $unwind operator. Its purpose is to flatten out nested arrays so that they can be aggregated.

// A. Remove All Containers
db.containers.remove({});

// B. Insert Containers
db.containers.insert({
  name: "One",
  items: [1, 2, 3]
});

db.containers.insert({
  name: "Two",
  items: [4, 5, 6]
});

// C. Unwind Items
db.containers.aggregate([
  { $unwind: "$items" },
  { $project: { _id: 0, name: 1, items: 1 } }
]);

// D. Aggregate the items
db.containers.aggregate([
  { $unwind: "$items" },
  { $project: { _id: 0, name: 1, items: 1 } },
  { $group: { _id: "$name", sum: { $sum: "$items" } } }
]);


// ------------------------------------
// $unwinding Restaurant Grades
// ------------------------------------
// Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:

// 1. Sum the scores for each restaurant
// solution 1
db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $group: {
    _id: {
      name: "$name",
      sum: { $sum: "$grades.score" }
    }
  }},
  { $project: { '_id.name': 1, '_id.sum': 1 } },
  { $sort: {_id: 1}}
]);

// solution 2
db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $group: {
    _id: "$name",
    sum: { $sum: "$grades.score" }
  }},
  { $project: { _id: 1, sum: 1 } },
  { $sort: {_id: 1}}
]);


// 2. Sum the scores for each restaurant show only restaurants with scores above 50
db.restaurants.aggregate([
  { $match: { 'grades.score': {$gt: 50}} },
  { $unwind: "$grades" },
  { $group: {
    _id: "$name",
    sum: { $sum: "$grades.score" }
  }},
  { $project: { _id: 1, sum: 1 } },
  { $sort: {_id: 1}}
]);


// 3. Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"
db.restaurants.aggregate([
  { $match: { 'grades.score': {$ne: "Not Yet Graded"}} },
  { $unwind: "$grades" },
  { $group: {
    _id: {
      name: "$name",
      grade: "$grades.grade",
    },
    sum: { $sum: 1 }
  }},
  { $project: { name: 1, grade: 1, sum: 1 } },
  { $sort: {_id: 1}}
]);


// 4. Show a count of each grade for each restaurant excluding entries with only 1 grade
db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $group: {
    _id: {
      name: "$name",
      grade: "$grades.grade",
    },
    sum: { $sum: 1 }
  }},
  { $match: { sum: {$ne: 1 } } },
  { $project: { name: 1, grade: 1, sum: 1 } },
  { $sort: {_id: 1}}
]);
