Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:

Sum the scores for each restaurant

db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$name", sum: { $sum: "$grades.score" } } }
]);
