module.exports = {
    options: {
        stripBanners: true,
    },
    dist: {
        files: {
            'dist/assets/js/game.js' : [
                'src/assets/javascript/game.js',
                'src/assets/javascript/instructions.js'
            ]
        }
    }
}