/* config-overrides.js */

module.exports = (config) => {
    require('react-app-rewire-postcss')(config, {
        plugins: (loader) => [
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-nested')(),
            require('postcss-responsive-type')(),
            require('postcss-simple-vars')(),
            require('postcss-cssnext')({
                browsers: ['last 2 versions', '> 5%'],
            }),
            require('lost')(),
        ],
    });

    return config;
};
