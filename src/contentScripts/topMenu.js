// eslint-disable-next-line no-undef
chrome.storage.sync.get(['input1'], (result) => {
  /**
   * Getting elemets that we need and also cloning them.
   */
  const topNav = document.querySelector('.js-sidenav-container-pjax').cloneNode(true);
  const titleOfThePage = document.querySelector('[data-pjax="#js-repo-pjax-container"]').cloneNode(true);
  /**
   *  since .pagehead-actions contains action that have ajax, we can't clone it, cause
   *  we also have to update main .v and clone .v when any action is triggered and that's a pain.
   */
  const pageheadActions = document.querySelector('.pagehead-actions');

  function checkAndSet() {
    if (window.scrollY > 160) {
      // showing out custom tag
      document.querySelector('#extmainmenu').setAttribute('class', 'extmainmenu-after');
      // we insert title of library to topNav
      topNav.insertBefore(titleOfThePage, topNav.firstChild);
      // sets scrolling styles for mainnav
      topNav.classList.add('js-sidenav-container-pjax-scrolling');
      // we did not clone it so we only chnge it's class ans set it fixed position
      pageheadActions.classList.add('pagehead-actions-scrolling');
    } else {
      // hiding custom tag
      document.querySelector('#extmainmenu').setAttribute('class', 'extmainmenu-before');
      topNav.classList.remove('js-sidenav-container-pjax-scrolling');
      pageheadActions.classList.remove('pagehead-actions-scrolling');
    }
  }
  if (!result.input1) {
    /**
     * Creating our element which we append perivious ones to it.
     * we keep this approach cause github uses Turbupages and if
     * we just wanted to show&hide above elements when page is refreshed
     * that wouldn't work.
     */
    const extMenu = document.createElement('div');
    // giving it an id so that we can access it easier in future
    extMenu.setAttribute('id', 'extmainmenu');
    // we hide out element before any action
    extMenu.classList.add('extmainmenu-before');
    // appending topNav to custom tag
    extMenu.appendChild(topNav);
    // and appending that custom tag to body of the page
    document.body.appendChild(extMenu);

    // setting proper styles for title that we cloned
    titleOfThePage.setAttribute('class', 'extension-menu-title');

    /**
     * if there is .pagehead-actoins it means that we are in
     * a page that is reposity in github. So that we don't run
     * this for every single page.
     *
     */
    if (document.querySelector('.pagehead-actions')) {
      window.addEventListener('scroll', () => {
        checkAndSet();
      });
      /**
       * Running laod event, for first time that page might load
       * in upper than what we expected.
       */
      window.addEventListener('load', () => {
        checkAndSet();
      });
    }
  }
});
