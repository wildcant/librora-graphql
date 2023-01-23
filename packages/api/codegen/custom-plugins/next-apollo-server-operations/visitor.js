"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloNextSSRVisitor = void 0;
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = __importDefault(require("auto-bind"));
class ApolloNextSSRVisitor extends visitor_plugin_common_1.ClientSideBaseVisitor {
    constructor(schema, fragments, rawConfig, documents) {
        super(schema, fragments, rawConfig, {
            apolloReactCommonImportFrom: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.apolloReactCommonImportFrom, rawConfig.reactApolloVersion === 3
                ? '@apollo/client'
                : '@apollo/react-common'),
            apolloReactHooksImportFrom: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.apolloReactHooksImportFrom, rawConfig.reactApolloVersion === 3
                ? '@apollo/client'
                : '@apollo/react-hooks'),
            apolloImportFrom: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.apolloImportFrom, rawConfig.reactApolloVersion === 3 ? '@apollo/client' : 'apollo-client'),
            reactApolloVersion: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.reactApolloVersion, 2),
            excludePatterns: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.excludePatterns, null),
            excludePatternsOptions: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.excludePatternsOptions, ''),
            replacePage: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.replacePage, true),
            replaceQuery: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.replaceQuery, true),
            pre: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.pre, ''),
            post: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.post, ''),
            customImports: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.customImports, null),
            apolloClientInstanceImport: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.apolloClientInstanceImport, ''),
            contextType: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.contextType, 'any'),
            customOptions: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.customOptions, '{}'),
            apolloCacheImportFrom: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.apolloCacheImportFrom, rawConfig.reactApolloVersion === 3
                ? '@apollo/client'
                : 'apollo-cache-inmemory'),
            apolloStateKey: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.apolloStateKey, 'apolloState'),
            reactImport: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.reactImport, `import type React from 'react';`),
        });
        this.imports = new Set();
        this._externalImportPrefix = this.config.importOperationTypesFrom
            ? `${this.config.importOperationTypesFrom}.`
            : '';
        this._documents = documents;
        (0, auto_bind_1.default)(this);
    }
    getImports() {
        this.imports.add(`import * as Apollo from '${this.config.apolloImportFrom}';`);
        this.imports.add(this.config.reactImport);
        if (this.config.apolloClientInstanceImport) {
            this.imports.add(`import { getApolloClient ${this.config.contextType !== 'any'
                ? ', ' + this.config.contextType
                : ''}} from '${this.config.apolloClientInstanceImport}';`);
        }
        if (!this.config.apolloClientInstanceImport) {
            this.imports.add(`import type { NormalizedCacheObject } from '${this.config.apolloCacheImportFrom}';`);
        }
        if (this.config.customImports) {
            this.imports.add(this.config.customImports);
        }
        let baseImports = super.getImports();
        if (this.config.importDocumentNodeExternallyFrom === 'same-file') {
            baseImports = baseImports.filter(importStr => !importStr.startsWith('import * as Operations from '));
        }
        const hasOperations = this._collectedOperations.length > 0;
        if (!hasOperations) {
            return baseImports;
        }
        return [...baseImports, ...Array.from(this.imports)];
    }
    getDocumentNodeVariable(documentVariableName) {
        return this.config.documentMode === visitor_plugin_common_1.DocumentMode.external &&
            this.config.importDocumentNodeExternallyFrom !== 'same-file'
            ? `Operations.${documentVariableName}`
            : documentVariableName;
    }
    _buildOperationPageQuery(node, documentVariableName, operationResultType, operationVariablesTypes) {
        const operationName = this.convertName(node, {
            useTypesPrefix: false,
        });
        if (node.operation === 'mutation' ||
            (this.config.excludePatterns &&
                new RegExp(this.config.excludePatterns, this.config.excludePatternsOptions).test(operationName))) {
            return '';
        }
        const preFunctionName = node.operation === 'mutation' ? "mutate" : "fetch"
        const functionName = preFunctionName + operationName;
        // TODO: Enable error handling capabilities.
        const getSSP = `export async function ${functionName}
    (options?: Omit<Apollo.QueryOptions<${operationVariablesTypes}>, 'query'>, ${this.config.apolloClientInstanceImport
            ? `ctx?: ${this.config.contextType}`
            : 'apolloClient: Apollo.ApolloClient<NormalizedCacheObject>'} ){
        ${this.config.apolloClientInstanceImport
            ? 'const apolloClient = getApolloClient(ctx);'
            : ''}
        const allOptions = {...options, ${this.config.customOptions ? `...${this.config.customOptions}` : ''}}
        const data = await apolloClient.query<${operationResultType}>({ ...allOptions, query: ${this.getDocumentNodeVariable(documentVariableName)} });
        
        const apolloState = apolloClient.cache.extract();

        return {
            ${this.config.apolloStateKey}: apolloState,
            data: data?.data,
            error: data?.error ?? data?.errors ?? null,
        };
      }`;
        return [getSSP].filter(a => a).join('\n');
    }
    buildOperation(node, documentVariableName, operationType, operationResultType, operationVariablesTypes) {
        operationResultType = this._externalImportPrefix + operationResultType;
        operationVariablesTypes =
            this._externalImportPrefix + operationVariablesTypes;
        const pageOperation = this._buildOperationPageQuery(node, documentVariableName, operationResultType, operationVariablesTypes);
        return [pageOperation].join('\n');
    }
}
exports.ApolloNextSSRVisitor = ApolloNextSSRVisitor;
