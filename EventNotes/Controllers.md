
Controller is an intermediary layer that handles the incoming requests from frontend. interact with your models to perform database operations, and send response to frontend


We have three controllers:


## 1. userController

It has 4 actions/functions:

### a) registerUser

Request Body: {username, email, password, role, clubName}

Logic:
- Extract {} from request body
- does email validation (if email is from vitbhopal or not)
- existing user check
- password hashing
- new user model instance creation
- saves user

Response:
- 201 - user registered
- 400 - for invalid email or existing email
- 500 - internal server error


### b) loginUser

Request body: {email, password}

Logic:
- Extracts {} from body
- finds the user using email
- if no user found, returns error with status code(400)
- uses bcrypt.compare() to compare the provided password with the hashed password in the database
- if password does not match, return 400 error
- JWT Creation

JWT Creation:
- If the email and password are correct, a JWT token is created using jwt.sign().
- The token payload includes user's username, email, and role.
- It is signed using the secret key and expires in 1hr.

``` javascript
const token = jwt.sign(
      {username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
```


Response:
- 200- user login (also send token)
- 400 - incorrect password or user not found
- 500 - internal server error


### c) profileVisit

Request parameters: req.params.username -> The username of the profile to retrieve from the URL path.

Logic: 
- Extract the username from the URL parameters
- Queries the User model to find the matching username using User.findOne().
- If no user is found, return error.
- If found, then send a json response with user details

Response:
- 200 -> user found
- 400 -> user not found
- 500 -> internal server error


### d) profileChange

Request parameters: req.params.username -> The username of the profile is retrieve from the URL path

Request body: an object containing the fields to update

Logic:
- Extracts the username from the URL
- Extract the updated fields from the request body
- Update the user

```js
const result = await User.findOneAndUpdate(
      { username: username }, // Query to find the user by username
      updatedProfileData,     // Data to update
      { new: true }           // Option to return the updated document
    );
```

- if no user is found, then return error
- if user is found, then successfully update the profile



---



## 2. eventController

It has 6 actions/functions:


### a) searchEvents





