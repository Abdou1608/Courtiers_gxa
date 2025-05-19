"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFeature = generateFeature;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
//import { Schema as FeatureSchema } from './schema.json';
const ts = require("typescript");
function parseModel(tree, _options) {
    const content = tree.read(_options.model);
    if (!content)
        throw new Error(`Model file not found: ${_options.model}`);
    const source = ts.createSourceFile(_options.model, content.toString(), ts.ScriptTarget.Latest, true);
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
function generateFeature(_options) {
    return (tree, _context) => {
        const featureName = core_1.strings.dasherize(_options.name);
        const basePath = `${_options.path}/${featureName}`;
        const sourceTemplates = (0, schematics_1.url)('./files');
        const modelProps = _options.model ? parseModel(tree, _options.model) : {};
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