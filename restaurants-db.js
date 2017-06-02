// Finding Restaurants
// Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.
// Note that queries from these point on may require you to use field path syntax which can be done using dot syntax like this "grades.grade" or "$grades.grade". This is done to target nested documents.

// 1. Find the first 5 restaurants returning only the name
db.restaurants.aggregate([
  { $project: { _id: 0, name: 1}},
  { $limit: 5 }
]);

// 2. Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find(
  {$or: [
    { 'grades.grade': "A" },
    { 'grades.grade': "B" },
  ]}, 
  {
    _id: 0,
    name: 1
  }
);

// 3. Find the name of all restaurants with at least 1 score above 20
db.restaurants.find(
  { 'grades.score': {$gt: 20} },
  {
    _id: 0,
    name: 1
  }
);

// 4. Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.aggregate([
  { $match: { borough: "Bronx" } },
  { $group: { _id: "$cuisine"} },
  { $sort: { _id: 1 } }
]);

// 5. Find all the names and addresses of all the spanish restaurants in Queens
db.restaurants.find(
  { cuisine: "Spanish" },
  {
    _id: 0,
    name: 1,
    address: 1
  }
);

// 6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish
db.restaurants.find(
  { borough: "Manhattan",
    $and: [
      { cuisine: { $ne: "Bakery" } },
      { cuisine: { $ne: "Spanish" } },
      { cuisine: { $ne: "Italian" } },
      { cuisine: { $ne: "Irish" } }
    ]
  },
  {
    _id: 0,
    name: 1,
    address: 1
  }
);

// 7. Find the name and address of the first alphabetically named Asian restaurant a grade of A
db.restaurants.aggregate([
  { $match: {'grades.grade': "A", cuisine: "Asian"} },
  { $sort: { name: 1 } },
  { $project: { _id: 0, name: 1, address: 1}},
  { $limit: 1}
]);

// Aggregating Restaurants

// 1. List the number of restaurants under each zipcode
db.restaurants.aggregate([
  { $group: { _id: "$address.zipcode", sum: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);


// 2. List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.aggregate([
  { $match: {$or: [
    { 'grades.grade': "A" },
    { 'grades.grade': "B" },
  ]}},
  { $sort: { name: -1 } },
  { $project: { _id: 0, name: 1}}
]);