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
      type: {
        _root: '/type',
      },
      weight: {
        _root: '/weight',
      },
      instance: {
        _root: '/instance',
        add: '/add',
        _routeParam: {
          id: ':id',
        }
      },
      fontSet: {
        _root: '/font-set',
        add: '/add',
        remove: '/remove'
      }
    },
    test: '/test-data',
    other: '/other'
  },
  error: {
    _404: '/*'
  },
}
