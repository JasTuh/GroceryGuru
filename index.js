const body = require('body-parser');
const co = require('co');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

const username = "test2"
const password = "testpassword"
const firstname = "john"
const lastname = "doe"

function createUser() {
  bcrypt.hash(password, 10, function(err, hash) {
    let collection = db.get().collection('users');
    collection.find({username}).toArray((err, docs) => {
      if (docs.length !== 0){
        console.log('user already in DB');
        return;
      }
      collection.insert({
        username,
        password:hash,
        name: `${firstname},${lastname}`,
      });
    })
  }); 
}
function connect() {
  return new Promise((fulfill, reject)=>{
    db.connect('mongodb://admin:password@ds119064.mlab.com:19064/groceryguru', (err) => {
      if (err) {
        console.log('Error connecting to database') 
        reject(err)
      } else {
        fulfill('connected');
      }
    });
  })
}
co(function* () {
  yield app.prepare();
  yield connect();
  const server = express();
  server.use(cookieParser());
  createUser();
  server.use(body.json());
  server.get('*', (req, res) => handle(req, res));
  server.listen(PORT);
  console.log(`Listening on ${PORT}`);
});
