import DataTable from './datatable/datatable';
import {log} from './utils';

export default class App {

  constructor() {
    var self = this;
    this.loadButton = document.getElementById('loadButton');

    this.loadButton.onclick = function() {
      self.initTable();
    };

  }

  initTable() {

    document.getElementById('dt1').innerHTML = '';

    this.table = new DataTable({
      path: '.datatable-wrap',
      fields: {
          id: {
              title: '#',
              name: 'id'
          },
          firstName: {
            title: 'Имя',
            name: 'firstName'
          },
          lastName: {
            title: 'Фамилия',
            name: 'lastName'
          },
          email: {
            title: 'E-mail',
            name: 'email'
          },
          phone: {
            title: 'Тел',
            name: 'phone'
          }
      }
    });

    let dataSetName = document.getElementById('dataSetName').value;

    this.loadData(dataSetName);
  }

  loadData(dataSetName) {
      let preloader = document.getElementById('loadStatus');
      preloader.classList.toggle('active');
      preloader.innerHTML = 'Загружаются данные';

      var self = this;
      log(dataSetName, 'info');
      let dataset = {
          /* */
          sm: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
          bg: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
          /*
          sm: 'dataset.small.json', 
          bg: 'dataset.big.json'  // чтобы грузилось быстрее
          */
      }

      fetch(dataset[dataSetName])
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              log(data, 'info');
              self.table.setData(data);
              preloader.classList.toggle('active');
          });

  }

}
