const kelompok = document.querySelectorAll('.art-strip, .food-strip, .timeline');

kelompok.forEach(function (box) {
  const items = box.querySelectorAll('.reveal');
  for (let i = 0; i < items.length; i++) {
    items[i].style.setProperty('--d', (i % 4) * 90 + 'ms');
  }
});

const pengamat = new IntersectionObserver(function (daftar, obs) {
  daftar.forEach(function (d) {
    if (d.isIntersecting) {
      d.target.classList.add('show');
      obs.unobserve(d.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) {
  pengamat.observe(el);
});

const atur = document.querySelector('.atur-latar');

if (atur) {
  const tombol = atur.querySelector('.atur-tombol');
  const panel = atur.querySelector('.atur-panel');
  const pilihan = atur.querySelectorAll('[data-tema]');
  const inputGambar = atur.querySelector('input[type="file"]');
  const root = document.documentElement;

  function pasangTema(nama) {
    root.dataset.tema = nama;
    pilihan.forEach(function (p) {
      p.classList.toggle('aktif', p.dataset.tema === nama);
    });
    try {
      localStorage.setItem('tema-latar', nama);
    } catch (e) {}
  }

  let tema = 'teluk';
  try {
    tema = localStorage.getItem('tema-latar') || 'teluk';
  } catch (e) {}
  pasangTema(tema);

  tombol.addEventListener('click', function () {
    panel.hidden = !panel.hidden;
    tombol.setAttribute('aria-expanded', String(!panel.hidden));
  });

  document.addEventListener('click', function (e) {
    if (panel.hidden || atur.contains(e.target)) return;
    panel.hidden = true;
    tombol.setAttribute('aria-expanded', 'false');
  });

  pilihan.forEach(function (p) {
    p.addEventListener('click', function () {
      pasangTema(p.dataset.tema);
    });
  });

  inputGambar.addEventListener('change', function () {
    const file = inputGambar.files[0];
    if (!file) return;
    root.style.setProperty('--gambar-latar', 'url("' + URL.createObjectURL(file) + '")');
  });

  atur.querySelector('.atur-hapus').addEventListener('click', function () {
    root.style.setProperty('--gambar-latar', 'none');
    inputGambar.value = '';
  });
}