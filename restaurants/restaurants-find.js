//
// The Products Database
// ==================
// Single-Purpose-Aggregation Products

// Find the first 5 restaurants returning only the name
db.restaurants
	.find(
		{},
		{
			_id: 0,
			name: 1
		}
	)
	.limit(5);

// Find the name of all restaurants with at least 1 grade of A or B

db.restaurants.find(
	{ "grades.grade": "A" },
	{
		_id: 0,
		name: 1
	}
);

// Find the name of all restaurants with at least 1 score above 20

db.restaurants.find(
	{ "grades.score": { $gte: 20 } },
	{
		_id: 0,
		name: 1
	}
);

// Find the unique types of cuisine in restaurants in the Bronx

db.restaurants.find(
	{ borough: "Bronx" },
	{
		_id: 0,
		cuisine: 1
	}
);

// Find all the names and addresses of all the Spanish restaurants in Queens

db.restaurants.find(
	{
		borough: "Queens",
		cuisine: "Spanish"
	},
	{
		_id: 0,
		cuisine: 1,
		name: 1
	}
);

// Find all the names and addresses of all the restaurants in Manhattan
// that are not a Bakery, Spanish, Italian or Irish

db.restaurants.find(
	{
		borough: "Manhattan",
		$nor: [
			{ cuisine: "Spainish" },
			{ cuisine: "Italian" },
			{ cuisine: "Irish" },
			{ cuisine: "Bakery" }
		]
	},
	{
		_id: 0,
		name: 1,
		address: 1
	}
);

// Find the name and address of the first alphabetically named
// Asian restaurant a grade of A

db.restaurants
	.find(
		{
			cuisine: "Asian",
			"grades.grade": "A"
		},
		{
			_id: 0,
			cuisine: 1,
			name: 1
		}
	)
	.sort({ name: 1 })
	.limit(1);
