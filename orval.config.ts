const config = {
  gmi: {
    output: {
      prettier: true,
      target: 'src/app/api/generated',
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: 'src/app/api/_mutator/axios-instance.ts',
          name: 'customInstance'
        }
      }
    },
    input: {
      target: 'http://localhost:3000/api/swagger.json'
    }
  }
}

export default config
