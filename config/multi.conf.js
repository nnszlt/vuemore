const path = require('path')
const argvs = process.argv.slice(2)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getParams (key) {
  let item = argvs.find(item => item.split('=')[0] === key)
  return item ? item.split('=') : []
}

function getModuleAlias () {
  let alias = {}
  importModules.forEach(name => {
    alias[`@projects/${name}`] = resolve(`src/projects/${name}`)
  })
  return alias
}

class MultiModule {
  constructor (name, opts) {
    Object.assign(this, {
      name,
      assetsSubDirectory: 'static',
      assetsPublicPath: `/more/${name}/`,   //访问路径名
      port: 10010,
      host: '0.0.0.0',
      proxyTable: null,
      entry: {
        app: ['babel-polyfill', `./src/projects/${name}/main.js`]
      },
      alias: resolve(`src/projects/${name}`),
      index: path.resolve(__dirname, `../dist/projects/${name}/index.html`),
      favicon: path.resolve(__dirname, `../src/projects/${name}/assets/favicon.ico`),
      assetsRoot: path.resolve(__dirname, `../dist/projects/${name}/`),
      deployConfig: null
    }, opts)
  }
}

function getModuleProcess (name) {
  let mItem = importModules.find(item => item.name === name)
  return mItem || importModules[0]
}

function proxyHandle (proxyReq, req, res, options) {
  let origin = `${options.target.protocol}//${options.target.host}`
  proxyReq.setHeader('origin', origin)
  proxyReq.setHeader('referer', origin)
}

function onProxyReq (proxyReq, req, res, options) {
  proxyHandle(proxyReq, req, res, options)
}

function onProxyReqWs (proxyReq, req, socket, options, head) {
  proxyHandle(proxyReq, req, socket, options)
}

function getProxyConfig (target, options) {
  return Object.assign({
    target,
    secure: false,
    changeOrigin: true,
    ws: false,
    cookieDomainRewrite: {'*': ''},
    cookiePathRewrite: {'*': '/'},
    onProxyReq,
    onProxyReqWs
  }, options)
}

const PROXY_DOMAIN_DEFAULT = 'http://127.0.0.1:8090'

// 多模块独立配置
var importModules = [
  new MultiModule('p1', {
    proxyTable: {
      '/api/': getProxyConfig(PROXY_DOMAIN_DEFAULT)
    }
  }),
  new MultiModule('p2', {
    proxyTable: {
      '/api/': getProxyConfig(PROXY_DOMAIN_DEFAULT)
    }
  })

]
var lifecycleEvents = String(process.env.npm_lifecycle_event).split(':')
var moduleName = getParams('name')[1] || lifecycleEvents[1]

const multiConfig = {
  modules: importModules,
  moduleAlias: getModuleAlias(),
  process: getModuleProcess(moduleName)
}

module.exports = multiConfig
