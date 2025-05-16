class Store {
  constructor() {
    this.data = {};
    this.listeners = [];
  }

  getData() {
    return this.data;
  }

  setData(newData) {
    this.data = {
      ...this.data,
      ...newData,
    };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.data));
  }
}

const store = new Store();
export default store;