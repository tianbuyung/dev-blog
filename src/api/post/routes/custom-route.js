module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts/example",
      handler: "api::post.post.exampleAction", // it's reference to the custom controller example action
      config: {
        find: {
          auth: false, // disabling the Strapi JWT auth system for this route
          policies: [],
          middlewares: [],
        },
        findOne: {},
        create: {},
        update: {},
        delete: {},
      },
    },
  ],
};
