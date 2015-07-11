// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Test cases for the Preprocessor.
 * @author rowillia@google.com (Roy Williams)
 */

goog.require('glslunit.Generator');
goog.require('glslunit.compiler.Preprocessor');



/**
 * Constructor for PreprocessorTest
 * @constructor
 */
function PreprocessorTest() {
  setUp();
}
registerTestSuite(PreprocessorTest);



function setUp() {
  shaderInput =
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is awesome\n' +
    ' */\n' +
    '//! NAMESPACE=glslunit.test\n' +
    '//! CLASS=TestShader\n' +
    '//! SUPERCLASS=TestSuper\n' +
    '//! MODE SOME_MODE Zero:0,One:1,Two:2\n' +
    '//! INCLUDE shaderinclude.glsl\n' +
    '//! JSREQUIRE raz\n' +
    '//! JSCONST VAL2 raz.FOOBAR\n' +
    '//! REQUIRE glslunit.shader.transform\n' +
    'uniform float commonVar;\n' +
    '//! FRAGMENT\n' +
    'varying vec2 FRAG_VAR;\n' +
    '//! COMMON\n' +
    'void CommonFunc(){}\n' +
    '//! VERTEX\n' +
    '/**\n' +
    ' * @notAlicense\n' +
    ' */\n' +
    '/**\n' +
    ' * @license\n' +
    ' * In le Vertex Shader\n' +
    ' */\n' +
    'void vertexMain(){}\n' +
    'float lastVar;\n' +
    '//! OVERRIDE vertexMain baseVertexMain\n' +
    '//! FRAGMENT\n' +
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is the supreme ruler of the universe\n' +
    ' */\n' +
    '//! OVERRIDE CommonFunc baseCommonFunc\n';

  shaderInclude =
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is the supreme ruler of the universe\n' +
    ' */\n' +
    '//! VERTEX\n' +
    '//! MODE INCLUDE_DEFAULT\n' +
    '//! JSREQUIRE foo.bar\n' +
    '//! JSCONST VAL1 1 * 55 / 2.\n' +
    '//! PROVIDE glslunit.shader.VAL1\n' +
    'attribute vec2 vertexIncludeVar;\n';

  shaderRequire =
    '//! PROVIDE glslunit.shader.transform\n' +
    '//! REQUIRE glslunit.shader.VAL1\n' +
    'uniform mat4 transform;\n';
}



/**
 * Test case testPreprocessor
 */
