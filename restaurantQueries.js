// -----------------------------
// Finding Restaurants
// -----------------------------

// 1. Find the first 5 restaurants returning only the name
db.restaurants.find(
  {}, { _id: 0, name: 1 }
).limit(5);

// 2. Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find(
  { "grades.grade": { $in: ['A', 'B'] } },
  { _id: 0, name: 1 }
);

// 3. Find the name of all restaurants with at least 1 score above 20
db.restaurants.find(
  { "grades.score": { $gt: 20 } },
  { _id: 0, name: 1 }
);

// 4. Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct("cuisine").sort();

// 5. Find all the names and addresses of all the Spanish restaurants in Queens
db.restaurants.find(
  { cuisine: "Spanish", borough: "Queens" },
  { _id: 0, name: 1, address: 1 }
);

// 6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish
db.restaurants.find(
  { cuisine: { $nin: ["Bakery", "Spanish", "Italian", "Irish"] } },
  { _id: 0, name: 1, address: 1 }
);

// 7. Find the name and address of the first alphabetically named Asian restaurant a grade of A
db.restaurants.find(
  { cuisine: "Asian" },
  { _id: 0, name: 1, address: 1 }
).sort({name: 1}).limit(1);

// -----------------------------
// Aggregating Restaurants
// -----------------------------

// 1. List the number of restaurants under each zipcode
db.restaurants.aggregate([
  {$group: {
    _id: "$address.zipcode",
    count: { $sum: 1 }
  }},
]);

// 2. List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.aggregate([
  {$match: {
    "grades.grade": { $in: ['A', 'B'] }
  }},
  {$group: {
    _id: "$name"
  }},
  {$sort: {
    _id: -1
  }}
]);


// ------------------------------------
// Aggregating Restaurants with $unwind
// ------------------------------------

// 1. Sum the scores for each restaurant
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$group: { _id: "$name", total_scores: { $sum: "$grades.score" } } }
]);

// 2. Sum the scores for each restaurant show only restaurants with scores above 50
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$group: { _id: "$name", total_scores: { $sum: "$grades.score" } } },
  {$match: {total_scores: { $gt: 50 }} }
]);

// 3. Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$match: {'grades.score': { $ne: "Not Yet Graded" } } },
  {$group: { _id: "$name", count: {$sum: 1}  }},
  {$sort: {count: -1}}
]);

// 4. Show a count of each grade for each restaurant excluding entries with only 1 grade
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$group: { _id: "$name", count: {$sum: 1}  }},
  {$match: {'count': { $ne: 1 } } }
]);
