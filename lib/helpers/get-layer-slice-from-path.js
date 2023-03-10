const { layersNames } = require('../constants');
const { getByRegExp } = require('./get-by-reg-exp');

const layersRegExpPattern = `(${layersNames.join('|')})(?![\\w\\.])`;

/**
 * Returns the layer from the path
 * @param targetPath {string}
 * @returns {string|null}
 */
const getLayerFromPath = (targetPath) => {
  const layer = getByRegExp(targetPath, new RegExp(layersRegExpPattern, 'i'));

  if (typeof layer === 'string') {
    return layer.toLowerCase();
  }

  return layer;
};

/**
 * Returns the slice from the path
 * @param targetPath {string}
 * @returns {string}
 */
const getSliceFromPath = (targetPath) => {
  const targetPathWithoutCurrentFileName = targetPath.replace(/\/\w+\.\w+$/, '');
  return getByRegExp(targetPathWithoutCurrentFileName, new RegExp(`(?<=(${layersNames.join('|')})\\/)(\\w|-)+`));
};

/**
 * Returns the layer and slice from the path
 * @param filePath {string}
 * @returns {['shared' | 'entities' | 'features' | 'widgets' | 'pages' | 'processes' | 'app', string]} Tuple where the first element is a layer, the second is a slice
 */
module.exports.getLayerSliceFromPath = (filePath) => {
  const layer = getLayerFromPath(filePath);
  const slice = getSliceFromPath(filePath);
  return [layer, slice];
};
