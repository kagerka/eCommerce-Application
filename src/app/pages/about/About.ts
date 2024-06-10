import BaseComponent from '../../components/BaseComponent';
import './About.scss';

const teamMembers = [
  {
    name: 'Ekaterina Kotliarenko',
    position: 'Frontend Developer | Team Lead',
    photo: '',
    gitLink: 'https://github.com/kagerka',
    bio: 'Here should be short bio',
    contribution: 'Here should be written about your contribution to the project',
  },
  {
    name: 'Aleksandr Krivoshein',
    position: 'Frontend Developer',
    photo: '',
    gitLink: 'https://github.com/Wood85',
    bio: 'Here should be short bio',
    contribution: 'Here should be written about your contribution to the project',
  },
  {
    name: 'Tatiana Buinitskaya',
    position: 'Frontend Developer',
    photo: '/src/assets/images/tanya.jpg',
    gitLink: 'https://github.com/Tanesha001',
    bio: 'Here should be short bio',
    contribution: 'Here should be written about your contribution to the project',
  },
];

const iterationStep = 1;

class About {
  private aboutContent: BaseComponent;

  private headingMembers: BaseComponent;

  private headingCollab: BaseComponent;

  private rsLink: BaseComponent;

  private rsLogo: BaseComponent;

  private collabInfo: BaseComponent;

  constructor() {
    this.aboutContent = About.createAboutContentElement();
    this.headingMembers = About.createHeadingMembers();
    this.headingCollab = About.createHeadingCollab();
    this.rsLink = About.createRSLink();
    this.rsLogo = About.createRSLogo();
    this.collabInfo = About.createCollabInfo();

    this.composeView();
  }

  private composeView(): void {
    this.aboutContent.html.append(this.headingMembers.html);
    for (let i = 0; i < teamMembers.length; i += iterationStep) {
      const member = About.createMemberCard(i);
      this.aboutContent.html.append(member.html);
    }
    this.aboutContent.html.append(this.headingCollab.html, this.collabInfo.html, this.rsLink.html);
    this.rsLink.html.append(this.rsLogo.html);
  }

  private static createAboutContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['about-content'] });
  }

  private static createHeadingMembers(): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['heading'], text: 'Team Members' });
  }

  private static createHeadingCollab(): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['heading'], text: 'Collaboration' });
  }

  private static createCollabInfo(): BaseComponent {
    return new BaseComponent({
      tag: 'p',
      class: ['collab-info'],
      text: 'Here should be info about our collaboration.',
    });
  }

  private static createRSLink(): BaseComponent {
    return new BaseComponent({ tag: 'a', target: '_blank', class: ['rs-link'], href: 'https://rs.school/' });
  }

  private static createRSLogo(): BaseComponent {
    return new BaseComponent({ tag: 'img', class: ['rs-logo'], src: '/src/assets/images/rs-logo.svg', alt: 'rs-logo' });
  }

  private static createMemberCard(i: number): BaseComponent {
    const cardConteiner = new BaseComponent({ tag: 'div', class: ['member-card-conteiner'] });
    const imgConteiner = new BaseComponent({ tag: 'div', class: ['member-img-conteiner'] });
    const memberImg = new BaseComponent({
      tag: 'img',
      class: ['member-img'],
      src: teamMembers[i].photo,
      alt: 'member',
    });
    const infoConteiner = new BaseComponent({ tag: 'div', class: ['member-info-conteiner'] });
    const gitLink = new BaseComponent({
      tag: 'a',
      target: '_blank',
      class: ['git-link'],
      href: teamMembers[i].gitLink,
    });
    const gitIcon = new BaseComponent({
      tag: 'img',
      class: ['git-icon'],
      src: '/src/assets/images/git-icon.svg',
      alt: 'rs-logo',
    });
    const name = new BaseComponent({ tag: 'h4', class: ['member-name'], text: teamMembers[i].name });
    const position = new BaseComponent({ tag: 'p', class: ['member-info'], text: teamMembers[i].position });
    const bioTitle = new BaseComponent({ tag: 'h5', class: ['member-title'], text: 'Bio' });
    const contributionTitle = new BaseComponent({ tag: 'h5', class: ['member-title'], text: 'Contributions' });
    const bioInfo = new BaseComponent({ tag: 'p', class: ['member-info'], text: teamMembers[i].bio });
    const contributionInfo = new BaseComponent({ tag: 'p', class: ['member-info'], text: teamMembers[i].contribution });

    cardConteiner.html.append(imgConteiner.html, infoConteiner.html);
    imgConteiner.html.append(memberImg.html);
    infoConteiner.html.append(
      gitLink.html,
      name.html,
      position.html,
      bioTitle.html,
      bioInfo.html,
      contributionTitle.html,
      contributionInfo.html,
    );
    gitLink.html.append(gitIcon.html);
    return cardConteiner;
  }

  get view(): BaseComponent {
    return this.aboutContent;
  }
}

export default About;
