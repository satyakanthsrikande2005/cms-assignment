const settingRepository = require("../repositories/setting.repository");

const DEFAULT_SETTINGS = {
  siteName: { value: "Enterprise CMS", group: "general" },
  siteDescription: { value: "A production-ready content management system", group: "general" },
  siteUrl: { value: "http://localhost:3000", group: "general" },
  contactEmail: { value: "contact@example.com", group: "general" },
  postsPerPage: { value: 10, group: "general" },
  defaultMetaTitle: { value: "Enterprise CMS", group: "seo" },
  defaultMetaDescription: { value: "Enterprise Content Management System", group: "seo" },
  googleAnalyticsId: { value: "", group: "seo" },
};

const settingService = {
  async getSettings() {
    const settings = await settingRepository.findAll();

    if (settings.length === 0) {
      return DEFAULT_SETTINGS;
    }

    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
  },

  async getPublicSettings() {
    const settings = await this.getSettings();

    return {
      siteName: settings.siteName || DEFAULT_SETTINGS.siteName.value,
      siteDescription: settings.siteDescription || DEFAULT_SETTINGS.siteDescription.value,
      siteUrl: settings.siteUrl || DEFAULT_SETTINGS.siteUrl.value,
      contactEmail: settings.contactEmail || DEFAULT_SETTINGS.contactEmail.value,
      postsPerPage: settings.postsPerPage || DEFAULT_SETTINGS.postsPerPage.value,
      defaultMetaTitle: settings.defaultMetaTitle || DEFAULT_SETTINGS.defaultMetaTitle.value,
      defaultMetaDescription:
        settings.defaultMetaDescription || DEFAULT_SETTINGS.defaultMetaDescription.value,
    };
  },

  async updateSettings(data) {
    const updates = await Promise.all(
      Object.entries(data).map(([key, value]) => {
        const defaultSetting = DEFAULT_SETTINGS[key];
        const group = defaultSetting ? defaultSetting.group : "general";
        return settingRepository.upsert(key, value, group);
      })
    );

    return updates;
  },
};

module.exports = settingService;
