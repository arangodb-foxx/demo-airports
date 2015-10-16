/*global module, require */
(function() {
  "use strict";

  module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      project: {
        html: [
          'frontend/html/*.html'
        ],
        js: [
          'frontend/js/models/*.js',
          'frontend/js/collections/*.js',
          'frontend/js/views/*.js',
          'frontend/js/routers/*.js',
          'frontend/js/app.js',
          '!frontend/js/lib/*.js'
        ],
        lib: [
          'frontend/js/lib/jquery-1.11.3.min.js',
          'frontend/js/lib/underscore-min.js',
          'frontend/js/lib/backbone-min.js',
          "frontend/js/lib/lunr.min.js",
          "frontend/js/lib/ammap/ammap.js",
          "frontend/js/lib/ammap/maps/js/usa2High.js",
          "frontend/js/lib/ammap/themes/light.js"
        ],
        scss: [
          'frontend/scss/*.scss'
        ],
        baseScss: [
          'frontend/scss/style.scss'
        ]
      },

      sass: {
        dev: {
          options: {
            style: 'nested'
          },
          files: {
            'build/style.css': '<%= project.baseScss %>',
          }
        },
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'build/style.css': '<%= project.baseScss %>',
          }
        }
      },

      concat_in_order: {
        js: {
          files: {
            'build/lib.js': [
              '<%=project.lib %>'
            ],
            'build/app.js': [
              '<%=project.js %>'
            ]
          },
          options: {
            extractRequired: function () {
              return [];
            },
            extractDeclared: function () {
              return [];
            }
          }
        },
        html: {
          files: {
            'build/index.html': [
              '<%=project.html %>'
            ]
          },
          options: {
            extractRequired: function () {
              return [];
            },
            extractDeclared: function () {
              return [];
            }
          }
        }
      },

      jshint: {
        options: {
          laxbreak: true
        },
        default: [
          '<%=project.js %>'
        ]
      },
      
      uglify: {
        dist: {
          files: {
            'build/app.min.js': 'build/app.js'
          }
        }
      },

      watch: {
        sass: {
          files: "<%= project.scss %>",
          tasks: ['sass:dev']
        },
        concat_in_order: {
          files: ["<%= project.js %>", "<%= project.html %>"],
          tasks: [ 'concat_in_order' ]
        }
      }
    });

    grunt.loadNpmTasks("grunt-sass");

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
      'sass:dev',
      'concat_in_order',
    ]);


    grunt.registerTask('devel', [
      'sass:dev',
      'concat_in_order',
      'watch'
    ]);

    grunt.registerTask('deploy', [
      'sass:dist',
      'concat_in_order',
      'uglify:dist'
    ]);
  };
}());
