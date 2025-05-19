"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFeature = generateFeature;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
//import { Schema as FeatureSchema } from './schema.json';
const ts = require("typescript");
function parseModel(tree, options, context, nam) {
    const content = options.model ? tree.read(options.model) : tree.read(context.model);
    const modelpath = options.model ? options.model : context.model ? context.model : nam.model;
    if (!content)
        throw new Error(`Model file not found options.model: ${options.model} .context.model=.${context.model}.nam.model=.${nam.model},`);
    const source = ts.createSourceFile(modelpath, content.toString(), ts.ScriptTarget.Latest, true);
    const properties = {};
    ts.forEachChild(source, node => {
        if (ts.isInterfaceDeclaration(node) ||
            ts.isTypeAliasDeclaration(node)) {
            node.forEachChild(member => {
                var _a;
                if (ts.isPropertySignature(member) &&
                    member.name &&
                    ts.isIdentifier(member.name)) {
                    const name = member.name.escapedText.toString();
                    const type = ((_a = member.type) === null || _a === void 0 ? void 0 : _a.getText(source)) || 'any';
                    properties[name] = type;
                }
            });
        }
    });
    return properties;
}
function generateFeature(_options, _context, __name) {
    return (tree, _context) => {
        const featureName = core_1.strings.dasherize(_options.name);
        const basePath = `${_options.path}/${featureName}`;
        const sourceTemplates = (0, schematics_1.url)('./files');
        console.log(`Model file is from _options: ${_options.model}`);
        console.log(`Name is from _options: ${_options.name}`);
        console.log(`Path is from _options: ${_options.path}`);
        const modelProps = _options.model ? parseModel(tree, _options, _context, __name) : {};
        const enableSearchPagination = _options.searchPagination !== false;
        const featureSource = (0, schematics_1.apply)(sourceTemplates, [
            (0, schematics_1.template)(Object.assign(Object.assign(Object.assign({}, _options), core_1.strings), { featureName,
                modelProps, enableSearchPagination: !!enableSearchPagination })),
            (0, schematics_1.move)(basePath)
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(featureSource)]);
    };
}
//# sourceMappingURL=index.js.map