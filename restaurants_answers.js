Finding Restaurants

// 1. Find the first 5 restaurants returning only the name
db.restaurants.find({}, {_id: 0, name: 1}).limit(2);
// 2. Find the name of all restaurants with at least 1 grade of A or B
db.restaurants.find(
  {$or: [{"grades.grade": "A"}, {"grades.grade": "B"}]}
);

// 3. Find the name of all restaurants with at least 1 score above 20
db.restaurants.find(
{"grades.score": { $gt: 20 }}, {_id: 0, name: 1}
);
// 4. Find the unique types of cuisine in restaurants in the Bronx
db.restaurants.distinct("cuisine")
// 5. Find all the names and addresses of all the Spanish restaurants in Queens
db.restaurants.find(
  {cuisine: "Spanish", borough: "Queens"},
  {_id: 0, name: 1, address: 1}
);
// 6. Find all the names and addresses of all the restaurants in Manhattan that
// are not a Bakery, Spanish, Italian or Irish
db.restaurants.find(
  { $or: [
    {cuisine:  {$ne:"Spanish"}},
    {cuisine: {$ne: "Bakery"}},
    {cuisine: {$ne: "Italian"}},
    {cuisine: {$ne: "Irish"}}],borough: "Manhattan"},
  {_id: 0, name: 1, address: 1}
);
// 7. Find the name and address of the first alphabetically named Asian restaurant a grade of A
db.restaurants.findOne(
  {cuisine: "Asian", name: }, {_id: 0, name: 1, address: 1}
)

// Aggregating Restaurants

// 1 List the number of restaurants under each zipcode
db.restaurants.mapReduce(
  function() {emit(this.address.zipcode, 1);},
  function(k,v) {return Array.sum(v)},
  {out:{inline:1}}
);
// 2 List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
db.restaurants.find(
  {$or: [{"grades.grade": "A"},
    {"grades.grade": "B"}]},
  {_id: 0, name: 1}
).sort({name: -1});

//
// $unwinding Restaurant Grades
//

// 1 Sum the scores for each restaurant
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$project: {_id: 0, name: 1, "grades.score": 1}},
  {$group: {_id: "$name", sum: {$sum: "$grades.score"}}}
]);

// 2 Sum the scores for each restaurant
// show only restaurants with scores above 50
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$project: {_id: 0, name: 1, "grades.score": 1}},
  {$match: {"grades.score": {$gt: 50}}},
  {$group: {_id: "$name", sum: {$sum: "$grades.score"}}}
]);

// 3 Show a count of each grade for each
// restaurant excluding grades of "Not Yet Graded"
db.restaurants.aggregate([
  {$unwind: "$grades"},
  {$project: {_id: 0, name: 1, "grades.grade": 1}},
  {$match: {"grades.grade": {$ne: "Not Yet Graded"}}},
  {$group: {_id: {name: "$name", grade: "$grade"}, sum: {$sum: }}}
]);
**********
{$group: {_id: null, name: {"$name"}, grade: {"$grades.grade"}, count: {$sum: 1}}}
// 4 Show a count of each grade for each
// restaurant excluding entries with only 1 grade
