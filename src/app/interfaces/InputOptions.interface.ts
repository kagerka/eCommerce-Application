export type InputTypesType = 'email' | 'password' | 'text' | 'date' | 'checkbox' | 'number';
export interface IInputOptions {
  type: InputTypesType;
  class?: string[];
  name?: string;
  value?: string | number;
  placeholder?: string;
  callback?: (event: Event) => void;
}
