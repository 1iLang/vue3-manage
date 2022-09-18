/**
 * 环境配置文件（一般企业级项目有三个环境）
 * - 开发环境
 * - 测试环境
 * - 线上环境
 */

//当前环境
const env = import.meta.env.MODE || 'pro'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/fe2cc3797afd21227254eaaf1322b1d6/api'
  },
  test: {
    baseApi: 'test/api',
    mockApi: 'https://www.fastmock.site/mock/fe2cc3797afd21227254eaaf1322b1d6/api'
  },
  pro: {
    baseApi: 'pro/api',
    mockApi: 'https://www.fastmock.site/mock/fe2cc3797afd21227254eaaf1322b1d6/api'
  },
}

export default {
  env,
  mock: false, //mock总开关
  ...EnvConfig[env]
}

