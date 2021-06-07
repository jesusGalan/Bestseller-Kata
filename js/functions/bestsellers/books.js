export const bookList = [
  {
    name: 'El cielo y la tierra',
    visits: randomInt()
  },
  {
    name: 'El cielo y el infierno',
    visits: randomInt()
  },{
    name: 'El jardin del terror',
    visits: randomInt()
  },{
    name: 'Terror en el nilo',
    visits: randomInt()
  },{
    name: 'Peces en el rio',
    visits: randomInt()
  },{
    name: 'Locamente atado',
    visits: randomInt()
  },{
    name: 'Estar al dia en tecnología',
    visits: randomInt()
  },{
    name: 'A veces pienso',
    visits: randomInt()
  },{
    name: 'Ética para amador',
    visits: randomInt()
  },{
    name: 'La vida de Goethe',
    visits: randomInt()
  },{
    name: 'Los pilares de la tierra',
    visits: randomInt()
  },
  {
    name: 'Cuando fuimos los mejores',
    visits: randomInt()
  },
  {
    name: 'El futuro de las criptodivisas',
    visits: randomInt()
  }
];

function randomInt() {
  return Math.floor(Math.random() * 100);
}
