import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import { Opening } from "https://cdn.jsdelivr.net/npm/@chesslablab/jsblab@0.0.8/src/index.min.js";

const openingsNameModalForm = document.querySelector('#openingsNameModal form');
const openingsNameModalTable = document.querySelector('#openingsNameModal table tbody');

openingsNameModalForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsNameModalForm);
  const openings = Opening.byName(formData.get('name'));
  openingsNameModalTable.replaceChildren();
  openings.forEach(opening => {
    const tr = document.createElement('tr');
    const ecoTd = document.createElement('td');
    const ecoText = document.createTextNode(opening.eco);
    const nameTd = document.createElement('td');
    const nameText = document.createTextNode(opening.name);
    const movetextTd = document.createElement('td');
    const movetextText = document.createTextNode(opening.movetext);
    ecoTd.appendChild(ecoText);
    nameTd.appendChild(nameText);
    movetextTd.appendChild(movetextText);
    tr.appendChild(ecoTd);
    tr.appendChild(nameTd);
    tr.appendChild(movetextTd);
    tr.addEventListener('click', event => {
      localStorage.setItem(
        'openings',
        JSON.stringify({
          variant: 'classical',
          mode: 'san',
          add: {
            movetext: opening.movetext
          }
        })
      );
      window.location.href = '/openings';
    });
    openingsNameModalTable.appendChild(tr);
  });
});
