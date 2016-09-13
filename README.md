OPToilet
========


# 0. API
```
GET http://localhost:3000/api/toilets/
POST http://localhost:3000/api/toilets/
GET http://localhost:3000/api/toilets/:id
PUT http://localhost:3000/api/toilets/:id
DELETE http://localhost:3000/api/toilets/:id
POST http://localhost:3000/api/toilets/:id/pend

GET http://localhost:3000/api/rooms/
POST http://localhost:3000/api/rooms/
GET http://localhost:3000/api/rooms/:id
PUT http://localhost:3000/api/rooms/:id
DELETE http://localhost:3000/api/rooms/:id

GET http://localhost:3000/api/toilets/search?current_floor=1&gender=female
```


# 1. Installation

## install dependencies
```
$ npm install
```

## create database
```
$ sudo mysql.server start
$ mysql -u root
mysql> create database `optoilet_development` 
```

## database migration
```
$ npm run sync
```

## start server
```
$ npm run start
```


