"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    await strapi
      .service("api::post.post")
      .exampleService({ myParam: "example" });
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" }; // add more query /api/posts?publicationState=preview&local=en
    console.log(ctx.query);
    /**
     * {publicationState: "preview"}
     * {publicationState: "preview", local: "en"}
     */

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now();

    return { data, meta };
  },

  // Method 3: Replacing a core action with proper sanitization
  async findOne(ctx) {
    // /api/posts/:id?
    // console.log(ctx.params);
    // console.log(ctx.query);
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service("api::post.post").findOne(id, query);
    // console.log(entity);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // console.log(sanitizedEntity);

    return this.transformResponse(sanitizedEntity);
  },
}));
