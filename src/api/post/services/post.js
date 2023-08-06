"use strict";

/**
 * post service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args) {
    console.log("I was called...", args);
    let response = { okay: true };

    if (response.okay === false) {
      return { response, error: true };
    }

    return response;
  },
}));
