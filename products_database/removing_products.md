## Removing Products


1. Remove the first product in the "Hardware" department

```js
db.products.remove(
    {department: 'Hardware'},
    {justOne: true}
    )
```

2. Remove all products in the "Hardware" department

```js
db.products.remove(
    {department: 'Hardware'}
    )
```