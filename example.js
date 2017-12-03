db.world.find(
  {
    $or: [{ population: { $lt: 20000 } }, { population: { $gt: 200000000 } }]
  },
  { name: 1, population: 1, _id: 0 }
);
