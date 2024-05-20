export type InputTypesType = 'email' | 'password' | 'text' | 'date' | 'checkbox';
export interface IInputOptions {
  type: InputTypesType;
  class?: string[];
  placeholder?: string;
  callback?: (event: Event) => void;
}
