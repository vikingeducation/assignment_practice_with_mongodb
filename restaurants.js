// FINDING RESTAURANTS

// 1.  Find the first 5 restaurants returning only the name

db.restaurants.find({}, { _id: 0, name: 1}).limit(5);

// 2.  Find the name of all restaurants with at least 1 grade of A or B

db.restaurants.find(
  { 
    $or: [
      { "grades.grade": "A" },
      { "grades.grade": "B" }
    ]
  },
  { _id: 0, name: 1 }
);

// 3.  Find the name of all restaurants with at least 1 score above 20

db.restaurants.find(
  {
    "grades.score": { $gt: 20 }
  },
  { _id: 0, name: 1, grades: 1 } 
);

// 4. Find the unique types of cuisine in restaurants in the Bronx

db.restaurants.distinct(
  "cuisine",
  { borough: "Bronx"}
);

// 5. Find all the names and addresses of all the spanish restaurants in Queens

db.restaurants.find(
  { 
    $and: [
      { cuisine: "Spanish"},
      { borough: "Queens"}
    ] 
  },
  { _id: 0, name: 1, address: 1 }
);

// 6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

db.restaurants.find(
  { 
    $and: [
      { cuisine: { $nin: ["Bakery", "Spanish", "Italian", "Irish"] } },
      { borough: "Manhattan" }
    ]
  },
  { _id: 0, name: 1, address: 1 }
);

// 7.  Find the name and address of the first alphabetically named Asian restaurant a grade of A

db.restaurants.find(
  { 
    $and: [
      { cuisine: "Asian" },
      { "grades.grade": "A" }
    ]
  },
  { _id: 0, name: 1, address: 1 }
).sort( { name: 1 })[0];

// AGGREGATE 

// 1.  List the number of restaurants under each zipcode

db.restaurants.aggregate([
  { $group: {_id: "$address.zipcode", count: { $sum: 1 } } },
  { $project: { _id: 1, count: 1} }
]);

// 2.  List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order

db.restaurants.distinct( 
  "name",
  {
    $or: [
      { "grades.grade": "A"},
      { "grades.grade": "B"}
    ] 
  }
).sort().reverse();


