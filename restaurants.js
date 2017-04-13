Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:

Sum the scores for each restaurant

db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $project: { _id: 0, name: 1 } },
  { $group: { _id: "$grades", sum: { $sum: "$score" } } }
]);
