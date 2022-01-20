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
                    question: 'Вопрос1',
                    answers: ['Правильный1', 'Правильный2', 'Неправильный1', 'Неправильный2'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопрос2',
                    answers: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос3',
                    answers: ['Правильный1', 'Правильный2', 'Неправильный1', 'Неправильный2'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопрос4',
                    answers: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],                    
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос5',
                    answers: ['Правильный1', 'Правильный2', 'Правильный3', 'Неправильный1'],
                    correct: 3,
                },
                {
                    type: 'radio',
                    question: 'Вопрос6',
                    answers: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос7',
                    answers: ['Правильный1', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
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
                    question: 'Вопрос1',
                    answers: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос2',
                    answerss: ['Правильный1', 'Правильный2', 'Неправильный1', 'Неправильный2'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопрос3',
                    answers: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],                    
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос4',
                    answers: ['Правильный1', 'Правильный2', 'Правильный3', 'Неправильный1'],
                    correct: 3,
                },
                {
                    type: 'radio',
                    question: 'Вопрос5',
                    answers: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопрос6',
                    answers: ['Правильный1', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
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

const createAnswer = (data) => {
    const type = data.type;

    return data.answers.map(item => {
        const label = document.createElement('label');
        label.classList.add('answer');
        const input = document.createElement('input');
        input.type = type;
        input.name = 'answer';
        input.classList.add(`answer__${type}`);
        const text = document.createTextNode(item);
        label.append(input, text);
        return label; 
    });
}

const renderQuiz = quiz => {
    hideElem(mainTitle);
    hideElem(selection);
    const questionBox = document.createElement('div');
    questionBox.classList.add('main__box', 'main__box_question');
    main.append(questionBox);
    
    let questionCount = 0;
    const showQuestion = () => {
        const data = quiz.list[questionCount];
        questionCount += 1;
        questionBox.textContent = '';
        const form = document.createElement('form');
        form.classList.add('main__form_question');
        form.dataset.count = `${questionCount}/${quiz.list.length}`;

        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.classList.add('main__subtitle');
        legend.textContent = data.question;

        const answers = createAnswer(data);
        
        const button = document.createElement('button');
        button.classList.add('main__btn', 'question__next');
        button.type = 'submit';
        button.textContent = 'Подтвердить';

        fieldset.append(legend, ...answers);
        form.append(fieldset, button);
        
        questionBox.append(form);
        form.addEventListener('submit', e => {
            e.preventDefault();
            let flag = false;
            const answer = [...form.answer].map((input) => {
                if (input.checked) flag = true;
                return input.checked ? input.checked : 'false';
            });
            
            
        });
    };
    showQuestion();
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