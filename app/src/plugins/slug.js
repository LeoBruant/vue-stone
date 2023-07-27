export default {
  install: (app) => {
    app.config.globalProperties.$slug = (string) => {
      return string
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };
  },
};
