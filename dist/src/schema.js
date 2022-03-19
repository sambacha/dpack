"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWellFormedResolvedPack = exports.isWellFormedArtifact = exports.isWellFormedBundle = exports.isWellFormedPack = exports.isWellFormedType = exports.isWellFormedObject = exports.isWellFormedLink = void 0;
const ajv_1 = __importDefault(require("ajv")); // = require('ajv/dist/jtd')
const ajv = new ajv_1.default();
const linkSchema = {
    properties: {
        '/': { type: 'string' }
    }
};
const typeSchema = {
    properties: {
        typename: { type: 'string' },
        artifact: { ref: 'linkSchema' }
    },
    definitions: {
        linkSchema
    }
};
const objectSchema = {
    properties: {
        objectname: { type: 'string' },
        address: { type: 'string' },
        typename: { type: 'string' },
        artifact: { ref: 'linkSchema' }
    },
    definitions: {
        linkSchema
    }
};
const packSchema = {
    properties: {
        format: { type: 'string' },
        network: { type: 'string' },
        types: { values: { ref: 'typeSchema' } },
        objects: { values: { ref: 'objectSchema' } }
    },
    definitions: {
        typeSchema,
        objectSchema
    }
};
const bundleSchema = {
    values: { type: 'string' }
};
const artifactSchema = {
    bytecode: { nullable: true },
    abi: { nullable: true },
    additionalProperties: true
};
const resolvedPackSchema = {
    properties: {
        format: { type: 'string' },
        network: { type: 'string' },
        types: { values: { ref: 'typeSchema' } },
        objects: { values: { ref: 'objectSchema' } },
        _bundle: { ref: 'bundleSchema' }
    },
    definitions: {
        typeSchema,
        objectSchema,
        bundleSchema
    }
};
/**
 * @export const isWellFormedLink
 * @export const isWellFormedObject
 * @export const isWellFormedType
 * @export const isWellFormedPack
 * @export const isWellFormedArtifact
 * @export const isWellFormedResolvedPack
 * @export const isWellFormedBundle
 * @export const isWellFormedArtifact
 * @export const isWellFormedArtifact
 */
exports.isWellFormedLink = ajv.compile(linkSchema);
exports.isWellFormedObject = ajv.compile(objectSchema);
exports.isWellFormedType = ajv.compile(typeSchema);
exports.isWellFormedPack = ajv.compile(packSchema);
exports.isWellFormedBundle = ajv.compile(bundleSchema);
exports.isWellFormedArtifact = ajv.compile(artifactSchema);
exports.isWellFormedResolvedPack = ajv.compile(resolvedPackSchema);
