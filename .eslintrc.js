module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true,
        "jest": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
            
        }
    },
    globals: {
        __PATH_PREFIX__: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    plugins: [
        "react"
    ],
}