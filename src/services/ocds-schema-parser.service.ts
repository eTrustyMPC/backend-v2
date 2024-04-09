import { injectable, /*inject, */BindingScope } from '@loopback/core';
import { ModelDefinition, PropertyDefinition } from '@loopback/repository';
import * as releaseSchema from './data/release-schema-eu.json';
import _ from 'lodash';

@injectable({ scope: BindingScope.TRANSIENT })
export class OcdsSchemaParserService {
  protected defaultModel: string;

  constructor(defaultModel: string) {
    this.defaultModel = defaultModel;
  }

  /**
   * Load OCDS model metadata from schema
   *
   * @param modelName OCDS model name
   */
  public getModelMetadata(modelName: string | undefined = undefined): Partial<ModelDefinition> {
    if (!modelName) {
      modelName = this.defaultModel;
    }
    if (!_.has(releaseSchema.definitions, modelName)) {
      throw new Error(`model ${modelName} not found in definition list`)
    }
    const modelDefinition = {
      ..._.pick(_.get(releaseSchema.definitions, modelName), [
        'title',
        'description',
        'required'
      ]),
      settings: {
        strict: true,
        forceId: true,
        strictObjectIDCoercion: true,
        title: _.get(releaseSchema.definitions, `${modelName}.title`),
        description: _.get(releaseSchema.definitions, `${modelName}.description`),
      },
      jsonSchema: _.pick(_.get(releaseSchema.definitions, modelName), [
        'title',
        'description',
        'required',
        'patternProperties',
        'dependentRequired',
        'minProperties',
        'maxProperties',
      ]),
    };

    return modelDefinition;
  }

  /**
   * Load OCDS model property metadata from schema
   *
   * @param modelName
   * @param propertyName
   */
  public getPropertyMetadata(propertyName: string, modelName: string | undefined = undefined): Partial<PropertyDefinition> {
    if (!modelName) {
      modelName = this.defaultModel;
    }
    if (!_.has(releaseSchema.definitions, modelName)) {
      throw new Error(`model ${modelName} not found in definition list`)
    }
    const modelDefinition = _.get(releaseSchema.definitions, modelName);
    if (!_.has(modelDefinition.properties, propertyName)) {
      throw new Error(`Property ${propertyName} not defined in ${modelName} definition`)
    }
    const propertyDefinition = {
      title: _.get(modelDefinition.properties[propertyName], 'title'),
      description: _.get(modelDefinition.properties[propertyName], 'description'),
      required: _.get(modelDefinition.properties[propertyName], 'required'),
      jsonSchema: _.pick(_.get(modelDefinition.properties, propertyName), [
        'type',
        'title',
        'default',
        'description',
        'required',
        'format',
        'enum',
        'items',
        '$ref',
        'uniqueItems',
        'minLength',
        'maxLength',
        'transform',
      ]),
    };

    return propertyDefinition;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/prefer-nullish-coalescing */
/**
 * TypeScript Mixin classes constructor
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
 *
 * @param derivedCtor
 * @param constructors
 */
export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
        Object.create(null)
      );
    });
  });
}
