document.addEventListener("DOMContentLoaded", () => {
  // Блок, заполненный окружностями с числами для сортировки
  const MAINBLOCK = document.querySelector(".main");
  // Кнопка запуска алгоритма
  let buttonStartSort = document.querySelector(".start");
  // Значение скорости по умолчанию (на анимацию 500ms)
  const SLOWLY = 1000;
  const NORMALLY = 500;
  const QUICKLY = 250;
  let time = NORMALLY;
  const MINVALUE = 0;
  const MAXVALUE = 100;
  // Флаг для плавного переключения скоростей
  // Скорость анимации, по умолчанию - средняя
  let animationSpeed = "normally";

  // Массив для заполнения числами
  let array = [];

  // Длина массива целых чисел
  const LENGTHARRAY = 15;

  function refreshPage() {
    window.location.reload();
    buttonStartSort.innerHTML = "Запуск";
  }

  /**
   * Функция-конструктор
   * Генерирование массива, отрисовка элементов-пузырей
   */
  function createAndRenderBubbleList() {
    buttonStartSort.removeEventListener("click", refreshPage);
    // Блок с информацией и инструкцией
    const INFOBLOCK = document.querySelector(".info");
    // Кнопки-режимы скоростей
    let quickMode = document.querySelector(".btn-quick");
    let normallyMode = document.querySelector(".btn-normally");
    let slowlyMode = document.querySelector(".btn-slowly");

    /**
     * Заполнение массива длинной LENGTHARRAY случайными целыми числами от MINVALUE до MAXVALUE
     */
    for (let i = 0; i < LENGTHARRAY; i++) {
      array.push(getRandom(MINVALUE, MAXVALUE));
    }

    /**
     * Вывод массива на экран в информационный блок
     */
    INFOBLOCK.insertAdjacentHTML(
      "afterEnd",
      `<div class="info__array">Отсортируем массив:  [${array}]</div>`
    );

    /**
     * Отрисовка элементов
     */
    for (let i = 0; i < LENGTHARRAY; i++) {
      createBubble(array[i]);
    }

    // Обработчик клика кнопки запуска
    buttonStartSort.addEventListener("click", bubbleSort);
    // Обработчик для кнопки "быстро"
    quickMode.addEventListener("click", function () {
      animationSpeed = "quick";
      time = QUICKLY;
    });
    // Обработчик для кнопки "средне"
    normallyMode.addEventListener("click", function () {
      animationSpeed = "normally";
      time = NORMALLY;
    });
    // Обработчик для кнопки "медленно"
    slowlyMode.addEventListener("click", function () {
      animationSpeed = "slowly";
      time = SLOWLY;
    });
  }

  /**
   * Генератор случайного числа
   */
  function getRandom(MINVALUE, MAXVALUE) {
    return Math.floor(Math.random() * (MAXVALUE - MINVALUE)) + MINVALUE;
  }

  /**
   *Добавление блоков - "пузырей" на страницу
   * @param {integer} num
   */
  function createBubble(num) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    MAINBLOCK.append(bubble);
    bubble.innerHTML = `<span class="number">${num}</span>`;
  }

  /**
   * Добавление соответствующих классов для "скорости" и удаление других "скоростей"
   * @param {string} speed
   */
  function changeMode(speed) {
    for (let i = 0; i < LENGTHARRAY; i++) {
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
    buttonStartSort.disabled = true;
    buttonStartSort.removeEventListener("click", bubbleSort);
    buttonStartSort.classList.add("start-disabled");

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
    buttonStartSort.disabled = false;
    buttonStartSort.classList.remove("start-disabled");
    buttonStartSort.innerHTML = "Обновить";
    buttonStartSort.addEventListener("click", refreshPage);
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
    bubbleBig.style.transform += "translate(0px, -70px)";
    await stop(time);
    bubbleBig.style.transform += "translate(80px, 0px)";
    await stop(time);
    bubbleBig.style.transform += "translate(0px, 70px)";
    bubbleSmall.style.transform += "translate(-80px, 0px)";
    bubbleBig.classList.add("down");
  }

  createAndRenderBubbleList();
});
