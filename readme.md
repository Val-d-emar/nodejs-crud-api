# CRUD API

## Installation

Open Bash on Linux (cmd on Windows, terminal on mac) and type there:

```bash
git clone git@github.com:Val-d-emar/nodejs-crud-api.git --barnch=dev
cd nodejs-crud-api.git
npm install
npm run test
```

Start in the cli too:

```bash
npm run start:dev #for dev mode
npm run start:prod #for prod mode
```

Task is to implement simple CRUD API using in-memory database only.

## Technical requirements

- Task implemented on Javascript or Typescript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing
- Use 20 LTS version of Node.js
- Prefer asynchronous API whenever possible

## Implementation details

1. Implemented endpoint `api/users`:

   - **GET** `api/users` is used to get all persons
     - Server answer with `status code` **200** and all users records
   - **GET** `api/users/{userId}`
     - Server answer with `status code` **200** and record with `id === userId` if it exists
     - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **POST** `api/users` is used to create record about new user and store it in database
     - Server answer with `status code` **201** and newly created record
     - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
   - **PUT** `api/users/{userId}` is used to update existing user
     - Server answer with `status code` **200** and updated record
     - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **DELETE** `api/users/{userId}` is used to delete existing user from database
     - Server answer with `status code` **204** if the record is found and deleted
     - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:

   - `id` — unique identifier (`string`, `uuid`) generated on server side
   - `username` — user's name (`string`, **required**)
   - `age` — user's age (`number`, **required**)
   - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) be handled (server answer with `status code` **404** and corresponding human-friendly message)
4. Errors on the server side that occur during the processing of a request be handled and processed correctly (server answer with `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running be stored in `.env` file
6. There be 2 modes of running application (**development** and **production**):

   - The application is run in development mode using `nodemon` or `ts-node-dev` (there is a `npm` script `start:dev`):

     ```bash
     npm run start:dev
     ```
   - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file):

     ```bash
     npm run start:prod
     ```
