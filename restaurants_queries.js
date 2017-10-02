Finding Restaurants

Note that you should use projection for these queries to filter the returned fields to only those fields described in each problem.

Note that queries from these point on may require you to use field path syntax which can be done using dot syntax like this "grades.grade" or "$grades.grade". This is done to target nested documents.


Find the first 5 restaurants returning only the name
db.restaurants.find({}, {_id:0, name:1}).limit(5);

Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find({grades: {$elemMatch: {$or: [ {grade: 'A'}, {grade: 'B'} ] }}}, {_id:0, name:1});

Find the name of all restaurants with at least 1 score above 20
db.restaurants.find({grades: {$elemMatch: {score: {$gt: 20}}}}, {_id:0, name:1});

Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct("cuisine", {borough: "Bronx"});

Find all the names and addresses of all the spanish restaurants in Queens
db.restaurants.find({borough: "Queens", cuisine: "Spanish"}, {_id:0, name:1, address: 1});

Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish
db.restaurants.find({cuisine: {$nin: ["Bakery", "Spanish", "Italian", "Irish"]}}, {_id:0, name:1, address:1});

Find the name and address of the first alphabetically named Asian restaurant a grade of A
db.restaurants.find({grades: {$elemMatch: {grade: 'A'}}}, {_id:0, name:1, address:1}).limit(1).sort({name: 1});

Aggregating Restaurants

List the number of restaurants under each zipcode
db.restaurants.aggregate([
  { $group: {_id: "$address.zipcode", sum: {$sum: 1}}}
]);

List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.aggregate([
  { $match: {grades: {$elemMatch: {$or: [ {grade: 'A'}, {grade: 'B'} ] }}}},
  { $group: {_id: "$name"}},
  { $sort: {_id: -1}}
]);
