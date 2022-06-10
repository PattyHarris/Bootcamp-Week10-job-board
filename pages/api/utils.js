import prisma from "lib/prisma";
import { faker } from "@faker-js/faker";

const generateFakeJob = (user) => ({
  title: faker.company.catchPhrase(),
  description: faker.lorem.paragraphs(),
  author: {
    connect: { id: user.id },
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.end();
  }

  // Clean the database
  if (req.body.task === "clean_database") {
    await prisma.job.deleteMany({});
    await prisma.user.deleteMany({});
  }

  // Generate one job - assumes there is at least one company (user) in the
  // database.
  if (req.body.task === "generate_one_job") {
    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    });

    if (users.length == 0) {
      console.log("You must have one company user to generate a job!");
      return res.end();
    }

    await prisma.job.create({
      data: generateFakeJob(users[0]),
    });
  }

  // Generate 10 random users/companies - I prefer that if I run this again,
  // it only affects the last created users.  So, created a array of
  // names and use that for the query on users.

  if (req.body.task === "generate_users_and_jobs") {
    let count = 0;
    const numUsers = 10;

    let fakeNames = [];
    while (count < numUsers) {
      fakeNames[count] = faker.internet.userName().toLowerCase();
      count++;
    }

    count = 0;

    while (count < numUsers) {
      await prisma.user.create({
        data: {
          name: fakeNames[count],
          email: faker.internet.email().toLowerCase(),
          company: faker.datatype.boolean(),
        },
      });
      count++;
    }

    // Create 1 job for each user that's a company - but ask for only
    // the users we just created.
    const users = await prisma.user.findMany({
      where: {
        company: true,
        name: {
          in: fakeNames,
        },
      },
    });

    if (users.length == 0) {
      console.log("You must have one company user to generate a job!");
      return res.end();
    }

    users.forEach(async (user) => {
      await prisma.job.create({
        data: generateFakeJob(user),
      });
    });
  }

  res.end();
}
