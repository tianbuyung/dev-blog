"use strict";

/**
 * `check-role` policy
 */

module.exports = (policyContext, config, { strapi }) => {
  // console.log(strapi); // accessing strapi object
  const { userRole } = config;
  const isEligible =
    policyContext.state.user && policyContext.state.user.role.name === userRole;
  // strapi.log.info(`User role: ${isEligible}`);
  // Add your own logic here.
  // strapi.log.info("In is-admin policy.");

  if (isEligible) {
    return true;
  }

  return false;
};
