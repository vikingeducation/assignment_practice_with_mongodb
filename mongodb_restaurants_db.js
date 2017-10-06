Finding Restaurants

#1. Find the first 5 restaurants returning only the name

    db.restaurants.find({},
                        {_id: 0, name: 1}).limit(5);

#2. Find the name of all restaurants with at least 1 grade of A or B

    db.restaurants.find(
      { $or: [{"grades.grade": "A"}, {"grades.grade": "B"}]},
      {_id: 0, name: 1}
    );

#3. Find the name of all restaurants with at least 1 score above 20

    db.restaurants.find(
      {"grades.score": {$gt: 20}},
      {_id: 0, name: 1, "grades.score": 1}
    );

#4. Find the unique types of cuisine in restaurants in the Bronx

    db.restaurants.distinct(
      "cuisine", {"borough": "Bronx"}
    );

#5. Find all the names and addresses of all the spanish restaurants in Queens

    db.restaurants.find(
      { $and: [{"borough": "Queens"}, {"cuisine": "Spanish"}] },
      {_id: 0, name: 1, "address.building": 1, "address.street": 1, "address.zipcode": 1}
    );

#6. Find all the names and addresses of all the restaurants in Manhattan that are not a Bakery, Spanish, Italian or Irish

    db.restaurants.find(
      { $and: [{"cuisine": {$nin:  ["Spanish", "Bakery", "Italian", "Irish"]}}, {"borough": "Manhattan"}] },
      { _id: 0, name: 1, address: 1}
    );

#7. Find the name and address of the first alphabetically named Asian restaurant a grade of A

    db.restaurants.find(
      { $and: [{"cuisine": "Asian"}, {"grades.grade": "A"}] },
      { _id: 0, name: 1, adress: 1 }
    ).sort({name: 1}).limit(1);


Aggregating Restaurants

#1. List the number of restaurants under each zipcode

    db.restaurants.aggregate([
      {$group: { _id: "$address.zipcode", "no_of_restaurants": {$sum: 1}}}
    ]);

#2. List unique names of all restaurants with at least 1 grade of A or B sorted in reverse alphabetical order

    db.restaurants.aggregate([
      { $match: { $or: [ {"grades.grade": "A"}, {"grades.grade": "B"} ] }},
      { $group: { _id: "$name" } },
      { $sort: { _id: -1}}
    ]);


Aggregating Restaurants with $unwind (Optional)

#1. Sum the scores for each restaurant

    db.restaurants.aggregate([
      {$unwind: "$grades"},
      {$group: { _id: "$name", score_sum: {$sum: "$grades.score"}}}
    ]);

#2. Sum the scores for each restaurant show only restaurants with scores above 50

    db.containers.aggregate([
      { $unwind: "$grades" },
      { $project: { _id: 0, name: 1} },
      { $group: { _id: "$name", sum: { $sum: "$grades.score" } } }
    ]);

#3. Show a count of each grade for each restaurant excluding grades of "Not Yet Graded"



#4. Show a count of each grade for each restaurant excluding entries with only 1 grade
