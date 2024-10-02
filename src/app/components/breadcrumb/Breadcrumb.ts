import getCurrentUrl from '../../utils/breadcrumbs/breadcrumbs';
import BaseComponent from '../BaseComponent';
import './Breadcrumb.scss';

class Breadcrumb {
  private breadcrumbContainer: BaseComponent;

  private breadcrumbList: BaseComponent;

  constructor(urls: string[]) {
    this.breadcrumbContainer = Breadcrumb.createBreadcrumbContainerElement();
    this.breadcrumbList = Breadcrumb.createBreadcrumbListElement(urls);

    this.composeView();
  }

  private composeView(): void {
    this.breadcrumbContainer.html.append(this.breadcrumbList.html);
  }

  private static createBreadcrumbContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['breadcrumb-container'] });
  }

  private static createBreadcrumbListElement(urls: string[]): BaseComponent {
    const url = getCurrentUrl();
    const breadcrumbList = new BaseComponent({ tag: 'ul', class: ['breadcrumb-list'] });
    (urls || url).forEach((item) => {
      const breadcrumbItem = Breadcrumb.createBreadcrumbItemElement();
      const breadcrumbLink = this.createLinks(item);
      breadcrumbList.html.append(breadcrumbItem.html);
      breadcrumbItem.html.append(breadcrumbLink.html);
    });
    return breadcrumbList;
  }

  private static createLinks(item: string): BaseComponent {
    let breadcrumbLink;
    if (item === 'Home') {
      breadcrumbLink = new BaseComponent({
        tag: 'a',
        class: ['breadcrumb-link'],
        attribute: [
          ['href', `/`],
          ['data-navigo', ''],
        ],
        text: item,
      });
    } else if (item === 'Product') {
      const currentProduct = JSON.parse(localStorage.getItem('productData') || '');
      const link = currentProduct.masterData.current.slug.en;
      breadcrumbLink = new BaseComponent({
        tag: 'a',
        class: ['breadcrumb-link'],
        attribute: [
          ['href', `/catalog/${link}`],
          ['data-navigo', ''],
        ],
        text: link,
      });
    } else {
      breadcrumbLink = new BaseComponent({
        tag: 'a',
        class: ['breadcrumb-link'],
        attribute: [
          ['href', `/${item.toLowerCase()}`],
          ['data-navigo', ''],
        ],
        text: item,
      });
    }
    return breadcrumbLink;
  }

  private static createBreadcrumbItemElement(): BaseComponent {
    return new BaseComponent({ tag: 'li', class: ['breadcrumb-item'] });
  }

  get view(): BaseComponent {
    return this.breadcrumbContainer;
  }
}

export default Breadcrumb;
