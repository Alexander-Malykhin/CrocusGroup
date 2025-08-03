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
            {id: 1, text: 'Знакомство с президентом Компании', link: 'about#company'},
            {id: 2, text: 'Миссия', link: 'about#mission'},
            {id: 3, text: 'Ценности', link: 'about#values'},
            {id: 4, text: 'Направления \nдеятельности', link: 'about#activity'}
        ]
    },
    {
        id: 2,
        title: 'Онбординг \nнового сотрудника',
        image: cardImage2,
        imageClass: 'welcome__card-image-2',
        list: [
            {id: 1, text: '1 месяц работы', link: 'onboarding'},
            {id: 2, text: '2 месяц работы', link: 'onboarding'},
            {id: 3, text: '3 месяц работы', link: 'onboarding'}
        ]
    },
    {
        id: 3,
        title: 'Кадровые процедуры \n и выплата зп',
        image: cardImage3,
        imageClass: 'welcome__card-image-3',
        list: [
            {id: 1, text: 'Порядок действий при выходе \nна больничный', link: 'personnel#actions'},
            {id: 2, text: 'Порядок оформления отпуска', link: 'personnel#chart'},
            {id: 3, text: 'График получения \nзаработной платы', link: 'personnel#vacation'},
        ]
    },
    {
        id: 4,
        title: 'Информационная безопасность',
        image: cardImage4,
        imageClass: 'welcome__card-image-4',
        list: [
            {id: 1, text: 'Парольная защита', link: 'security#passwordAndSecurity'},
            {id: 2, text: 'Интернет и электронная \nпочта', link: 'security#webAndEmail'},
            {id: 3, text: 'Рабочее место', link: 'security#workPlace'}
        ]
    },
    {
        id: 5,
        title: 'Информационные каналы компании',
        image: cardImage5,
        imageClass: 'welcome__card-image-5',
        list: [
            {id: 1, text: 'ТГ-канал CrocusTeam', link: 'informationChannel#portal',},
            {id: 2, text: 'Интранет', link: 'informationChannel#telegram'},
            {id: 3, text: 'Сайт Компании', link: 'informationChannel#webCompany',}
        ]
    },
    {
        id: 6,
        title: 'Бенефиты',
        image: cardImage6,
        imageClass: 'welcome__card-image-6',
        list: [
            {id: 1, text: 'Карта привилегий Crocus TEAM', link: 'benefits#card',},
            {id: 2, text: 'Бонусная карта Твой Дом', link: 'benefits#privilege',},
            {id: 3, text: 'Скидки по пропуску у партнеров', link: 'benefits#discount',},
            {id: 4, text: 'Льготное приобретение \nпакета ДМС', link: 'benefits#dms',}
        ]
    },
    {
        id: 7,
        title: 'Повседневная жизнь',
        image: cardImage7,
        imageClass: 'welcome__card-image-7',
        list: [
            {id: 1, text: 'Карта территории Крокус Сити',link: 'life#map'},
            {id: 2, text: 'Дресс-код в Компании',link: 'life#dressCode'},
            {id: 3, text: 'Учет рабочего времени',link: 'life#dinner'},
            {id: 4, text: 'Обед: сколько длится, \nгде пообедать',link: 'life#workTime'}
        ]
    },
    {
        id: 8,
        title: 'Ключевые\nконтакты',
        image: cardImage8,
        imageClass: 'welcome__card-image-8',
        list: [
            {id: 1, text: 'Отдел подбора и адаптации', link: 'contacts#recruitmentDepartment',},
            {id: 2, text: 'Отдел кадров', link: 'contacts#HRDepartment',},
            {id: 3, text: 'Отдел учета заработной платы', link: 'contacts#payrollDepartment',},
            {id: 4, text: 'Тех. поддержка', link: 'contacts#techSupport',}
        ]
    }
];