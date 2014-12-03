/**
 * broccoli-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/broccoli-sassdoc/blob/master/UNLICENCE
 */

'use strict';

var Writer = require('broccoli-writer');
var sassdoc = require('sassdoc');
var ensure = require('lodash').assign;

function cfg() {
  // Defaults.
  var options = ensure(this.options, {
    noUpdateNotifier: true
  });

  // Instantiate a new SassDoc Logger.
  var logger = new sassdoc.Logger(options.verbose);

  // Load raw configuration.
  var config = sassdoc.cfg.pre(options.config, logger);

  // Ensure that options take precedence over configuration values.
  ensure(config, options);

  // Post process configuration.
  sassdoc.cfg.post(config);

  return config;
}

function SassDocCompile(inputTree, options) {
  if (!(this instanceof SassDocCompile)) {
    return new SassDocCompile(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
}

SassDocCompile.prototype = Object.create(Writer.prototype);
SassDocCompile.prototype.constructor = SassDocCompile;
SassDocCompile.prototype.description = 'Generates SassDoc documentation';

SassDocCompile.prototype.write = function (readTree, destDir) {
  var config = cfg.call(this);

  return readTree(this.inputTree).then(function (srcDir) {

    return sassdoc.documentize(srcDir, destDir, config)
      .then(function () {
        console.log('SassDoc documentation successfully generated.');
      }, function (err) {
        throw err;
      });

  });

};

module.exports = SassDocCompile;
