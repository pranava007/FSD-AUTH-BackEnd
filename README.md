# User Authentication and Password Management API 

This project provides a basic user authentication system with functionalities including user registration, login, and password reset. It uses Node.js, Express, MongoDB, and various utility libraries like bcryptjs, jwt, and nodemailer for handling passwords and emails.

Key Features
User Registration (/register):

Description: Registers a new user by hashing their password and storing it securely in the database.
Inputs: username, email, password (all required).
Outputs: Returns a success message and the registered user details upon successful registration.
User Login (/login):

Description: Authenticates a user by validating their email and comparing the provided password with the hashed password in the database.
Inputs: email, password (both required).
Outputs: Returns a success message and a JWT token upon successful login.
Forget Password (/forgetPassword):

Description: Sends a password reset email to the user with a link containing a token for resetting the password.
Inputs: email (required).
Outputs: Sends an email with a password reset link to the provided email address.
Reset Password (/resetPassword/:id/:token):

Description: Verifies the reset token and allows the user to update their password.
Inputs: id, token (from URL parameters), and password (from request body).
Outputs: Returns a success message upon successful password reset.
Technical Stack
Backend: Node.js with Express framework.
Database: MongoDB for user data storage.
Libraries:
bcryptjs for password hashing.
jsonwebtoken for token generation and verification.
nodemailer for sending emails.
dotenv for environment variable management.
Environment Variables
PASSMAIL: Email address used to send password reset emails.
PASSKEY: Password for the email address used by nodemailer.
JWT_SECRET_KEY: Secret key used for signing JWT tokens.
MONGODB_URL: MongoDB connection string.
Error Handling
Uses a custom error handling utility (errorHandle) to manage and respond to various errors in the API.
