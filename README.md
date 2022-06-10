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

3. Add the endpoint handlers in 'pages/api/utils.js'.
