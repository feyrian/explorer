var mongoose = require('mongoose'), 
    db = require('../lib/database'), 
    Tx = require('../models/tx'),
    Address = require('../models/address'),
    settings = require('../lib/settings');

var COUNT = 5000; //number of blocks to index

function exit() {  
  mongoose.disconnect();
  process.exit(0);
}

var dbUri = 'mongodb://' + settings.dbsettings.user;
dbUri = dbUri + ':' + settings.dbsettings.password;
dbUri = dbUri + '@' + settings.dbsettings.address;
dbUri = dbUri + ':' + settings.dbsettings.port;
dbUri = dbUri + "/tau-benchmark";

const opts = { 
  useCreateIndex: true,
  useNewUrlParser: true
}
mongoose.connect(dbUri, opts, function(err) {
  if (err) {
    console.log('Unable to connect to database: %s', dbUri);
    console.log('Aborting');
    exit();
  }
  Tx.deleteMany({}, function(err) { 
    Address.deleteMany({}, function(err2) { 
      var s_timer = new Date().getTime();
      db.update_tx_db(settings.coin, 1, COUNT, settings.update_timeout, function(){
        db.update_richlist('received', function(){
          db.update_richlist('balance', function(){
            var e_timer = new Date().getTime();
            Tx.countDocuments({}, function(txerr, txcount){
              Address.countDocuments({}, function(aerr, acount){
                var stats = {
                  tx_count: txcount,
                  address_count: acount,
                  seconds: (e_timer - s_timer)/1000,
                };
                console.log(stats);
                exit();
              });
            });
          });
        });
      });
    });
  });
});
