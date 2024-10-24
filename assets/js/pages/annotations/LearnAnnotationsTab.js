import AbstractComponent from '../../AbstractComponent.js';

export class LearnAnnotationsTab extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const learnAnnotationsTab = new LearnAnnotationsTab(
  document.getElementById('learnAnnotationsTab'),
  {
    form: document.querySelector('#learnAnnotationsTab form')
  }
);
