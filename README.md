Project Name

- LAB: Message Queues

# Author: Hayden Cooper

## About

Code Academy Parcel Service (CAPS)

- A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what’s in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).

## Features and stories

Here are the high level stories related to this new set of requirements.

- As a vendor, I want to “subscribe” to “delivered” notifications so that I know when my packages are delivered.
- As a vendor, I want to “catch up” on any “delivered” notifications that I might have missed so that I can see a complete log.
- As a driver, I want to “subscribe” to “pickup” notifications so that I know what packages to deliver.
- As a driver, I want to “catch up” on any “pickup” notifications I may have missed so that I can deliver everything.
- As a driver, I want a way to “scan” a delivery so that the vendors know when a package has been delivered.

And as developers, here are some of the development stories that are newly relevant to the above.

- As a developer, I want to create a system of tracking who is subscribing to each event.
- As a developer, I want to place all inbound messages into a “queue” so that my application knows what events are to be delivered.
- As a developer, I want to create a system for communicating when events have been delivered and received by subscribers.
- As a developer, I want to delete messages from the queue after they’ve been received by a subscriber, so that I don’t re-send them.
- As a developer, I want to create a system for allowing subscribers to retrieve all undelivered messages in their queue.

## start program

- npm start

## test

- npm run test

## Deployed Links

## UML

 ![UML](./Screenshot%202023-06-01%20at%209.31.31%20PM.png)

### Collaborators 
Class 401d53 Code Review and Reece Renninger 