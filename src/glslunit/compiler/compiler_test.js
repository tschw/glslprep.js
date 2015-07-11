// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Test cases for the Compiler.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.compiler.Compiler');
goog.require('glslunit.compiler.CompilerStep');

/**
 * Constructor for CompilerTest
 * @constructor
 */
function CompilerTest() {
  setUp();
}
registerTestSuite(CompilerTest);



function setUp() {
  nextExecutionCount = 0;
}

/**
 * A Fake compiler step for testing.
 * @param {string} name The name of the step.
 * @param {Array.<string>} dependencies The dependencies.
 * @constructor
 */
fakeStepGenerator = function(name, dependencies) {
  this.executionOrder = -1;
  this.executionCount = 0;
  this.name = name;
  this.dependencies = dependencies;
  var parent = this;
  this.step = function() {
    this.getName = function() {
      return parent.name;
    }
    this.getDependencies = function() {
      return parent.dependencies;
    }
    this.performStep = function(shaderProgram, stepOutputMap) {
      parent.executionOrder = nextExecutionCount++;
      parent.executionCount++;
      return {};
    }
  }
};

/**
 * Test case testNoSteps
 */
CompilerTest.prototype.testNoSteps = function() {
  var shaderProgram = {};
  var compiler = new glslunit.compiler.Compiler(shaderProgram);
  expectEq(shaderProgram, compiler.compileProgram());
};


/**
 * Test case testCompilation
 */
CompilerTest.prototype.testCompilation = function() {
  var shaderProgram = {};
  var compiler = new glslunit.compiler.Compiler(shaderProgram);
  var opStep = new fakeStepGenerator('opStep1', []);
  var secondOpStep = new fakeStepGenerator('opStep2', ['opStep1']);
  var minStep = new fakeStepGenerator('minStep', []);
  compiler.registerStep(glslunit.compiler.Compiler.CompilerPhase.OPTIMIZATION,
                        new secondOpStep.step());
  compiler.registerStep(glslunit.compiler.Compiler.CompilerPhase.OPTIMIZATION,
                        new opStep.step());
  compiler.registerStep(glslunit.compiler.Compiler.CompilerPhase.OPTIMIZATION,
                        new minStep.step());
  expectEq(shaderProgram, compiler.compileProgram());
  expectEq(0, opStep.executionOrder);
  expectEq(1, opStep.executionCount);
  expectEq(1, secondOpStep.executionOrder);
  expectEq(1, secondOpStep.executionCount);
  expectEq(2, minStep.executionOrder);
  expectEq(1, minStep.executionCount);
};

/**
 * Test case testLoop
 */
CompilerTest.prototype.testLoop = function() {
  var shaderProgram = {};
  var compiler = new glslunit.compiler.Compiler(shaderProgram);
  var opStep = new fakeStepGenerator('opStep1', ['minStep']);
  var secondOpStep = new fakeStepGenerator('opStep2', ['opStep1']);
  var minStep = new fakeStepGenerator('minStep', ['opStep2']);
  compiler.registerStep(glslunit.compiler.Compiler.CompilerPhase.OPTIMIZATION,
                        new secondOpStep.step());
  compiler.registerStep(glslunit.compiler.Compiler.CompilerPhase.OPTIMIZATION,
                        new opStep.step());
  compiler.registerStep(glslunit.compiler.Compiler.CompilerPhase.OPTIMIZATION,
                        new minStep.step());
  var errorMessage = 'Circular dependcy in compiler steps.  ' +
      'opStep2->opStep1->minStep->opStep2';
  expectThat(function() {compiler.compileProgram()},
      throwsError(/.?/), errorMessage);
};
