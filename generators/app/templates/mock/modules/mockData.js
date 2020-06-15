const prefix = '/mock'
const Mock = require('mockjs')

const mockTableData = Mock.mock({
  'data|2000': [
    {
      col1: '@id',
      col2: '@cname',
      col3: '@region',
      col4: '@email',
      col5: '@date',
      datacol1: '@integer(0, 100)',
      datacol2: '@integer(0, 100000)'
    }
  ]
})

export default [
  // get demo
  {
    url: `${prefix}/data`,
    type: 'get',
    response: (config) => {
      const { page = 1 } = config.query
      const pageSize = config.query.page_size || 20
      const orderName = config.query.order_name
      const orderValue = config.query.order_value

      let result = []

      if (!orderName || !orderValue) {
        result = mockTableData.data.filter((item, index) => index >= (page - 1) * pageSize &&
          index < page * pageSize)
      } else {
        result = [...mockTableData.data]
        result.sort((a, b) => {
          if (orderValue === 'ASC') {
            return a[orderName] > b[orderName] ? 1 : -1
          }
          return a[orderName] > b[orderName] ? -1 : 1
        })
        result = result.filter((item, index) => index >= (page - 1) * pageSize &&
          index < page * pageSize)
      }

      return {
        code: 0,
        msg: 'ok',
        total_count: mockTableData.data.length,
        data: result
      }
    }
  }
]
