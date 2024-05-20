type NameAttributeType = string;
type ValueAttributeType = string;
type AttributeType = [NameAttributeType, ValueAttributeType];
export interface IHtmlElement {
  tag: string;
  class?: string[];
  attribute?: AttributeType[];
  text?: string;
}
