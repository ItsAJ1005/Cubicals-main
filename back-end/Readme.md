# Cubicals-BackEnd

## Overview

To ensure the application runs correctly, certain environment variables need to be set in a `.env` file. These variables include the server port, secret keys, and database connection details.

## Setting Up the Environment Variables

To get started, follow these steps:

### Step 1: Create a `.env` File

- In the root directory of your project, create a new file named `.env`.

### Step 2: Add the Following Variables to the `.env` File

Copy the following code block into your `.env` file:

```

MONGO_URI="mongodb+srv://varunTyagarayanG:Tyagi__2004@tally.iu2ne.mongodb.net/?retryWrites=true&w=majority&appName=Tally"
MONGO_PASS = "Tyagi__2004"
TOKEN_SECRET_KEY = "pookie bear"
PORT = 9000

```
### Step 3: Installing Packages

run the command in the currect directory 

```
npm i
```
### Step 4: Run the Backend 
run the command in the currect directory 
```
npm run dev
```


