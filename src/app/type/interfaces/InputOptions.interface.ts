type InputTypesType = 'email' | 'password' | 'text';
export interface IInputOptions {
  type: InputTypesType;
  class?: string[];
  placeholder?: string;
  callback?: (event: Event) => void;
}
