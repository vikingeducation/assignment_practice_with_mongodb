//
// The Products Database
// ==================
// Inserting Products

//Insert a product with the following properties:
db.products.insert({
	name: "Hammer",
	price: 9.99,
	department: "Hardware",
	color: "red",
	sales: 80,
	stock: 50
});

//Insert the following products in a single query

var newProducts = [
	{
		name: "Screwdriver",
		price: 19.99,
		department: "Hardware",
		color: "green",
		sales: 75,
		stock: 50
	},
	{
		name: "Wrench",
		price: 21.99,
		department: "Hardware",
		color: "orange",
		sales: 70,
		stock: 50
	}
];

db.products.insert(newProducts);
