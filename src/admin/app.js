import NewLogo from "./extensions/223.jpg";

const myPrimaryColor = "#007bff";

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
  auth: {
    logo: NewLogo,
  },
  menu: {
    logo: NewLogo,
  },
  head: {
    favicon: NewLogo,
  },
  tutorials: false,
  theme: {
    light:  {
      colors: {
        buttonPrimary600: myPrimaryColor,
        primary600: myPrimaryColor,
      },
    },
  }
};

const bootstrap = (app) => {
  // console.log(app);
};

export default {
  config,
  bootstrap,
};
