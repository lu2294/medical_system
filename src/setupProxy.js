/* eslint-disable */
const { createProxyMiddleware } = require("http-proxy-middleware");
// const serverIP = 'https://172.17.6.123';
 const serverIP = 'http://localhost:9002';
//const serverIP = 'https://172.17.6.123';
// const serverIP = 'https://172.17.6.245';
// const serverIP = 'https://172.17.6.240';
module.exports = function (app) {
        app.use(
            "/user",
              createProxyMiddleware({
                  target: serverIP,
                  changeOrigin: true,
                  secure: false,
              })
        ),
        app.use(
          "/account",
            createProxyMiddleware({
                target: serverIP,
                changeOrigin: true,
                secure: false,
            })
      ),
        app.use(
            "/systemapi",
            createProxyMiddleware({
                target: serverIP,
                changeOrigin: true,
                secure: false,
                // pathRewrite: {
                //     "^/systemapi": "",
                // },
            })
        ),
        app.use(
            "/uapapi",
            createProxyMiddleware({
                target: serverIP,
                changeOrigin: true,
                secure: false,
            })
        )
        ,
        app.use(
            "/eumapi",
            createProxyMiddleware({
                target: serverIP,
                changeOrigin: true,
                secure: false,
            })
        ),
        app.use(
            "/eumplugin",
            createProxyMiddleware({
                target: serverIP,
                // pathRewrite: {
                //     "^/policeapi": "",
                // },
                changeOrigin: true,
                secure: false,
            })
        ),
        app.use(
            "/xdrmonitor",
            createProxyMiddleware({
                target: serverIP,
                // pathRewrite: {
                //     "^/policeapi": "",
                // },
                changeOrigin: true,
                secure: false,
            })
        ),
        app.use(
            "/ps",
            createProxyMiddleware({
                target: serverIP,
                // pathRewrite: {
                //     "^/policeapi": "",
                // },
                changeOrigin: true,
                secure: false,
            })
        ),
        app.use(
            "/xdrdatastream",
            createProxyMiddleware({
                target: serverIP,
                // pathRewrite: {
                //     "^/policeapi": "",
                // },
                changeOrigin: true,
                secure: false,
            })
        ),
        app.use(
            "/xdrps",
            createProxyMiddleware({
                target: serverIP,
                // pathRewrite: {
                //     "^/policeapi": "",
                // },
                changeOrigin: true,
                secure: false,
            })
        )
};