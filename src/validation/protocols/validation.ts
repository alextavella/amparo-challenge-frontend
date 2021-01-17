export type ValidationData = {
  [key: string]: any
}

export type ValidationOptions = {
  invalidMessage?: string
}

export interface Validation {
  validate<T = ValidationData>(data: T, options?: ValidationOptions): Promise<T>
}
