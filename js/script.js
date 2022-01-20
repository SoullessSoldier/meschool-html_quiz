'use strict';

const main = document.querySelector('.main'),
    selection = document.querySelector('.selection'),
    mainTitle = document.querySelector('.main__title');

const getData = () => {
    const dataBase = [
        {
            "id": "01",
            "theme": "Тема 01",
            result: [
                [40, "Есть задатки, нужно развиваться!"],
                [80, "Очень хорошо, но есть проблемы"],
                [100, "Отличный результат"]
            ],
            list: [
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Правильный2', 'Неправильный1', 'Неправильный2'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопрос',
                    answer: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Правильный2', 'Неправильный1', 'Неправильный2'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопрос',
                    answer: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],                    
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Правильный2', 'Правильный3', 'Неправильный1'],
                    correct: 3,
                },
                {
                    type: 'radio',
                    question: 'Вопрос',
                    answer: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                    correct: 1,
                },
            ]
        },
        {
            "id": "02",
            "theme": "Тема 02",
            result: [
                [30, "Есть задатки, нужно развиваться!"],
                [80, "Очень хорошо, но есть проблемы"],
                [100, "Отличный результат"]
            ],
            list: [                
                {
                    type: 'radio',
                    question: 'Вопрос',
                    answer: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Правильный2', 'Неправильный1', 'Неправильный2'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопрос',
                    answer: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],                    
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Правильный2', 'Правильный3', 'Неправильный1'],
                    correct: 3,
                },
                {
                    type: 'radio',
                    question: 'Вопрос',
                    answer: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос',
                    answer: ['Правильный1', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                    correct: 1,
                },
            ]
        },
    ];
    return dataBase;
};

const hideElem = (elem) => {
    let opacity = getComputedStyle(elem).getPropertyValue('opacity');
    const animation  = () => {
        opacity -= 0.05;
        elem.style.opacity = opacity;
        if(opacity > 0) {
            requestAnimationFrame(animation);
        } else {
            elem.style.display = 'none';
        }
    };
    requestAnimationFrame(animation);
};

const renderTheme = (themes) => {
    const list = document.querySelector('.selection__list');
    list.textContent = '';

    const buttons = [];

    for (let i = 0; i < themes.length; i++){
        const li = document.createElement('li');
        li.classList.add('selection__item');
        const button = document.createElement('button');
        
        button.classList.add('selection__theme');
        button.dataset.id = themes[i].id;
        button.textContent = themes[i].theme;

        li.append(button);
        list.append(li);
        buttons.push(button);
    }
    return buttons;
};

const renderQuiz = quiz => {
    hideElem(mainTitle);
    hideElem(selection);
};

const addClick = (buttons, data) => {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const quiz = data.find(item => item.id === btn.dataset.id);
            renderQuiz(quiz);
        });
    });
}

const initQuiz = () => {
    const data = getData();

    const buttons = renderTheme(data);
    addClick(buttons, data);
};


initQuiz();

// 47.04