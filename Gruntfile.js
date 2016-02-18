'use strict'

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-serve');

  grunt.initConfig({
    serve: {
      options: {
        port: 8080
      }
    }
  });

  grunt.registerTask('default', ['serve']);
};
