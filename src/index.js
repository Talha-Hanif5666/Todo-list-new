import './style.css';

const Lists = [
  {
    description: 'Join Morning Meeting',
    completed: false,
    index: 1,
  },
  {
    description: 'Complete Market Purchase',
    completed: false,
    index: 2,
  },
  {
    description: 'Go For Playing Badminton',
    completed: false,
    index: 3,
  },
];

Lists.sort((a, b) => a.index - b.index);

const Container = document.querySelector('.list-item');

Container.innerHTML = '';

for (let i = 0; i < Lists.length; i += 1) {
  Container.innerHTML += `<li><button class="toggle"></button><p>${Lists[i].description}</p></li>`;
}