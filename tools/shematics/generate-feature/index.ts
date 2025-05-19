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

function parseModel(tree: Tree, _options: any): Record<string, string> {
  const content = tree.read(_options.model);
  if (!content) throw new Error(`Model file not found: ${_options.model}`);

  const source = ts.createSourceFile(
    _options.model,
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
      node.getChildren().forEach(member => {
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

export function generateFeature(_options: any): Rule {
  return (_: Tree, _context: SchematicContext) => {
    const featureName = strings.dasherize(_options.name);
    const basePath = `${_options.path}/${featureName}`;
    const sourceTemplates = url('./files');

    const modelProps = _options.model ? parseModel(_, _options.model) : {};
    const enableSearchPagination = _options.searchPagination !== false;

    const featureSource = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        featureName,
        modelProps,
        enableSearchPagination: !!_options.searchPagination
      }),
      move(basePath)
    ]);

    return chain([mergeWith(featureSource)]);
  };
}
