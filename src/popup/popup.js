function nothing() {}

/**
 * When we click on the element the checked status
 * is changed immediately. this means if it was true
 * that would be false after click.
 */
function toggleInput(selector, storageName) {
  const inputBolState = document.getElementById(selector).checked;
  // doing it this so that we can use variable as key
  const preparedObj = {};
  preparedObj[storageName] = !!inputBolState;
  if (inputBolState) {
    document.getElementById(selector).checked = true;
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set(preparedObj, nothing);
  } else {
    document.getElementById(selector).checked = false;
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set(preparedObj, nothing);
  }
}

const input1 = document.getElementById('pure-toggle-1');
const input2 = document.getElementById('pure-toggle-2');
const input3 = document.getElementById('pure-toggle-3');

input1.addEventListener('change', toggleInput.bind(this, 'pure-toggle-1', 'input1'));
input2.addEventListener('change', toggleInput.bind(this, 'pure-toggle-2', 'input2'));
input3.addEventListener('change', toggleInput.bind(this, 'pure-toggle-3', 'input3'));


/**
 *  getting values from storage and
 *  assiging them to inputs ater window is loaded
 *
 */
window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  chrome.storage.sync.get(['input1', 'input2', 'input3'], (result) => {
    document.getElementById('pure-toggle-1').checked = result.input1;
    document.getElementById('pure-toggle-2').checked = result.input2;
    document.getElementById('pure-toggle-3').checked = result.input3;
  });
}, true);
