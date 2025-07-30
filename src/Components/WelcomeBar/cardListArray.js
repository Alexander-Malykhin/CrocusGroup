import cardImage1 from "@assets/welcome/cards/card-1.png";
import cardImage2 from "@assets/welcome/cards/card-2.png";
import cardImage3 from "@assets/welcome/cards/card-3.png";
import cardImage4 from "@assets/welcome/cards/card-4.png";
import cardImage5 from "@assets/welcome/cards/card-5.png";
import cardImage6 from "@assets/welcome/cards/card-6.png";
import cardImage7 from "@assets/welcome/cards/card-7.png";
import cardImage8 from "@assets/welcome/cards/card-8.png";

export const cardListArray = [
    {
        id: 1,
        title: 'О компании',
        image: cardImage1,
        imageClass: 'welcome__card-image-1',
        list: [
            {id: 1, text: 'Знакомство с президентом Компании', link: 'about'},
            {id: 2, text: 'Миссия', link: 'about'},
            {id: 3, text: 'Ценности', link: 'about'},
            {id: 4, text: 'Направления \nдеятельности', link: 'about'}
        ]
    },
    {
        id: 2,
        title: 'Онбординг \nнового сотрудника',
        image: cardImage2,
        imageClass: 'welcome__card-image-2',
        list: [
            {id: 1, text: '1 месяц работы'},
            {id: 2, text: '2 месяц работы'},
            {id: 3, text: '3 месяц работы'}
        ]
    },
    {
        id: 3,
        title: 'Кадровые процедуры \n и выплата зп',
        image: cardImage3,
        imageClass: 'welcome__card-image-3',
        list: [
            {id: 1, text: 'Порядок действий при выходе \nна больничный'},
            {id: 2, text: 'Порядок оформления отпуска'},
            {id: 3, text: 'График получения \nзаработной платы'}
        ]
    },
    {
        id: 4,
        title: 'Информационная безопасность',
        image: cardImage4,
        imageClass: 'welcome__card-image-4',
        list: [
            {id: 1, text: 'Парольная защита'},
            {id: 2, text: 'Интернет и электронная \nпочта'},
            {id: 3, text: 'Рабочее место'}
        ]
    },
    {
        id: 5,
        title: 'Информационные каналы компании',
        image: cardImage5,
        imageClass: 'welcome__card-image-5',
        list: [
            {id: 1, text: 'ТГ-канал CrocusTeam'},
            {id: 2, text: 'Интранет'},
            {id: 3, text: 'Сайт Компании'}
        ]
    },
    {
        id: 6,
        title: 'Бенефиты',
        image: cardImage6,
        imageClass: 'welcome__card-image-6',
        list: [
            {id: 1, text: 'Карта привилегий Crocus TEAM'},
            {id: 2, text: 'Бонусная карта Твой Дом'},
            {id: 3, text: 'Скидки по пропуску у партнеров'},
            {id: 4, text: 'Льготное приобретение \nпакета ДМС'}
        ]
    },
    {
        id: 7,
        title: 'Повседневная жизнь',
        image: cardImage7,
        imageClass: 'welcome__card-image-7',
        list: [
            {id: 1, text: 'Карта территории Крокус Сити'},
            {id: 2, text: 'Дресс-код в Компании'},
            {id: 3, text: 'Учет рабочего времени'},
            {id: 4, text: 'Обед: сколько длится, \nгде пообедать'}
        ]
    },
    {
        id: 8,
        title: 'Ключевые\nконтакты',
        image: cardImage8,
        imageClass: 'welcome__card-image-8',
        list: [
            {id: 1, text: 'Отдел подбора и адаптации'},
            {id: 2, text: 'Отдел кадров'},
            {id: 3, text: 'Отдел учета заработной платы'},
            {id: 4, text: 'Тех. поддержка'}
        ]
    }
];