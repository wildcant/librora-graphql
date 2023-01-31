"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.theme = void 0;
var colors_1 = __importDefault(require("tailwindcss/colors"));
var defaultTheme_1 = require("tailwindcss/defaultTheme");
// Generated using https://uicolors.app/create
var electricViolet = {
    '50': '#fbf3ff',
    '100': '#f5e3ff',
    '200': '#edcdff',
    '300': '#dfa5ff',
    '400': '#cc6cff',
    '500': '#b935ff',
    '600': '#a80fff',
    '700': '#9d00ff',
    '800': '#7d06c3',
    '900': '#67079c'
};
var citrineWhite = {
    '50': '#fdf9ef',
    '100': '#f8edcf',
    '200': '#f3e0b5',
    '300': '#eccb85',
    '400': '#e3ab54',
    '500': '#dc9333',
    '600': '#ce7c28',
    '700': '#ab6123',
    '800': '#894d23',
    '900': '#6f411f'
};
exports.theme = {
    extend: {
        boxShadow: {
            btn: '5px 6px 0px'
        },
        fontFamily: {
            merienda: ['var(--font-merienda)'],
            sans: __spreadArray(['var(--font-roboto)'], defaultTheme_1.fontFamily.sans, true)
        },
        colors: {
            current: 'currentColor',
            primary: {
                lightest: electricViolet[50],
                lighter: electricViolet[100],
                light: electricViolet[200],
                base: electricViolet[600],
                dark: electricViolet[700],
                darker: electricViolet[800],
                darkest: electricViolet[900]
            },
            secondary: {
                lightest: citrineWhite[50],
                lighter: citrineWhite[100],
                light: citrineWhite[200],
                base: citrineWhite[600],
                dark: citrineWhite[700],
                darker: citrineWhite[800],
                darkest: citrineWhite[900]
            },
            success: {
                base: colors_1["default"].green[600],
                light: colors_1["default"].green[100]
            },
            warning: {
                base: colors_1["default"].amber[500],
                light: colors_1["default"].orange[200]
            },
            alert: {
                base: colors_1["default"].red[500],
                light: colors_1["default"].red[200]
            }
        },
        animation: {
            'spin-fast': 'spin 100ms linear infinite'
        }
    }
};
