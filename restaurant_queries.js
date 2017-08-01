// Finding Restaurants

// Find the first 5 restaurants returning only the name
db.restaurants.find(
  {},
  { _id: 0, name: 1}
).limit(5);

// Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find(
  { $or: [{ 'grades.grade': 'A' }, { 'grades.grade': 'B' }] },
  { _id: 0, name: 1 }
);

// Find the name of all restaurants with at least 1 score above 20
db.restaurants.find(
  { 'grades.score': { $gte: 20 } },
  { _id: 0, name: 1 }
);

// Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct("cuisine").sort();

// Find all the names and addresses of all the spanish restaurants in Queens
db.restaurants.find(
  { cuisine: "Spanish", borough: "Queens" },
  { _id: 0, name: 1, address: 1 }
);

// Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish
db.restaurants.find(
  {
    $nor: [ { cuisine: "Bakery" }, { cuisine: "Spanish"}, { cuisine: "Italian" }, { cuisine: "Irish" } ],
    borough: "Manhattan"
  },
  {
    _id: 0,
    name: 1
  }
);

// Find the name and address of the first alphabetically named Asian restaurant with a grade of A
db.restaurants.find(
  { cuisine: "Asian", "grades.grade": "A" },
  { _id: 0, name: 1, address: 1 }
).sort({ name: 1 }).limit(1);


// Aggregating Restaurants

// List the number of restaurants under each zipcode
db.restaurants.aggregate(
  { $group: { _id: "$address.zipcode", num_restaurants: { $sum: 1 } } },
  { $sort: { _id: 1 } }
);

// List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.aggregate(
  { $match: { $or: [{ "grades.grade": "A" }, { "grades.grade": "B" }] } },
  { $group: { _id: "$name" } },
  { $sort: { _id: -1 } }
);


// $unwinding Restaurant Grades
//
// Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:
//

// Sum the scores for each restaurant
db.restaurants.aggregate(
  { $unwind: "$grades" },
  { $group: { _id: "$name", sum_of_scores: { $sum: "$grades.score" } } },
  { $project: { _id: 1, sum_of_scores: 1 } },
  { $sort: { sum_of_scores: -1 } }
);

// Sum the scores for each restaurant show only restaurants with scores above 50
db.restaurants.aggregate(
  { $unwind: "$grades" },
  { $group: { _id: "$name",  sum_of_scores: { $sum: "$grades.score" } } },
  { $match: { sum_of_scores: { $gt: 50 } } },
  { $project: { _id: 1, sum_of_scores: 1 } },
  { $sort: { sum_of_scores: 1 } }
);

// Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"
db.restaurants.aggregate(
  { $unwind: "$grades" },
  { $match: { "grades.grade": { $ne: "Not Yet Graded" } } },
  { $group: { _id: { name: "$name", grade: "$grades.grade" }, total: { $sum: 1 } } },
  { $project: { _id: 1, name: 1, grade: 1, total: 1 } },
  { $sort: { _id: 1 } }
);

// Show a count of each grade for each restaurant excluding entries with only 1 grade
db.restaurants.aggregate(
  { $match: { grades: { $ne: { $size: 1 } } } },
  { $unwind: "$grades" },
  { $group: { _id: {  name: "$name", grade: "$grades.grade" }, total: { $sum: 1 } } },
  { $project: { _id: 1, name: 1, grade: 1, total: 1 } },
  { $sort: { _id: 1 } }
);
