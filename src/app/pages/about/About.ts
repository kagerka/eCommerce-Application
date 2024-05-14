import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './About.scss';

const ABOUT_TEXT1 =
  'SportShop is the online specialist for everybody who loves to sport, wants to feel fit or enjoys working out. Our large collection, specialist products and our excellent service are just a few things that are of huge importance for us. At the moment we specialize in field hockey, running, volleyball, handball, basketball and tennis. The employees of Sportshop perform top sport every day. They help you with the right answer to difficult and naturally easy questions, give you the right specialist advice when necessary, jump in the air if they are allowed to pack your order and make sure that the latest products are the first.';
const ABOUT_TEXT2 =
  'The employees of SportShop work out every day just for you. They are ready to answer all your difficult questions and they are happy to give you advice. When your order arrives we run as fast as we can to collect the items and ship them to you. Some of our colleagues are continuously looking to find the best products just for you!';

class About {
  private about: BaseComponent;

  private header: Header;

  private aboutContent: BaseComponent;

  private aboutHeading: BaseComponent;

  private aboutText1: BaseComponent;

  private aboutText2: BaseComponent;

  private banner: Banner;

  private footer: Footer;

  constructor() {
    this.about = About.createAboutElement();
    this.header = new Header();
    this.aboutContent = About.createAboutContentElement();
    this.aboutHeading = About.createAboutHeadingElement();
    this.aboutText1 = About.createAboutText1Element();
    this.aboutText2 = About.createAboutText2Element();
    this.banner = new Banner();
    this.footer = new Footer();

    this.composeView();
  }

  private composeView(): void {
    this.about.html.append(this.header.view.html, this.aboutContent.html, this.footer.view.html);
    this.aboutContent.html.append(
      this.banner.view.html,
      this.aboutHeading.html,
      this.aboutText1.html,
      this.aboutText2.html,
    );
  }

  private static createAboutElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['about-page'] });
  }

  private static createAboutContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['about-content'] });
  }

  private static createAboutHeadingElement(): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['heading'], text: 'About' });
  }

  private static createAboutText1Element(): BaseComponent {
    return new BaseComponent({ tag: 'p', class: ['about-text'], text: ABOUT_TEXT1 });
  }

  private static createAboutText2Element(): BaseComponent {
    return new BaseComponent({ tag: 'p', class: ['about-text'], text: ABOUT_TEXT2 });
  }

  get view(): BaseComponent {
    return this.about;
  }
}

export default About;
