/**
 * @fileoverview Checks for absolute and relative paths
 * @author conarti
 */
'use strict';

const {
  isPathRelative,
  getLayerSliceFromPath,
  normalizePath,
} = require('../../lib/helpers');
const { ERROR_MESSAGE_ID } = require('./constants');
const { shouldBeRelative, shouldBeAbsolute } = require('./model');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null,
    docs: {
      description: 'Checks for absolute and relative paths',
      recommended: false,
      url: null,
    },
    fixable: null,
    messages: {
      [ERROR_MESSAGE_ID.MUST_BE_RELATIVE_PATH]: 'There must be relative paths',
      [ERROR_MESSAGE_ID.MUST_BE_ABSOLUTE_PATH]: 'There must be absolute paths',
    },
    schema: [],
  },

  create(context) {
    const getPathsInfo = (node, context) => {
      const importPath = normalizePath(node.source.value);
      const currentFilePath = normalizePath(context.getFilename());

      const [targetLayer, targetSlice] = getLayerSliceFromPath(importPath);
      const [currentFileLayer, currentFileSlice] = getLayerSliceFromPath(currentFilePath);
      const isImportRelative = isPathRelative(importPath);

      return {
        isImportRelative,
        targetLayer,
        targetSlice,
        currentFileLayer,
        currentFileSlice,
      };
    };

    return {
      ImportDeclaration(node) {
        const pathsInfo = getPathsInfo(node, context);

        if (shouldBeRelative(pathsInfo)) {
          context.report({
            node: node.source,
            messageId: ERROR_MESSAGE_ID.MUST_BE_RELATIVE_PATH,
          });
        }

        if (shouldBeAbsolute(pathsInfo)) {
          context.report({
            node: node.source,
            messageId: ERROR_MESSAGE_ID.MUST_BE_ABSOLUTE_PATH,
          });
        }
      },
      ExportAllDeclaration(node) {
        const pathsInfo = getPathsInfo(node, context);

        if (shouldBeRelative(pathsInfo)) {
          context.report({
            node: node.source,
            messageId: ERROR_MESSAGE_ID.MUST_BE_RELATIVE_PATH,
          });
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source === null) {
          return;
        }

        const pathsInfo = getPathsInfo(node, context);

        if (shouldBeRelative(pathsInfo)) {
          context.report({
            node: node.source,
            messageId: ERROR_MESSAGE_ID.MUST_BE_RELATIVE_PATH,
          });
        }
      },
    };
  },
};
