import BaseComponent from '../BaseComponent';
import './LoaderIcon.scss';

class LoaderIcon {
  private loaderIconContainer: BaseComponent;

  public loaderIcon: BaseComponent;

  constructor() {
    this.loaderIconContainer = LoaderIcon.createLoaderIconContainerElement();
    this.loaderIcon = LoaderIcon.createLoaderIconElement();
    this.composeView();
  }

  private composeView(): void {
    this.loaderIconContainer.html.append(this.loaderIcon.html);
  }

  private static createLoaderIconContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['loader-icon-container'] });
  }

  private static createLoaderIconElement(): BaseComponent {
    return new BaseComponent({
      tag: 'span',
      class: ['loader'],
    });
  }

  get view(): BaseComponent {
    return this.loaderIconContainer;
  }

  public destroy(): void {
    this.loaderIconContainer.html.remove();
  }
}

export default LoaderIcon;
