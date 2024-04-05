import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import * as releaseSchema from './data/release-schema-eu.json';
import _ from 'lodash';

export interface OcdsModelMetadata {
  title?: string;
  description?: string;
}

export interface OcdsPropertyMetadata {
  title?: string;
  description?: string;
  type?: string;
  items?: string;
  enum?: string[];
  '$ref'?: string;
  required?: boolean;
  uniqueItems?: boolean;
  minimum: number;
  maximum: number;
}

@injectable({ scope: BindingScope.TRANSIENT })
export class OcdsSchemaParserService {
  constructor(/* Add @inject to inject parameters */) {

  }

  /**
   * Load OCDS model metadata from schema
   *
   * @param modelName OCDS model name
   */
  public getModelMetadata(modelName: string): OcdsModelMetadata {
    if (!_.has(releaseSchema.definitions, modelName)) {
      throw new Error(`model ${modelName} not found in definition list`)
    }

    return _.pick(_.get(releaseSchema.definitions, modelName), [
      'title',
      'description',
      'required',
      'patternProperties',
      'dependentRequired',
      'minProperties',
      'maxProperties',
    ]);
  }

  /**
   * Load OCDS model property metadata from schema
   *
   * @param modelName
   * @param propertyName
   */
  public getPropertyMetadata(modelName: string, propertyName: string) {
    if (!_.has(releaseSchema.definitions, modelName)) {
      throw new Error(`model ${modelName} not found in definition list`)
    }
    const modelDefinition = _.get(releaseSchema.definitions, modelName);
    if (!_.has(modelDefinition.properties, propertyName)) {
      throw new Error(`Property ${propertyName} not defined in ${modelName} definition`)
    }

    return _.pick(_.get(modelDefinition.properties, propertyName), [
      'title',
      'description',
      'required',
      'enum',
      'items'
    ]);
  }

}
