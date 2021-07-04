class Algorithms {
  constructor(speed) {
    this.list = document.querySelectorAll(".cell");
    this.size = this.list.length;
    this.speed = speed;
    this.help = new Helper(this.speed, this.list);
    this.maxHeight = document.querySelector(".container").offsetHeight;
  }

  async bubbleSort() {
    for (let i = 0; i < this.size; i++) {
      let swapOccured = false;
      for (let j = 0; j < this.size - i - 1; j++) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);
          swapOccured = true;
        }
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      this.list[this.size - i - 1].setAttribute("class", "cell done");
      if (!swapOccured) {
        for (let j = 0; j < this.size - i - 1; j++) {
          this.list[j].setAttribute("class", "cell done");
        }
        break;
      }
    }
    this.list[0].setAttribute("class", "cell done");
  }

  async selectionSort() {
    for (let i = 0; i < this.size; i++) {
      let min = i;
      for (let j = i; j < this.size; j++) {
        await this.help.mark(j);
        await this.help.markSpl(min);
        if (await this.help.compare(min, j)) {
          await this.help.unmark(min);
          min = j;
          await this.help.markSpl(min);
        }
        await this.help.unmark(j);
      }
      if (min != i) {
        await this.help.swap(min, i);
      }
      await this.help.mark(min);
      await this.help.mark(i);
      await this.help.pause();
      await this.help.unmark(min);
      this.list[i].setAttribute("class", "cell done");
    }
  }

  async insertionSort() {
    for (let i = 1; i < this.size; i++) {
      let j = i - 1;

      while (j >= 0 && (await this.help.compare(j, j + 1))) {
        this.help.mark(j);
        this.help.mark(j + 1);
        await this.help.pause();
        await this.help.swap(j, j + 1);
        this.help.unmark(j);
        this.help.unmark(j + 1);
        j--;
      }
    }
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  }

  async mergeSort() {
    await this.mergeDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  }

  async mergeDivider(start, end) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      await this.mergeDivider(start, mid);
      await this.mergeDivider(mid + 1, end);
      await this.merge(start, mid, end);
    }
  }

  async merge(start, mid, end) {
    let newArr = [];
    let newIndex = start;
    let tempEnd = mid + 1;

    while (newIndex <= mid && tempEnd <= end) {
      let fvalue = Number(this.list[newIndex].getAttribute("value"));
      let svalue = Number(this.list[tempEnd].getAttribute("value"));

      if (fvalue > svalue) {
        newArr.push(svalue);
        tempEnd++;
      } else {
        newArr.push(fvalue);
        newIndex++;
      }
    }

    while (newIndex <= mid) {
      newArr.push(Number(this.list[newIndex].getAttribute("value")));
      newIndex++;
    }
    while (tempEnd <= end) {
      newArr.push(Number(this.list[tempEnd].getAttribute("value")));
      tempEnd++;
    }

    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell current");
    }

    for (
      let i = start, point = 0;
      i <= end && point < newArr.length;
      i++, point++
    ) {
      await this.help.pause();
      this.list[i].setAttribute("value", newArr[point]);
      this.list[i].style.height = `${
        (this.maxHeight * newArr[point]) / 100 - 2
      }px`;
    }
    for (let c = start; c <= end; ++c) {
      this.help.unmark(c);
    }
  }

  async quickSort() {
    await this.quickDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  }

  async quickDivider(start, end) {
    if (start < end) {
      let pivotIndex = await this.partition(start, end);
      await this.quickDivider(start, pivotIndex - 1);
      await this.quickDivider(pivotIndex + 1, end);
    }
  }

  async partition(start, end) {
    let pivot = Number(this.list[start].getAttribute("value"));
    let pivotIndex = start;
    let ub = end;
    let lb = start;

    await this.help.markSpl(pivotIndex);
    await this.help.mark(start);
    await this.help.mark(end);

    while (start < end) {
      let startValue = Number(this.list[start].getAttribute("value"));
      while (startValue <= pivot) {
        await this.help.unmark(start);
        start++;
        if (start <= ub) {
          await this.help.mark(start);
          startValue = Number(this.list[start].getAttribute("value"));
        } else break;
      }
      let endValue = Number(this.list[end].getAttribute("value"));
      while (endValue > pivot) {
        await this.help.unmark(end);
        end--;
        if (end >= lb) {
          await this.help.mark(end);
          endValue = Number(this.list[end].getAttribute("value"));
        } else break;
      }

      if (start < end) {
        //   await this.help.pause()
        await this.help.swap(start, end);
        await this.help.unmark(start);
        await this.help.unmark(end);
      }
    }
    await this.help.mark(end);
    await this.help.mark(pivotIndex);
    await this.help.swap(pivotIndex, end);
    await this.help.unmark(pivotIndex);
    await this.help.unmark(end);

    return end;
  }
}
