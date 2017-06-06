The MongoDB Restaurants Database

Finding Restaurants

Note that you should use projection
for these queries to filter the returned fields to only those fields described
  in each problem.

Note that queries from these point on may require you to use field path syntax which can be done using dot syntax like this
  "grades.grade"
or "$grades.grade".This is done to target nested documents.

Find the first 5 restaurants returning only the name

db.restaurants.find({}, {
    _id: 0,
    name: 1
  })
  .limit(5)

Find the name of all restaurants with at least 1 grade of A or B

db.restaurants.find({
  "grades.grade": {
    $in: ['A', 'B']
  }
}, {
  _id: 0,
  name: 1
})

Find the name of all restaurants with at least 1 score above 20

db.restaurants.find({
  "grades.score": {
    $gt: 20
  }
}, {
  _id: 0,
  name: 1
})

Find the unique types of cuisine in restaurants in the Bronx

db.restaurants.aggregate(
  [{
      $match: {
        "borough": "Bronx"
      }
    },
    {
      $group: {
        "_id": "$cuisine"
      }
    }
  ]
);

Find all the names and addresses of all the spanish restaurants in Queens

db.restaurants.find({
  $and: [{
      borough: "Queens"
    },
    {
      cuisine: "Spanish"
    }
  ]
}, {
  _id: 0,
  name: 1,
  address: 1
})


Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery,
  Spanish,
  Italian or Irish

db.restaurants.find({
  $and: [{
      borough: "Queens"
    },
    {
      cuisine: {
        $nin: ["Spanish", "Italian", "Irish"]
      }
    }
  ]
}, {
  _id: 0,
  name: 1,
  address: 1
})


Find the name and address of the first alphabetically named Asian restaurant a grade of
  A

db.restaurants.find({
    $where: "this.name[0] === 'A' && this.cuisine === 'Asian'"
  }, {
    _id: 0,
    name: 1,
    address: 1
  })
  .limit(1)


Aggregating Restaurants

List the number of restaurants under each zipcode

db.restaurants.aggregate(
  [{
    $group: {
      "_id": "$address.zipcode",
      "count": {
        $sum: 1
      }
    }
  }]
);


List unique names of all restaurants with at least 1 grade of A or B sorted in
  reverse alphabetical order

db.restaurants.aggregate(
  [{
      $match: {
        "grades.grade": {
          $in: ['A', 'B']
        }
      }
    },
    {
      $group: {
        "_id": "$name"
      }
    }
  ]
);

Aggregating Restaurants with $unwind(Optional)

How to Use $unwind

The following queries will help you get oriented with the $unwind operator.Its purpose is to flatten out nested arrays so
that they can be aggregated
  .Here is a stackoverflow post explaining $unwind with an example.

Your first task is to
try out $unwind to get used to what it does.Execute the following queries in
  your MongoDB shell:

  // ----------------------------------------
  // Remove All Containers
  // ----------------------------------------
  db.containers.remove({});


// ----------------------------------------
// Insert Containers
// ----------------------------------------
db.containers.insert({
  name: "One",
  items: [1, 2, 3]
});

db.containers.insert({
  name: "Two",
  items: [4, 5, 6]
});


// ----------------------------------------
// Unwind Items
// ----------------------------------------
db.containers.aggregate([{
    $unwind: "$items"
  },
  {
    $project: {
      _id: 0,
      name: 1,
      items: 1
    }
  }
]);
The result should look like this:

  // { "name" : "One", "items" : 1 }
  // { "name" : "One", "items" : 2 }
  // { "name" : "One", "items" : 3 }
  // { "name" : "Two", "items" : 4 }
  // { "name" : "Two", "items" : 5 }
  // { "name" : "Two", "items" : 6 }
  As you can see, we have "unwound"
the items of each document so that we have a single document
for each entry in the items array of that document.This allows us to aggregate them:

  db.containers.aggregate([{
      $unwind: "$items"
    },
    {
      $project: {
        _id: 0,
        name: 1,
        items: 1
      }
    },
    {
      $group: {
        _id: "$name",
        sum: {
          $sum: "$items"
        }
      }
    }
  ]);
$unwinding Restaurant Grades

Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:

  Sum the scores
for each restaurant
Sum the scores
for each restaurant show only restaurants with scores above 50
Show a count of each grade
for each restaurant excluding grades of "Not Yet Graded"
Show a count of each grade
for each restaurant excluding entries with only 1 grade
