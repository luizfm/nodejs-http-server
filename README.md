# Nodejs-http-server
A Node.js server using Node HTTP native feature

# To run project execute the following steps:

1 - `npm install` <br />
2 - `npm run dev`

# Concepts

This project aims to test the native HTTP server feature from Node.js. Even so, there is no framework or microframework used here. The only library used is `csv-parse` library, in order to test bulk inserts. The database is a simple `json` file.

# Additional tips

You can use insomnia to test it. Those are the available routes:

`GET - /tasks || /tasks?search=Something` | gets the available tasks. It accepts a query parameter which is "search" providing a title or description; <br /><br />
`POST - /tasks` | with the body of { "name": "My task name", "description": "My tasks description" } (Both are required);  <br /><br />
`POST - /tasks` | with no body. This will get the CSV file on root folder and bulk insert the tasks inserted there;  <br /><br />
`PUT - /tasks/:id` | updates the provided task id with the body of { "name": "My task name", "description": "My tasks description" } (Both are required); <br /><br />
`PATCH - /tasks/:id/complete` | completes the todo task marking it as done. If hit again it will undone the task;  <br /><br />
`DELETE - /tasks/:id` | deletes the provided task id.  <br /><br />
