module.exports = [
  {
    method: "GET",
    path: "/repositories", // localhost:1337/github-projects/repositories
    handler: "getRepositoriesController.index",
    config: {
      policies: ["admin::isAuthenticatedAdmin"],
      // auth: false, // temporarily disabled and TODO: change this authorized only for admin panel users
    },
  },
  {
    method: "POST",
    path: "/project",
    handler: "projectController.create",
    config: {
      policies: ["admin::isAuthenticatedAdmin"],
    },
  },
];
