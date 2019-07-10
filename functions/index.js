const functions = require('firebase-functions');
const { Nuxt } = require('nuxt-start');
const express = require('express');
const app = express();

const config = {
  dev: false,
  debug: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
};
const nuxt = new Nuxt(config);
function handleRequest(res, req){
  nuxt.renderRoute('/')
    .then(result =>{
      res.send(result.html);
    })
    .catch(e =>{
      res.send(e);
    })

}
app.get('*', handleRequest)

exports.ssrapp = functions.https.onRequest(app);
