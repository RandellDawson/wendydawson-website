import contactFunctions from "./contact.js";

const pages = [
  ["home", "Home", "/"],
  ["about", "About", "/about"],
  ["resume", "Resume", "/resume"],
  ["portfolio", "Portfolio", "/portfolio"],
  ["affiliations", "Affiliations", "/affiliations"],
  ["contact", "Contact", "/contact"]
];

function pageFunctions() {
  const mainContent = document.querySelector(".bg");
  if (!mainContent) return;

  const path = window.location.pathname.split("/").filter(Boolean).pop() || "index";
  const sitePage = path.replace(/\.html$/, "") || "index";
  const isHome = sitePage === "index" || sitePage === "home";

  if (!isHome) {
    const header = document.createElement("header");
    header.innerHTML = '<div class="main"><div class="row-1"><nav aria-label="Main navigation"></nav></div></div>';
    mainContent.prepend(header);
  }

  const nav = mainContent.querySelector("header nav");
  if (nav) {
    const links = pages.map(([id, label, href], index) => {
      const active = id === (isHome ? "home" : sitePage) ? ' class="current" aria-current="page"' : "";
      const itemClass = index === 0 ? ' class="first-item"' : index === pages.length - 1 ? ' class="last-item"' : "";
      return `<li${itemClass}><a id="nav-${id}" href="${href}"${active}>${label}</a></li>`;
    }).join("");
    nav.innerHTML = `${isHome ? "" : '<span class="site-brand">Wendy Dawson</span>'}<ul class="sf-menu">${links}</ul>`;
  }

  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="main footer-inner">&copy; ${new Date().getFullYear()} WendyDawson.com</div>`;
  mainContent.appendChild(footer);

  if (sitePage === "contact") contactFunctions();
}

export default pageFunctions;
