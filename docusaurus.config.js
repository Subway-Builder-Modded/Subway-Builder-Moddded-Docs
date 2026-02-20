module.exports = {
  title: 'Subway Builder Mod Wiki',
  tagline: 'A complete directory and guide for all Subway Builder maps and mods',
  url: 'https://subwaybuildermodded.com',
  baseUrl: '/',
  favicon: 'favicon.ico',
  organizationName: 'Subway-Builder-Modded',
  projectName: 'Subway-Builder-Modded-Docs',
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'it'],
    localeConfigs: {
      en: { label: 'English' },
      es: { label: 'Español' },
      de: { label: 'Deutsch' },
      fr: { label: 'Français' },
      it: { label: 'Italiano' },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Subway Builder Mod Wiki',
      logo: {
        alt: 'Subway Builder Logo',
        src: 'logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'home',
          position: 'left',
          html: `
            <img src="/assets/wiki.svg" width="18" height="18" style="vertical-align: middle; margin-right: 4px;" /> 
            Wiki
          `,
        },
        {
          href: 'https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs',
          position: 'right',
          html: `
            <img src="/assets/github.svg" width="24" height="24" style="vertical-align: middle; margin-right: 4px;" />
          `,
        },
        {
          href: 'https://discord.gg/jrNQpbytUQ',
          position: 'right',
          html: `
            <img src="/assets/discord.svg" width="24" height="24" style="vertical-align: middle; margin-right: 4px;" />
          `,
        },
        {
          href: 'https://subwaybuilder.com',
          position: 'right',
          html: `
            <img src="/assets/subway-builder.svg" width="20" height="20" style="vertical-align: middle; margin-right: 4px;" />
          `,
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      /*links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs',
            },
          ],
        },
      ],*/
      copyright: `© Subway Builder Mod Wiki ${new Date().getFullYear()}`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
    },
  },
};
