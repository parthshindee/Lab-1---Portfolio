console.log("IT’S ALIVE!");

function $$(selector, ctx = document) {
  return Array.from(ctx.querySelectorAll(selector));
}

const pages = [
  { url: "",            title: "Home"     },
  { url: "contact/",    title: "Contact"  },
  { url: "projects/",   title: "Projects" },
  { url: "resume/",     title: "Resume"   },
  { url: "",            title: "Home"     },
  { url: "index.html",            title: "Home"     },
  { url: "contact/index.html",    title: "Contact"  },
  { url: "projects/index.html",   title: "Projects" },
  { url: "resume/index.html",     title: "Resume"   },
  { url: "https://github.com/parthshindee", title: "GitHub" }
];

const BASE_PATH = 
  (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"
    : "/website/";

const nav = document.createElement("nav");

for (let {url, title} of pages) {
  const href = url.startsWith("http")
    ? url
    : BASE_PATH + url;

  const a = document.createElement("a");
  a.href = href;
  a.textContent = title;

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add("current");
  }

  if (a.host !== location.host) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }

  nav.append(a);
}

document.body.prepend(nav);

const switcherHTML = `
  <label class="color-scheme-switcher" title="Color Scheme">
    Theme:
    <select>
      <option value="light dark">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
`;

document.body.insertAdjacentHTML('afterbegin', switcherHTML);

const select = document.querySelector('.color-scheme-switcher select');

function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
  localStorage.colorScheme = scheme;
  select.value = scheme;
}

const saved = localStorage.colorScheme;
if (saved === 'light' || saved === 'dark' || saved === 'light dark') {
  setColorScheme(saved);
} else {
  document.documentElement.style.removeProperty('color-scheme');
  select.value = 'light dark';
}

select.addEventListener('input', (e) => {
  const scheme = e.target.value;
  if (scheme === 'light' || scheme === 'dark') {
    setColorScheme(scheme);
  } else {
    document.documentElement.style.removeProperty('color-scheme');
    localStorage.removeItem('colorScheme');
  }
});