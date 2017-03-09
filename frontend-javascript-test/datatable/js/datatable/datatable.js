import _ from 'lodash';
import {log} from '../utils';

export default class Datatable {

    constructor(args = {}) {

        if (!args) {
            throw 'Ошибка инициализации Datatable: не заданы параметры';
        }

        this.options = {
            path: null,
            id: null,
            limit: 50,
            page: 1,
            fields: {
                id: {
                    title: '#',
                    name: 'id'
                }
            },
            sortField: 'id',
            order: 'asc',
            filter: '',
            tableClass: 'table table-stripped'
        };

        this.options = {
            ...this.options,
            ...args
        };

        this.countFilteredItems = 0;

        log(this.options);

        this.div = document.querySelector(this.options.path);

        if (!this.div) {
            throw 'Ошибка инициализации таблицы ';
        }

        this.renderTable();
    }

    setData(items) {
        this.filteredItems = [];
        this.items = items;
        this.update();
    }

    update() {
        if (!this.table) {
            throw 'Ошибка: не инициализирована таблица';
        }

        let self = this;
        self.filteredItems = [];

        if(self.options.filter) {

          self.filteredItems = _.filter(self.items, function(item) {
            return (
              item.id.toString().indexOf(self.options.filter) != -1
              || item.firstName.toString().indexOf(self.options.filter) != -1
              || item.lastName.toString().indexOf(self.options.filter) != -1
              || item.email.toString().indexOf(self.options.filter) != -1
              || item.phone.toString().indexOf(self.options.filter) != -1
              || item.description.toString().indexOf(self.options.filter) != -1
              || item.adress.streetAddress.toString().indexOf(self.options.filter) != -1
              || item.adress.city.toString().indexOf(self.options.filter) != -1
              || item.adress.state.toString().indexOf(self.options.filter) != -1
              || item.adress.zip.toString().indexOf(self.options.filter) != -1
            );
          });
        }

        let start = (self.options.page - 1) * self.options.limit;
        let end = start + self.options.limit;

        self.filteredItems = _.orderBy(self.filteredItems.length ? self.filteredItems : self.items, [self.options.sortField], [self.options.order]);
        self.countFilteredItems = self.filteredItems.length;

        self.filteredItems = self.filteredItems.slice(start, end);

        self.renderItems();

    }

    renderItems() {
        let self = this;

        let tpl = _.reduce(self.filteredItems, function(result, item, key) {

          let row = _.reduce(self.options.fields, function(result, field) {
            return result + `<td>${item[field.name]}</td>`;
          }, '');

          row += `<td><button class="open-info btn bnt-default" data-id="${key}">Подробнее</button></td>`;

          return result + `<tr>${row}</tr>`;
        }, '');

        this.table.getElementsByTagName('tbody')[0].innerHTML = tpl;
        this.updatePaginator();
    }

    renderItem(i) {
      if(!i) {
        throw 'Ошибка загрузки данных пользователя';
      }

      let item = this.filteredItems[i];

      let tpl = `
          Выбран пользователь <b>${item.firstName} ${item.lastName}</b>
          Описание:
          <textarea>
          ${item.description}
          </textarea>
          Адрес проживания: <b>${item.adress.streetAddress}</b>
          Город: <b>${item.adress.city}</b>
          Провинция/штат: <b>  ${item.adress.state}</b>
          Индекс: <b>${item.adress.zip}</b>
      `;

      this.div.getElementsByClassName('info')[0].innerHTML = tpl;
    }

    renderTable() {
        let self = this;

        if (!this.options.id) {
            this.options.id = 'table' + (new Date()).getTime();
        }

        this.div.innerHTML += this.getTplTable();
        this.table = this.div.getElementsByTagName('table')[0];
        this.updateHead();
        this.initFilter();

        this.table.onclick = function(e) {
          if(e.target.classList.contains('open-info')) {
            self.renderItem(e.target.getAttribute('data-id'));
          }
        };
    }

    getTplTable() {
        let filterTpl = `
          <div class="form-inline">
            <input class="filter-input form-control" value="" placeholder="Введите имя, фамилию..."/>
            <button class="filter btn btn-default">Найти</button>
          </div>
        `;

        let paginator = `
          <nav aria-label="Page navigation">
            <ul class="pagination">
            </ul>
          </nav>
        `;

        let tpl = `
          ${filterTpl} ${paginator}
          <table ${this.options.id} class="${this.options.tableClass}"><thead></thead><tbody></tbody></table>
          ${paginator}
          <div class="info"></div>
        `;

        return tpl;
    }

    updateHead() {
      this.table.getElementsByTagName('thead')[0].innerHTML = this.getTplHead();
      this.setSortEvents();
    }

    getTplHead() {
        let self = this;

        let tpl = _.reduce(self.options.fields, function(result, value) {
            let sort = '';
            let order = '';

            if(value.name == self.options.sortField) {

              if(self.options.order == 'desc') {
                var arrow = 'down';
                order = 'desc';
              } else {
                var arrow = 'up';
                order = 'asc';
              }

              sort = `<span class="sort glyphicon glyphicon-arrow-${arrow}"></span>`;
            }

            return result + `
              <th>
                <div class="head-field" data-id="${value.name}" data-order="${order}">${value.title} ${sort}</div>
              </th>
            `;
        }, '');

        tpl += '<th></th>';

        return `<tr>${tpl}</tr>`;
    }

    setSortEvents() {
      let self = this;
      let fields = this.table.getElementsByClassName('head-field');

      _.each(fields, function(item) {
        item.onclick = function() {

          self.options.sortField = item.getAttribute('data-id');
          let order = item.getAttribute('data-order');

          if(order == 'asc') {
            self.options.order = 'desc';
          } else {
            self.options.order = 'asc';
          }

          self.updateHead();
          self.update();
        };
      });

    }

    initFilter() {
      let self = this;
      let btn = this.div.getElementsByClassName('filter')[0];
      let filterInput = this.div.getElementsByClassName('filter-input')[0];

      btn.onclick = function() {
        log('filter: '+filterInput.value);
        self.options.filter = filterInput.value;
        self.options.page = 1;
        self.update();
      };

    }

    updatePaginator() {
      let self = this;

      let tpl = '';

      for(let i = 1; i <= Math.ceil(self.countFilteredItems / self.options.limit); i++) {
        let eclass = '';

        if(i == self.options.page) {
          eclass = 'class="active"';
        }

        tpl += `<li ${eclass}><a href="javascript:;" class="pagination__page" data-id="${i}">${i}</a></li>`;
      }

      _.each(this.div.getElementsByClassName('pagination'), function(paginator) {
        paginator.innerHTML = tpl;
      });

      _.each(this.div.getElementsByClassName('pagination__page'), function(elem) {
        elem.onclick = function() {
          self.options.page = elem.getAttribute('data-id');
          log(self.options.page);
          self.update();
        };
      });

    }




}
