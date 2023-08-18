"use strict";
const { request } = require("@octokit/request");
// or: import { request } from "@octokit/request";
const axios = require("axios");

module.exports = ({ strapi }) => ({
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

        const longDescription = (await axios.get(readmeUrl))?.data;

        return {
          id,
          name,
          shortDescription: description,
          url: html_url,
          longDescription,
        };
      })
    );
  },
});
