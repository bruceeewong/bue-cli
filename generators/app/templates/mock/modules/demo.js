export default [
  // get demo
  {
    url: '/demo',
    type: 'get',
    response: (config) => {
      console.log(config.query)
      return {
        code: -1,
        data: 'get demo'
      }
    }
  },
  // post demo
  {
    url: '/demo',
    type: 'post',
    response: (config) => {
      console.log(config.body)
      return {
        code: 0,
        data: 'post demo'
      }
    }
  }
]
