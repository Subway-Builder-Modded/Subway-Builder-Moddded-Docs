module.exports = {
  title: 'Subway Builder Modded',
  tagline: 'Custom Maps & Mods Documentation',
  url: 'https://subwaybuildermodded.com',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Subway-Builder-Modded',
  projectName: 'Subway-Builder-Modded-Docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en','de','fr','es','it'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs/edit/main/',
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
      title: 'Subway Builder',
      logo: {
        alt: 'Subway Builder Logo',
        src: 'img/favicon.ico',
      },
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {href: 'https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Tutorial', to: '/docs/intro'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Subway Builder`,
    },
  },
};
