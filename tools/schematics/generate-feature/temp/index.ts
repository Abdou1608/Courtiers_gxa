import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  move,
  template,
  url,
  chain,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
//import { Schema as FeatureSchema } from './schema.json';
import * as ts from 'typescript';

function parseModel( tree: Tree,options:any, context:any,nam:any ): Record<string, string> {
 
  const content =options.model ? tree.read(options.model) : tree.read(context.model)
const modelpath =options.model ? options.model : context.model ? context.model : nam.model
  if (!content) throw new Error(`Model file not found options.model: ${options.model} .context.model=.${context.model}.nam.model=.${nam.model},`);

  const source = ts.createSourceFile(
    modelpath,
    content.toString(),
    ts.ScriptTarget.Latest,
    true
  );

  const properties: Record<string, string> = {};

  ts.forEachChild(source, node => {
    if (
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node)
    ) {
      node.forEachChild(member => {
        if (
          ts.isPropertySignature(member) &&
          member.name &&
          ts.isIdentifier(member.name)
        ) {
          const name = member.name.escapedText.toString();
          const type = member.type?.getText(source) || 'any';
          properties[name] = type;
        }
      });
    }
  });

  return properties;
}

export function generateFeature(_options: any,_context:any,__name:any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const featureName = strings.dasherize(_options.name);
    const basePath = `${_options.path}/${featureName}`;
    const sourceTemplates = url('./files');
    console.log(`Model file is from _options: ${_options.model}`)
    console.log(`Name is from _options: ${_options.name}`)
    console.log(`Path is from _options: ${_options.path}`)
    const modelProps = _options.model ? parseModel(tree, _options, _context, __name) : {};
    const enableSearchPagination = _options.searchPagination !== false;

    const featureSource = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        featureName,
        modelProps,
        enableSearchPagination: !!enableSearchPagination
      }),
      move(basePath)
    ]);

    return chain([mergeWith(featureSource)]);
  };
}
