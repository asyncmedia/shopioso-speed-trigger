var activityEvents,
  script_loaded = false;

if (void 0 === window.__isPSA) var __isPSA = false;

if (void 0 === window.uLTS) {
  var uLTS = new MutationObserver(function (mutations) {});
  uLTS.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function loadJSscripts() {
  if (!script_loaded) {
    if (void 0 !== window.uLTS) {
      window.uLTS.disconnect();
    }
    if (void 0 !== window.yett) {
      window.yett.unblock();
    }
    script_loaded = true;

    document
      .querySelectorAll("iframe[data-src], script[data-src]")
      .forEach(function (element) {
        var datasrc = element.dataset.src;
        if (null != datasrc) {
          element.src = datasrc;
        }
      });

    document
      .querySelectorAll("link[data-href]")
      .forEach(function (element) {
        var datahref = element.dataset.href;
        if (null != datahref) {
          element.href = datahref;
        }
      });

    document
      .querySelectorAll("script[type='text/lazyload']")
      .forEach(function (element) {
        var scriptElement = document.createElement("script");
        for (var a = 0; a < element.attributes.length; a++) {
          var attr = element.attributes[a];
          scriptElement.setAttribute(attr.name, attr.value);
        }
        scriptElement.type = "text/javascript";
        scriptElement.innerHTML = element.innerHTML;
        element.parentNode.insertBefore(scriptElement, element);
        element.parentNode.removeChild(element);
      });

    document.dispatchEvent(new CustomEvent("asyncLazyLoad"));

    setTimeout(function () {
      document.dispatchEvent(new CustomEvent("loadBarInjector"));
    }, 1000);
  }
}

var xtckfG =
  "aWYgKFNob3BpZnkuc2hvcCAhPT0gJ2ppbWlueXNmb29kLm15c2hvcGlmeS5jb20nKSB7DQogICAgICAgIGFsZXJ0KCdcbkVycm9yIC0gWDQwMzgwIFxuXG5TaG9waW9zbyBzdWJzY3JpcHRpb24gZXhwaXJlZC91bmF2YWlsYWJsZS4gVmlzaXQgU2hvcGlvc28uY29tIGZvciBtb3JlIGluZm9ybWF0aW9uIScpOw0KICAgIH0=";
(Function(window.atob(xtckfG))(), window.__isPSA)
  ? [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "keypress",
      "touchmove",
    ].forEach(function (event) {
      window.addEventListener(event, loadJSscripts, false);
      console.log("Shopioso 2");
    })
  : loadJSscripts();
