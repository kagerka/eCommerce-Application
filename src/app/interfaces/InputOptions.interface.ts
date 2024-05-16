export type InputTypesType = 'email' | 'password' | 'text' | 'date';
export interface IInputOptions {
  type: InputTypesType;
  class?: string[];
  placeholder?: string;
  callback?: (event: Event) => void;
}
