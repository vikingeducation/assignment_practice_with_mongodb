//
// The Products Database
// ==================
// Removing Products

//Remove the first product in the "Hardware" department

db.products.remove({ department: "Hardware" }, { justOne: true });

//Remove all products in the "Hardware" department

db.highscores.remove({ department: "Hardware" });
