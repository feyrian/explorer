/**
* The Locale Module reads the locale settings and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");
var settings = require("./settings");

exports.menu_api = "API",
exports.menu_explorer = "Explorer",
exports.menu_movement = "Movement",
exports.menu_network = "Network",
exports.menu_richlist = "Rich List",
// exports.menu_node = "Nodes",

exports.ex_title = "Block Explorer",
exports.ex_search_title = "Search",
exports.ex_search_button = "Search",
exports.ex_search_message = "You may enter a block height, block hash ,tx hash or address.",
exports.ex_error = "Error!",
exports.ex_warning = "Warning:",
exports.ex_search_error = "Search found no results.",
exports.ex_latest_transactions = "Latest Transactions",
exports.ex_summary = "Block Summary",
exports.ex_supply = "Coin Supply",
exports.ex_block = "Block",

exports.tx_title = "Transaction Details",
exports.tx_block_hash = "Block Hash",
exports.tx_recipients = "Recipients",
exports.tx_contributors = "Contributor(s)",
exports.tx_hash = "Hash",
exports.tx_address = "Address",
exports.tx_nonstandard = "NONSTANDARD TX",

exports.mv_latest_movements = "Latest Movements",

exports.block_title = "Block Details",
exports.block_previous = "Previous",
exports.block_next = "Next",
exports.block_genesis = "GENESIS",

exports.network = "Network",
exports.height = "Height",
exports.timestamp = "Timestamp",
exports.amount = "Amount",
exports.size = "Size",
exports.transactions = "Transactions",
exports.total_sent = "Total Sent",
exports.total_received = "Total Received",
exports.confirmations = "Confirmations",
exports.total = "Total",
exports.bits = "Bits",
exports.nonce = "Nonce",
exports.new_coins = "New Coins",
exports.initial_index_alert = "Indexing is currently incomplete, functionality is limited until index is up-to-date.",

exports.a_menu_showing = "Showing",
exports.a_menu_txs = "transactions",
exports.a_menu_all = "All",

exports.rl_received_coins = "Top 100 - Received Coins",
exports.rl_current_balance = "Top 100 - Current Balance",
exports.rl_received = "Received",
exports.rl_balance = "Balance",
exports.rl_wealth = "Wealth Distribution",
exports.rl_top25 = "Top 1-25",
exports.rl_top50 = "Top 26-50",
exports.rl_top75 = "Top 51-75",
exports.rl_top100 = "Top 76-100",
exports.rl_hundredplus = "101+",

exports.net_connections = "Connections",
exports.net_address = "Address",
exports.net_protocol = "Protocol",
exports.net_subversion = "Sub-version",
exports.net_country = "Country",
exports.net_warning = "This is simply a sub sample of the network based on wallets connected to this node.",

exports.api_title = "API Documentation",
exports.api_message = "The block explorer provides an API allowing users and/or applications to retrieve information from the network without the need for a local wallet.",
exports.api_calls = "API Calls",
exports.api_getconnectioncount = "Returns the number of connections the block explorer has to other nodes.",
exports.api_getblockcount = "Returns the number of blocks currently in the block chain.",
exports.api_getblockhash = "Returns the hash of the block at ; index 0 is the genesis block.",
exports.api_getblock = "Returns information about the block with the given hash.",
exports.api_getrawtransaction = "Returns raw transaction representation for given transaction id. decrypt can be set to 0(false) or 1(true).",

exports.reloadLocale = function reloadLocale(locale) {
  // Discover where the locale file lives
  var localeFilename = locale;
  //console.log(localeFilename);
  localeFilename = "./" + localeFilename;
  //console.log('Loading locale: ' + localeFilename);
  var localeStr;
  try{
    //read the settings sync
    localeStr = fs.readFileSync(localeFilename).toString();
  } catch(e){
    console.warn('Locale file not found. Continuing using defaults!');
  }

  // try to parse the settings
  var lsettings;
  try {
    if(localeStr) {
      localeStr = jsonminify(localeStr).replace(",]","]").replace(",}","}");
      lsettings = JSON.parse(localeStr);
    }
  }catch(e){
    console.error('There was an error processing your locale file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in lsettings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low alphabetic character [a to z]: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = lsettings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadLocale(settings.locale);
