// Return all jobs
export const getJobs = async (prisma) => {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return jobs;
};

// Return the job details for the given id.
export const getJob = async (id, prisma) => {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return job;
};

// Returns the company data for a given company ID.
export const getCompany = async (company_id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id: company_id,
    },
  });

  return user;
};

// Return all the jobs for a given company.
export const getCompanyJobs = async (company_id, prisma) => {
  const jobs = await prisma.job.findMany({
    where: { authorId: company_id, published: true },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return jobs;
};

// Return the data for a given user.
export const getUser = async (id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

// Return a company's posted jobs.
export const getJobsPosted = async (user_id, prisma) => {
  const jobs = await prisma.job.findMany({
    where: { authorId: user_id },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  await Promise.all(
    jobs.map(
      async (job) => (job.applications = await getJobApplications(job, prisma))
    )
  );

  return jobs;
};

// Returns the user's job applications.
export const getApplications = async (user_id, prisma) => {
  const applications = await prisma.application.findMany({
    where: { authorId: user_id },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
      job: true,
    },
  });

  return applications;
};

// Check whether a user has already applied to a given job.
export const alreadyApplied = async (user_id, job_id, prisma) => {
  const applications = await prisma.application.findMany({
    where: {
      authorId: user_id,
      jobId: parseInt(job_id),
    },
    include: {
      author: true,
    },
  });

  if (applications.length > 0) {
    return true;
  }

  return false;
};

// Return the list of users who have applied to a given job.
const getJobApplications = async (job, prisma) => {
  const applications = await prisma.application.findMany({
    where: { jobId: job.id },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
      job: true,
    },
  });

  return applications;
};
