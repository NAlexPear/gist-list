'use strict'

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-serve');

  grunt.initConfig({
    serve: {
      options: {
        port: 8080
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'scripts/dist/app.js':'scripts/lib/app.js'
        }
      }
    }
  });

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('babel', ['babel']);
};
