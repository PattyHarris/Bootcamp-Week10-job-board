# Create a Job Board

This week's project is to create a job board that allows access to companies to post jobs as well as job seekers looking for jobs. Job seekers are allowed to apply for jobs, etc.

## Initial Setup

1. The initial setup is the same as for Week 9 - see the README.md file there for the manual setup steps. The completed project for reference is here: https://github.com/flaviocopes/bootcamp-2022-week-10-job-board
2. In addition, the NextAuth.js is setup as before. Note that the link for generating a secret is https://generate-secret.vercel.app/32
3. Add the job table to the schema (and migrate).

## Setup the Fake Data Utilities and Endpoints

1. As in Week 9, we'll setup a 'utils' file that has endpoints for creating fake jobs and users, a single fake job for a random user, and an endpoint to clean the database (see page/utils.js).
2. Install the 'fake' data package - note that this time the -D is noted in the lesson.

```
> npm install -D @faker-js/faker
```

3. Add the endpoint handlers in 'pages/api/utils.js'. Endpoints have been modified to make sure that the list of users returned contains data. Also added the bit to create the fake names up front and then only retrieve the users from that list.

## Fetch Data from the Database

1. Make a call to the database during the server side rendering - so in index.js, see the code for getServerSideProps - we'll add a lib/data.js to handle the actual code and then call the function in getServerSideProps.
2. Refactor to put the guts of getting jobs in a component/Jobs.js and component/Job.js

## Create the Job Details Page

1. In Job.js, link the job to the job.id - each job has a route of the form '/job/id'.
2. 'pages/job/[id].js' will handle the requests for the '/job/id' route.
3. Add 'getJob' to data.js.
4. One mistake was to use next/link instead of next/Link - this will generate some errors about components having the same name, blah, blah, blah.

## Create the Company Home Page

1. Add data fetch functions to return the details of a company and the jobs associated with that company in data.js.
2. Add the company route handler, as with jobs, 'pages/company/[id].js

## User Login and Profile Setup

1. Allow the user to login - index.js. A login button is shown if there is no session.
2. If the user doesn't have a name, the user is directed to the 'setup' page (new page). Once they have clicked 'save', they are redirected back to the 'home' page (e.g. '/').
3. The 'setup' form has an associate route handler in 'api/setup' (also new page).
4. Note: to logout without a button, use the following url:

```
http://localhost:3000/api/auth/signout
```
Although I'm not convinced this actually works.  Console shows errors...
5. Also, mailtrap.io on Chrome for some reason, after logging in, sets the return path to /home, which doesn't exist.  If you setup the same scenario on Safari, it works fine.

The Sign In button in mailtrap.io on Chrome:
```
http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome&token=f08ad5d0b876072d95cc3bdcf511dc49b5a5656a45b65788d246582f9f404fd1&e
```

The Sign In button in mailtrap.io on Safari:
```
http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000&token=5a66ce989530b603713a5f6c0d9744699501c12304f280a0a18a2e5bc465c815&email=patriciaharris%40hotmail.com
```
