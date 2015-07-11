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

goog.require('glslunit.CallGraphVisitor');
goog.require('glslunit.glsl.parser');
goog.require('goog.array');

/**
 * Constructor for CallGraphVisitorTest
 * @constructor
 */
function CallGraphVisitorTest() {
}
registerTestSuite(CallGraphVisitorTest);



/**
 * Test case testCallGraphVisitor
 */
CallGraphVisitorTest.prototype.testCallGraphVisitor = function() {
  var inputSource =
    'vec3 foo();' +
    'vec4 bar() {' +
    '  foo();' +
    '}' +
    'void uncalled() {' +
    '  bar();' +
    '}' +
    'void callsNothing() {' +
    '}' +
    'void foo() {' +
    '  bar();' +
    '  callsNothing();' +
    '}';
  var callGraph = glslunit.CallGraphVisitor.getCallGraph(
      glslunit.glsl.parser.parse(inputSource));
  expectTrue(goog.array.equals(['bar', 'callsNothing'], callGraph['foo']));
  expectTrue(goog.array.equals([], callGraph['callsNothing']));
  expectTrue(goog.array.equals(['bar'], callGraph['uncalled']));
  expectTrue(goog.array.equals(['foo'], callGraph['bar']));
};
