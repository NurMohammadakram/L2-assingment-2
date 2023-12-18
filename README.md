# Getting started

## To start the project in Development

    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts"

## To start the project in production

    "start": "node dist/server.js"

## To convert typeScript to Js

    "build": "tsc",

# API request endPoints

## Creating a new user

    send a POST request.
    api end points: POST /api/users

## Getting all user

    send a GET request
    api end points: GET /api/users

## Get a single user by it's userId

    send a GET request.
    api end points: GET /api/users/:userId

## Update a user

    send a POST request.
    api end points: POST /api/users/:userId

## Delete a user

    send a DELETE request.
    api end points: DELETE /api/users/:userId

## Adding new product for user orders

    send a PUT request.
    api end points: PUT /api/users/:userId/orders

## Get all the orders of a user

    send a GET request.
    api end points: GET /api/users/:userId/orders

## Calculating total price of a user orders

    send a GET request.
    api end points: GET /api/users/:userId/orders/total-price
