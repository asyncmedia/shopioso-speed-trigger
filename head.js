if (
    document.currentScript.src.includes("shopoptimizer") &&
    (window.location.hostname.includes("jiminys.com") ||
      window.location.hostname.includes("jiminysfood.myshopify.com"))
  ) {
    var lazy_css = [];
    var lazy_js = [];
  
    function _debounce(func, delay) {
      var timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(this, arguments);
        }, delay);
      };
    }
  
    window.___mnag = "userA" + (window.___mnag1 || "") + "gent";
    window.___plt = "plat" + (window.___mnag1 || "") + "form";
  
    try {
      var a = navigator[window.___mnag];
      var e = navigator[window.___plt];
  
      window.__isPSA =
        (e.indexOf("x86_64") > -1 && a.indexOf("CrOS") < 0) ||
        a.indexOf("power") > -1 ||
        a.indexOf("rix") > -1;
      window.___mnag = "!1";
      var c = null;
    } catch (d) {
      window.__isPSA = false;
      var c = null;
      window.___mnag = "!1";
    }
  
    var imageCount = 0;
    var lazyImages = 20;
    var uLTS;
  
    if (window.__isPSA) {
      uLTS = new MutationObserver(function (mutations) {
        mutations.forEach(function (record) {
          var addedNodes = record.addedNodes;
          for (var i = 0; i < addedNodes.length; i++) {
            var node = addedNodes[i];
            if (node.nodeType === 1) {
              if (node.tagName === "IFRAME") {
                node.setAttribute("loading", "lazy");
                node.setAttribute("data-src", node.src);
                node.removeAttribute("src");
              } else if (node.tagName === "IMG") {
                if (++imageCount > lazyImages) {
                  node.setAttribute("loading", "lazy");
                }
              } else if (node.tagName === "LINK") {
                if (lazy_css.length) {
                  lazy_css.forEach(function (t) {
                    if (node.href.includes(t)) {
                      node.setAttribute("data-href", node.href);
                      node.removeAttribute("href");
                    }
                  });
                }
              } else if (node.tagName === "SCRIPT") {
                node.setAttribute("data-src", node.src);
                node.removeAttribute("src");
                node.type = "text/lazyload";
              }
            }
          }
        });
      });
    } else {
      uLTS = new MutationObserver(function (mutations) {
        mutations.forEach(function (record) {
          var addedNodes = record.addedNodes;
          for (var i = 0; i < addedNodes.length; i++) {
            var node = addedNodes[i];
            if (node.nodeType === 1) {
              if (node.tagName === "IFRAME") {
                node.setAttribute("loading", "lazy");
                node.setAttribute("data-src", node.src);
                node.removeAttribute("src");
              } else if (node.tagName === "IMG") {
                if (++imageCount > lazyImages) {
                  node.setAttribute("loading", "lazy");
                }
              } else if (node.tagName === "LINK") {
                if (lazy_css.length) {
                  lazy_css.forEach(function (t) {
                    if (node.href.includes(t)) {
                      node.setAttribute("data-href", node.href);
                      node.removeAttribute("href");
                    }
                  });
                }
              } else if (node.tagName === "SCRIPT") {
                if (lazy_js.length) {
                  lazy_js.forEach(function (t) {
                    if (node.src.includes(t)) {
                      node.setAttribute("data-src", node.src);
                      node.removeAttribute("src");
                    }
                  });
                }
                if (node.innerHTML.includes("asyncLoad")) {
                  node.innerHTML = node.innerHTML
                    .replace(
                      "if(window.attachEvent)",
                      "document.addEventListener('asyncLazyLoad', function(event){ asyncLoad(); }); if(window.attachEvent)"
                    )
                    .replaceAll(", asyncLoad", ", function() {}");
                }
                if (
                  node.innerHTML.includes("PreviewBarInjector") ||
                  node.innerHTML.includes("adminBarInjector")
                ) {
                  node.innerHTML = node.innerHTML.replace(
                    "DOMContentLoaded",
                    "loadBarInjector"
                  );
                }
              }
            }
          }
        });
      });
    }
  
    uLTS.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
  