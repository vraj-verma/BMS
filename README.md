# BMS

##### A Book Management Sysytem

## Features

- Create & login account for further Access
- Create & mantain books

### Base URL: `http://localhost:3001/v1`

### Postman Collection URL: https://solar-space-439639.postman.co/workspace/Auth-Module~f1b1abde-3749-4a6a-a3fb-267dc8eab57d/folder/33632274-26d885a4-8e91-43cf-b6d8-f381a4d80b94?ctx=documentation

# Auth

#### Create Account
```js
/auth/signup
```

**Payload:**

| Name      | Type   | Description                |
| --------- | ------ | -------------------------- |
| name*     | string | Name of the user           |
| email*    | string | E-mail of the account      |
| phone*    | string | Phone number               |
| password* | string | Password to secure account |

[For complete reference click here](http://localhost:3001/api#/Auth%20Controller/AuthController_signup)

**Response:**
```json
{
    "name": "engineer_content.ipfix",
    "email": "Dee.Kling@gmail.com",
    "phone": "8787878787",
    "_id": "662aa20e1f09b864f5e05b0b",
    "createdAt": "2024-04-25T18:33:50.553Z",
    "updatedAt": "2024-04-25T18:33:50.553Z",
    "__v": 0
}
```

#### Signin
```js
/auth/signin
```

**Payload:**

| Name      | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| email*    | string | E-mail for unique identity                                         |
| password* | string | Password to ensure that only authorized person is trying to access |


[For complete reference click here](http://localhost:3001/api#/Auth%20Controller/AuthController_signin)

**Response:**
```json
{
    "_id": "662aa20e1f09b864f5e05b0b",
    "name": "engineer_content.ipfix",
    "email": "Dee.Kling@gmail.com",
    "phone": "8787878787",
    "createdAt": "2024-04-25T18:33:50.553Z",
    "updatedAt": "2024-04-25T18:33:50.553Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkRlZS5LbGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MTQwNzAwNTEsImV4cCI6MTcxNDA3MzY1MX0.MCfu_pc397cpYfg58niJ4o3DFhybJ8ARxc1BMmZX4Ls"
}
```

# Books

### Create a Book
```js
/books
```

**Payload**

| Name             | Type   | Description                         |
| ---------------- | ------ | ----------------------------------- |
| title*           | string | Name of the book                    |
| author*          | string | Writer of the book                  |
| publication_year | number | Mention the publish year of book    |
| description      | string | Give a brief descripton of the book |

[For complete reference click here](http://localhost:3001/api#/Books%20Controller/BookController_create)

**Response:**
```json
{
    "title": "Flamingo",
    "author": "John Fox",
    "description": "This is a description",
    "publication_year": 20116,
    "_id": "662aa2fd1f09b864f5e05b12",
    "createdAt": "2024-04-25T18:37:49.275Z",
    "updatedAt": "2024-04-25T18:37:49.275Z",
    "__v": 0
}
```

### Get Books
```js
/books
```

[For complete reference click here](http://localhost:3001/api#/Books%20Controller/BookController_getAll)

**Response:**
```json
[
    {
        "_id": "662a9b5523c911afeed3b500",
        "title": "title ONE",
        "author": "John Smith",
        "description": "This is a description",
        "publication_year": 2022,
        "createdAt": "2024-04-25T18:05:09.287Z",
        "updatedAt": "2024-04-25T18:05:09.287Z"
    },
    {
        "_id": "662a9fae778afe769a8d8a34",
        "title": "title TWO",
        "author": "John Fox",
        "description": "This is a description 2",
        "publication_year": 2019,
        "createdAt": "2024-04-25T18:23:42.443Z",
        "updatedAt": "2024-04-25T18:23:42.443Z"
    },
    {
        "_id": "662aa2fd1f09b864f5e05b12",
        "title": "Flamingo",
        "author": "John Fox",
        "description": "This is a description",
        "publication_year": 20116,
        "createdAt": "2024-04-25T18:37:49.275Z",
        "updatedAt": "2024-04-25T18:37:49.275Z"
    },
    ...
]
```

### Get book by id
```js
/books/{book_id}
```

[For complete reference click here](http://localhost:3001/api#/Books%20Controller/BookController_getById)

**Response:**
```json
{
    "_id": "662a9fae778afe769a8d8a34",
    "title": "title TWO",
    "author": "John Fox",
    "description": "This is a description 2",
    "publication_year": 2019,
    "createdAt": "2024-04-25T18:23:42.443Z",
    "updatedAt": "2024-04-25T18:23:42.443Z"
}
```

### Filter Book
```js
/books/filter?author={author}&year={year}
```

**Parameters:**

| Name    | Type   | Description         |
| ------- | ------ | ------------------- |
| author* | string | Name of the authorr |
| year*   | string | Book published year |

[For complete reference click here](http://localhost:3001/api#/Books%20Controller/BookController_filterBook)
**Response:**
```json
{
    "_id": "662a9b5523c911afeed3b500",
    "title": "title ONE",
    "author": "John Smith",
    "description": "This is a description",
    "publication_year": 2022,
    "createdAt": "2024-04-25T18:05:09.287Z",
    "updatedAt": "2024-04-25T18:05:09.287Z"
}
```

### Update book by id
```js
/books/{book_id}
```

**Payload:**

| Name        | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| title       | string | update the title of the book          |
| description | string | Update or change the book description |

[For complete reference click here](http://localhost:3001/api#/Books%20Controller/BookController_update)
**Response:**
```json
{
    "messsage": "Book with id: 662a9fae778afe769a8d8a34 updated successfully"
}
```

### Delete Book(s)
```js
/books/?id={book_id}
```

**Parameter:**

| Name | Type   | Description             |
| ---- | ------ | ----------------------- |
| id*  | string | To delete book by Id(s) |

**Response:**
```json
{
    "message": "Book with id(s): 662a9fae778afe769a8d8a34,662aa5388c27eb7469c8a72a deleted successfully"
}
```
