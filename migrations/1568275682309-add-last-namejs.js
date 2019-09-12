'use strict'

const Bluebird = require('bluebird');

const mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/yaqoubmongo";

MongoClient.connect(url,  { useNewUrlParser: true,useUnifiedTopology: true },function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

Bluebird.promisifyAll(MongoClient);

module.exports.up = next => {
  let mClient = null

  return MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },)
  .then(client => {

    mClient = client
    return client.db()

  })
  .then(db => {

    console.log(db);
     const Pet = db.collection('pets');

    // return User
    //   .find({ lastName: { $exists: false }})
    //   .forEach(result => {
    //     if (!result) return next('All docs have lastName')
    //     if (result.name) {

    //        const { name } = result
    //        result.lastName = name.split(' ')[1]
    //        result.firstName = name.split(' ')[0]

    //     }
    //     return db.collection('users').save(result)
    //  })
    
    db.pets = [];
  db.pets.push('tobi')
  db.pets.push('loki')
  db.pets.push('jane')


  })
  .then(() => {
    
    mClient.close()

    return next()
  })
   .catch(err => next(err))
}

module.exports.down = next => {

  let mClient = null
  
  return MongoClient
     .connect(url)  
     .then(client => {
      mClient = client
      return client.db()
    })
    .then(db =>
      db.collection('users').update(
      {
         lastName: { $exists: true }
      },
      {
        $unset: { lastName: "" },
      },
       { multi: true }
    ))
    .then(() => {
      mClient.close()
      return next()
    })
    .catch(err => next(err))
  }