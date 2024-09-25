const dark = `body {
  background-color: #262421;
}
.the-content {
    background-color: #282828;
}
.the-content {
  color: #f8f9fa;
}
.the-content p a,
.the-content ol li a,
.the-content ul li a {
  color: #ffffff !important;
  font-weight: bold;
  text-decoration: none;
}
.the-content p a:hover,
.the-content ul li a:hover {
  text-decoration: underline;
}
footer a {
  color: #f8f9fa;
  font-weight: bold;
  text-decoration: none;
}
footer a:hover {
  text-decoration: underline;
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
.the-content {
  background-color: #f8f9fa;
}
.the-content p a,
.the-content ul li a {
  color: #282828;
  font-weight: bold;
  text-decoration: none;
}
.the-content p a:hover,
.the-content ul li a:hover {
  text-decoration: underline;
}
footer a {
  color: #4d4d4d;
  font-weight: bold;
  text-decoration: none;
}
footer a:hover {
  text-decoration: underline;
}`;

const theme = () => {
  const el = document.createElement('style');
  el.setAttribute('id', 'theme');
  el.type = 'text/css';
  if (localStorage.getItem('theme') === 'light') {
    el.innerText = light;
  } else {
    el.innerText = dark;
  }
  document.head.appendChild(el);
}

theme();
