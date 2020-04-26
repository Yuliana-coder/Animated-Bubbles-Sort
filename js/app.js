document.addEventListener("DOMContentLoaded", () => {
  // Блок, заполненный окружностями с числами для сортировки
  const MAIN = document.querySelector(".main");
  // Кнопка запуска алгоритма
  let button = document.querySelector(".start");
  // Значение скорости по умолчанию (на анимацию 500ms)
  let time = 500;
  const MIN = 0;
  const MAX = 100;
  // Флаг для плавного переключения скоростей
  // Скорость анимации, по умолчанию - средняя
  let animationSpeed = "normally";

  // Массив для заполнения числами
  let array = [];

  // Длина массива целых чисел
  let lengthArray = 15;

  /**
   * Функция-конструктор
   * Генерирование массива, отрисовка элементов-пузырей
   */
  function createAndRenderBubbleList() {
    // Блок с информацией и инструкцией
    const INFO = document.querySelector(".info");
    // Кнопки-режимы скоростей
    let quickMode = document.querySelector(".btn-quick");
    let normallyMode = document.querySelector(".btn-normally");
    let slowlyMode = document.querySelector(".btn-slowly");

    /**
     * Заполнение массива длинной lengthArray случайными целыми числами от MIN до MAX
     */
    for (let i = 0; i < lengthArray; i++) {
      array.push(getRandom(MIN, MAX));
    }

    /**
     * Вывод массива на экран в информационный блок
     */
    INFO.insertAdjacentHTML(
      "afterEnd",
      `<div class="info__array">Отсортируем массив:  [${array}]</div>`
    );

    /**
     * Отрисовка элементов
     */
    for (let i = 0; i < lengthArray; i++) {
      createBubble(array[i]);
    }

    // Обработчик клика кнопки запуска
    button.addEventListener("click", bubbleSort);
    // Обработчик для кнопки "быстро"
    quickMode.addEventListener("click", function () {
      animationSpeed = "quick";
      time = 250;
    });
    // Обработчик для кнопки "средне"
    normallyMode.addEventListener("click", function () {
      animationSpeed = "normally";
      time = 500;
    });
    // Обработчик для кнопки "медленно"
    slowlyMode.addEventListener("click", function () {
      animationSpeed = "slowly";
      time = 1000;
    });
  }

  /**
   * Генератор случайного числа
   */
  function getRandom(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN)) + MIN;
  }

  /**
   *Добавление блоков - "пузырей" на страницу
   * @param {integer} num
   */
  function createBubble(num) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    MAIN.append(bubble);
    bubble.innerHTML = `<span class="number">${num}</span>`;
  }

  /**
   * Добавление соответствующих классов для "скорости" и удаление других "скоростей"
   * @param {string} speed
   */
  function changeMode(speed) {
    for (let i = 0; i < lengthArray; i++) {
      document.querySelectorAll(".bubble")[i].classList.remove(`quickly`);
      document.querySelectorAll(".bubble")[i].classList.remove(`normally`);
      document.querySelectorAll(".bubble")[i].classList.remove(`slowly`);
      document.querySelectorAll(".bubble")[i].classList.add(`${speed}`);
    }
  }

  /**
   * Сортировка
   * Алгоритм запускается для реального массива, индексы в массиве с числами в массиве с
   * блоками-пузырями совпадают
   */
  async function bubbleSort() {
    button.removeEventListener("click", bubbleSort);

    let arrayOfBubbles = [...document.querySelectorAll(".bubble")];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j] > array[j + 1]) {
          changeMode(animationSpeed);
          let largerValue = array[j];
          array[j] = array[j + 1];
          array[j + 1] = largerValue;
          bubbleSwap(arrayOfBubbles[j], arrayOfBubbles[j + 1]);
          await stop(time * 3);
          let largerValue1 = arrayOfBubbles[j];
          arrayOfBubbles[j] = arrayOfBubbles[j + 1];
          arrayOfBubbles[j + 1] = largerValue1;
        }
      }
    }
    button.addEventListener("click", bubbleSort);
  }

  /**
   * Остановка выполняющегося кода для анимации
   */
  function stop(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Функция для анимации меняющихся при сортировке элементов
   * @param {element} bubbleBig
   * @param {element} bubbleSmall
   */
  async function bubbleSwap(bubbleBig, bubbleSmall) {
    bubbleBig.classList.add("grow");
    bubbleBig.style.padding = "10px";
    setTimeout(() => {
      bubbleBig.classList.add("up");
      bubbleBig.style.transform += "translate(0px, -70px)";
    }, time);
    setTimeout(() => {
      bubbleBig.classList.add("rigth");
      bubbleBig.style.transform += "translate(80px, 0px)";
    }, time * 2);
    setTimeout(() => {
      bubbleSmall.classList.add("rigth");
      bubbleSmall.style.transform += "translate(-80px, 0px)";
      bubbleBig.classList.add("down");
      bubbleBig.style.transform += "translate(0px, 70px)";
      bubbleBig.classList.add("grow");
      bubbleBig.style.padding = "5px";
    }, time * 3);
  }

  createAndRenderBubbleList();
});
