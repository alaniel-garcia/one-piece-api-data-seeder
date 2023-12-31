/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// General validations

import { BASE_URL, collections } from '@utils/index';
import mongoose from 'mongoose';
import type { Reference } from 'types';

export function validateFirstStringLetterUppercase(value: string): true {
  const regexFirstLetterUppercase = /^[A-Z]/;
  if (!regexFirstLetterUppercase.test(value)) throw new Error('First letter must be uppercase');

  return true;
}

export function validateNonEmptyString(value: string): true {
  const ONLY_WHITESPACES_REGEX = /^\s*$/;
  // const ONLY_NUMBERS_REGEX = /^[\d.,+\-*/()]+$/;
  if (!(typeof value === 'string' && value.length > 0 && !ONLY_WHITESPACES_REGEX.test(value)))
    throw new Error('Argument must be a non-empty string.');

  return true;
}

export function validateString(value: string): true {
  validateNonEmptyString(value);
  validateFirstStringLetterUppercase(value);
  return true;
}

export function validatePositiveNonZeroInteger(value: number): true {
  if (!(Number.isInteger(value) && value >= 1))
    throw new Error(`Argument must be a positive non-zero integer. Received: ${value}`);

  return true;
}

export function validateUrl(value: string): true {
  validateNonEmptyString(value);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = new URL(value);
  } catch (error) {
    throw new Error('Argument must be a valid uri format');
  }

  const urlRegex = new RegExp(
    `^(${BASE_URL}/(${Object.values(collections).join('|')}))(?:/image)?/(?!0)\\d+(?:\\.(jpeg|gif))?$`
  );
  if (!urlRegex.test(value))
    throw new Error(
      `Invalid URL format. Please ensure that the URL matches the correct format: ${BASE_URL}/{collection}/{id} or ${BASE_URL}/{collection}/image/{id}.jpeg/gif, where {collection} is one of the available collections and {id} is a non-zero integer. Received: ${value}`
    );

  return true;
}

export function validateStringArray(array: Array<string>): true {
  if (!(Array.isArray(array) && array.length >= 1))
    throw new Error('Argument must be an array with at least one element');

  for (const element of array) {
    try {
      validateString(element);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Invalid element "${element}": ${err.message}`);
    }
  }

  if (!(new Set(array).size === array.length)) throw new Error('Must not be duplicated elements');

  return true;
}

export function validateIsoStringDate(dateString: string): true {
  const date = new Date(dateString);
  if (!(date instanceof Date && !isNaN(date as unknown as number)))
    throw new Error(`Date passed is not in a valid format. Invalid value was: ${dateString}`);

  return true;
}

// new subdocs based validations
export function ValidateSubDoc(subdoc: Reference): true {
  try {
    validatePositiveNonZeroInteger(subdoc as number);
  } catch (error) {
    const isValidObjectId = mongoose.isValidObjectId(subdoc);

    if (!isValidObjectId)
      throw new Error(`Sub doc must be a positive non zero number or valid ObjectId. Rejected value: ${subdoc}`);
  }
  return true;
}

export function ValidateSubDocsArray(array: Array<Reference>): true {
  for (const subdoc of array) {
    ValidateSubDoc(subdoc);
  }

  return true;
}

export function ValidateSubDocArraysDuplicity(array: Array<Reference>): true {
  const references = new Set();
  for (const ref of array) {
    if (references.has(ref)) {
      throw new Error('Input Array must not have duplicate property values between sub documents');
    }
    references.add(ref);
  }

  return true;
}
