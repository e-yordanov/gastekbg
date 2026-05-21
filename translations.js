'use strict';

/* ── Hero slideshow images ── */
const HERO_IMAGES = [
    'images/hero.jpg',
    'images/hero3.jpg',
    'images/hero2.jpg',
];

/* ── Certificates (2 real licenses only) ── */
const CERTIFICATES = [
    {
        src:       'images/certificates/LicenzTN-Gastek.jpg',
        captionBg: 'Лиценз за извършване на дейности с природен газ – Технически надзор',
        captionEn: 'Licence for Activities with Natural Gas – Technical Supervision',
    },
    {
        src:       'images/certificates/Licenz_GASTEK_2013_LPG.jpg',
        captionBg: 'Лиценз за монтаж и поддръжка на инсталации за втечнен нефтен газ (ВНГ)',
        captionEn: 'Licence for Installation and Maintenance of LPG Systems',
    },
];

/* ── Completed projects (no images – styled placeholders) ── */
const PROJECTS = [
    {
        icon:    'fas fa-fire-alt',
        tagBg:   'Жилищен',
        tagEn:   'Residential',
        titleBg: 'Сградна газова инсталация на жилищна сграда с магазини',
        titleEn: 'Building gas installation of a residential building with stores',
        descBg:  'Сградна газова инсталация – 23 бр. инсталации – УПИ./п./ ХХI-176, кв. 210, м. Овча Купел, гр. София.',
        descEn:  'Building gas installation – 23 installations – lot XXI-176, block 210, Ovcha Kupel area, Sofia.',
    },
    {
        icon:    'fas fa-hospital',
        tagBg:   'Медицински',
        tagEn:   'Medical',
        titleBg: 'Котелна централа на разширение на МДЦ и МБАЛ „Каспела"',
        titleEn: 'Boiler house for the extension of MDC and MBAL "Kaspela"',
        descBg:  'Проектиране и монтаж на котелна централа за разширение на медицинско-диагностичен и лечебно-консултативен център.',
        descEn:  'Design and installation of a boiler house for the expansion of a medical diagnostic and consultative centre.',
    },
    {
        icon:    'fas fa-university',
        tagBg:   'Образование',
        tagEn:   'Education',
        titleBg: 'ВТУ „Св. св. Кирил и Методий" – гр. Велико Търново',
        titleEn: 'VTU "St. Cyril and Methodius" – Veliko Tarnovo',
        descBg:  'Проектиране и монтаж на отоплителна инсталация за нуждите на Великотърновски университет „Св. св. Кирил и Методий".',
        descEn:  'Design and installation of a heating system for the Veliko Tarnovo University "St. Cyril and Methodius".',
    },
];

