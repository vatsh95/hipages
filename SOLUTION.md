Your Solution Documentation
===========================

## Getting Started
Everthing is same as per the inital ReadMe files boilerplate, only frontend UI port is changed to 3600.
So, to test this quickly install docker and then,
* Go to server and ui folders to install their respictive NPM dependecies
* Then, From the root of the project, run `docker-compose up -d`
* You should now have the UI running at http://localhost:3600 and the server running at http://localhost:8080

To Quickly finish this task some compromises were made and as this task was samll some things were skipped.

## Frontend
The Frondend design follows basic simple react functional components style coding pattern, where data is distribuited into pages as per page request url.
And components are placed seperate for better re-usability (*though there weren't any reusable components needed for this project).

### TODO items for frontend (* if I had more time on this project)
* Implement SASS properly with docker and write cleaner CSS Code.
* Implement proper REST API data fetch functions using Redux or proper custom JS class functions - Currently there is code repetition which can be removed and things can be written in neater/cleaner ways.
* Button Clicks for "Accept" and "Decline" is tied to onClick with arrow function directly to Finish project quickly, It is fine for now but, this can slow down the application if this SPA is upgraded in future with lot of similar arrow function binds in different areas of SPA - it will need a proper code refactor when this project expands.

## Backend
Code is written in basic Node/Express API Patterns with routes based folder structure.

### TODO items for backend (* if I had more time on this project)
* Restrict CORS Requests from Known Server URL's to secure API's.
* Structure Database properly to fetch leads for a given user.
* Then Implement a JWT based login system in frontend and backend to make this API's stateless
* And Then show Leads Properly by user in the User view
* Use More Typed functions by creating proper interfaces with correct object property types to pass data around functions (** any type is used in many places currently which can be further optimised)

