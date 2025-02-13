const dark = `body {
  background-color: #262421;
}
.the-page,
#consoleForm textarea {
  background-color: #282828;
}
.the-page {
  color: #f8f9fa;
}
.the-page p a,
.the-page ol li a,
.the-page ul li a {
  color: #ffffff;
}
footer a {
  color: #f8f9fa;
}
ul.nav-tabs li button[aria-selected="false"] {
  color: #fff;
}
#consoleForm textarea {
  color: #ffffff;
}`;

const light = `body {
  background-color: #dbdbdb;
}
.navbar-brand,
.navbar-brand:hover,
.navbar-brand:focus {
  color: #282828;
}
a.nav-link {
  color: #4d4d4d;
}
a.nav-link:hover,
a.nav-link:focus {
  color: #202020;
}
a.nav-link.active {
  color: #000000 !important;
}
a.nav-link.show {
  color: #404040 !important;
}
button.navbar-toggler {
  background-color: #4d4d4d;
}
.the-page,
#consoleForm textarea {
  background-color: #f8f9fa;
}
.the-page p a,
.the-page ol li a,
.the-page ul li a {
  color: #282828;
}
footer a {
  color: #4d4d4d;
}
ul.nav-tabs li button[aria-selected="false"] {
  color: #4d4d4d;
}`;

const theme = () => {
  const el = document.createElement('style');
  el.setAttribute('id', 'theme');
  el.type = 'text/css';
  el.innerText = localStorage.getItem('theme') === 'light' ? light : dark;
  document.head.appendChild(el);
}

theme();
