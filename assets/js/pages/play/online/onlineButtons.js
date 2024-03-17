import createGameModal from './createGameModal.js';

const onlineButtons = document.getElementById('onlineButtons');

onlineButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  createGameModal.modal.show();
});

export default onlineButtons;
