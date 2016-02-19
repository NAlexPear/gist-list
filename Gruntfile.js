'use strict'

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
          'scripts/dist/app.js':'scripts/lib/app.js',
          'scripts/dist/main.js':'scripts/lib/main.js'
        }
      }
    },
    watch: {
      files: ['scripts/lib/*.js'],
      tasks: ['babel']
    }
  });

  grunt.registerTask('default', ['serve']);
};
