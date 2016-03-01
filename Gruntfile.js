module.exports = function (grunt) {

    grunt.initConfig({

        pgk: grunt.file.readJSON('package.json'),

        clean: {
            clean: ['build', 'target']
        },

        sass: {
        	options: {
                sourcemap: 'none'
            },
            sass: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: '*.scss',
                    dest: 'target/css',
                    ext: '.css'
                }]
            }
        },

        concat_css: {
            concat_css: {
                src: 'target/css/*.css',
                dest: 'target/css/main/main.css'
            }
        },

        cssmin: {
            cssmin: {
                src: 'target/css/main/main.css',
                dest: 'target/css/main/main.min.css'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            concat: {
                src: 'src/js/*.js',
                dest: 'target/js/main.js'
            }
        },

        uglify: {
            uglify: {
                src: 'target/js/main.js',
                dest: 'target/js/main.min.js'
            }
        },

        watch: {
            watch_html: {
                files: 'src/index.html',
                tasks: ['copy:copy_html']
            },
            watch_scss: {
                files: 'src/scss/*.scss',
                tasks: ['sass', 'concat_css', 'cssmin', 'copy:copy_css']
            },
            watch_js: {
                files: 'src/js/*.js',
                tasks: ['concat', 'uglify', 'copy:copy_js']
            }
        },

        copy: {
            copy_html: {
                src: 'src/index.html',
                dest: 'build',
                expand: true,
                flatten: true
            },
            copy_css: {
                src: 'target/css/main/main.min.css',
                dest: 'build',
                expand: true,
                flatten: true
            },
            copy_js: {
                src: 'target/js/main.min.js',
                dest: 'build',
                expand: true,
                flatten: true
            },
            copy_third_party: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/jquery/dist/jquery.min.js'],
                dest: 'build/third_party',
                expand: true,
                flatten: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'sass', 'concat_css', 'cssmin', 'concat', 'uglify', 'copy', 'watch']);

};
