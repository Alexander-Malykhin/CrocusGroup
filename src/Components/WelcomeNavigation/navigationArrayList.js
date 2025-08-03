export const navigationArrayList = [
    {
        id: 1,
        title: 'О компании',
        route:'about',
        list: [
            {
                id: 1,
                description: 'Знакомство с президентом Компании',
                link: 'about#company',
                hash: '#company',
            },
            {
                id: 2,
                description: 'Миссия',
                link: 'about#mission',
                hash: '#mission',
            },
            {
                id: 3,
                description: 'Ценности',
                link: 'about#values',
                hash: '#values',
            },
            {
                id: 4,
                description: 'Направления деятельности',
                link: 'about#activity',
                hash: '#activity',
            }
        ],
    },
    {
        id: 2,
        route:'onboarding',
        title: 'Онбординг нового сотрудника',
        list: [],
    },
    {
        id: 3,
        title: 'Кадровые процедуры и выплата зп',
        route: 'personnel',
        list: [
            {
                id: 1,
                description: 'Порядок действий при выходе на больничный',
                link: 'personnel#actions',
                hash: '#actions',
            },
            {
                id: 2,
                description: 'График получения заработной платы',
                link: 'personnel#chart',
                hash: '#chart',
            },
            {
                id: 3,
                description: 'Порядок оформления отпуска',
                link: 'personnel#vacation',
                hash: '#vacation',
            }
        ],
    },
    {
        id: 4,
        title: 'Информационная безопасность',
        route: 'security',
        list: [
            {
                id: 1,
                description: 'Парольная защита',
                link: 'security#passwordAndSecurity',
                hash: '#passwordAndSecurity',
            },
            {
                id: 2,
                description: 'Интернет и электронная почта',
                link: 'security#webAndEmail',
                hash: '#webAndEmail',
            },
            {
                id: 3,
                description: 'Рабочее место',
                link: 'security#workPlace',
                hash: '#workPlace',
            }
        ]
    },
    {
        id: 5,
        title: 'Информационные каналы компании',
        route: 'informationChannel',
        list: [
            {
                id: 1,
                description: 'Интранет',
                link: 'informationChannel#portal',
                hash: '#portal',
            },
            {
                id: 2,
                description: 'ТГ-канал CrocusTeam',
                link: 'informationChannel#telegram',
                hash: '#telegram',
            },
            {
                id: 3,
                description: 'Сайт Компании',
                link: 'informationChannel#webCompany',
                hash: '#webCompany',
            }
        ]
    },
    {
        id: 6,
        title: 'Бенефиты',
        route: 'benefits',
        list: [
            {
                id: 1,
                description: 'Карта привилегий Crocus TEAM',
                link: 'benefits#card',
                hash: '#card',
            },
            {
                id: 2,
                description: 'Бонусная карта Твой Дом',
                link: 'benefits#privilege',
                hash: '#privilege',
            },
            {
                id: 3,
                description: 'Скидки по пропуску у партнеров',
                link: 'benefits#discount',
                hash: '#discount',
            },
            {
                id: 4,
                description: 'Льготное приобретение пакета ДМС',
                link: 'benefits#dms',
                hash: '#dms',
            }
        ]
    },
    {
        id: 7,
        title: 'Повседневная жизнь',
        route: 'life',
        list: [
            {
                id: 1,
                description: 'Карта территории Крокус Сити',
                link: 'life#map',
                hash: '#map',
            },
            {
                id: 2,
                description: 'Дресс-код в Компании',
                link: 'life#dressCode',
                hash: '#dressCode',
            },
            {
                id: 3,
                description: 'Обед: сколько длится,где пообедать',
                link: 'life#dinner',
                hash: '#dinner',
            },
            {
                id: 4,
                description: 'Учет рабочего времени',
                link: 'life#workTime',
                hash: '#workTime',
            }
        ]
    },
    {
        id: 8,
        title: 'Ключевые контакты',
        route: 'contacts',
        list: [
            {
                id: 1,
                description: 'Отдел подбора и адаптации',
                link: 'contacts#recruitmentDepartment',
                hash: '#recruitmentDepartment',
            },
            {
                id: 2,
                description: 'Отдел кадров',
                link: 'contacts#HRDepartment',
                hash: '#HRDepartment',
            },
            {
                id: 3,
                description: 'Отдел учета заработной платы',
                link: 'contacts#payrollDepartment',
                hash: '#payrollDepartment',
            },
            {
                id: 4,
                description: 'Тех. поддержка',
                link: 'contacts#techSupport',
                hash: '#techSupport',
            }
        ]
    }
]