'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var GbmpGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous gbmp (Gulp, Browserify, Mocha & Phantomjs) generator!'));

    var prompts = [
      {
        name: 'appName',
        message: 'What is the name of your webapp?',
        default: 'yourAppName'
      },
      {
        name: 'author',
        message: 'Author Name: ',
        default: ''
      },
      {
        name: 'description',
        message: 'Description: ',
        default: ''
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.author = props.author;
      this.description = props.description;

      done();
    }.bind(this));
  },

  renderTemplates: function() {
    var done = this.async();
    var filesToCompile = [
      'README.md',
      'package.json',
      'index.html'
    ];

    filesToCompile.forEach(function(file) {
      this.template(file, file, this);
    }.bind(this));

    done();
  },

  copyFiles: function() {
    var done = this.async();

    this.mkdir('img');

    this.directory('css');
    this.directory('test');
    this.directory('js');

    this.expandFiles('*', {
      cwd: this.sourceRoot(),
      dot: true
    }).forEach(function (file) {
      this.copy(file, file);
    }.bind(this));

    done();

  }

});

module.exports = GbmpGenerator;
