"use strict";

/**
 * tag router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter(
  "api::tag.tag"
  // {
  //   prefix: "", // test -> /test/tags
  //   only: ["find", "findOne"], // include methods
  //   except: [], // exclude methods
  //   config: {
  //     find: {
  //       auth: false, // disabling the Strapi JWT auth system for this route
  //       policies: [],
  //       middlewares: [],
  //     },
  //     findOne: {},
  //     create: {},
  //     update: {},
  //     delete: {},
  //   },
  // }
);
