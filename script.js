/* ============================================================
   DADOS DO RESTAURANTE (edite aqui para atualizar o site)
   ============================================================ */

// WhatsApp com código do país + DDD, só dígitos
const WHATSAPP_NUMBER = "5541984128009";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site do Sereia e gostaria de fazer um pedido.";

// Pratos executivos (terça à sexta)
const EXECUTIVOS = [
  { name: "Alcatra", price: "R$ 40,00" },
  { name: "Filé Angus", price: "R$ 40,00" },
  { name: "Picanha", price: "R$ 50,00" },
  { name: "Mignon", price: "R$ 50,00" }
];

// Cardápio: [nome, 1P, 2P, 3P, 4P]
const CARNES = [
  ["Picanha", 130, 170, 210, 270],
  ["Mignon", 120, 170, 210, 270],
  ["Alcatra", 80, 120, 170, 220],
  ["Filé Argentino", 80, 120, 170, 220],
  ["Carré de carneiro", 80, 120, 170, 220],
  ["Contra filé c/ osso", 100, 160, 240, 320],
  ["Costela", 70, 120, 170, 230],
  ["Maminha", 80, 100, 120, 160]
];

const MISTOS = [
  ["Picanha e Mignon", 120, 170, 210, 270],
  ["Picanha e Alcatra", 120, 170, 210, 270],
  ["Picanha e Filé Argentino", 120, 170, 210, 270],
  ["Picanha e Contrafilé c/ osso", 130, 170, 210, 270],
  ["Picanha e Carré", 120, 120, 210, 270],
  ["Alcatra e Mignon", 120, 170, 210, 270],
  ["Alcatra e Filé Argentino", 100, 120, 170, 220],
  ["Alcatra e Contrafilé c/ osso", 120, 130, 170, 220],
  ["Alcatra e Carré", 120, 120, 170, 220],
  ["Mignon e Filé Argentino", 120, 170, 210, 270],
  ["Mignon e Carré", 120, 170, 210, 270],
  ["Mignon e Contrafilé c/ osso", 130, 170, 210, 270],
  ["Filé Argentino e Contrafilé c/ osso", 120, 130, 170, 220],
  ["Filé Argentino e Carré", 100, 120, 170, 220],
  ["Contra Filé e Carré", 120, 130, 170, 220]
];

/* ============================================================
   Código do site
   ============================================================ */

const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
const hasWhats = digits.length >= 12;

function waLink(text) {
  return "https://wa.me/" + digits + "?text=" + encodeURIComponent(text);
}
function formatPhone(d) {
  const ddd = d.slice(2, 4), num = d.slice(4), cut = num.length - 4;
  return "(" + ddd + ") " + num.slice(0, cut) + "-" + num.slice(cut);
}
function brl(n) {
  return "R$ " + n.toFixed(2).replace(".", ",");
}

// Pratos executivos
const execList = document.getElementById("execList");
EXECUTIVOS.forEach(function (p) {
  const li = document.createElement("li");
  const name = document.createElement("span");
  name.textContent = p.name;
  const dots = document.createElement("span");
  dots.className = "dots";
  const price = document.createElement("span");
  price.className = "price";
  price.textContent = p.price;
  const a = document.createElement("a");
  a.textContent = "Pedir";
  a.href = "#contato";
  a.setAttribute("data-wa", "");
  a.setAttribute("data-wa-msg", "Olá! Quero pedir o prato executivo de " + p.name + ".");
  li.append(name, dots, price, a);
  execList.appendChild(li);
});

// Tabelas do cardápio
function fillTable(id, rows, itemLabel) {
  const body = document.getElementById(id);
  rows.forEach(function (r) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = r[0];
    tr.appendChild(th);
    ["1P", "2P", "3P", "4P"].forEach(function (label, i) {
      const td = document.createElement("td");
      td.setAttribute("data-label", label);
      td.textContent = brl(r[i + 1]);
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}
fillTable("carnesBody", CARNES);
fillTable("mistosBody", MISTOS);

// Links do WhatsApp
document.querySelectorAll("[data-wa]").forEach(function (el) {
  if (!hasWhats) return;
  el.href = waLink(el.getAttribute("data-wa-msg") || WHATSAPP_MESSAGE);
  el.target = "_blank";
  el.rel = "noopener";
  if (el.hasAttribute("data-wa-text")) el.textContent = formatPhone(digits);
});

// Menu mobile
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
function setMenu(open) {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
nav.querySelectorAll("a").forEach(function (l) {
  l.addEventListener("click", function () { setMenu(false); });
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") setMenu(false);
});

// Aba "Cardápio": só aparece quando o endereço termina em #cardapio
const home = document.getElementById("home");
const menuView = document.getElementById("cardapio");
const menuLink = document.querySelector('[data-view="cardapio"]');

function route() {
  const showMenu = location.hash === "#cardapio";
  home.hidden = showMenu;
  menuView.hidden = !showMenu;
  menuLink.classList.toggle("active", showMenu);
  document.title = showMenu
    ? "Cardápio | Sereia Restaurante e Churrascaria"
    : "Sereia Restaurante e Churrascaria";
  if (showMenu) {
    window.scrollTo(0, 0);
    menuView.focus({ preventScroll: true });
  } else if (location.hash.length > 1) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}
window.addEventListener("hashchange", route);
route();

document.getElementById("year").textContent = new Date().getFullYear();
