/* Copyright 2015 Tobias Schwinger
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.provide('glslprep');

/** @define {boolean} */
goog.define('glslprep.EXPORT_API', false);


goog.require('glslunit.glsl.parser');

goog.require('glslunit.compiler.Compiler');
goog.require('glslunit.compiler.GlslPreprocessor');

goog.require('glslunit.compiler.BraceReducer');
goog.require('glslunit.compiler.ConstructorMinifier');
goog.require('glslunit.compiler.DeadFunctionRemover');
goog.require('glslunit.compiler.DeclarationConsolidation');
goog.require('glslunit.compiler.FunctionMinifier');
goog.require('glslunit.compiler.ShaderProgram');
goog.require('glslunit.compiler.VariableMinifier');

goog.require('glslunit.Generator');

goog.scope(function() {

	var $module = glslprep;

	var $compiler = glslunit.compiler;
	var $parse = glslunit.glsl.parser.parse;
	var $SyntaxError = glslunit.glsl.parser.SyntaxError;
	var $Compiler= $compiler.Compiler;
	var $CompilerPhase = $Compiler.CompilerPhase;
	var $Generator = glslunit.Generator;

	/** @enum {!number} */
	$module.Shader = {};
	/** @const */
	$module.Shader.VERTEX = 0;
	/** @const */
	$module.Shader.FRAGMENT = 1;


	// Exports 'line' and 'column' properties.
	$module.SyntaxError = $SyntaxError;


	/**
	 * @param {!string} source
	 * @param {!$module.Shader} type
	 * @return {!*} AST
	 * @throws {$SyntaxError|Error}
	 */
	$module.parseGlsl = function(source, type) {

		var startRule = type === $module.Shader.VERTEX ?
				$module.RULE_VERTEX_ : $module.RULE_FRAGMENT_;

		return /** @type {!*} */( $parse(source, startRule) );
	};


	/**
	 * @param {!Array<!string>} shader
	 *		Array with two strings holding the source code of the vertex
	 *		and the fragment shader.
	 * @param {Object<!string,?string>=} opt_defines
	 * 		Preprocessor definitions. Preprocessing is only performed
	 * 		when given.
	 * @return {!Array<!string>|!string}
	 * 		Input array with minified source code or error string.
	 * @throws {$SyntaxError|Error}
	 */
	$module.minifyGlsl = function(shader, opt_defines) {

		var shaderProgram = new $compiler.ShaderProgram();

		shaderProgram.vertexAst = $parse(shader[0], $module.RULE_VERTEX_);
		shaderProgram.fragmentAst = $parse(shader[1], $module.RULE_FRAGMENT_);

		shaderProgram.defaultProgramShortNames();

		var compiler = new $Compiler(shaderProgram);

		if (goog.isDefAndNotNull(opt_defines)) {

			var defs = [ "GL_ES 1" ];
			var modes = [];

			for (var name in opt_defines) {
				var body = opt_defines[name];

				if (goog.isDefAndNotNull(body))
					defs.push(name + " " + body);
				else
					modes.push(name);
			}

			compiler.registerStep(
					$CompilerPhase.MINIFICATION, 
					new $compiler.GlslPreprocessor(modes, defs, false, false) );
		}

		compiler.registerStep(
				$CompilerPhase.MINIFICATION, new $compiler.DeadFunctionRemover());

		compiler.registerStep(
				$CompilerPhase.MINIFICATION, new $compiler.DeclarationConsolidation(true));

		compiler.registerStep(
				$CompilerPhase.MINIFICATION, new $compiler.VariableMinifier(false));

		compiler.registerStep(
				$CompilerPhase.MINIFICATION, new $compiler.FunctionMinifier());

		compiler.registerStep(
				$CompilerPhase.MINIFICATION, new $compiler.BraceReducer());

		compiler.registerStep(
				$CompilerPhase.MINIFICATION, new $compiler.ConstructorMinifier());

		shaderProgram = compiler.compileProgram();

		shader[0] = $Generator.getSourceCode(shaderProgram.vertexAst);
		shader[1] = $Generator.getSourceCode(shaderProgram.fragmentAst);

		return shader;
	};


	/** @private @const */
	$module.RULE_VERTEX_ = 'vertex_start';

	/** @private @const */
	$module.RULE_FRAGMENT_ = 'fragment_start';


	if (glslprep.EXPORT_API) {

		goog.exportSymbol('glslprep.SyntaxError', $module.SyntaxError);

		goog.exportSymbol('glslprep.Shader', $module.Shader);
		goog.exportProperty($module.Shader, 'VERTEX', $module.Shader.VERTEX);
		goog.exportProperty($module.Shader, 'FRAGMENT', $module.Shader.FRAGMENT);

		goog.exportSymbol('glslprep.parseGlsl', $module.parseGlsl);

		goog.exportSymbol('glslprep.minifyGlsl', $module.minifyGlsl);

	}

});
