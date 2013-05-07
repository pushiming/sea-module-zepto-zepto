/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        cmdWrapper: {
            banner: 'define(function(require, exports, module) {\n',
            footer: '\nmodule.exports = window.Zepto;});\n'
        },

        // Task configuration.
        concat: {
            cmdWrap: {
                options: {
                    noncmd: true,
                    banner: '<%= cmdWrapper.banner %>',
                    footer: '<%= cmdWrapper.footer %>'
                },
                files: [
                    {
                        src: ['lib/<%= pkg.name %>.js'],
                        dest: 'tmp/<%= pkg.name %>.js'
                    }
                ]
            }
        },

        transport: {
            options: {
                idleading: '<%= pkg.family %>/<%= pkg.name %>/<%= pkg.version %>/',
                debug: true
            },
            dist: {
                files: [
                    {
                        cwd: 'tmp',
                        src: '**/*',
                        filter: 'isFile',
                        dest: 'dist'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        clean: {
            temp: ['tmp']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task.
    grunt.registerTask('default', ['concat', 'transport', 'uglify', 'clean']);

};
