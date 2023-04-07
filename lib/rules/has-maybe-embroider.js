/**
 * @fileoverview Require maybeEmbroider function imported and called in ember-cli-build.js
 * @author Stanislav Dunajcan
 */
"use strict";
const path = require('path');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
function isRequireCall(node) {
  return (
    node.callee.name === "require" &&
    node.arguments.length === 1 &&
    node.arguments[0].value === "@embroider/test-setup"
  );
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      error: "maybeEmbroider isn't called!",
    },
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Require maybeEmbroider function imported and called in ember-cli-build.js",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const fullFileName = context.getFilename();
    const fileName = path.basename(fullFileName);
    if (fileName !== "ember-cli-build.js") {
      return {};
    }

    let funcName;
    let testSetupName;
    let resultReturned = false;
    let resultVariableName;

    function getParentByCondition(node, conditionFunction){
      if(node.parent){
        if(conditionFunction(node.parent)){
          return node.parent;
        }else{
          return getParentByCondition(node.parent, conditionFunction);
        }
      }
    }

    function isExportedFunction(node){
      return node.type === "AssignmentExpression" &&
        node.left?.object?.name === "module" &&
        node.left?.property?.name === "exports" &&
        node.right?.type === 'FunctionExpression';
    }

    function checkResultReturned(node) {
      // check if it is inside exported function
      const exportedFunctionParent = getParentByCondition(node, isExportedFunction);
      if(!exportedFunctionParent){
        return;
      }
      
      // check if it is returned
      switch (node.parent?.type) {
        case "ReturnStatement":
          resultReturned = true;
          break;
        case "VariableDeclarator":
          resultVariableName = node.parent?.id?.name;
          break;
      }
    }

    return {
      CallExpression(node) {
        // get imported function name
        if (
          isRequireCall(node) &&
          node.parent &&
          node.parent.type === "VariableDeclarator"
        ) {
          if (node.parent.id.type === "Identifier") {
            testSetupName = node.parent.id.name;
          } else if (node.parent.id.type === "ObjectPattern") {
            const prop = node.parent.id.properties.find(
              (p) => p.key.name === "maybeEmbroider"
            );
            if (prop) {
              funcName = prop.value.name;
            }
          }
        }

        // check maybeEmbroider is called
        if (funcName) {
          if (node.callee.name === funcName) {
            checkResultReturned(node);
          }
        } else if (testSetupName) {
          if (
            node.callee.object &&
            node.callee.object.name === testSetupName &&
            node.callee.property.name === "maybeEmbroider"
          ) {
            checkResultReturned(node);
          }
        }
      },
      ReturnStatement(node){
        if(resultVariableName && node.argument?.name === resultVariableName){
          resultReturned = true;
        }
      },
      onCodePathEnd: function (codePath, node) {
        // at the end of the program checking if maybeEmbroider function was called.
        if (node.type === "Program" && !resultReturned) {
          context.report({
            node,
            messageId: "error",
          });
        }
      },
    };  
  },
};