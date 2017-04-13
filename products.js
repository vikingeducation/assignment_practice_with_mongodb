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

//**************** Deleting Documents ********************/////////////////////

// Remove the first product in the "Hardware" department

db.products.remove({
    department: "Hardware"
}, {
    justOne: true
});


// Remove all products in the "Hardware" department

db.products.remove({
    department: "Hardware"
});


/////////////************** Find Functions ***********?////////////////////

// Find the names of all the products that are out of stock

db.products.find({
    stock: 0
}, {
    _id: 0,
    name: 1
});



// Find the stock count of all the products with a price below $100

db.products.find({
    price: {
        $lt: 100
    }
}, {
    _id: 0,
    stock: 1
});


// Find the name, color and department of all the products with a price between $100 and $1000

db.products.find({
    price: {
        $gt: 100,
        $lt: 1000
    }
}, {
    _id: 0,
    name: 1,
    color: 1,
    department: 1
});
// Find the names of all the red products

db.products.find({
    color: "red"
}, {
    _id: 0,
    name: 1
});

// Find only the IDs of all the red and blue products

db.products.find({
    color: {
        $in: ["red", "blue"]
    }
}, {
    _id: 1
});


// Find the names of all the products that are not red or blue

db.products.find({
    color: {
        $nin: ["red", "blue"]
    }
}, {
    _id: 0,
    name: 1
});


// Find the names of all the products that are not in the Sports or Games departments

db.products.find({
    department: {
        $nin: ["Sports", "Games"]
    }
}, {
    _id: 0,
    name: 1
});

// Find the name and price of all the products with names that begin with the letter F and end with the letter S and ignore case

db.products.find({
    name: {
        $regex: /^F.*S$/,
        $options: "i"
    }
}, {
    _id: 0,
    name: 1,
    price: 1
});


// Using $where, find all the product names that begin with T




// Using $where, find all the product names that begin with capital F or end with lowercase S
// Using $where, find all the product names that begin with capital T and have a price less than $100
// Using $where, find all the product names and prices of products that either start with A and have a price of at least $100 or start with B and have a price of at most $100
