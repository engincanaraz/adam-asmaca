const kelimeler = [
  'javascript',
  'programlama',
  'geliştirici',
  'tasarım',
  'responsive',
  'algoritma',
  'framework',
  'veritabanı',
  'uygulama',
  'yazılım',
  'teknoloji',
  'bilgisayar',
  'internet',
  'linkedin',
  'profesyonel'
];

const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('#wrong-letters span');
const items = document.querySelectorAll('.item');
const container = document.querySelector('.container');

let secilenKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
const dogruTahminler = [];
const yanlisTahminler = [];

function kelimeyiGoster() {
  wordEl.innerHTML = `
    ${secilenKelime
      .split('')
      .map(
        harf => `
          <div class="letter">
            ${dogruTahminler.includes(harf) ? harf : ''}
          </div>
        `
      )
      .join('')}
  `;

  const letterElements = document.querySelectorAll('.letter');
  letterElements.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
  });

  const innerWord = wordEl.innerText.replace(/\n/g, '').replace(/\s/g, '');
  
  if (innerWord === secilenKelime) {
    setTimeout(() => {
      container.innerHTML = `
        <h2 class="kazandin">Tebrikler! Kazandınız! 🎉</h2>
        <p class="sonuc-mesaji">Kelime: <span class="vurgulu-kelime">${secilenKelime}</span> idi.</p>
        <button class="tekrar-oyna">Tekrar Oyna</button>
      `;
      
      konfetiEfekti();
      
      document.querySelector('.tekrar-oyna').addEventListener('click', () => {
        window.location.reload();
      });
    }, 1000);
  }
}

function yanlisTahminleriGuncelle() {
  wrongLettersEl.innerHTML = `${yanlisTahminler.join(', ')}`;

  items.forEach((item, index) => {
    const hataCount = yanlisTahminler.length;
    
    if (index < hataCount) {
      item.classList.add('visible');
    } else {
      item.classList.remove('visible');
    }
  });

  if (yanlisTahminler.length === items.length) {
    setTimeout(() => {
      container.innerHTML = `
        <h2 class="kaybettin">Üzgünüm, Kaybettiniz! 😢</h2>
        <p class="sonuc-mesaji">Kelime: <span class="vurgulu-kelime">${secilenKelime}</span> idi.</p>
        <button class="tekrar-oyna">Tekrar Oyna</button>
      `;
      
      document.querySelector('.tekrar-oyna').addEventListener('click', () => {
        window.location.reload();
      });
    }, 1000);
  }
}

function konfetiEfekti() {
  for (let i = 0; i < 150; i++) {
    const konfeti = document.createElement('div');
    konfeti.classList.add('konfeti');
    
    konfeti.style.left = Math.random() * 100 + 'vw';
    konfeti.style.animationDuration = Math.random() * 3 + 2 + 's';
    konfeti.style.opacity = Math.random();
    konfeti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    const renkler = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    konfeti.style.backgroundColor = renkler[Math.floor(Math.random() * renkler.length)];
    
    document.body.appendChild(konfeti);
    
    setTimeout(() => {
      konfeti.remove();
    }, 5000);
  }
}

window.addEventListener('keydown', e => {
  if (yanlisTahminler.length >= items.length) return;
  
  const harf = e.key.toLowerCase();
  
  if (harf.match(/^[a-z]$/)) {
    if (secilenKelime.includes(harf)) {
      if (!dogruTahminler.includes(harf)) {
        dogruTahminler.push(harf);
        kelimeyiGoster();
      }
    } else {
      if (!yanlisTahminler.includes(harf)) {
        yanlisTahminler.push(harf);
        yanlisTahminleriGuncelle();
      }
    }
  }
});

kelimeyiGoster();
yanlisTahminleriGuncelle();

document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1');
  h1.style.opacity = '0';
  h1.style.transform = 'translateY(-50px)';
  
  setTimeout(() => {
    h1.style.transition = 'opacity 1s ease, transform 1s ease';
    h1.style.opacity = '1';
    h1.style.transform = 'translateY(0)';
  }, 300);
  
  container.style.opacity = '0';
  container.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    container.style.transition = 'opacity 1s ease, transform 1s ease';
    container.style.opacity = '1';
    container.style.transform = 'scale(1)';
  }, 600);
});