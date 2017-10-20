//
// The Products Database
// ==================
// Updating Products

//Change the department of all products in the
//"Hardware" department to "Hardware Tools"

db.products.update(
	{ department: "Hardware" },
	{ $set: { department: "Hardware Tools" } },
	{ multi: true }
);

// Change the price of all products in the "Hardware Tools"
// department to cost $10 more than their current price

db.products.update(
	{ department: "Hardware Tools" },
	{ $inc: { price: 10 } },
	{ multi: true }
);

// Update the sales of all the products in the "Hardware Tools"
// department to be at least 50

db.products.update(
	{ department: "Hardware Tools" },
	{ $max: { sales: 50 } },
	{ multi: true }
);

// Change the department of all the products in the "Hardware Tools"
// department to be "Hardware" again

db.products.update(
	{ department: "Hardware Tools" },
	{ $set: { department: "Hardware" } },
	{ multi: true }
);

// Change the price of all the products in the "Hardware"
// department to be $10 less than their current price

db.products.update(
	{ department: "Hardware" },
	{ $inc: { price: -10 } },
	{ multi: true }
);

// Change the sales of all the products in the "Hardware"
// department to be at most 10

db.products.update(
	{ department: "Hardware" },
	{ $min: { sales: 10 } },
	{ multi: true }
);

// Update the first product in the "Hardware" department
// to have one more sale

db.products.update({ department: "Hardware" }, { $inc: { sales: 1 } });
