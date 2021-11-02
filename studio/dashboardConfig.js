export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6180d44bad7fa57e473e8417',
                  title: 'Sanity Studio',
                  name: 'indonesian-gourmet-studio',
                  apiId: '7751acab-7524-4f50-b88a-ae35c170522f'
                },
                {
                  buildHookId: '6180d44be407fb7878db7128',
                  title: 'Portfolio Website',
                  name: 'indonesian-gourmet',
                  apiId: '0f643142-598a-4077-8363-2280b724eba8'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/sbarchshevskiy/indonesian-gourmet',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://indonesian-gourmet.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
