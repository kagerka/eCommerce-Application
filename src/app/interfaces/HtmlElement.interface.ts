type NameAttributeType = string;
type ValueAttributeType = string;
type AttributeType = [NameAttributeType, ValueAttributeType];
export interface IHtmlElement {
  tag: string;
  src?: string;
  alt?: string;
  id?: string;
  target?: string;
  href?: string;
  class?: string[];
  style?: string;
  attribute?: AttributeType[];
  text?: string;
}
