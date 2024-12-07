# Social-Media-Backend-API-Project

# Social Media API Project

This project is a **Social Media API** built using **Node.js**, **Express**, and **Sequelize** for handling user authentication, post management, and comments. It demonstrates CRUD operations, secure user authentication with JWT, and relational database design.

---

## Features
- **User Management**: Create, update, and delete user accounts.
- **Authentication**: Secure login and token-based authentication using JWT.
- **Post Management**: Add, edit, and delete posts. Retrieve posts with their associated user and comments.
- **Comment System**: Add, update, delete, and retrieve comments. Includes advanced queries such as searching, retrieving the most recent comments, and finding or creating a comment.
- **Role-Based Access**: Ensure that only the rightful owner can edit or delete their posts or comments.

---

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Framework for building RESTful APIs.
- **Sequelize ORM**: Database management and querying.
- **MySQL**: Relational database for storing structured data.
- **JWT (JSON Web Tokens)**: Secure user authentication.
- **Postman**: For API testing during development.

---

## API Endpoints
### **Users**
- `POST /users` - Create a user.
- `GET /users/:id` - Retrieve a user by ID (excluding role field).
- `PUT /users/:id?` - Create or update a user.
- `GET /users/by-email?email=<email>` - Find a user by email.

### **Posts**
- `POST /posts` - Create a new post.
- `GET /posts/details` - Retrieve posts with user and comment details.
- `DELETE /posts/:postId` - Delete a post (only for the owner).

### **Comments**
- `POST /comments` - Create a bulk of comments.
- `PATCH /comments/:commentId` - Update comment content (only for the owner).
- `POST /comments/find-or-create` - Find or create a comment for a post.
- `GET /comments/search?word=<word>` - Search comments containing a specific word.
- `GET /comments/newest/:postId` - Retrieve the 3 most recent comments for a post.
- `GET /comments/details/:id` - Get a specific comment by ID with its user and post details.

---

## Installation
### Prerequisites
- Node.js installed on your system.
- MySQL database setup.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
