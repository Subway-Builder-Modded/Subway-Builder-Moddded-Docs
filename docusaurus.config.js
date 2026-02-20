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
        blog: {
          path: 'blog',            // folder where your blog posts live
          routeBasePath: 'blog',   // URL route: /blog
          showReadingTime: true,   // optional: show reading time on posts
          blogSidebarCount: 'ALL', // show all posts in sidebar
        },
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
        /*{
          type: 'doc',
          docId: 'intro', // Leads to Intro
          position: 'left',
          label: 'Wiki',
        },*/
        {
          href: 'https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/jrNQpbytUQ',
          label: 'discord',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
      copyright: `Copyright © ${new Date().getFullYear()} Subway Builder Modded`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
    },
  },
};
