import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../BaseComponent';
import './Header.scss';

const timeout = 700;
const step = 1;

class Header {
  private headerContainer: BaseComponent;

  private headerLogoContainer: BaseComponent;

  private headerLogo: BaseComponent;

  private headerLogoTitle: BaseComponent;

  private headerLogoTitleSport: BaseComponent;

  private headerLogoTitleShop: BaseComponent;

  private headerNavContainer: BaseComponent;

  private headerNav: BaseComponent;

  private navList: BaseComponent;

  private homeNavListItem: BaseComponent;

  private homeNavListLink: BaseComponent;

  private catalogNavListItem: BaseComponent;

  private catalogNavListLink: BaseComponent;

  private aboutNavListItem: BaseComponent;

  public aboutNavListLink: BaseComponent;

  private headerButtonsContainer: BaseComponent;

  private profileButton: BaseComponent;

  private loginButton: BaseComponent;

  private logoutButton: BaseComponent;

  private regButton: BaseComponent;

  private cartBtn: BaseComponent;

  private cartLink: BaseComponent;

  private cartOrdersNum: BaseComponent;

  constructor() {
    this.headerContainer = Header.createHeaderContainerElement();
    this.headerLogoContainer = Header.createHeaderLogoContainerElement();
    this.headerLogo = Header.createHeaderLogoElement();
    this.headerLogoTitle = Header.createHeaderLogoTitleElement();
    this.headerLogoTitleSport = Header.createHeaderLogoTitleSportElement();
    this.headerLogoTitleShop = Header.createHeaderLogoTitleShopElement();

    this.headerNavContainer = Header.createHeaderNavContainerElement();
    this.headerNav = Header.createHeaderNavElement();
    this.navList = Header.createNavListElement();
    this.homeNavListItem = Header.createHomeNavListItemElement();
    this.homeNavListLink = Header.createHomeNavListLinkElement();
    this.catalogNavListItem = Header.createCatalogNavListItemElement();
    this.catalogNavListLink = Header.createCatalogNavListLinkElement();
    this.aboutNavListItem = Header.createAboutNavListItemElement();
    this.aboutNavListLink = Header.createAboutNavListLinkElement();
    this.cartBtn = Header.createCartBtn();
    this.cartLink = Header.createCartLink();
    this.cartOrdersNum = Header.createCartOrdersNum();

    this.headerButtonsContainer = Header.createHeaderButtonsContainerElement();
    this.profileButton = Header.createProfileButtonElement();
    this.loginButton = Header.createLoginButtonElement();
    this.logoutButton = Header.createLogoutButtonElement();
    this.regButton = Header.createRegistrationButtonElement();
    this.composeView();
    this.submitProfileButton();
    this.submitLogoutButton();
  }

  private composeView(): void {
    this.headerContainer.html.append(
      this.headerLogoContainer.html,
      this.headerNavContainer.html,
      this.headerButtonsContainer.html,
    );
    this.headerLogoContainer.html.append(this.headerLogo.html, this.headerLogoTitle.html);
    this.headerLogoTitle.html.append(this.headerLogoTitleSport.html, this.headerLogoTitleShop.html);

    this.headerNavContainer.html.append(this.headerNav.html);
    this.headerNav.html.append(this.navList.html);
    this.navList.html.append(
      this.homeNavListItem.html,
      this.catalogNavListItem.html,
      this.aboutNavListItem.html,
      this.cartBtn.html,
    );
    this.homeNavListItem.html.append(this.homeNavListLink.html);
    this.catalogNavListItem.html.append(this.catalogNavListLink.html);
    this.aboutNavListItem.html.append(this.aboutNavListLink.html);
    this.cartBtn.html.append(this.cartLink.html, this.cartOrdersNum.html);
    this.headerButtonsContainer.html.append(
      this.profileButton.html,
      this.loginButton.html,
      this.logoutButton.html,
      this.regButton.html,
    );
  }

