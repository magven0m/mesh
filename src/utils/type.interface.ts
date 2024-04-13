export interface Type<T = object> extends Function {
  new (...args: any[]): T;
}
