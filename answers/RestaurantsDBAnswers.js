//––––––––––––––––––––––––
//--Finding Restaurants--
//––––––––––––––––––––––––
db.restaurants.aggregate([
  {
    $project: {
      _id: 0,
      name: 1
    }
  },
  { $limit: 5 }
]);

db.restaurants.aggregate([
  {
    $unwind: "$grades"
  },
  {
    $match: {
      $or: [{ "grades.grade": "A" }, { "grades.grade": "B" }]
    }
  },
  {
    $group: {
      _id: "$name"
    }
  }
]);

db.restaurants.aggregate([
  {
    $match: {
      "grades.score": { $gt: 20 }
    }
  },
  {
    $group: {
      _id: "$name"
    }
  }
]);

db.restaurants.aggregate([
  {
    $match: {
      borough: "Bronx"
    }
  },
  {
    $group: {
      _id: "$cuisine"
    }
  }
]);

db.restaurants.aggregate([
  {
    $match: {
      cuisine: "Spanish",
      borough: "Queens"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      address: 1
    }
  }
]);

db.restaurants.aggregate([
  {
    $match: {
      borough: "Manhattan",
      cuisine: { $ne: ["Bakery", "Spanish", "Italian", "Irish"] }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      address: 1
    }
  }
]);

db.restaurants.aggregate([
  {
    $match: {
      cuisine: "Asian",
      "grades.grade": "A"
    }
  },
  {
    $sort: {
      name: 1
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      address: 1
    }
  },
  {
    $limit: 1
  }
]);
//––––––––––––––––––––––––
//--Aggregating Restaurants--
//––––––––––––––––––––––––
db.restaurants.aggregate([
  {
    $group: {
      _id: "$address.zipcode",
      total: { $sum: 1 }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
]);

db.restaurants.aggregate([
  {
    $match: {
      $or: [{ "grades.grade": "A" }, { "grades.grade": "B" }]
    }
  },
  {
    $group: {
      _id: "$name"
    }
  },
  {
    $sort: {
      _id: -1
    }
  }
]);
