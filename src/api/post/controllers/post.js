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
  // async find(ctx) {
  //   // 1. Premium posts solution 1: the simple but the worst because you need more logic in your controller, we need avoid this approach
  //   // fetch all posts (including premium posts)
  //   const { data, meta } = await super.find(ctx);

  //   if (ctx.state.user) {
  //     return { data, meta };
  //   }

  //   // Not authenticated
  //   const filteredData = data.filter((post) => {
  //     return !post.attributes.premium;
  //   }); // filter preferably in the service and making big query for public request without premium posts

  //   return { data: filteredData, meta };
  // },

  // 2. Premium posts solution 2: rewrite the action to fetch only needed posts
  async find(ctx) {
    // if the request is authenticated
    const isRequestingNonPremium =
      ctx.query.filters && ctx.query.filters.premium["eq"] === false;

    if (ctx.state.user || isRequestingNonPremium) {
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    }

    // if the request is not authenticated (public request)
    // let's call the underlying service with an additional filter param: premium === false
    // /posts?filters[premium]=false
    const { query } = ctx;

    const filteredPosts = await strapi.service("api::post.post").find({
      ...query,
      filters: {
        ...query.filters,
        premium: false,
      },
    });

    const sanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx);

    return this.transformResponse(sanitizedPosts);
  },

  // Method 3: Replacing a core action with proper sanitization
  async findOne(ctx) {
    // /api/posts/:id?
    // console.log(ctx.params);
    // console.log(ctx.query);
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service("api::post.post").findOne(id, query);
    console.log(entity);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // console.log(sanitizedEntity);

    return this.transformResponse(sanitizedEntity);
  },
}));
