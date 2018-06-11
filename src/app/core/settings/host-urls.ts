export const hostUrls: {} = {
  local: {
    mlsMobHost: 'http://localhost:8090',
    mlsHosts: [{ id: 'LOCAL', url: 'http://localhost:8080' }]
  },
  staging: {
    mlsMobHost: 'http://stagingmob.primeshowing.com',
    mlsHosts: [{ id: 'STAGING', url: 'http://stagingmls.primeshowing.com' }]
  },
  demo: {
    mlsMobHost: 'https://demomob.primeshowing.com',
    mlsHosts: [{ id: 'DEMO', url: 'https://demomls.primeshowing.com' }]
  },
  prod: {
    mlsMobHost: 'https://mob.primeshowing.com',
    mlsHosts: [
      { id: 'COLUMBIA', url: 'https://columbiamls.prineshowing.com' },
      { id: 'ALASKA', url: 'https://alaskamls.primeshowing.com' }
    ]
  }
};
