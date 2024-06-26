export type InputTypesType = 'email' | 'password' | 'text' | 'date' | 'checkbox' | 'number' | 'radio';
export interface IInputOptions {
  type: InputTypesType;
  class?: string[];
  name?: string;
  value?: string;
  placeholder?: string;
  callback?: (event: Event) => void;
}
