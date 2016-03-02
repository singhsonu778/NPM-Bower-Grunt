module.exports = {

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

};