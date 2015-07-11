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
 * @fileoverview Testcases for the FuctionRenameTransformer.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.FunctionRenameTransformer');
goog.require('glslunit.glsl.parser');

/**
 * Constructor for FunctionRenameTransformerTest
 * @constructor
 */
function FunctionRenameTransformerTest() {
}
registerTestSuite(FunctionRenameTransformerTest);



/**
 * Tests that the FunctionRenameTransformer renames function declarations.
 */
FunctionRenameTransformerTest.prototype.testRenameFunction = function() {
  var testSource =
    'void renameMe() {}' +
    'void renameMe(int a, int b);' +
    'void butIgnoreMe() {}' +
    'void renameMe();';

  var testAST = glslunit.glsl.parser.parse(testSource);
  var target = 'void renameMe()';
  var targetAST = glslunit.glsl.parser.parse(target, 'function_prototype');
  var renameTransformer = new glslunit.FunctionRenameTransformer(targetAST,
                                                                 'YAAH');
  var transformed = renameTransformer.transformNode(testAST);
  expectEq('YAAH', transformed.statements[0].name, "Function wasn't renamed");
  expectEq('renameMe', testAST.statements[0].name, 'Original was renamed');
  expectEq('renameMe',
      transformed.statements[1].name,
          'Another overload of function was renamed');
  expectEq('butIgnoreMe',
      transformed.statements[2].name, 'Non-target function renamed');
  expectEq('YAAH',
      transformed.statements[3].name, "Prototype wasn't renamed");
};

/**
 * Tests that the FunctionRenameTransformer renames function calls.
 */
FunctionRenameTransformerTest.prototype.testRenameFunctionCall = function() {
  var testSource =
    'void main(){' +
    '  renameMe();' +
    '  ignoreMe();' +
    '  renameMe(1, 3, 5);' +
    '}';
  var testAST = glslunit.glsl.parser.parse(testSource);
  var target = 'void renameMe()';
  var targetAST = glslunit.glsl.parser.parse(target, 'function_prototype');
  var renameTransformer = new glslunit.FunctionRenameTransformer(targetAST,
                                                                 'YAAH');
  var transformed = renameTransformer.transformNode(testAST);
  var transformedStatements = transformed.statements[0].body.statements;
  var originalStatements = testAST.statements[0].body.statements;
  expectEq('YAAH',
      transformedStatements[0].expression.function_name,
          "Function wasn't renamed");
  expectEq('renameMe',
      originalStatements[0].expression.function_name, 'Original was renamed');
  expectEq('ignoreMe',
      transformedStatements[1].expression.function_name,
          'Non-target function was renamed');
  expectEq('renameMe',
      transformedStatements[2].expression.function_name,
          'Another overload function was renamed');
};
