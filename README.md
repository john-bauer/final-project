# Fluently

## Introduction
This is a repository for my final WDI-ADA project. I'm hoping to build an application that is challenging, solves a real problem, and exposes me to new areas of programming


### Product Concept
Fluently is an application that lets you chat with anyone in the world, even if you don't speak the same language.

### How It Works
To get started, the user simply inputs a first name, country, and primary language. Once you submit, you'll be placed in a chatroom with a random person somewhere else in the world. Messages are sent from one user to another, and translated mid-stream to the other user's primary language.

### Goals
I have **one day** to build the MVP, so my biggest challenge will be feature prioritization and time management. I've inspected the API's and tools thoroughly and written lots of the code I'll need in isolation, so today will be mostly about managing complexity and piecing it all together.

### Wireframes
![Get Started](https://raw.githubusercontent.com/john-bauer/final-project/master/assets/wireframes/Form.png "Get Started")
![Chat](https://github.com/john-bauer/final-project/blob/master/assets/wireframes/chat.png "Chat")

## User Stories

**Definitions**
```
- USER: Anyone that is using the platform
- USER A: A user that is in the process of sending a message
- USER B: A user that is in the process of receiving a message.
- SYSTEM: The set of rules and logic that define the platform.
```

GET STARTED
```
1. As a USER, I can input and submit my [FIRSTNAME], [COUNTRY], and [PRIMARY LANGUAGE] from the landing page.
2. As a SYSTEM, I can store this information in the chat channel.
3. As a SYSTEM, I can check the size of the channel, and if there are greater than two users in the root namespace, I can alert the user with an error.
4. As a SYSTEM, I can place the user in the chatroom if there are less than two users at the time of their submission.
```
CHAT
```
5. As a USER, I can see when another user has joined the chatroom.
6. As a USER, I can see when another user has left the chatroom.
7. As a USER, I can write a message and publish it to the channel.
8. As a SYSTEM, I can request translations from IBM Watson, and publish the message in its source and target language to both users.
9. As a USER, I can leave the chatroom and exit to the landing page at any time.
```


