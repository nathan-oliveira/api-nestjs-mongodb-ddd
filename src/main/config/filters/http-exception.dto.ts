declare class CustomError extends Error {
  get name(): string;
  constructor(message?: string);
}

type CustomTarget<TypeTarget> = {
  type: TypeTarget;
  name: string;
};

export declare class CustomNotFoundError extends CustomError {
  readonly entityClass: CustomTarget<any>;
  readonly criteria: any;
  constructor(entityClass: CustomTarget<any>, criteria: any);
  private stringifyTarget;
  private stringifyCriteria;
}

type ResponseException = {
  message: string[];
};

export interface HttpExceptionDto extends CustomNotFoundError {
  status: number;
  message: string;
  response: ResponseException | string;
  detail: string;
  code: string;
}