  private static createHeaderContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'header', class: ['header'] });
  }

  private static createHeaderLogoContainerElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['logo-container'],
      attribute: [
        ['href', '/'],
        ['data-navigo', ''],
      ],
    });
  }

  private static createHeaderLogoElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['logo-icon'] });
  }

  private static createHeaderLogoTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['header-logo-title'] });
  }

  private static createHeaderLogoTitleSportElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['header-logo-title-sport'],
      text: 'Sport',
    });
  }

  private static createHeaderLogoTitleShopElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['header-logo-title-shop'],
      text: 'Shop',
    });
  }

  private static createHeaderNavContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['nav-container'] });
  }

  private static createHeaderNavElement(): BaseComponent {
    return new BaseComponent({ tag: 'nav', class: ['nav-menu'] });
  }

  private static createNavListElement(): BaseComponent {
    return new BaseComponent({ tag: 'ul', class: ['nav-list'] });
  }

  private static createHomeNavListItemElement(): BaseComponent {
    return new BaseComponent({ tag: 'li', class: ['nav-list-item'] });
  }

  private static createHomeNavListLinkElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['nav-list-link', 'header-home-link'],
      attribute: [
        ['href', '/'],
        ['data-navigo', ''],
      ],
      text: 'Home',
    });
  }

  private static createCatalogNavListItemElement(): BaseComponent {
    return new BaseComponent({ tag: 'li', class: ['nav-list-item'] });
  }

  private static createCatalogNavListLinkElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['nav-list-link', 'header-catalog-link'],
      attribute: [
        ['href', '/catalog'],
        ['data-navigo', ''],
      ],
      text: 'Catalog',
    });
  }

  private static createAboutNavListItemElement(): BaseComponent {
    return new BaseComponent({ tag: 'li', class: ['nav-list-item'] });
  }

  public static createAboutNavListLinkElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['nav-list-link'],
      attribute: [
        ['href', '/about'],
        ['data-navigo', ''],
      ],
      text: 'About Us',
    });
  }

  private static createHeaderButtonsContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['buttons-container'] });
  }

  private static createProfileButtonElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['profile-button', 'hide'],
      attribute: [
        ['href', '/profile'],
        ['data-navigo', ''],
      ],
      text: 'Profile',
    });
  }

  private static createLoginButtonElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['login-button'],
      attribute: [
        ['href', '/login'],
        ['data-navigo', ''],
      ],
      text: 'Login',
    });
  }

  private static createCartBtn(): BaseComponent {
    return new BaseComponent({ tag: 'li', class: ['nav-list-item'] });
  }

  private static createCartLink(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['cart-button'],
      attribute: [
        ['href', '/cart'],
        ['data-navigo', ''],
      ],
      text: '',
    });
  }

  private static createCartOrdersNum(): BaseComponent {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');
    const orderNum = new BaseComponent({
      tag: 'div',
      class: ['cart-orders-num'],
    });

    if (cartId) {
      ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
        if (typeof res !== 'string') {
          let num = 0;
          for (let i = 0; i < res.lineItems.length; i += step) {
            num += res.lineItems[i].quantity;
          }
          orderNum.html.textContent = `${num}`;
        }
      });
    } else {
      orderNum.html.textContent = '0';
    }

    return orderNum;
  }

  private static createLogoutButtonElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['logout-button', 'hide'],
      attribute: [
        ['href', '/logout'],
        ['data-navigo', ''],
      ],
      text: 'Logout',
    });
  }

  private static createRegistrationButtonElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['registration-button'],
      attribute: [
        ['href', '/registration'],
        ['data-navigo', ''],
      ],
      text: 'Registration',
    });
  }

  private submitLogoutButton(): void {
    this.logoutButton.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (localStorage.getItem('tokenPassword')) {
        ECommerceApi.getAnonymousToken(currentClient).then((res) => {
          localStorage.setItem('tokenAnonymous', res.access_token);
          localStorage.removeItem('tokenPassword');
          localStorage.removeItem('isAuth');
          localStorage.removeItem('cartId');
          localStorage.removeItem('customer');
          this.loginButton.html.classList.remove('hide');
          this.loginButton.html.setAttribute('href', '/login');
          this.logoutButton.html.classList.add('hide');
          this.profileButton.html.classList.add('hide');
          this.regButton.html.classList.remove('hide');
        });
      }
    });
  }

  private submitProfileButton(): void {
    this.profileButton.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
    });
  }

  static updateOrdersNum(): void {
    setTimeout(() => {
      const token = localStorage.getItem('tokenPassword')
        ? localStorage.getItem('tokenPassword')
        : localStorage.getItem('tokenAnonymous');
      const cartId = localStorage.getItem('cartId');
      let num = 0;
      if (cartId) {
        ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
          if (typeof res !== 'string') {
            for (let i = 0; i < res.lineItems.length; i += step) {
              num += res.lineItems[i].quantity;
            }

            document.getElementsByClassName('cart-orders-num')[0].textContent = `${num}`;
          }
        });
      } else {
        document.getElementsByClassName('cart-orders-num')[0].textContent = '0';
      }
    }, timeout);
  }

  get profileBtn(): BaseComponent {
    return this.profileButton;
  }

  get loginBtn(): BaseComponent {
    return this.loginButton;
  }

  get logoutBtn(): BaseComponent {
    return this.logoutButton;
  }

  get regBtn(): BaseComponent {
    return this.regButton;
  }

  get view(): BaseComponent {
    return this.headerContainer;
  }
}

export default Header;
