module.exports = {
  title: 'Subway Builder Modded',
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
    locales: ['en', 'es', 'de'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      es: {
        label: 'Español',
        htmlLang: 'es-ES',
      },
      /*ca: {
        label: 'Català',
        htmlLang: 'ca-ES',
      },
      fr: {
        label: 'Français',
        htmlLang: 'fr-FR',
      }, */
      de: {
        label: 'Deutsch',
        htmlLang: 'de-DE',
      }, /*
      it: {
        label: 'Italiano',
        htmlLang: 'it-IT',
      },
      da: {
        label: 'Dansk',
        htmlLang: 'da-DK',
      },
      sv: {
        label: 'Svenska',
        htmlLang: 'sv-SE',
      },
      nb: {
        label: 'Norsk bokmål',
        htmlLang: 'nb-NO',
      },
      zh-CN: {
        label: '中文 (简体)',
        htmlLang: 'zh-CN',
      },
      zh-TW: {
        label: '中文 (繁體)',
        htmlLang: 'zh-TW',
      },*/
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: 'wiki',
          sidebarPath: require.resolve('./sidebars/wiki.js'),
          admonitions: true,
        },
        theme: {
          customCss: require.resolve('./src/css/global.css'),
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
        sidebarPath: require.resolve('./sidebars/modding-docs.js'),
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
      title: 'Subway Builder Modded',
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
          to: 'credits',
          position: 'left',
          label: 'Credits',
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
            {
              label: 'Credits',
              to: '/credits',
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
      copyright: `© Subway Builder Modded ${new Date().getFullYear()}. Not affiliated with Subway Builder or Redistricter, LLC. All content is community-created and shared under appropriate licenses.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
    },
  },
};
