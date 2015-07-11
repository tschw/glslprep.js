// This file was autogenerated by calcdeps.py
goog.addDependency("../glslprep.js", ['glslprep'], ['glslunit.glsl.parser', 'glslunit.compiler.Compiler', 'glslunit.compiler.GlslPreprocessor', 'glslunit.compiler.BraceReducer', 'glslunit.compiler.ConstructorMinifier', 'glslunit.compiler.DeadFunctionRemover', 'glslunit.compiler.DeclarationConsolidation', 'glslunit.compiler.FunctionMinifier', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.VariableMinifier', 'glslunit.Generator']);
goog.addDependency("../prefix.js", [], []);
goog.addDependency("../glslunit/glsl_generator.js", ['glslunit.Generator'], ['glslunit.ASTVisitor']);
goog.addDependency("../glslunit/utils.js", ['glslunit.utils'], ['glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/glsl_parser.js", ['glslunit.glsl.parser'], []);
goog.addDependency("../glslunit/ast/visitors/glsl_ast_visitor_test.js", [], ['glslunit.ASTVisitor', 'goog.structs.Set']);
goog.addDependency("../glslunit/ast/visitors/variable_scope_visitor_test.js", [], ['glslunit.VariableScopeVisitor', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/visitors/type_annotator.js", ['glslunit.TypeAnnotator'], ['glslunit.VariableScopeVisitor']);
goog.addDependency("../glslunit/ast/visitors/glsl_ast_visitor.js", ['glslunit.ASTVisitor'], ['glslunit.utils', 'goog.array']);
goog.addDependency("../glslunit/ast/visitors/node_collector_test.js", [], ['glslunit.Generator', 'glslunit.NodeCollector', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/visitors/variable_scope_visitor.js", ['glslunit.VariableScopeVisitor'], ['glslunit.ASTVisitor', 'goog.array']);
goog.addDependency("../glslunit/ast/visitors/call_graph_visitor_test.js", [], ['glslunit.CallGraphVisitor', 'glslunit.glsl.parser', 'goog.array']);
goog.addDependency("../glslunit/ast/visitors/node_collector.js", ['glslunit.NodeCollector'], ['glslunit.ASTVisitor']);
goog.addDependency("../glslunit/ast/visitors/call_graph_visitor.js", ['glslunit.CallGraphVisitor'], ['glslunit.ASTVisitor']);
goog.addDependency("../glslunit/ast/transformers/splice_transformer_test.js", [], ['glslunit.Generator', 'glslunit.SpliceTransformer', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/transformers/identifier_rename_transformer_test.js", [], ['glslunit.Generator', 'glslunit.IdentifierRenameTransformer', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/transformers/replace_attribute_transformer.js", ['glslunit.ReplaceAttributeTransformer'], ['glslunit.ASTTransformer', 'glslunit.Generator', 'glslunit.VariableScopeVisitor', 'glslunit.glsl.parser', 'goog.array', 'goog.object']);
goog.addDependency("../glslunit/ast/transformers/splice_transformer.js", ['glslunit.SpliceTransformer'], ['glslunit.ASTTransformer', 'goog.array']);
goog.addDependency("../glslunit/ast/transformers/glsl_ast_transformer.js", ['glslunit.ASTTransformer'], ['glslunit.ASTVisitor', 'glslunit.utils', 'goog.array', 'goog.object']);
goog.addDependency("../glslunit/ast/transformers/qualifier_transformer.js", ['glslunit.QualifierTransformer'], ['glslunit.ASTTransformer']);
goog.addDependency("../glslunit/ast/transformers/qualifier_transformer_test.js", [], ['glslunit.Generator', 'glslunit.QualifierTransformer', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/transformers/glsl_ast_transformer_test.js", [], ['glslunit.ASTTransformer', 'glslunit.ASTVisitor', 'glslunit.Generator', 'glslunit.glsl.parser', 'goog.object']);
goog.addDependency("../glslunit/ast/transformers/function_rename_transformer_test.js", [], ['glslunit.FunctionRenameTransformer', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/ast/transformers/identifier_rename_transformer.js", ['glslunit.IdentifierRenameTransformer'], ['glslunit.ASTTransformer', 'goog.array', 'goog.object']);
goog.addDependency("../glslunit/ast/transformers/function_rename_transformer.js", ['glslunit.FunctionRenameTransformer'], ['glslunit.ASTTransformer', 'goog.array', 'goog.object']);
goog.addDependency("../glslunit/ast/transformers/replace_attribute_transformer_test.js", [], ['glslunit.ReplaceAttributeTransformer']);
goog.addDependency("../glslunit/compiler/glsl_preprocessor_test.js", [], ['glslunit.Generator', 'glslunit.compiler.Compiler', 'glslunit.compiler.GlslPreprocessor', 'glslunit.compiler.Preprocessor', 'glslunit.compiler.ShaderProgram']);
goog.addDependency("../glslunit/compiler/compiler_step.js", ['glslunit.compiler.CompilerStep'], ['glslunit.compiler.ShaderProgram']);
goog.addDependency("../glslunit/compiler/function_minifier.js", ['glslunit.compiler.FunctionMinifier'], ['glslunit.ASTTransformer', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.NameGenerator', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.VariableMinifier']);
goog.addDependency("../glslunit/compiler/compiler_test.js", [], ['glslunit.compiler.Compiler', 'glslunit.compiler.CompilerStep']);
goog.addDependency("../glslunit/compiler/node_externs.js", [], []);
goog.addDependency("../glslunit/compiler/constructor_minifier_test.js", [], ['glslunit.Generator', 'glslunit.compiler.ConstructorMinifier', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/preprocessor.js", ['glslunit.compiler.Preprocessor'], ['glslunit.NodeCollector', 'glslunit.compiler.ShaderJsConst', 'glslunit.compiler.ShaderMode', 'glslunit.compiler.ShaderProgram', 'glslunit.glsl.parser', 'goog.array']);
goog.addDependency("../glslunit/compiler/dead_function_remover_test.js", [], ['glslunit.Generator', 'glslunit.compiler.DeadFunctionRemover', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/constructor_minifier.js", ['glslunit.compiler.ConstructorMinifier'], ['glslunit.ASTTransformer', 'glslunit.CallGraphVisitor', 'glslunit.Generator', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.ShaderProgram', 'goog.array']);
goog.addDependency("../glslunit/compiler/preprocessor_test.js", [], ['glslunit.Generator', 'glslunit.compiler.Preprocessor']);
goog.addDependency("../glslunit/compiler/brace_reducer_test.js", [], ['glslunit.Generator', 'glslunit.compiler.BraceReducer', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/declaration_consolidation_test.js", [], ['glslunit.Generator', 'glslunit.compiler.DeclarationConsolidation', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/function_minifier_test.js", [], ['glslunit.Generator', 'glslunit.compiler.FunctionMinifier', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/node_flags.js", ['goog.node.FLAGS', 'goog.node.commandLineFlag'], []);
goog.addDependency("../glslunit/compiler/template_compiler.js", ['glslunit.compiler.TemplateCompiler'], ['Mustache', 'glslunit.compiler.BraceReducer', 'glslunit.compiler.Compiler', 'glslunit.compiler.ConstructorMinifier', 'glslunit.compiler.DeadFunctionRemover', 'glslunit.compiler.DeclarationConsolidation', 'glslunit.compiler.FunctionMinifier', 'glslunit.compiler.Preprocessor', 'glslunit.compiler.VariableMinifier', 'goog.node.FLAGS', 'goog.object']);
goog.addDependency("../glslunit/compiler/brace_reducer.js", ['glslunit.compiler.BraceReducer'], ['glslunit.ASTTransformer', 'glslunit.CallGraphVisitor', 'glslunit.Generator', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.ShaderProgram', 'goog.array']);
goog.addDependency("../glslunit/compiler/dead_function_remover.js", ['glslunit.compiler.DeadFunctionRemover'], ['glslunit.ASTTransformer', 'glslunit.CallGraphVisitor', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.ShaderProgram', 'goog.array']);
goog.addDependency("../glslunit/compiler/basic_compiler.js", ['glslunit.compiler.BasicCompiler'], ['glslunit.Generator', 'glslunit.compiler.BraceReducer', 'glslunit.compiler.Compiler', 'glslunit.compiler.ConstructorMinifier', 'glslunit.compiler.DeadFunctionRemover', 'glslunit.compiler.DeclarationConsolidation', 'glslunit.compiler.FunctionMinifier', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.VariableMinifier', 'glslunit.glsl.parser', 'goog.node.FLAGS', 'goog.object']);
goog.addDependency("../glslunit/compiler/utils.js", ['glslunit.compiler.Utils'], ['glslunit.NodeCollector']);
goog.addDependency("../glslunit/compiler/shader_program.js", ['glslunit.compiler.ShaderAttributeEntry', 'glslunit.compiler.ShaderJsConst', 'glslunit.compiler.ShaderMode', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.ShaderUniformEntry'], ['glslunit.Generator', 'goog.array', 'goog.object']);
goog.addDependency("../glslunit/compiler/demo_compiler.js", ['glslunit.compiler.DemoCompiler'], ['glslunit.compiler.BraceReducer', 'glslunit.compiler.ConstructorMinifier', 'glslunit.compiler.DeadFunctionRemover', 'glslunit.compiler.DeclarationConsolidation', 'glslunit.compiler.FunctionMinifier', 'glslunit.compiler.GlslPreprocessor', 'glslunit.compiler.VariableMinifier', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.Compiler', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/glsl_preprocessor.js", ['glslunit.compiler.GlslPreprocessor'], ['glslunit.ASTTransformer', 'glslunit.Generator', 'glslunit.NodeCollector', 'glslunit.SpliceTransformer', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.NameGenerator', 'glslunit.compiler.ShaderMode', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.VariableMinifier', 'glslunit.glsl.parser', 'goog.array', 'goog.object']);
goog.addDependency("../glslunit/compiler/declaration_consolidation.js", ['glslunit.compiler.DeclarationConsolidation'], ['glslunit.ASTTransformer', 'glslunit.Generator', 'glslunit.NodeCollector', 'glslunit.VariableScopeVisitor', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.Utils', 'goog.array']);
goog.addDependency("../glslunit/compiler/variable_minifier_test.js", [], ['glslunit.Generator', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.VariableMinifier', 'glslunit.glsl.parser']);
goog.addDependency("../glslunit/compiler/compiler.js", ['glslunit.compiler.Compiler'], ['glslunit.Generator', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.ShaderProgram', 'goog.array']);
goog.addDependency("../glslunit/compiler/variable_minifier.js", ['glslunit.compiler.VariableMinifier'], ['glslunit.ASTTransformer', 'glslunit.NodeCollector', 'glslunit.VariableScopeVisitor', 'glslunit.compiler.CompilerStep', 'glslunit.compiler.NameGenerator', 'glslunit.compiler.ShaderAttributeEntry', 'glslunit.compiler.ShaderProgram', 'glslunit.compiler.ShaderUniformEntry', 'glslunit.compiler.Utils', 'goog.object']);
goog.addDependency("../glslunit/compiler/name_generator.js", ['glslunit.compiler.NameGenerator'], ['goog.object']);
goog.addDependency("../glslunit/compiler/name_generator_test.js", [], ['glslunit.compiler.NameGenerator']);
goog.addDependency("base.js", [], []);
goog.addDependency("functions.js", ['goog.functions'], []);
goog.addDependency("idisposable.js", ['goog.disposable.IDisposable'], []);
goog.addDependency("math.js", ['goog.math'], ['goog.array', 'goog.asserts']);
goog.addDependency("asserts.js", ['goog.asserts', 'goog.asserts.AssertionError'], ['goog.debug.Error', 'goog.dom.NodeType', 'goog.string']);
goog.addDependency("array.js", ['goog.array', 'goog.array.ArrayLike'], ['goog.asserts']);
goog.addDependency("string.js", ['goog.string', 'goog.string.Unicode'], []);
goog.addDependency("iter.js", ['goog.iter', 'goog.iter.Iterable', 'goog.iter.Iterator', 'goog.iter.StopIteration'], ['goog.array', 'goog.asserts', 'goog.functions', 'goog.math']);
goog.addDependency("error.js", ['goog.debug.Error'], []);
goog.addDependency("disposable.js", ['goog.Disposable', 'goog.dispose', 'goog.disposeAll'], ['goog.disposable.IDisposable']);
goog.addDependency("nodetype.js", ['goog.dom.NodeType'], []);
goog.addDependency("object.js", ['goog.object'], []);
goog.addDependency("deps.js", [], []);
goog.addDependency("structs/trie.js", ['goog.structs.Trie'], ['goog.object', 'goog.structs']);
goog.addDependency("structs/stringset.js", ['goog.structs.StringSet'], ['goog.asserts', 'goog.iter']);
goog.addDependency("structs/map.js", ['goog.structs.Map'], ['goog.iter.Iterator', 'goog.iter.StopIteration', 'goog.object']);
goog.addDependency("structs/treenode.js", ['goog.structs.TreeNode'], ['goog.array', 'goog.asserts', 'goog.structs.Node']);
goog.addDependency("structs/prioritypool.js", ['goog.structs.PriorityPool'], ['goog.structs.Pool', 'goog.structs.PriorityQueue']);
goog.addDependency("structs/inversionmap.js", ['goog.structs.InversionMap'], ['goog.array']);
goog.addDependency("structs/priorityqueue.js", ['goog.structs.PriorityQueue'], ['goog.structs.Heap']);
goog.addDependency("structs/avltree.js", ['goog.structs.AvlTree', 'goog.structs.AvlTree.Node'], ['goog.structs.Collection']);
goog.addDependency("structs/pool.js", ['goog.structs.Pool'], ['goog.Disposable', 'goog.structs.Queue', 'goog.structs.Set']);
goog.addDependency("structs/linkedmap.js", ['goog.structs.LinkedMap'], ['goog.structs.Map']);
goog.addDependency("structs/queue.js", ['goog.structs.Queue'], ['goog.array']);
goog.addDependency("structs/node.js", ['goog.structs.Node'], []);
goog.addDependency("structs/simplepool.js", ['goog.structs.SimplePool'], ['goog.Disposable']);
goog.addDependency("structs/set.js", ['goog.structs.Set'], ['goog.structs', 'goog.structs.Collection', 'goog.structs.Map']);
goog.addDependency("structs/heap.js", ['goog.structs.Heap'], ['goog.array', 'goog.object', 'goog.structs.Node']);
goog.addDependency("structs/structs.js", ['goog.structs'], ['goog.array', 'goog.object']);
goog.addDependency("structs/collection.js", ['goog.structs.Collection'], []);
goog.addDependency("structs/circularbuffer.js", ['goog.structs.CircularBuffer'], []);