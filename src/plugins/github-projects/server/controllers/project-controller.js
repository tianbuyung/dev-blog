"use strict";

module.exports = ({ strapi }) => ({
  create: async (ctx) => {
    // create the new project
    const repo = ctx.request.body;

    const newProject = await strapi
      .plugin("github-projects")
      .service("projectService")
      .create(repo, ctx.state.user.id);

    return newProject;
  },
});
