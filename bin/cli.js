#!/usr/bin/env node
/********************************************************* {COPYRIGHT-TOP} ***
 * Licensed Materials - Property of IBM
 * 5725-Z22, 5725-Z63, 5725-U33, 5725-Z63
 *
 * (C) Copyright IBM Corporation 2016, 2017
 *
 * All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 ********************************************************** {COPYRIGHT-END} **/


// Node module: apiconnect
var SG = require('strong-globalize');
var path = require('path');
 function  index(){

  SG.SetRootDir(path.join(__dirname , ".."), { autonomousMsgLoading: 'all' });
  SG.SetDefaultLanguage();
  
  var cwd = path.dirname(__dirname);
  
  
  
  // the name of the product
  process.env.APIC_CLI_NAME = 'API Connect';
  
  // the name of the config directory in user home that will be sued for this CLI
  process.env.APIC_CLI_CONFIG_DIR = '.apiconnect';
  
  // the name of the log file that will be used for this CLI
  process.env.APIC_CLI_LOG_FILE = 'apic.log';
  
  // the name of the CLI, can also be retrieved from package.json
  process.env.APIC_CLI = 'apic';
  
  // Load logger first so it can initialize and hook into debug
  var logger = require('apiconnect-cli-logger');
  var cli = require('apiconnect-cli-plugins').cli;
  
  var opts = {
    cwd: cwd,
    pkg: path.join(cwd, 'package.json'),
    lic: path.join(cwd, 'LICENSE.txt'),
    al: path.join(cwd, 'ANALYTICS.txt'),
    typeDescriminators: [ 'e', 'type', 'scope' ],
  };
  
  cli(opts).then(function() {
    logger.debug('Command completed successfully');
    return logger.exit(0);
  }).catch(function(err) {
    logger.debug('Command completed with error');
    logger.debug(err.message);
    logger.debug(err.stack);
    return logger.exit(err.exitCode ? err.exitCode : 1);
  });
  
}


module.exports  = index