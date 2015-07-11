// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Test cases for the NameGenerator.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.compiler.NameGenerator');



/**
 * Constructor for NameGeneratorTest
 * @constructor
 */
function NameGeneratorTest() {
}
registerTestSuite(NameGeneratorTest);



/**
 * Test case testNameGenerator
 */
NameGeneratorTest.prototype.testNameGenerator = function() {
  expectEq('a', glslunit.compiler.NameGenerator.getShortName(0));
  expectEq('_a', glslunit.compiler.NameGenerator.getShortDef(0));
  expectEq('b', glslunit.compiler.NameGenerator.getShortName(1));
  expectEq('Z', glslunit.compiler.NameGenerator.getShortName(51));
  expectEq('ba', glslunit.compiler.NameGenerator.getShortName(53));
  expectEq('a0', glslunit.compiler.NameGenerator.getShortName(62 * 52));
  expectEq('aaa', glslunit.compiler.NameGenerator.getShortName(62 * 52 + 52));
};



/**
 * Test case testNameGeneratorInstance
 */
NameGeneratorTest.prototype.testNameGeneratorInstance = function() {
  var generator = new glslunit.compiler.NameGenerator();
  generator.usedKeys_['c'] = true;
  expectEq('a', generator.shortenSymbol('foo'));
  expectEq('a', generator.shortenSymbol('foo'));
  expectEq('b', generator.shortenSymbol('bar'));
  var clone = generator.clone();
  expectEq('d', clone.shortenSymbol('raz'));
  expectEq('raz', generator.getShortSymbol('raz'));
  expectEq(2, generator.getNextNameIndex());
  expectEq(4, clone.getNextNameIndex());
};
