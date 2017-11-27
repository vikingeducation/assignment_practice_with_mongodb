// ------------------------------------
// Restaurants fields
// ------------------------------------

/* {
  "address": {
      "building": "1007",
      "coord": [-73.856077, 40.848447],
      "street": "Morris Park Ave",
      "zipcode": "10462"
    },
    "borough": "Bronx",
    "cuisine": "Bakery",
    "grades": [
      {"date": {"$date": 1393804800000}, "grade": "A", "score": 2},
      {"date": {"$date": 1378857600000}, "grade": "A", "score": 6},
      {"date": {"$date": 1358985600000}, "grade": "A", "score": 10},
      {"date": {"$date": 1322006400000}, "grade": "A", "score": 9},
      {"date": {"$date": 1299715200000}, "grade": "B", "score": 14}
    ],
    "name": "Morris Park Bake Shop",
    "restaurant_id": "30075445"
} */

// ------------------------------------
// Finding Restaurants
// ------------------------------------
// Note that queries from these point on may require you to use field path syntax which can be done using dot syntax like this "grades.grade" or "$grades.grade". This is done to target nested documents.

// 1. Find the first 5 restaurants returning only the name

// 2. Find the name of all restaurants with at least 1 grade of A or B

// 3. Find the name of all restaurants with at least 1 score above 20

// 4. Find the unique types of cuisine in restaurants in the Bronx

// 5. Find all the names and addresses of all the Spanish restaurants in Queens

// 6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

// 7. Find the name and address of the first alphabetically named Asian restaurant a grade of A

/*  --------- Aggregating Restaurants --------- */
List the number of restaurants under each zipcode
List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order
Aggregating Restaurants with $unwind (Optional)

How to Use $unwind

The following queries will help you get oriented with the $unwind operator. Its purpose is to flatten out nested arrays so that they can be aggregated. Here is a StackOverflow post explaining $unwind with an example.

Your first task is to try out $unwind to get used to what it does. Execute the following queries in your MongoDB shell:

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
db.containers.aggregate([
  { $unwind: "$items" },
  { $project: { _id: 0, name: 1, items: 1 } }
]);
The result should look like this:

// { "name" : "One", "items" : 1 }
// { "name" : "One", "items" : 2 }
// { "name" : "One", "items" : 3 }
// { "name" : "Two", "items" : 4 }
// { "name" : "Two", "items" : 5 }
// { "name" : "Two", "items" : 6 }
As you can see, we've "unwound" the items of each document so that we have a single document for each entry in the items array of that document. This allows us to aggregate them:

db.containers.aggregate([
  { $unwind: "$items" },
  { $project: { _id: 0, name: 1, items: 1 } },
  { $group: { _id: "$name", sum: { $sum: "$items" } } }
]);
$unwinding Restaurant Grades

Use $unwind to deconstruct subarrays in the restaurants database to perform the following queries:

Sum the scores for each restaurant
Sum the scores for each restaurant show only restaurants with scores above 50
Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"
Show a count of each grade for each restaurant excluding entries with only 1 grade
Finishing Up

When you're finished with all tasks, push your changes up to your fork (aka $ git push origin master).
To submit your assignment, create a pull request from your fork to the main upstream repository.

