"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // we listen to lifecycle events
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"], // only listen to events for this model
      afterCreate: async ({ result }) => {
        // create an author instance from the fields of the admin user
        // that has just been created
        // extract the fields from the newly created admin user
        const { id, firstname, lastname, email, createdAt, updatedAt } = result;

        await strapi.service("api::author.author").create({
          data: {
            firstname,
            lastname,
            email,
            createdAt,
            updatedAt,
            admin_user: [id],
          },
        });
      },
      afterUpdate: async ({ result }) => {
        // get the author that corresponds
        // to the admin user that has just been updated
        const correspondingAuthor = (
          await strapi.entityService.findMany("api::author.author", {
            populate: ["admin_user"],
            filters: {
              admin_user: {
                id: result.id,
              },
            },
          })
        )[0];

        // update the Author accordingly
        const { firstname, lastname, email, username, updatedAt } = result;
        await strapi
          .service("api::author.author")
          .update(correspondingAuthor.id, {
            data: {
              firstname,
              lastname,
              email,
              username,
              updatedAt,
            },
          });
      },
    });
  },
};
