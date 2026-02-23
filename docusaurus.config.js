module.exports = {
  title: 'Subway Builder Mod Wiki',
  tagline: 'A complete directory and guide for all Subway Builder maps and mods',
  url: 'https://subwaybuildermodded.com',
  baseUrl: '/',
  favicon: 'favicon.ico',
  organizationName: 'Subway-Builder-Modded',
  projectName: 'Subway-Builder-Modded-Docs',
  deploymentBranch: 'gh-pages',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw', // 'throw', 'warn', or 'ignore'
    },
  },
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
          routeBasePath: 'wiki',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: false,
          admonitions: true,
        },
        blog: {
          routeBasePath: 'updates',
          showReadingTime: false,
          blogSidebarTitle: 'Updates',
          blogSidebarCount: 'ALL',
          blogTitle: 'Updates',
          blogDescription: 'Changelogs and release notes for the Subway Builder Mod Wiki website.',
          postsPerPage: 3,
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'modding-docs',
        path: 'modding-docs',
        routeBasePath: 'modding-docs',
        sidebarPath: require.resolve('./sidebarsModdingDocs.js'),
        showLastUpdateTime: false,
        admonitions: true,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: ['/wiki'],
            to: '/wiki/home',
          },
          {
            from: ['/modding-docs'],
            to: '/modding-docs/getting-started',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    metadata: [
      { name: 'description', content: 'A complete hub for Subway Builder maps, mods, and guides' },
      { name: 'og:image', content: '/logo.png' },
      { name: 'twitter:image', content: '/logo.png' },
      
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
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
          label: 'Wiki',
        },
        {
          type: 'doc',
          docId: 'getting-started',
          docsPluginId: 'modding-docs',
          position: 'left',
          label: 'Modding Docs',
        },
        {
          to: 'updates',
          position: 'left',
          label: 'Updates',
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
      links: [
        {
          title: 'Pages',
          items: [
            {
              label: 'Wiki',
              to: '/wiki/home',
            },
            {
              label: 'Modding Docs',
              to: '/modding-docs/getting-started',
            },
            {
              label: 'Updates',
              to: '/updates',
            },
          ],
        },
        {
          title: 'Other Links',
          items: [
            {
              html: `
                <a href="https://discord.gg/jrNQpbytUQ" class="footer-links" style="display: inline-flex; align-items: center; gap: 4px;">
                  <img src="/assets/discord.svg" width="14" height="14" style="vertical-align: middle; margin-right: 4px;" />
                  Discord
                </a>
              `,
            },
            {
              html: `
                <a href="https://github.com/Subway-Builder-Modded/Subway-Builder-Modded-Docs" class="footer-links" style="display: inline-flex; align-items: center; gap: 4px;">
                  <img src="/assets/github.svg" width="14" height="14" style="vertical-align: middle; margin-right: 4px;" />
                  GitHub
                </a>
              `,
            },
            {
              html: `
                <a href="https://subwaybuilder.com" class="footer-links" style="display: inline-flex; align-items: center; gap: 4px;">
                  <img src="/assets/subway-builder.svg" width="12" height="12" style="vertical-align: middle; margin-right: 4px;" />
                  Subway Builder
                </a>
              `,
            },
          ],
        },
      ],
      copyright: `© Subway Builder Mod Wiki ${new Date().getFullYear()}. Not affiliated with Subway Builder or Redistricter, LLC. All content is community-created and shared under appropriate licenses.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
    },
  },
};
