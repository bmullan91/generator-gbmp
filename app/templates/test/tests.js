;(function() {

  ///////////////////////////////////
  // phantomjs polyfills
  ///////////////////////////////////
  //click function is not on element in phantomjs
  function clickElement(el) {
    var ev = doc.createEvent("MouseEvent");
    ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
  }

  ////////////////////////////////////

  //Globals..
  var iframe = document.getElementById('Iframe');
  var DOM_ELEMS, doc, win;

  mocha.ui('bdd');
  mocha.reporter('html');
  expect = chai.expect;

  //set up listener
  iframe.onload = function init() {
    //reset the onload - preventing an infinite loop when calling reloadPage()
    iframe.onload = null;
    attachDOM();
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
  }

  ///////////////////////////////////
  //        Actual Tests           //
  ///////////////////////////////////

  describe('Dummy Test', function () {

    it("Should work!", function (done) {
      expect(1).to.be.equal(1);
      //clear page for next test
      reloadPage(done);

    });

  });

  

  ///////////////////////////////////
  //         Helpers               //
  ///////////////////////////////////

  function attachDOM() {
    //after reloadPage, the dom etc is new..
    doc = iframe.contentDocument;
    win = iframe.contentWindow;

    //cache dom elements
    DOM_ELEMS = {};

  }

  function reloadPage(done) {
    iframe.onload = function() {
      attachDOM();
      done(); 
    }
    win.location.reload();
  }

})();