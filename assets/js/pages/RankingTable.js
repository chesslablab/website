import BaseComponent from '../BaseComponent.js';

export class RankingTable extends BaseComponent {
  mount() {
    const tbody = this.el.getElementsByTagName('tbody')[0];
    tbody.replaceChildren();
    this.props.data.forEach(user => {
      const tr = document.createElement('tr');
      const eloTd = document.createElement('td');
      const usernameTd = document.createElement('td');
      eloTd.appendChild(document.createTextNode(user.elo));
      usernameTd.appendChild(document.createTextNode(user.username));
      tr.appendChild(eloTd);
      tr.appendChild(usernameTd);
      tbody.appendChild(tr);
    });
  }
}

export const rankingTable = new RankingTable(
  document.getElementById('rankingTable'),
  {
    data: []
  }
);
