const weatherForm = document.getElementById('weather-form');
const searchInput = document.querySelector('#address-input');

const outputCard = document.getElementById('op-card');
const modfOutput = document.getElementById('modf-data');
const jsonOutput = document.getElementById('json-data');

const navs = document.getElementById('op-nav');
const [s1, s2] = navs.children;

const init = () => {
  jsonOutput.style.display = 'none';
  outputCard.style.visibility = 'hidden';
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  modfOutput.innerHTML = `<p style='text-align:center'>Loading...</p>`;
  jsonOutput.innerHTML = `<p style='text-align:center'>Loading...</p>`;
  // //for local
  // const url = `http://localhost:3000/weather?address=${searchInput.value}`;
  //for heroku
  const url = `/weather?address=${searchInput.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      jsonOutput.innerHTML = ` 
      <p><a href="${url}">${url}</a></p>
        ${JSON.stringify(data)}
      `;
      if (data.error) throw new Error(data.error);
      const feel =
        data.temperature === data.feelslike
          ? `It is <strong>${data.temperature}</strong> degrees outside and it do feels like <strong>${data.feelslike}</strong> degrees`
          : `Though it is <strong>${data.temperature}</strong> degrees outside, it feels like <strong>${data.feelslike}</strong> degrees`;

      modfOutput.innerHTML = `
      <strong>Address</strong> : ${data.address}
      <strong>Currently it is</strong> : ${data.weather} 
      ${feel}
      <strong>Location</strong> : ${data.location}
      `;
    })
    .catch((error) => {
      modfOutput.innerHTML = error;
    })
    .finally(() => {
      outputCard.style.visibility = 'visible';
    });
});

const toggleNav = () => {
  s1.children[0].classList.toggle('active');
  s2.children[0].classList.toggle('active');

  if (s1.children[0].classList.contains('active')) {
    modfOutput.style.display = 'block';
    jsonOutput.style.display = 'none';
  } else {
    modfOutput.style.display = 'none';
    jsonOutput.style.display = 'block';
  }
};

s1.addEventListener('click', toggleNav);
s2.addEventListener('click', toggleNav);

init();
