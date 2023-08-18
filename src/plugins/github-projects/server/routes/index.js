module.exports = [
  {
    method: "GET",
    path: "/repositories", // localhost:1337/github-projects/repositories
    handler: "getRepositoriesController.index",
    config: {
      policies: [],
      auth: false, // temporarily disabled and TODO: change this authorized only for admin panel users
    },
  },
];
