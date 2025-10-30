
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/dashboard/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/dashboard/home",
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/home"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/company"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/stocks"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/reports"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 397, hash: '07424b2368877d1eb9c8a5ea6b40339fa6f43f6ad6c4d7696c626166ffd6fc3c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 937, hash: '8f1ff7793863d316a2561de93299a95a4c27df447cda149758bbcdca20a3f667', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/home/index.html': {size: 21999, hash: '34a683dead18b57d6a388ad7537375ddb1a8338581ca47909667875086d59b1d', text: () => import('./assets-chunks/dashboard_home_index_html.mjs').then(m => m.default)},
    'dashboard/stocks/index.html': {size: 21999, hash: '2a4c32b8cdb9672eb4919c87c8bca1bec9d1397ebc200c4cbd2d722e07c25eef', text: () => import('./assets-chunks/dashboard_stocks_index_html.mjs').then(m => m.default)},
    'dashboard/reports/index.html': {size: 21999, hash: '485994ab66cb3d4b446b576d7136165b5ffa210e21c0fdf5b579acde0df6343a', text: () => import('./assets-chunks/dashboard_reports_index_html.mjs').then(m => m.default)},
    'dashboard/company/index.html': {size: 21489, hash: '82d88296ca56edb6332d31f2d54b94fd91c7929efd55495272099d7b23d35e52', text: () => import('./assets-chunks/dashboard_company_index_html.mjs').then(m => m.default)}
  },
};
