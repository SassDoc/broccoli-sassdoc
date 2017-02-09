/**
 * broccoli-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/broccoli-sassdoc/blob/master/UNLICENCE
 */

'use strict';

var Writer = require('broccoli-writer');
var sassdoc = require('sassdoc');
var ensure = require('lodash.assign');

function environment() {
  // Defaults.
  var options = ensure(this.options, {
    noUpdateNotifier: true,
  });

  // Instantiate a new SassDoc Logger.
  var logger = new sassdoc.Logger(options.verbose);

  // Instantiate a new SassDoc Environment.
  var env = new sassdoc.Environment(logger, options.strict);

  env.on('error', console.error);

  // Load and process config file, if any.
  env.load(options.config);

  // Ensure that options take precedence over configuration values.
  ensure(env, options);

  env.postProcess();

  return env;
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
  var env = environment.call(this);
  env.dest = destDir;

  return readTree(this.inputTree).then(function (srcDir) {
    return sassdoc(srcDir, env)
      .then(function () {
        console.log('SassDoc documentation successfully generated.');
      }, function (err) {
        throw err;
      });
  });
};

module.exports = SassDocCompile;
