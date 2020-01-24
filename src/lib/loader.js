$(document).ready(function(){

  function loadFile(filename, filetype, scriptCode) {
    if (filetype == "js") {
      var fileref = document.createElement('script');
      fileref.setAttribute("type", "text/javascript");
      if (filename) {
        fileref.setAttribute("src", filename);
      } else {
        fileref.textContent = scriptCode;
      }
    } else if (filetype == "css") {
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    if (typeof fileref !== "undefined") {
      var parentToAppend = filetype === 'js'
        ? 'body'
        : 'head';
      document[parentToAppend].appendChild(fileref);
    }
  }

  var gtagScript = "window.dataLayer = window.dataLayer || [];";
  gtagScript += "function gtag() { dataLayer.push(arguments); }";
  gtagScript += "gtag('js', new Date());gtag('config', 'UA-115892210-1');";

  // files to add to head and body element
  [
    { src: 'css/style.css', type: 'css' },
    // { src: 'js/jquery-1.6.2.min.js', type: 'js' },
    { src: 'js/custom.js', type: 'js' },
    { src: 'https://www.googletagmanager.com/gtag/js?id=UA-115892210-1', type: 'js' },
    { src: null, type: 'js', scriptCode: gtagScript }
  ].forEach(function(file){
    loadFile(file.src, file.type, file.scriptCode);
  });
});