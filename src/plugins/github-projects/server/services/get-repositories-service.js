"use strict";
const { request } = require("@octokit/request");
// or: import { request } from "@octokit/request";
const axios = require("axios");

module.exports = ({ strapi }) => ({
  getProjectForRepository: async (repository) => {
    const { id } = repository;

    const matchingProjects = await strapi.entityService.findMany(
      "plugin::github-projects.project",
      {
        filters: {
          repositoryId: id,
        },
      }
    );

    if (matchingProjects.length === 1) return matchingProjects[0].id;

    return null;
  },

  getPublicRepositories: async () => {
    // Following GitHub docs formatting:
    // https://developer.github.com/v3/repos/#list-organization-repositories
    const result = await request("GET /user/repos", {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    });

    // id, name, shortDescription, url, longDescription
    // https://raw.githubusercontent.com/tianbuyung/dev-blog/main/README.md

    return Promise.all(
      result.data.map(async (item) => {
        const { id, name, description, html_url, owner, default_branch } = item;
        const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;

        let readmeResponse;

        try {
          const response = await axios.get(readmeUrl);
          console.log("response");

          if (response) readmeResponse = response.data;
        } catch (error) {
          console.log(`Error occurred on item ${name}`);
          console.log("Error fetching ", readmeUrl);
        }

        const repositories = {
          id,
          name,
          shortDescription: description,
          url: html_url,
          longDescription: readmeResponse || "",
        };

        // Add some logic to search for an existing project for the current repository.
        const relatedProjectId = await strapi
          .plugin("github-projects")
          .service("getRepositoriesService")
          .getProjectForRepository(repositories);

        return {
          ...repositories,
          projectId: relatedProjectId,
        };
      })
    );
  },
});
