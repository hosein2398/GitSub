/**
 * topManu
 */

chrome.storage.sync.get(['input1'], function (result) {
  if (!result.input1) {

    /**
     * Getting elemets that we need and also cloning them.
     */
    var topNav = document.querySelector('.js-sidenav-container-pjax').cloneNode(true)
    var titleOfThePage = document.querySelector('[data-pjax="#js-repo-pjax-container"]').cloneNode(true)
    //since .pagehead-actions contains action that have ajax, we can't clone it, cause 
    //we also have to update main .v and clone .v when any action is triggered and that's a pain.
    var pageheadActions = document.querySelector('.pagehead-actions')

    /**
     * Creating our element which we append perivious ones to it.
     * we keep this approach cause github uses Turbupages and if 
     * we just wanted to show&hide above elements when page is refreshed 
     * that wouldn't work.
     */
    var extMenu = document.createElement('div')
    //giving it an id so that we can access it easier in future
    extMenu.setAttribute('id', 'extmainmenu')
    //we hide out element before any action
    extMenu.classList.add('extmainmenu-before')
    //appending topNav to custom tag 
    extMenu.appendChild(topNav)
    //and appending that custom tag to body of the page
    document.body.appendChild(extMenu)

    //setting proper styles for title that we cloned
    titleOfThePage.setAttribute('class', 'extension-menu-title')

    function checkAndSet() {
      if (window.scrollY > 160) {
        //showing out custom tag
        document.querySelector('#extmainmenu').setAttribute('class', 'extmainmenu-after')
        //we insert title of library to topNav
        topNav.insertBefore(titleOfThePage, topNav.firstChild)
        //sets scrolling styles for mainnav
        topNav.classList.add('js-sidenav-container-pjax-scrolling')
        // we did not clone it so we only chnge it's class ans set it fixed position    
        pageheadActions.classList.add('pagehead-actions-scrolling')
      } else {
        //hiding custom tag
        document.querySelector('#extmainmenu').setAttribute('class', 'extmainmenu-before')
        topNav.classList.remove('js-sidenav-container-pjax-scrolling')
        pageheadActions.classList.remove('pagehead-actions-scrolling')
      }
    }

    /**
     * if there is .pagehead-actoins it means that we are in 
     * a page that is reposity in github. So that we don't run 
     * this for every single page.
     * 
     */
    if (document.querySelector('.pagehead-actions')) {
      window.addEventListener('scroll', function () {
        checkAndSet()
      })
      /**
       * Running laod event, for first time that page might load
       * in upper than what we expected.
       */
      window.addEventListener('load', function () {
        checkAndSet()
      })
    }


    var observer = new MutationObserver(function (mutations) {

      setTimeout(function () {
        // alert(4)
        // all()
        // document.querySelector('header').setAttribute('style', 'display:none')

      }, 3000)
      console.log('bravoo')

    })
    var observerConfig = {
      childList: true,
      subtree: true,
      // attributes:true
    };

    var targetNode = document.querySelector('.repository-content')
    observer.observe(targetNode, observerConfig)

  }
})

/**
 * scrollTop
 */

chrome.storage.sync.get(['input2'], function (result) {
  
  if (!result.input2) {
    var newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'go-to-top-extention')
    var newContent = document.createTextNode('⬆')
    newDiv.appendChild(newContent)
    document.body.appendChild(newDiv)

    newDiv.addEventListener('click', function () {
      /**
      TODO
      implement this with requestAnimationFrame
      */
      var top = window.scrollY
      var myTimeOut = setInterval(function () {
        window.scrollTo(0, top)
        top -= 60
        if (window.scrollY === 0) {
          clearInterval(myTimeOut)
        }
      }, 5)

    })

    window.addEventListener('scroll',function(){
      var height = window.innerHeight;
      var top = window.pageYOffset;
      var ratio = top * 0.75;
      var el = document.getElementsByClassName('go-to-top-extention')[0];

      if(ratio > height){
        el.style.opacity = 1;
      }else{
        el.style.opacity = 0;
      }
    })

  }
});


/**
 * bottomMenu
 */

// var conf = true
function s(){
  if (document.querySelector('.numbers-summary')) {
    var ul = document.querySelector('.numbers-summary')
    window.addEventListener('scroll', function () {
      if (window.scrollY > 160) {
        ul.classList.add('numbers-summary-scrolling')
      } else {
        ul.classList.remove('numbers-summary-scrolling')
      }
    })
  }
}

s()




var targetNode =document.querySelector('body')

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
            s()
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);