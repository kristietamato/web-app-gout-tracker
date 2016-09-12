module.exports = function(grunt) {
  grunt.initConfig({

    concat : {
      options: {
        separator: '\n\n//------------------------------------------\n',
        banner: '\n\n//------------------------------------------\n'
      },
      dist : {
        src: ['app/**/*.js'],
        dest: 'build/scripts/concat-script.js'
      }
    }, //concat

    wiredep: {
      task: {
        src: 'app/**/*.html'
      }
    }, //wiredep

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'app/',
          livereload: true
        }
      }
    }, //connect

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['app/**/*.html',
        'build/**/*.js'],
        tasks: ['concat']
      }
    } //watch


  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('watcher', ['wiredep', 'connect', 'watch']);
  grunt.registerTask('default', ['wiredep', 'concat', 'connect', 'watch']);

}; //wrapper function
