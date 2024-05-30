export interface IButtonOptions {
  type: 'button' | 'submit' | 'reset';
  class?: string[];
  text?: string;
  style?: string;
  disabled?: boolean;
}
