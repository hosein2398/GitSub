// eslint-disable-next-line no-undef
chrome.storage.sync.get(['input2'], (result) => {
  if (!result.input2) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'go-to-top-extention');
    const newContent = document.createTextNode('⬆');
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv);

    newDiv.addEventListener('click', () => {
      /**
      * TODO:
      * implement this with requestAnimationFrame
      */
      let top = window.scrollY;
      const myTimeOut = setInterval(() => {
        window.scrollTo(0, top);
        top -= 60;
        if (window.scrollY === 0) {
          clearInterval(myTimeOut);
        }
      }, 5);
    });

    window.addEventListener('scroll', () => {
      const height = window.innerHeight;
      const top = window.pageYOffset;
      const ratio = top * 0.75;
      const el = document.getElementsByClassName('go-to-top-extention')[0];

      if (ratio > height) {
        el.style.opacity = 1;
      } else {
        el.style.opacity = 0;
      }
    });
  }
});
