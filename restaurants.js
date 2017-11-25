// Finding Restaurants
// 1.
db.restaurants.find({}, { _id: 0, name: 1 }).limit(5);

// 2.
db.restaurants.find(
  {
    $or: [{ 'grades.grade': 'A' }, { 'grades.grade': 'B' }]
  },
  { _id: 0, name: 1 }
);

// 3.
db.restaurants.find({ 'grades.score': { $gt: 20 } }, { _id: 0, name: 1 });

// 4.
db.restaurants.distinct('cuisine', { borough: 'Bronx' });

// 5.
db.restaurants.find(
  {
    $and: [{ cuisine: 'Spanish' }, { borough: 'Queens' }]
  },
  { _id: 0, name: 1, address: 1 }
);

// 6.
db.restaurants.find(
  {
    borough: 'Manhattan',
    $nor: [
      { cuisine: 'Bakery' },
      { cuisine: 'Spanish' },
      { cuisine: 'Italian' },
      { cuisine: 'Irish' }
    ]
  },
  { _id: 0, name: 1, address: 1 }
);

// 7.
db.restaurants.find(
  {
    cuisine: 'Asian',
    'grades.grade': 'A'
  },
  { _id: 0, name: 1, address: 1 }
).sort({ name: 1 }).limit(1);

// Aggregating Restaurants
// 1.
db.restaurants.aggregate([
  { $group: {
    _id: '$address.zipcode',
    total: { $sum: 1 } }
  }
]);

// 2.
db.restaurants.aggregate([
  {
    $match: {
      $or: [{ 'grades.grade': 'A' }, { 'grades.grade': 'B' }]
    }
  },
  {
    $group: {
      _id: '$name',
      unique_names: { $addToSet: '$name' }
    }
  },
  {
    $sort: { unique_names: -1 }
  },
  {
    $project: {
      _id: 0,
      unique_names: 1
    }
  }
]);

// Alternative solution
db.restaurants.distinct(
  'name',
  { $or: [
    { 'grades.grade': 'A' }, { 'grades.grade': 'B' }
  ]}
).sort().reverse();

// Aggregating Restaurants with $unwind
// 1.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $group: {
    _id: '$name',
    sum_of_scores: { $sum: '$grades.score' } }
  },
  { $project: { sum_of_scores: 1 } }
]);

// 2.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $group: {
    _id: '$name',
    sum_of_scores: { $sum: '$grades.score' } }
  },
  { $match: { sum_of_scores: { $gt: 50 } } },
  { $project: { sum_of_scores: 1 } }
]);

// 3.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $match: { 'grades.grade': { $ne: 'Not Yet Graded' } } },
  { $group: {
    _id: {
      name: '$name',
      grade: '$grades.grade'
    },
    count: { $sum: 1} }
  },
  { $project: { name: 1, grade: 1, count: 1 } }
]);

// 4.
db.restaurants.aggregate([
  { $match: { 'grades.1': { $exists: true } } },
  { $unwind: '$grades' },
  { $group: {
    _id: {
      name: '$name',
      grade: '$grades.grade'
    },
    count: { $sum: 1} }
  },
  { $project: { name: 1, grade: 1, count: 1 } }
]);
