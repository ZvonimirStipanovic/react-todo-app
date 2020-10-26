/* config-overrides.js */

module.exports = (config) => {
    require('react-app-rewire-postcss')(config, {
        plugins: (loader) => [
            require('postcss-import')(),
            require('postcss-nested')(),
            require('postcss-preset-env')(),
            require('postcss-simple-vars')(),
        ],
    });

    return config;
};
