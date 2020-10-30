// SHARED BETWEEN FRONTEND AND BACKEND
export enum FontGroupEnum {
  SELECTABLE = 'selectable',
  BLACKLISTED = 'blacklisted'
}

export const routes = {
  api: {
    _root: '/api',
    font: {
      _root: '/font',
      add: '/add',
      remove: '/remove',
      _queryParam: {
        family: '?fontdata=family'
      },
      instance: {
        _root: '/instance',
        add: '/add'
      }
    },
    test: '/test-data',
    other: '/other'
  },
  error: {
    _404: '/*'
  },
}
