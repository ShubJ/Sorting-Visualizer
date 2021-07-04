async function start() {
  let algo = Number(document.querySelector(".algo").value);
  let speedValue = Number(document.querySelector(".speed").value);
  let algorithm = new Algorithms(speedValue);

  if (algo == "1") await algorithm.bubbleSort();
  if (algo == "2") await algorithm.selectionSort();
  if (algo == "3") await algorithm.insertionSort();
  if (algo == "4") await algorithm.mergeSort();
  if (algo == "5") await algorithm.quickSort();
}

async function renderScreen() {
  let size = Number(document.querySelector(".arraySize").value);
  await clearScreen();

  let list = await generateRandomList(size);

  let container = document.querySelector(".container");
  let maxHeight = document.querySelector(".container").offsetHeight;
  let maxWidth = document.querySelector(".container").offsetWidth;
  let cellWidth = `${maxWidth / size}px`;

  for (let i = 0; i < list.length; i++) {
    let bar = document.createElement("div");
    bar.className = "cell";
    bar.setAttribute("value", String(list[i]));
    bar.style.height = `${(maxHeight * list[i]) / 100 - 2}px`;
    bar.style.width = cellWidth;
    container.appendChild(bar);
  }
}

async function clearScreen() {
  document.querySelector(".container").innerHTML = "";
}

async function generateRandomList(size) {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;
  for (let counter = 0; counter < size; counter++) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
}

document.querySelector(".arraySize").addEventListener("change", renderScreen);
renderScreen();
