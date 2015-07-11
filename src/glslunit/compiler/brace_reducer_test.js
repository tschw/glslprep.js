// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Test cases for the ConstructorMinifier.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.Generator');
goog.require('glslunit.compiler.BraceReducer');
goog.require('glslunit.glsl.parser');



/**
 * Constructor for BraceReducerTest
 * @constructor
 */
function BraceReducerTest() {
  setUp();
}
registerTestSuite(BraceReducerTest);



function setUp() {
  inputSource =
      'void main(){' +
      'for(int i=0;i<10;++i)' +
      'foo+=foo;' +
      'for(int i=0;i<10;++i){' +
      'bar+=foo;' +
      '}' +
      'for(int i=0;i<10;++i){' +
      'bar+=foo;' +
      'return;' +
      '}' +
      'if(false){' +
      'i++;j++;}else{' +
      'return;' +
      '}' +
      'do {k++;}while(false)' +
      '}';
}


/**
 * Test case testConstructorMinifier
 */
BraceReducerTest.prototype.testConstructorMinifier = function() {
  var expectedSource =
      'void main(){' +
      'for(int i=0;i<10;++i)' +
      'foo+=foo;' +
      'for(int i=0;i<10;++i)' +
      'bar+=foo;' +
      'for(int i=0;i<10;++i){' +
      'bar+=foo;' +
      'return;' +
      '}' +
      'if(false){' +
      'i++;j++;}else ' +
      'return;' +
      'do k++;while(false)' +
      '}';
  var minifier = new glslunit.compiler.BraceReducer();
  var inputNode = glslunit.glsl.parser.parse(inputSource);
  var newNode = minifier.transformNode(inputNode);
  expectNe(inputNode, newNode);
  expectEq(expectedSource, glslunit.Generator.getSourceCode(newNode));
};
