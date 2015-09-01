import EventEmitter from 'EventEmitter2';
import { pipe, values, forEach } from 'ramda';

class Store extends EventEmitter {

  constructor (...args) {
    super(...args);
    this.items = {};
  }

  emitChange () {
    this.emit('change');
  }

  reset () {
    this.items = {};
    return this;
  }

  createItem (item) {
    this.items[item.isbn] = item;
    return this;
  }

  removeItem (item) {
    delete this.items[item.isbn];
    return this;
  }

  getItems () {
    return this.items;
  }

  setItems (list) {
    this.reset();
    pipe(
      values,
      forEach(
        (item) => this.createItem(item)
      )
    )(list);
    return this;
  }

  addChangeListener (callback) {
    this.on('change', callback);
  }

  removeChangeListener (callback) {
    this.removeListener('change', callback);
  }

}

export default Store;
