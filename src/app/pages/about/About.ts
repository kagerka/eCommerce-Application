import taskBoardImage from '../../../assets/images/task-board.png';
import BaseComponent from '../../components/BaseComponent';
import './About.scss';

const teamMembers = [
  {
    name: 'Ekaterina Kotliarenko',
    position: 'Frontend Developer | Team Lead',
    gitLink: 'https://github.com/kagerka',
    bio: `I live in Russia, Moscow. Worked before as a SEO Specialist and a Site administrator. 
    I past this course in 2021, but I didn't find a job for personal reasons. 
    Now I'm sure, that I will get a job as a junior front-end developer.`,
    contribution: `As a team lead, I created Kanban board in the Github Projects with tasks for all sprints. 
    Prepared PRs and app's deploys for every sprint, added links to RS App and then communicated with reviewers. 
    The tasks are done evenly by each team member, so I can't write anything special here.`,
  },
  {
    name: 'Aleksandr Krivoshein',
    position: 'Frontend Developer',
    gitLink: 'https://github.com/Wood85',
    bio: `I live in Georgia, Batumi. At the present time I study at RS School and 
		I'm looking for a job as a junior front-end developer`,
    contribution: `I was working on the login page and profile page and
		also took part in the implementation of the shopping cart`,
  },
  {
    name: 'Tatiana Buinitskaya',
    position: 'Frontend Developer',
    gitLink: 'https://github.com/Tanesha001',
    bio: "I'm from Belarus, Minsk. Graduated Economic University in 2022 and started looking for myself, this path led me to RS School. I'm impressed by the school's approach and interesting tasks and hope to change my job in the hotel in the nearest future.",
    contribution:
      "I was working with API, website design (especially on the catalog page), implementing features, maintaining the project's vision.",
  },
];

const iterationStep = 1;

class About {
  private aboutContent: BaseComponent;

  private headingMembers: BaseComponent;

  private headingCollab: BaseComponent;

  private rsLink: BaseComponent;

  private collabInfo: BaseComponent;

  static taksBoardImage: BaseComponent;

  constructor() {
    this.aboutContent = About.createAboutContentElement();
    this.headingMembers = About.createHeadingMembers();
    this.headingCollab = About.createHeadingCollab();
    this.rsLink = About.createRSLink();
    this.collabInfo = About.createCollabInfo();
    About.taksBoardImage = About.createTaskBoardImage();
    this.composeView();
  }

  private composeView(): void {
    this.aboutContent.html.append(this.headingMembers.html);
    for (let i = 0; i < teamMembers.length; i += iterationStep) {
      const member = About.createMemberCard(i);
      this.aboutContent.html.append(member.html);
    }
    this.aboutContent.html.append(this.headingCollab.html, this.collabInfo.html, this.rsLink.html);
    // this.collabInfo.html.append(this.taksBoardImage.html);
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
    const collabInfo = new BaseComponent({
      tag: 'div',
      class: ['collab-info'],
    });

    const image = new BaseComponent({ tag: 'img', class: ['task-board-image'], src: taskBoardImage });

    const line1 = new BaseComponent({
      tag: 'p',
      class: ['collab-info'],
      text: `We teamed up as we were together at the same mentor.`,
    });

    const line2 = new BaseComponent({
      tag: 'p',
      class: ['collab-info'],
      text: `At the very beginning of the task we discussed basic questions about the theme of the site, it's design. 
      We created a kanban board where all the tasks for each sprint are listed. 
      Each team member chooses a task that he/she can perform, marks himself/herself as a performer. 
      And then he/she changed the status of the task depending on the stage of completion. 
      If necessary, we communicated in discord. `,
    });
    const line3 = new BaseComponent({
      tag: 'p',
      class: ['collab-info'],
      text: `At the end of each task in the current sprint, the person, responsible for the task, creates a PR, 
      describing what was accomplished. 
      The rest of the team members checked the code. If errors are found, the work marked as "To Fix" 
      on the task board and all bugs should be fixed. 
      If everything is ok, we gave an approve and the task is merged to the development branch.`,
    });
    const line4 = new BaseComponent({
      tag: 'p',
      class: ['collab-info'],
      text: `At the end of each sprint team leader created PR to the main development branch, checked app 
      and write description with a screenshot, self check points, marked items as done or not. 
      All team members approve this PR, then PR merged. All team members should sent PR link to the mentor. 
      Team leader should sent the link of deploy to the RS App.`,
    });

    collabInfo.html.append(line1.html, line2.html, image.html, line3.html, line4.html);
    return collabInfo;
  }

  private static createRSLink(): BaseComponent {
    return new BaseComponent({ tag: 'a', target: '_blank', class: ['rs-link'], href: 'https://rs.school/' });
  }

  private static createTaskBoardImage(): BaseComponent {
    return new BaseComponent({ tag: 'img', class: ['task-board-image'], src: taskBoardImage });
  }

  private static createMemberCard(i: number): BaseComponent {
    const cardConteiner = new BaseComponent({ tag: 'div', class: ['member-card-conteiner'] });
    const imgConteiner = new BaseComponent({ tag: 'div', class: ['member-img-conteiner', `member-img-${i}`] });
    const infoConteiner = new BaseComponent({ tag: 'div', class: ['member-info-conteiner'] });
    const gitLink = new BaseComponent({
      tag: 'a',
      target: '_blank',
      class: ['git-link'],
      href: teamMembers[i].gitLink,
    });

    const name = new BaseComponent({ tag: 'h4', class: ['member-name'], text: teamMembers[i].name });
    const position = new BaseComponent({ tag: 'p', class: ['member-info'], text: teamMembers[i].position });
    const bioTitle = new BaseComponent({ tag: 'h5', class: ['member-title'], text: 'Bio' });
    const contributionTitle = new BaseComponent({ tag: 'h5', class: ['member-title'], text: 'Contributions' });
    const bioInfo = new BaseComponent({ tag: 'p', class: ['member-info'], text: teamMembers[i].bio });
    const contributionInfo = new BaseComponent({ tag: 'p', class: ['member-info'], text: teamMembers[i].contribution });

    cardConteiner.html.append(imgConteiner.html, infoConteiner.html);
    infoConteiner.html.append(
      gitLink.html,
      name.html,
      position.html,
      bioTitle.html,
      bioInfo.html,
      contributionTitle.html,
      contributionInfo.html,
    );

    return cardConteiner;
  }

  get view(): BaseComponent {
    return this.aboutContent;
  }
}

export default About;
