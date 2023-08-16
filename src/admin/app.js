const config = {
  locales: ["id", "it"],
  // translations: {
  //   id: {
  //     "app.components.LeftMenuLinkContainer.installNewPlugin":
  //       "Instal Plugin Baru",
  //   },
  //   it: {
  //     "app.components.LeftMenuLinkContainer.installNewPlugin": "Negozio",
  //   },
  // },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
