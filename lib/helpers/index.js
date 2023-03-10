const { isPathRelative } = require('./is-path-relative');
const { getLayerSliceFromPath } = require('./get-layer-slice-from-path');
const { normalizePath } = require('./normalize-path');
const { configLib } = require('./config-lib');
const { getByRegExp } = require('./get-by-reg-exp');

module.exports.isPathRelative = isPathRelative;
module.exports.getLayerSliceFromPath = getLayerSliceFromPath;
module.exports.normalizePath = normalizePath;
module.exports.configLib = configLib;
module.exports.getByRegExp = getByRegExp;
