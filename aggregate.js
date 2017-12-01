db.world.aggregate([
  {
    $match: {
      population: { $gte: 200000000 }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      "per capita GDP": { $divide: ["$gdp", "$population"] }
    }
  }
]);

db.world.aggregate([
  { $match: { continent: "South America" } },
  {
    $project: {
      _id: 0,
      name: 1,
      density: { $divide: ["$population", "$area"] }
    }
  }
]);

db.world.aggregate([
  { $match: { area: { $gt: 0 } } },
  { $match: { name: { $gt: "V" } } },
  {
    $project: {
      _id: 0,
      name: 1,
      density: { $divide: ["$population", "$area"] }
    }
  }
]);

db.world.aggregate([
  { $match: { continent: "South America" } },
  {
    $project: {
      _id: 0,
      name: 1,
      population: { $divide: ["$population", 1000000] }
    }
  }
]);

db.world.aggregate([
  {
    $match: {
      name: { $in: ["France", "Germany", "Italy"] },
      population: { $ne: null },
      area: { $ne: 0 }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1
    }
  }
]);

db.world.aggregate([
  {
    $match: {
      name: { $in: ["France", "Germany", "Italy"] },
      population: { $ne: null },
      area: { $ne: 0 }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      "population density": { $divide: ["$population", "$area"] }
    }
  }
]);

db.world.aggregate([
  {
    $group: {
      _id: "$continent",
      area: { $sum: "$area" }
    }
  },
  {
    $sort: {
      area: -1
    }
  },
  {
    $project: {
      _id: 1,
      area: 1
    }
  }
]);

db.world.aggregate([
  {
    $group: {
      _id: "$continent",
      area: { $sum: "$area" }
    }
  },
  {
    $match: {
      area: { $gt: 25000000 }
    }
  },
  {
    $sort: {
      area: -1
    }
  },
  {
    $project: {
      _id: 1,
      area: 1
    }
  }
]);

db.world.aggregate([
  {
    $group: {
      _id: "$continent",
      from: { $min: "$name" },
      to: { $max: "$name" }
    }
  },
  {
    $sort: {
      _id: 1
    }
  },
  {
    $project: {
      _id: 1,
      from: 1,
      to: 1
    }
  }
]);

db.world.aggregate([
  {
    $group: {
      _id: {
        $cond: [
          { $eq: ["$continent", "North America"] },
          "America",
          {
            $cond: [
              { $eq: ["$continent", "South America"] },
              "America",
              "$continent"
            ]
          }
        ]
      },
      area: { $sum: "$area" }
    }
  },
  {
    $sort: {
      area: -1
    }
  },
  {
    $project: {
      _id: 1,
      area: 1
    }
  }
]);
