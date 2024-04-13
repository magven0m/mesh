import { validateOrReject } from 'class-validator';
import { Type } from './type.interface';

export function ValidateCustom(object: object, type: Type<object>) {
  const typeObj = new type();

  const keys = Object.getOwnPropertyNames(object);

  for (const key of keys) typeObj[key] = object[key];

  return validateOrReject(typeObj, { whitelist: true });
}
