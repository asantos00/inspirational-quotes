import css from './style.css';

window.onload = () => {
  getLearningFromGist()
    .then(addToScreen)
}

const getLearningFromGist = () => {
  return fetch('https://api.github.com/gists/588078f617274649b46571d4b0c65740')
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Error getting gist')

        return 
      }

      return res
    })
    .then((res) => res.json())
    .catch(() => getFromLocalStorage())
    .then((res) => saveToLocalStorage(res))
    .then((res) => res.files['inspirational-quotes'].content.split('\n'))
}

const addToScreen = (sentence) => {
  const { phrase, author, note } = getFormatted(sentence);

  document.getElementById('quote').innerHTML = phrase;
  document.getElementById('author').innerHTML = author;
  note ? document.getElementById('note').innerHTML = note : null;
}

const getFormatted = (lines) => {
  const lineNumber = getRandomFromMinMax(0, lines.length - 1);
  const [phrase, author, note] = lines[lineNumber].split('|');

  return { phrase, author, note };
}

const getRandomFromMinMax = (min, max) => {
    return parseInt(Math.random() * (max - min) + min, 10);
}

const saveToLocalStorage = (response) => {
  localStorage.setItem('inspirational-quotes', JSON.stringify(response));

  return response
}

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('inspirational-quotes'));
}
