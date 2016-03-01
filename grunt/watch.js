module.exports = {
	
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
	
};