export const siteConfig = {
  name: 'Фаворит ТВ/НЕТ',
  url: 'https://favorite.lviv.ua',
  personalCabinet: 'http://my.favorite.lviv.ua',

  phones: ['+38 (067) 93 610 73', '+38 (093) 93 610 73'],
  email: 'tv.net@ukr.net',
  address: '81750, м. Ходорів, вул. Шептицького, 9',
  workHours: `Пн–Пт: 8:00–17:00 (перерва 13:00–14:00)<br/>Сб: 9:00–15:00 (в телефонному режимі)<br/>Нд — вихідний`,

  social: {
    facebook: 'https://www.facebook.com/favorite.tvnet',
    viber: 'https://invite.viber.com/?g2=AQAvJjH5ZSwWSFO3Xb%2FCTluB3heLNUwyzQHSwO3d9gfbaw%2FhAXfPWyDskMkPI%2FcN',
    telegram: 'https://t.me/favoryttvnet',
  },

  payment: {
    privatbank: 'https://next.privat24.ua/payments/form/%7B%22token%22:%22d528cb2a2eba97aa53e0d9235b5d9857s8xtxq29%22%7D?lang',
    easypay: 'https://easypay.ua/ua/catalog/internet/favoryt-tvnet',
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1298.1103473362468!2d24.304825538846732!3d49.40473199285285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDnCsDI0JzE3LjAiTiAyNMKwMTgnMjIuMCJF!5e0!3m2!1suk!2sit!4v1746451524648!5m2!1suk!2sit',

  features: [
    {
      icon: 'line-md:account',
      title: 'Особистний кабінет',
      link: 'http://my.favorite.lviv.ua',
      description: "Зручний онлайн-інструмент для керування послугами вашого інтернет-з'єднання.",
    },
    {
      icon: 'iconoir:internet',
      title: 'Інтернет',
      link: '/internet',
      description: 'Дізнайтеся більше про тарифи, покриття та підключення до швидкісного інтернету.',
    },
    {
      icon: 'gravity-ui:tv',
      title: 'Телебачення',
      link: '/tv/ip',
      description: 'Обирайте тарифи з каналами, насолоджуйтесь якісним зображенням і функціями.',
    },
    {
      icon: 'material-symbols:help-outline-rounded',
      title: 'Центр підтримки',
      link: '/contact',
      description: 'Швидкі відповіді на запитання та допомога у вирішенні ваших проблем.',
    },
  ],

} as const
