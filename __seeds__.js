// ----------------------------------------
// **NOTE** Don't run this file unless you
// wish to rewrite __products__.js!!!!!!!!
// ----------------------------------------


var fs = require('fs');
var faker = require('faker'); //<< Must be installed globally with NPM


var createProduct = () => {
  return {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    department: faker.commerce.department(),
    color: faker.commerce.color(),
    sales: faker.random.number({ min: 0, max: 100 }),
    stock: faker.random.number({ min: 0, max: 100 })
  };
};


var NUM_PRODUCTS = 1000;
var path = './__products__.js';


var data = [];
var i = NUM_PRODUCTS;
while (i--) {
  data.push(createProduct());
}


fs.truncateSync(path);
data.forEach((item) => {
  fs.appendFileSync(
    path,
    `${ JSON.stringify(item) }\n`
  );
})


