1. Change the department of all products in the "Hardware" department to "Hardware Tools"

```js
db.products.update(
    {department: 'Hardware'},
    { $set: {department: 'Hardware Tools'}},
    {multi: true}
    )
```

2. Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

```js
db.products.update(
    {department: 'Hardware Tools'},
    { $inc: {price: 1000}},
    {multi: true}
    )
```

3. Update the sales of all the products in the "Hardware Tools" department to be at least 50

```js
db.products.update(
    {department: 'Hardware Tools'},
    { $min: {sales: 50}},
    {multi: true}
    )
```

4. Change the department of all the products in the "Hardware Tools" department to be "Hardware" again

```js
db.products.update(
    {department: 'Hardware Tools'},
    { $set: {department: 'Hardware'}},
    {multi: true}
    )
```

5. Change the price of all the products in the "Hardware" department to be $10 less than their current price

```js
db.products.update(
    {department: 'Hardware'},
    {$inc: {price: -1000}},
    {multi: true}
    )
```

6. Change the sales of all the products in the "Hardware" department to be at most 10

```js
db.products.update(
    {department: 'Hardware'},
    {$max: {sales: 10}},
    {multi: true}
    )
```

7. Update the first product in the "Hardware" department to have one more sale

```js
db.products.update(
    {department: 'Hardware'},
    {$inc: {sales: 1}}
    )
```
