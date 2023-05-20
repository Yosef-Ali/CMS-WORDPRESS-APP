module.exports = {
  images: {
    domains: [
      "ethiocatholicaddis.org", // WordPress domain
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
  },
  env: {
    WORDPRESS_API_URL: "https://ethiocatholicaddis.org/acs-cms/graphql",
  },
  distDir: "build",
};
