import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import './Modal.scss';

class Modal {
  private overlay: BaseComponent;

  private modal: BaseComponent;

  private closeBtn: Button;

  private modalContainer: BaseComponent;

  constructor() {
    this.overlay = Modal.createOverlayElement();
    this.modal = Modal.createModalElement();
    this.closeBtn = Modal.createCloseBtnElement();
    this.modalContainer = Modal.createContainerElement();
    this.composeView();
    this.closeModal();
  }

  private composeView(): void {
    this.modal.html.append(this.closeBtn.view.html, this.modalContainer.html);
    this.overlay.html.append(this.modal.html);
  }

  private static createOverlayElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['overlay'] });
  }

  private static createModalElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['modal'] });
  }

  private static createCloseBtnElement(): Button {
    return new Button({ type: 'button', class: ['btn-close'] });
  }

  private static createContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['container'] });
  }

  private closeModal(): void {
    this.overlay.html.addEventListener('click', (event) => {
      if (event.target === this.overlay.html || event.target === this.closeBtn.view.html) {
        this.overlay.html.remove();
      }
    });
  }

  get view(): BaseComponent {
    return this.overlay;
  }

  get container(): BaseComponent {
    return this.modalContainer;
  }
}

export default Modal;
