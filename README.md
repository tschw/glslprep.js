glslprep.js
===========

glslprep.js is a [Node.js](https://nodejs.org) script that optimizes GLSL, minifies the result and wraps it up in source code.

GLSL optimization is done via an [emscripten](http://kripken.github.io/emscripten-site/)-compiled [version of glsl-optimizer](https://github.com/zz85/glsl-optimizer) (extracted from Mesa by Unity 3D development team and ported by Josh Koo) and the minification and wrapping stages are based-on [glsl-unit](https://code.google.com/p/glsl-unit/) (forked / fixed here, as the project appears dormant) using [mustache.js](https://github.com/janl/mustache.js) for source code templates.

### glslminify.js ###

The minification stage is also provided as a stand-alone library, which, unlike GLSL-unit as a whole, does not depend on Mustache or Node.

The source code tranformation is conservative, i.E. it does not change the meaning of the processed code. It does not rely on semantic analysis and thus allows the input source code to be incomplete, as is typically the case when portions of the code are added by some kind of 3D engine (e.g. using [Three.js](http://threejs.org) `ShaderMaterial`s).

The library file is built using [Google's Closure Compiler](https://developers.google.com/closure/compiler/) in ADVANCED mode resulting in a source code size of less than a hundred kilobytes, making it well-suited for browser-based development tools. It has been integrated into the [Three.js editor](http://threejs.org/editor). Try the [live demo](http://tschw.github.io/glslprep.js/glslminify_demo.html)!

#### API example ####

The following code shows shader minification.

```javascript
var shader = [ 
		myVertexShaderSourceCode, 
		myFragmentShaderSourceCode
];

var defines = {
		"LIGHTS_ENABLED": null
		"N_LIGHTS": 3
};

try {

	glslprep.minifyGlsl(shader, defines);

} catch (e) {

	if (e instanceof glslprep.SyntaxError)
		console.error(e.line + ":" + e.column + ": " + e.message);
	else
		console.error(e.stack || e);
}

myVertexShaderSourceCode = shader[glslprep.Shader.VERTEX);
myFragmentShaderSourceCode = shader[glslprep.Shader.FRAGMENT);

```

Omit the `defines` argument calling `minifyGlsl` to disable preprocessing.



The parser can also be called individually for a quick syntax check:

```javascript
try {

	glslprep.parseGlsl(vertexShaderSourceCode, glslprep.Shader.VERTEX);

} catch (e) {

	// ... handle error
}
```

Keep in mind that syntactically valid GLSL is not guaranteed to compile
and link in practice. In particular, symbol names are not checked.
Also, the glsl-unit compiler will neither complain nor bother when
minifying. Therefore incomplete shaders (typically missing some prefix
prepended by a renderer) can be processed safely.

### Depencencies ###

All dependencies are contained within this repository.

The library file combines code from the following sources:

- A patched version of [glsl-unit](https://code.google.com/p/glsl-unit),
- a minimal subset of [Google's Closure Library](https://developers.google.com/closure/library), and
- the very thin API layer provided by this package.

The Node script further uses glsl-optimizer and obviously needs Node to run.

### Building ###

Apache Ant must be installed on the system. Simlpy invoke it in the
top-level directory:

```
$ ant
```

Ant then uses the Closure Compiler which is contained in this package
as a Java binary.

### License ###

This package and all bundled dependencies may be used under the terms
of the [Apache License Version 2](http://www.apache.org/licenses/LICENSE-2.0).

