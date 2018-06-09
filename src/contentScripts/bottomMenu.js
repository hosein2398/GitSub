// eslint-disable-next-line no-undef
chrome.storage.sync.get(['input3'], (result) => {
  function createMenu() {
    if (document.querySelector('.numbers-summary')) {
      const ul = document.querySelector('.numbers-summary');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 160) {
          ul.classList.add('numbers-summary-scrolling');
        } else {
          ul.classList.remove('numbers-summary-scrolling');
        }
      });
    }
  }
  if (!result.input3) {
    createMenu();

    const targetNode = document.querySelector('body');
    // Options for the observer
    const config = {
      attributes: true,
      childList: true,
    };

    // Callback function to execute when mutations are observed
    const callback = function callback(mutationsList) {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          createMenu();
        }
        //  else if (mutation.type === 'attributes') {
        // }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
});
