// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Test cases for the DeadFunctionRemover.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.Generator');
goog.require('glslunit.compiler.DeadFunctionRemover');
goog.require('glslunit.glsl.parser');



/**
 * Constructor for DeadFunctionRemoverTest
 * @constructor
 */
function DeadFunctionRemoverTest() {
  setUp();
}
registerTestSuite(DeadFunctionRemoverTest);



function setUp() {
  inputSource =
    'void uncalledChildFunction();' +
    'void bar();' +
    'void foo(){bar();}' +
    'void bar(){}' +
    'void main(){foo();}' +
    'void uncalledFunction(){uncalledChildFunction();}' +
    'void uncalledChildFunction(){}' +
    'void aliveGlobal(){}' +
    'float z=aliveGlobal();';
}



/**
 * Test case testDeadFunctionRemover
 */
DeadFunctionRemoverTest.prototype.testDeadFunctionRemover = function() {
  var expectedSource =
    'void bar();' +
    'void foo(){bar();}' +
    'void bar(){}' +
    'void main(){foo();}' +
    'void aliveGlobal(){}' +
    'float z=aliveGlobal();';
  var minifier = new glslunit.compiler.DeadFunctionRemover();
  var inputNode = glslunit.glsl.parser.parse(inputSource);
  var newNode = minifier.transformNode(inputNode);
  expectNe(inputNode, newNode);
  expectEq(expectedSource, glslunit.Generator.getSourceCode(newNode));
};
