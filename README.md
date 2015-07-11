glslprep.js
===========

This repository provides a simple GLSL minifier and syntax checker based on [glsl-unit](https://code.google.com/p/glsl-unit/). Minification is conservative, and does not change the meaning of the processed code. 

Other than glsl-unit as a whole, this library does not depend on [mustache.js](https://github.com/janl/mustache.js) or [Node.js](https://nodejs.org) and can easily be used within browser-based development tools. Try the [demo](http://tschw.github.io/glslprep.js/smoke_test.html)!

The library file is built using [Google's Closure Compiler](https://developers.google.com/closure/compiler/) in ADVANCED mode resulting in a source code size of less than a hundred kilobytes.

### Usage ###

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

