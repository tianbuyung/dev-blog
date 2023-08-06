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

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach((result, index) => {
      result.counter = index + 1;
    });

    return { results, pagination };
  },
}));
