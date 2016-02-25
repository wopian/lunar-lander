module.exports = {
    dist: {
        options: {
            sourcemap: 'none',
            style: 'compressed',
        },
        files: {
            'src/assets/css/game.css': 'src/assets/sass/base.scss',
        }
    }
}