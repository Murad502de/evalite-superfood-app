export const linksTop = [
  {
    iconName: 'home',
    title: 'Главная',
    name: 'home',
    to: 'home',
    active: false,
    hidden: false,
  },
  {
    iconName: 'applications',
    title: 'Заявки',
    name: 'applications',
    to: 'applications',
    active: false,
    hidden: false,
  },
];

export const linksBottom = [
  {
    iconName: 'settings',
    title: 'Настройки',
    name: 'settings',
    to: 'settings',
    active: false,
    hidden: false,
  },
  {
    iconName: 'profile',
    title: 'Профиль',
    name: 'profile',
    to: 'profile',
    active: false,
    hidden: false,
  },
  {
    iconName: 'exit',
    title: 'Выход',
    name: 'exit',
    to: 'signin',
    active: false,
    hidden: false,
  },
]

export const links = [
  ...linksTop,
  ...linksBottom,
];
