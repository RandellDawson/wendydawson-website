function displayCopyright() {
  return '&copy;' + (new Date().getFullYear());
}

function displayPageNav() {
  document.querySelector('nav').innerHTML = `
    <ul class="sf-menu">
      <li class="first-item"><a id="nav-home" href="/">Home</a></li>
      <li><a id="nav-about" href="about">About</a></li>
      <li><a id="nav-resume" href="resume">Resume</a></li>
      <li><a id="nav-portfolio" href="portfolio">Portfolio</a></li>
      <li><a id="nav-affiliations"  href="affiliations">Affiliations</a></li>
      <li class="last-item"><a id="nav-contact" href="contact">Contact</a></li>
    </ul>
  `;
}

function addPageHeader(sitePage) {
  sitePage = sitePage || 'home';
  if (sitePage !== 'home') {
    var headerContent = `
      <div class="main">
        <div class="row-1">
          <nav></nav>
        </div>
      </div>
    `;
    var header = document.createElement('header');
    header.innerHTML = headerContent;
    mainContent.insertBefore(header, mainContent.firstChild);
  }
  displayPageNav();
  const navElem = document.getElementById('nav-' + sitePage);
  if (navElem) {
    navElem.classList.add('current');
  }
}

function addPageFooter() {
  var footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="main">
      <div class="container_12">
        <div class="wrapper">
          <div class="grid_12">
            ${displayCopyright()} WendyDawson.com <br>
          </div>
        </div>
      </div>
    </div>
  `;
  mainContent.appendChild(footer);
}

var mainContent = document.querySelector('.bg');
var sitePage = location.href.split("/").pop().replace('.html', '');
addPageHeader(sitePage);
addPageFooter();
