import AbstractComponent from '../../../AbstractComponent.js';

export class FinishedButtons extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const finishedButtons = new FinishedButtons(document.getElementById('finishedButtons'));