PreprocessorTest.prototype.testPreprocessor = function() {
  var originalVertex =
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is awesome\n' +
    ' */\n' +
    '//! NAMESPACE=glslunit.test\n' +
    '//! CLASS=TestShader\n' +
    '//! SUPERCLASS=TestSuper\n' +
    '//! MODE SOME_MODE Zero:0,One:1,Two:2\n' +
    '//! INCLUDE shaderinclude.glsl\n' +
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is the supreme ruler of the universe\n' +
    ' */\n' +
    '//! VERTEX\n' +
    '//! MODE INCLUDE_DEFAULT\n' +
    '//! JSREQUIRE foo.bar\n' +
    '//! JSCONST VAL1 1 * 55 / 2.\n' +
    '//! PROVIDE glslunit.shader.VAL1\n' +
    'attribute vec2 vertexIncludeVar;\n\n' +
    '//! JSREQUIRE raz\n' +
    '//! JSCONST VAL2 raz.FOOBAR\n' +
    '//! REQUIRE glslunit.shader.transform\n' +
    '//! PROVIDE glslunit.shader.transform\n' +
    '//! REQUIRE glslunit.shader.VAL1\n' +
    'uniform mat4 transform;\n\n' +
    'uniform float commonVar;\n' +
    '//! COMMON\n' +
    'void CommonFunc(){}\n' +
    '//! VERTEX\n' +
    '/**\n' +
    ' * @notAlicense\n' +
    ' */\n' +
    '/**\n' +
    ' * @license\n' +
    ' * In le Vertex Shader\n' +
    ' */\n' +
    'void vertexMain();void baseVertexMain(){}\n' +
    'float lastVar;\n' +
    '//! OVERRIDE vertexMain baseVertexMain\n';

  var originalFragment =
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is awesome\n' +
    ' */\n' +
    '//! NAMESPACE=glslunit.test\n' +
    '//! CLASS=TestShader\n' +
    '//! SUPERCLASS=TestSuper\n' +
    '//! MODE SOME_MODE Zero:0,One:1,Two:2\n' +
    '//! INCLUDE shaderinclude.glsl\n' +
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is the supreme ruler of the universe\n' +
    ' */\n' +
    '//! JSREQUIRE raz\n' +
    '//! JSCONST VAL2 raz.FOOBAR\n' +
    '//! REQUIRE glslunit.shader.transform\n' +
    '//! PROVIDE glslunit.shader.transform\n' +
    '//! REQUIRE glslunit.shader.VAL1\n' +
    'uniform mat4 transform;\n\n' +
    'uniform float commonVar;\n' +
    '//! FRAGMENT\n' +
    'varying vec2 FRAG_VAR;\n' +
    '//! COMMON\n' +
    'void CommonFunc();void baseCommonFunc(){}\n' +
    '//! FRAGMENT\n' +
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is the supreme ruler of the universe\n' +
    ' */\n' +
    '//! OVERRIDE CommonFunc baseCommonFunc\n\n';

  var libraries = {
    'main.glsl': shaderInput,
    'shaderinclude.glsl': shaderInclude,
    'shaderRequire.glsl' : shaderRequire
  };
  var result = glslunit.compiler.Preprocessor.ParseFile('main.glsl', libraries);
  expectEq('glslunit.test', result.namespace);
  expectEq('TestShader', result.className);
  expectEq('TestSuper', result.superClass);
  expectEq(originalVertex, result.originalVertexSource);
  expectEq(originalFragment, result.originalFragmentSource);
  var expectedFragmentSource =
    'uniform mat4 transform;' +
    'uniform float commonVar;' +
    'varying vec2 FRAG_VAR;' +
    'void CommonFunc();void baseCommonFunc(){}';
  expectEq(expectedFragmentSource,
      glslunit.Generator.getSourceCode(result.fragmentAst));
  var expectedVertexSource =
    'attribute vec2 vertexIncludeVar;' +
    'uniform mat4 transform;' +
    'uniform float commonVar;' +
    'void CommonFunc(){}' +
    'void vertexMain();void baseVertexMain(){}' +
    'float lastVar;';
  expectEq(expectedVertexSource,
      glslunit.Generator.getSourceCode(result.vertexAst));

  expectEq(2, result.shaderModes.length);
  expectEq('SOME_MODE', result.shaderModes[0].preprocessorName);
  expectEq('Zero', result.shaderModes[0].options[0].name);
  expectEq(0, result.shaderModes[0].options[0].value);
  expectEq('One', result.shaderModes[0].options[1].name);
  expectEq(1, result.shaderModes[0].options[1].value);
  expectEq('Two', result.shaderModes[0].options[2].name);
  expectEq(2, result.shaderModes[0].options[2].value);
  expectEq('INCLUDE_DEFAULT', result.shaderModes[1].preprocessorName);
  expectEq('OFF', result.shaderModes[1].options[0].name);
  expectEq(0, result.shaderModes[1].options[0].value);
  expectEq('ON', result.shaderModes[1].options[1].name);
  expectEq(1, result.shaderModes[1].options[1].value);

  expectEq(2, result.jsRequires.length);
  expectEq('foo.bar', result.jsRequires[0]);
  expectEq('raz', result.jsRequires[1]);

  expectEq(2, result.jsConsts.length);
  expectEq('VAL1', result.jsConsts[0].originalName);
  expectEq('1 * 55 / 2.', result.jsConsts[0].expression);
  expectEq('VAL2', result.jsConsts[1].originalName);
  expectEq('raz.FOOBAR', result.jsConsts[1].expression);

  expectEq(3, result.licenses.length);
  var license1 =
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is awesome\n' +
    ' */';
  expectEq(license1, result.licenses[0]);
  var license2 =
    '/**\n' +
    ' * @license\n' +
    ' * By using this software, you agree that\n' +
    ' * Roy is the supreme ruler of the universe\n' +
    ' */';
  expectEq(license2, result.licenses[1]);
  var license3 =
    '/**\n' +
    ' * @license\n' +
    ' * In le Vertex Shader\n' +
    ' */';
  expectEq(license3, result.licenses[2]);

  expectEq(true, result.includedFiles['shaderinclude.glsl']);
  expectEq(true, result.includedFiles['shaderRequire.glsl']);
};


/**
 * Test case testException
 */
PreprocessorTest.prototype.testException = function() {
  var libraries = {
    'main.glsl': shaderInput,
    'shaderinclude.glsl': shaderInclude + 'SOME_UNPARSABLE_GUNK NOPARSE ME\n'
  };
  var expectedError = 'Error while parsing the vertex shader code\n' +
      '\tshaderinclude.glsl 6:21 Expected type name but " " found.\n' +
      '\tSOME_UNPARSABLE_GUNK NOPARSE ME';
  expectThat(
      function() {
        glslunit.compiler.Preprocessor.ParseFile('main.glsl', libraries);
      },
      throwsError(/.?/),
      expectedError);
};

