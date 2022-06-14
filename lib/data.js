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
export const getUser = async (id, email, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
      email,
    },
  });

  return user;
};
