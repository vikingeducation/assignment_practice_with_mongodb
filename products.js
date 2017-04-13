// Insert a product with the following properties

db.products.insert({
    name: "Hammer",
    price: 9.99,
    department: "Hardware",
    color: "red",
    sales: 80,
    stock: 50
});

var prod = [{
    name: "Screwdriver",
    price: 19.99,
    department: "Hardware",
    color: "green",
    sales: 75,
    stock: 50
}, {
    name: "Wrench",
    price: 21.99,
    department: "Hardware",
    color: "orange",
    sales: 70,
    stock: 50
}];

db.products.insert(prod);

// Updating Products

// Note for some of these you may have to refer to update operators like $min and $max.

// Change the department of all products in the "Hardware" department to "Hardware Tools"

db.products.update({
    department: "Hardware"
}, {
    $set: {
        department: "Hardware Tools"
    }
}, {
    multi: true
});

// Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

db.products.update({
    department: "Hardware Tools"
}, {
    $inc: {
        price: 10
    }
}, {
    multi: true
});

// Update the sales of all the products in the "Hardware Tools" department to be at least 50

db.products.update({
    $and: [{
        department: "Hardware Tools"
    }, {
        sales: {
            $lt: 50
        }
    }]
}, {
    $set: {
        sales: 50
    }
}, {
    multi: true
});

// Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

//////////////////****************Renzo Start*******************************//////////////////////////

db.products.update({
    department: "Hardware Tools"
}, {
    $set: {
        department: "Hardware"
    }
}, {
    multi: true
});


// Change the price of all the products in the "Hardware" department to be $10 less than their current price

db.products.update({
    department: "Hardware"
}, {
    $inc: {
        price: -10
    }
}, {
    multi: true
});


// Change the sales of all the products in the "Hardware" department to be at most 10


db.products.update({
    $and: [{
        department: "Hardware"
    }, {
        sales: {
            $gt: 10
        }
    }]
}, {
    $set: {
        sales: 10
    }
}, {
    multi: true
});
// Update the first product in the "Hardware" department to have one more sale

db.products.update({
    department: "Hardware"
}, {
    $inc: {
        sales: 1
    }
});
