/*global module*/

var path = require('path');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    webfont: {
      // Creates a stylesheet with embedded font
      embedded: {
        src: 'images/**/*.svg',
        dest: 'output/embedded/',
        options: {
          font: 'firefox-icons',
          types: 'ttf',
          embed: 'ttf',
          ligatures: true,
          hashes: false,
          template: 'templates/firefox-icons.css',
          htmlDemoTemplate: 'templates/index.html',
        }
      },

      // Creates font files
      files: {
        src: 'images/**/*.svg',
        dest: 'output/files/fonts/',
        destCss: 'output/files/',
        destHtml: 'output/files/',
        options: {
          font: 'firefox-icons',
          types: 'ttf',
          template: 'templates/firefox-icons.css',
          htmlDemoTemplate: 'templates/index.html',
          ligatures: true,
          hashes: false,
          autoHint: false,
          templateOptions: {
            baseClass: '',
            classPrefix: '',
            mixinPrefix: ''
          },
          rename: function(name) {
              // .icon_entypo-add, .icon_fontawesome-add, etc. 
              return [path.basename(path.dirname(name)), path.basename(name)].join('_');
          }
        }
      }
    },

    // Make sure that structure conforms to
    // other shared components (grunt-webfont
    // doesn't let us specify filenames).
    rename: {
      'css-embedded': {
        src: 'output/embedded/firefox-icons.css',
        dest: 'firefox-icons-embedded.css',
      },

      css: {
        src: 'output/files/firefox-icons.css',
        dest: 'firefox-icons.css',
      },

      fonts: {
        src: 'output/files/fonts',
        dest: 'fonts'
      },

      example: {
        src: 'output/files/firefox-icons.html',
        dest: 'index.html'
      }
    },

    clean: {
      fonts: 'fonts',
      output: 'output'
    },

    shell: {
      installFontOnSystem: {
        command: 'cp ./fonts/firefox-icons.ttf /Users/${USER}/Library/Fonts/firefox-icons.ttf'
      },

      completeMsg: {
        command: [
          'printf "\\e[32m"',
          'echo "Converting finished... "',
          'echo "The font icons are saved in the fonts folder."',
          'echo "Open index.html to inpsect the font icons"',
          'echo "\\033[0m"'
        ].join(";")
      }
    },

    watch: {
      build: {
        files: ["images/**/*.svg"],
        tasks: ["build"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'clean:fonts',
    'webfont:files',
    'webfont:embedded',
    'rename',
    'clean:output',
    "shell:installFontOnSystem",
    "shell:completeMsg"
  ]);

  grunt.registerTask("default", ["build", "watch:build"]);
};
