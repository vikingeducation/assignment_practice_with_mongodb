// -------------------
// Finding restaurants
// -------------------

// 1. Find the first 5 restaurants returning only the name
db.restaurants.find(
  {},
  { _id: 0, name: 1 }
).limit(5);

// 2. Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find(
  {
    $or: [
      { 'grades.grade': 'A' },
      { 'grades.grade': 'B' }
    ]
  },
  { _id: 0, name: 1 }
);

// 3. Find the name of all restaurants with at least 1 score above 20
db.restaurants.find(
  { 'grades.score': { $gt: 20 } },
  { _id: 0, name: 1 }
);

// 4. Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct('cuisine');

// 5. Find all the names and addresses of all the spanish restaurants in Queens
db.restaurants.find(
  {
    cuisine: { $regex: /spanish/i },
    borough: 'Queens'
  },
  { _id: 0, name: 1, address: 1 }
);

// 6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish
db.restaurants.find(
  {
    borough: 'Manhattan',
    $and: [
      { cuisine: { $ne: { $regex: /Bakery/i } } },
      { cuisine: { $ne: { $regex: /Spanish/i } } },
      { cuisine: { $ne: { $regex: /Italian/i } } },
      { cuisine: { $ne: { $regex: /Irish/i } } }
    ]
  },
  { _id: 0, name: 1, address: 1 }
);

// 7. Find the name and address of the first alphabetically named Asian restaurant a grade of A
// for some reason, putting each method call on its own line, causes a syntax error
db.restaurants.find(
  {
    cuisine: { $regex: /asian/i },
    'grades.grade': 'A'
  },
  { _id: 0, name: 1, address: 1 }
).sort({ name: 1 }).limit(1);

// -----------------------
// Aggregating restaurants
// -----------------------

// 1. List the number of restaurants under each zipcode
db.restaurants.mapReduce(
  function () {
    emit(this.address.zipcode, 1);
  },
  function (k, v) {
    return Array.sum(v);
  },
  { out: { inline: 1 } }
);

// 2. List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.aggregate([
  {
    $match: {
      $or: [
        { 'grades.grade': 'A' },
        { 'grades.grade': 'B' },
      ]
    }
  },
  { $sort: { name: 1 } },
  {
    $group: { _id: '$name' }
  }
]);
