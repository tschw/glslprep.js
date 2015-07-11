// Copyright 2011 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Test cases for the NodeCollector.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.Generator');
goog.require('glslunit.NodeCollector');
goog.require('glslunit.glsl.parser');

/**
 * Constructor for NodeCollectorTest
 * @constructor
 */
function NodeCollectorTest() {
}
registerTestSuite(NodeCollectorTest);



/**
 * Test case testNodeCollector
 */
NodeCollectorTest.prototype.testNodeCollector = function() {
  var testSource =
    'attribute vec3 foo;' +
    'varying vec2 bar,bbarr;' +
    'vec4 raz;' +
    'void main() {' +
    '  float meh;' +
    '}';
  var testAst = glslunit.glsl.parser.parse(testSource);
  var cNodes = glslunit.NodeCollector.collectNodes(testAst,
      function(node, parentStack) {
    var result = node.type == 'declarator' &&
        node.typeAttribute.qualifier == 'varying';
    if (result) {
      expectEq(1, parentStack.length);
      expectEq('root', parentStack[0].type);
    }
    return result;
  });
  expectEq(1, cNodes.length);
  expectEq('varying vec2 bar,bbarr;',
      glslunit.Generator.getSourceCode(cNodes[0]));
  cNodes = glslunit.NodeCollector.collectNodes(testAst,
      function(node, parentStack) {
    var result = node.type == 'declarator_item' &&
        node.name.name == 'meh';
    if (result) {
      expectEq(4, parentStack.length);
    }
    return result;
  });
};