const translations = {

    /* ══════════════════════════════════════
       BULGARIAN (default)
    ══════════════════════════════════════ */
    bg: {
        nav: {
            home:     'Начало',
            services: 'Услуги',
            projects: 'Проекти',
            about:    'За нас',
            contact:  'Контакти',
        },

        hero: {
            typed:    [
                'Газови инсталации',
                'Отоплителни системи',
                'Вентилация и климатизация',
                'Проектиране и монтаж',
                'Пълна правоспособност',
            ],
            title:    'Отоплителни и Газови Инсталации',
            subtitle: 'Екип от специалисти, членове на КИИП, с пълна правоспособност. Проектиране, изграждане и монтаж за сгради, жилища и предприятия.',
            cta1:     'Вижте услугите',
            cta2:     'Свържете се',
        },

        trustBar: [
            { icon: 'fas fa-certificate',      text: 'Членове на КИИП'         },
            { icon: 'fas fa-shield-alt',        text: 'Пълна правоспособност'   },
            { icon: 'fas fa-drafting-compass',  text: 'Проектиране и монтаж'    },
            { icon: 'fas fa-phone',             text: 'Безплатна консултация'   },
        ],

        services: {
            sectionLabel:    'Услуги',
            sectionTitle:    'Какво предлагаме',
            sectionSubtitle: 'Пълен спектър от услуги в областта на отоплението, газификацията, вентилацията и климатизацията.',
            items: [
                {
                    icon:  'fas fa-building',
                    color: 'blue',
                    title: 'Сгради',
                    desc:  'Проектиране, изграждане и монтаж на газови отоплителни инсталации, вентилация и климатизация в обществено-административни сгради.',
                },
                {
                    icon:  'fas fa-home',
                    color: 'flame',
                    title: 'Жилищни',
                    desc:  'Проектиране, изграждане и монтаж на газови отоплителни инсталации, вентилация и климатизация в жилищни сгради.',
                },
                {
                    icon:  'fas fa-industry',
                    color: 'blue',
                    title: 'Предприятия',
                    desc:  'Проектиране, изграждане и монтаж на газови отоплителни инсталации, вентилация и климатизация в предприятия и технологични сгради на леката промишленост.',
                },
                {
                    icon:  'fas fa-handshake',
                    color: 'flame',
                    title: 'Търговско представителство',
                    desc:  'Търговски представители на климатична, вентилационна и отоплителна техника на водещи марки: HOVAL, WEISHAUPT, VIESSMANN, DAIKIN.',
                },
            ],
        },

        stats: [
            { number: 50,  suffix: '+', label: 'Планирани проекта'        },
            { number: 120, suffix: '+', label: 'Завършени проекта'         },
            { number: 5,   suffix: '',  label: 'Правоспособни специалисти' },
            { number: 2,   suffix: '',  label: 'Офиса'                     },
        ],

        projects: {
            sectionLabel:    'Проекти',
            sectionTitle:    'Завършени проекти',
            sectionSubtitle: 'Избрани реализирани обекти от нашия екип.',
        },

        testimonials: {
            sectionLabel: 'Отзиви',
            sectionTitle: 'Мнения на клиенти',
            items: [
                {
                    text:   '„Перфектно свършена работа. Екип от професионалисти."',
                    author: 'Доволен клиент',
                },
                {
                    text:   '„Перфектни във всяко едно отношение. Изключително доволни сме от свършената работа и спазения срок."',
                    author: 'Георги Петров, Собственик на предприятие',
                },
            ],
        },

        partners: {
            sectionLabel:    'Партньори',
            sectionTitle:    'Водещи марки',
            sectionSubtitle: 'Официален търговски представител на водещи производители на отоплителна, климатична и вентилационна техника.',
            items: [
                { name: 'HOVAL',      url: null },
                { name: 'WEISHAUPT',  url: 'https://www.weishaupt.bg' },
                { name: 'VIESSMANN',  url: 'https://www.viessmann.bg' },
                { name: 'DAIKIN',     url: 'https://www.daikin.bg'    },
            ],
        },

        about: {
            sectionLabel:    'За нас',
            sectionTitle:    'За нас',
            sectionSubtitle: 'Специалисти в изграждането на уникални проекти с пълна правоспособност по КИИП.',
            p1: 'Газтек е специализирана фирма в областта на проектирането, изграждането и монтажа на газови и отоплителни инсталации. Ние сме специалисти в изграждането на уникални и изключителни проекти — нашата работа вдъхновира и ние се гордеем, че предлагаме изключително качество за водещи клиенти.',
            p2: 'Работим с обществено-административни сгради, жилищни сгради и промишлени предприятия. Предлагаме пълен цикъл — от проект до монтаж и въвеждане в експлоатация, с гарантирано качество и спазване на всички нормативни изисквания.',
            cards: [
                { icon: 'fas fa-certificate',      title: 'Членове на КИИП',      text: 'Пълна проектантска правоспособност' },
                { icon: 'fas fa-drafting-compass', title: 'Пълен цикъл',          text: 'Проект, монтаж, въвеждане в експлоатация' },
                { icon: 'fas fa-shield-alt',       title: 'Гарантирано качество', text: 'Спазване на всички нормативни изисквания' },
            ],
            certsLabel:    'Правоспособност',
            certsTitle:    'Лицензи и правоспособност',
            certsSubtitle: 'Притежаваме всички необходими лицензи и удостоверения, издадени от компетентните органи.',
            certViewHint:  'Виж',
            diplomaTitle:  'Висше образование',
            diplomaText:   'Ръководителят на фирмата притежава диплома за висше инженерно образование от Русенски университет „Ангел Кънчев", специалност в областта на топлотехниката и газовите инсталации.',
        },

        contact: {
            sectionLabel:    'Контакти',
            sectionTitle:    'Свържете се с нас',
            sectionSubtitle: 'Имате проект за изграждане, с който можем да помогнем? Отнема само няколко секунди.',
            infoCards: [
                { icon: 'fas fa-phone',          label: 'Телефон',         value: '+359 886 495 976',          href: 'tel:+359886495976'          },
                { icon: 'fas fa-envelope',        label: 'Имейл',           value: 'office@gastekbg.com',       href: 'mailto:office@gastekbg.com' },
                { icon: 'fas fa-map-marker-alt',  label: 'Адрес',           value: 'Русе, ул. Църковна независимост 18', href: null },
                { icon: 'fas fa-clock',           label: 'Работно време',   value: 'Пон–Пет: 9:00–18:00 | Съб: 9:00–12:00', href: null },
            ],
            form: {
                nameLbl:  'Вашето име',
                namePh:   'Иван Иванов',
                emailLbl: 'Имейл',
                emailPh:  'ivan@example.com',
                phoneLbl: 'Телефон',
                phonePh:  '+359 8XX XXX XXX',
                msgLbl:   'Съобщение',
                msgPh:    'Опишете накратко вашия проект...',
                submit:   'Изпрати запитване',
                success:  'Благодарим! Ще се свържем с вас скоро.',
                error:    'Грешка при изпращане. Моля опитайте отново.',
                subject:  'Запитване от gastekbg.com',
            },
        },

        footer: {
            copy:         'Всички права запазени.',
            usefulLinks:  'Полезни връзки',
            contactTitle: 'Свържете се',
        },
    },

    /* ══════════════════════════════════════
       ENGLISH
    ══════════════════════════════════════ */
    en: {
        nav: {
            home:     'Home',
            services: 'Services',
            projects: 'Projects',
            about:    'About',
            contact:  'Contact',
        },

        hero: {
            typed:    [
                'Gas Installations',
                'Heating Systems',
                'Ventilation & HVAC',
                'Design & Installation',
                'Full Competence',
            ],
            title:    'Heating and Gas Installations',
            subtitle: 'A team of specialists, KIIP members, with full professional competence. Design, construction and installation for buildings, residences and enterprises.',
            cta1:     'Our Services',
            cta2:     'Get in Touch',
        },

        trustBar: [
            { icon: 'fas fa-certificate',      text: 'KIIP Members'          },
            { icon: 'fas fa-shield-alt',        text: 'Full Competence'       },
            { icon: 'fas fa-drafting-compass',  text: 'Design & Installation' },
            { icon: 'fas fa-phone',             text: 'Free Consultation'     },
        ],

        services: {
            sectionLabel:    'Services',
            sectionTitle:    'What We Offer',
            sectionSubtitle: 'Full range of services in heating, gas, ventilation and air conditioning.',
            items: [
                {
                    icon:  'fas fa-building',
                    color: 'blue',
                    title: 'Buildings',
                    desc:  'Design, construction and installation of gas heating systems, ventilation and air conditioning in public and administrative buildings.',
                },
                {
                    icon:  'fas fa-home',
                    color: 'flame',
                    title: 'Residential',
                    desc:  'Design, construction and installation of gas heating systems, ventilation and air conditioning in residential buildings.',
                },
                {
                    icon:  'fas fa-industry',
                    color: 'blue',
                    title: 'Industrial',
                    desc:  'Design, construction and installation of gas heating systems, ventilation and air conditioning in enterprises and light industrial buildings.',
                },
                {
                    icon:  'fas fa-handshake',
                    color: 'flame',
                    title: 'Trade Representation',
                    desc:  'Authorised trade representative for leading HVAC brands: HOVAL, WEISHAUPT, VIESSMANN, DAIKIN.',
                },
            ],
        },

        stats: [
            { number: 50,  suffix: '+', label: 'Planned Projects'          },
            { number: 120, suffix: '+', label: 'Completed Projects'         },
            { number: 5,   suffix: '',  label: 'Certified Specialists'      },
            { number: 2,   suffix: '',  label: 'Offices'                    },
        ],

        projects: {
            sectionLabel:    'Projects',
            sectionTitle:    'Completed Projects',
            sectionSubtitle: 'Selected projects realised by our team.',
        },

        testimonials: {
            sectionLabel: 'Reviews',
            sectionTitle: 'Client Testimonials',
            items: [
                {
                    text:   '"Perfectly executed work. A team of true professionals."',
                    author: 'Satisfied Client',
                },
                {
                    text:   '"Perfect in every respect. We are extremely satisfied with the work done and the deadline met."',
                    author: 'Georgi Petrov, Business Owner',
                },
            ],
        },

        partners: {
            sectionLabel:    'Partners',
            sectionTitle:    'Leading Brands',
            sectionSubtitle: 'Official trade representative of leading manufacturers of heating, HVAC and ventilation equipment.',
            items: [
                { name: 'HOVAL',      url: null },
                { name: 'WEISHAUPT',  url: 'https://www.weishaupt.bg' },
                { name: 'VIESSMANN',  url: 'https://www.viessmann.bg' },
                { name: 'DAIKIN',     url: 'https://www.daikin.bg'    },
            ],
        },

        about: {
            sectionLabel:    'About',
            sectionTitle:    'About Us',
            sectionSubtitle: 'Specialists in unique engineering projects, with full KIIP competence.',
            p1: 'Gastek is a specialised company in the design, construction and installation of gas and heating systems. We are specialists in building unique and exceptional projects — our work inspires us and we take pride in delivering outstanding quality to leading clients.',
            p2: 'We work with public and administrative buildings, residential buildings and industrial enterprises. We offer a full cycle — from design to installation and commissioning, with guaranteed quality and compliance with all regulatory requirements.',
            cards: [
                { icon: 'fas fa-certificate',      title: 'KIIP Members',         text: 'Full professional design competence' },
                { icon: 'fas fa-drafting-compass', title: 'Full Cycle',            text: 'Design, installation, commissioning' },
                { icon: 'fas fa-shield-alt',       title: 'Guaranteed Quality',    text: 'Compliance with all regulatory requirements' },
            ],
            certsLabel:    'Competence',
            certsTitle:    'Licences & Competence',
            certsSubtitle: 'We hold all required licences and certificates issued by the competent authorities.',
            certViewHint:  'View',
            diplomaTitle:  'Higher Education',
            diplomaText:   'The company director holds a higher engineering degree from the University of Ruse "Angel Kanchev", specialising in heat engineering and gas installations.',
        },

        contact: {
            sectionLabel:    'Contact',
            sectionTitle:    'Get In Touch',
            sectionSubtitle: 'Have a project we can help with? It only takes a few seconds.',
            infoCards: [
                { icon: 'fas fa-phone',          label: 'Phone',         value: '+359 886 495 976',          href: 'tel:+359886495976'          },
                { icon: 'fas fa-envelope',        label: 'Email',         value: 'office@gastekbg.com',       href: 'mailto:office@gastekbg.com' },
                { icon: 'fas fa-map-marker-alt',  label: 'Address',       value: 'Ruse, 18 Tsarkovna Nezavisimost St.', href: null },
                { icon: 'fas fa-clock',           label: 'Working Hours', value: 'Mon–Fri: 9:00–18:00 | Sat: 9:00–12:00', href: null },
            ],
            form: {
                nameLbl:  'Your Name',
                namePh:   'John Smith',
                emailLbl: 'Email',
                emailPh:  'john@example.com',
                phoneLbl: 'Phone',
                phonePh:  '+359 8XX XXX XXX',
                msgLbl:   'Message',
                msgPh:    'Briefly describe your project...',
                submit:   'Send Enquiry',
                success:  'Thank you! We will get back to you shortly.',
                error:    'Sending failed. Please try again.',
                subject:  'Enquiry from gastekbg.com',
            },
        },

        footer: {
            copy:         'All rights reserved.',
            usefulLinks:  'Useful Links',
            contactTitle: 'Contact',
        },
    },
};
