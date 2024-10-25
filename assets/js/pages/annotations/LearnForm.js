import AbstractComponent from '../../AbstractComponent.js';

export class LearnForm extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const learnForm = new LearnForm(document.getElementById('learnForm'));
