class Helper {
  constructor(speed, list = []) {
    this.time = parseInt(400 / speed);
    this.list = list;
    this.maxHeight = document.querySelector(".container").offsetHeight;
  }

  pause = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.time);
    });
  };

  async mark(index) {
    this.list[index].setAttribute("class", "cell current");
  }

  async markSpl(index) {
    this.list[index].setAttribute("class", "cell min");
  }

  async unmark(index) {
    this.list[index].setAttribute("class", "cell");
  }

  async compare(index1, index2) {
    await this.pause();
    let value1 = Number(this.list[index1].getAttribute("value"));
    let value2 = Number(this.list[index2].getAttribute("value"));
    if (value1 > value2) return true;
    return false;
  }

  async swap(index1, index2) {
    await this.pause();
    let value1 = Number(this.list[index1].getAttribute("value"));
    let value2 = Number(this.list[index2].getAttribute("value"));
    this.list[index1].setAttribute("value", value2);
    this.list[index2].setAttribute("value", value1);
    this.list[index1].style.height = `${(this.maxHeight * value2) / 100 - 2}px`;
    this.list[index2].style.height = `${(this.maxHeight * value1) / 100 - 2}px`;
  }
}
