db.world.find({name:'Germany'});

db.world.find({continent:'Eurasia'}).pretty();

db.world.find({area:43094}).pretty();

db.world.find(
    {population:{$gt:250000000}},
    {name:1,_id:0}
).pretty();

db.world.find({ name: { $regex: /^[S-Z]/ } },
{name:1, _id:0});

db.world.find({population:{$gt:70000000}},
{name:1, capital:1, _id:0});

db.world.find({$or:[{population:{$gt:200000000}},
                    {population:{$lt:20000}}]},
              {name:1,population:1,_id:0});


//Aggregations:
db.world.aggregate([
    {$match:{
        population:{$gte:200000000}
    }},
    {$project:{
        _id:0,
        name:1,
        "per capita GDP": {$divide: ['$gdp','$population']}
    }}
]);

db.world.aggregate([
    {$match:{continent:'South America'}},
    {$project:{
        _id:0,
        name:1,
        density: {$divide: ["$population","$area"]}
    }},
]);

db.world.aggregate([
    {$match:{continent:'South America'

    }},
    {$project:{
        _id:0,
        name:1,
        population:{$divide:["$population", 1000000]}
    }}
]);

db.world.aggregate([
    {$match:{
        name: {$in:['France','Germany','Italy']},
        population: {$ne: null},
        area: {$ne: 0}
    }},
    {$project:{
        _id:0,
        name:1,
        'population density':{$divide:["$population", "$area"]}
    }}
]);

db.world.aggregate([
    {$group:{
        _id:"$continent",
        area:{$sum: "$area"}
    }},
    {$sort:{
        area: -1
    }},
    {$project:{
        _id:1,
        area:1
    }}
]);

db.world.aggregate([
  {$group:{
        _id:"$continent",
        area:{$sum: "$area"}
    }},
    {$sort:{
        area: -1
    }},
    {$limit:2},
  {$project:{
      _id:1,
      area:1,
  }}
]);

//Map Reduce
db.world.mapReduce(
   function(){emit(this.continent,this.population);},
   function(k,v){return Array.sum(v);},
   {out:{inline:1}}
);

db.world.mapReduce(
   function(){emit(1,this.population);},
   function(k,v){return Array.sum(v);},
   {out:{inline:1}}
);

db.world.mapReduce(
   function(){emit(this.continent,1);},
   function(k,v){return Array.sum(v);},
   {out:{inline:1}}
);

db.world.mapReduce(
   function(){emit(this.name[0], 1);},
   function(k,v){return Array.sum(v);},
   {out:{inline:1}}
);

db.world.mapReduce(
   function(){if (this.population>100000000){emit(1,1)}},
   function(k,v){return Array.sum(v);},
   {out:{inline:1}}
);
