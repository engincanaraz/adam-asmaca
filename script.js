const kelimeler = [
  {
    kelime: 'html',
    ipucu: 'Web sayfalarının iskeletini oluşturan işaretleme dili'
  },
  {
    kelime: 'css',
    ipucu: 'Web sayfalarını stilize etmek için kullanılan dil'
  },
  {
    kelime: 'flexbox',
    ipucu: 'CSS\'te esnek kutu düzeni modeli'
  },
  {
    kelime: 'grid',
    ipucu: 'CSS\'te iki boyutlu sayfa düzeni sistemi'
  },
  {
    kelime: 'react',
    ipucu: 'Facebook tarafından geliştirilen JavaScript kütüphanesi'
  },
  {
    kelime: 'vue',
    ipucu: 'Kullanımı kolay, performanslı JavaScript framework\'ü'
  },
  {
    kelime: 'angular',
    ipucu: 'Google tarafından geliştirilen TypeScript temelli framework'
  },
  {
    kelime: 'bootstrap',
    ipucu: 'Popüler CSS framework\'ü'
  },
  {
    kelime: 'tailwind',
    ipucu: 'Utility-first CSS framework\'ü'
  },
  {
    kelime: 'webpack',
    ipucu: 'Modern JavaScript uygulamaları için statik modül paketleyici'
  },
  {
    kelime: 'dom',
    ipucu: 'Belge Nesne Modeli, web sayfasının programatik temsili'
  },
  {
    kelime: 'ajax',
    ipucu: 'Asenkron JavaScript ve XML, sayfayı yenilemeden veri alma tekniği'
  },
  {
    kelime: 'api',
    ipucu: 'Uygulama Programlama Arayüzü, yazılımların birbiriyle iletişim kurma yolu'
  },
  {
    kelime: 'sass',
    ipucu: 'CSS önişlemcisi, CSS\'e değişkenler ve fonksiyonlar ekler'
  },
  {
    kelime: 'less',
    ipucu: 'CSS önişlemci dili'
  },
  {
    kelime: 'typescript',
    ipucu: 'JavaScript\'e tip güvenliği ekleyen dil'
  },
  {
    kelime: 'animasyon',
    ipucu: 'Web sayfalarındaki hareketli öğeler'
  },
  {
    kelime: 'responsive',
    ipucu: 'Farklı ekran boyutlarına uyum sağlayan tasarım'
  },
  {
    kelime: 'svg',
    ipucu: 'Ölçeklenebilir Vektör Grafiği, web\'de kullanılan grafik formatı'
  },
  {
    kelime: 'canvas',
    ipucu: 'HTML5 öğesi, JavaScript ile çizim yapılabilen alan'
  },
  {
    kelime: 'babel',
    ipucu: 'JavaScript derleyicisi, modern kodu eski tarayıcılara uyumlu hale getirir'
  },
  {
    kelime: 'npm',
    ipucu: 'Node Paket Yöneticisi, JavaScript kütüphanelerini yönetme aracı'
  },
  {
    kelime: 'git',
    ipucu: 'Dağıtık versiyon kontrol sistemi'
  },
  {
    kelime: 'mobil',
    ipucu: 'Taşınabilir cihazlar için tasarım yaklaşımı'
  },
  {
    kelime: 'tween',
    ipucu: 'İki değer arasında yumuşak geçiş sağlayan animasyon tekniği'
  }
];

const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('#wrong-letters span');
const items = document.querySelectorAll('.item');
const container = document.querySelector('.container');
const ipucuText = document.querySelector('#ipucu-text');

const randomIndex = Math.floor(Math.random() * kelimeler.length);
const secilenKelimeObjesi = kelimeler[randomIndex];
let secilenKelime = secilenKelimeObjesi.kelime;
const dogruTahminler = [];
const yanlisTahminler = [];

ipucuText.textContent = secilenKelimeObjesi.ipucu;

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
        <p class="ipucu-sonuc">İpucu: ${secilenKelimeObjesi.ipucu}</p>
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
        <p class="ipucu-sonuc">İpucu: ${secilenKelimeObjesi.ipucu}</p>
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
  const turkceKarakterler = /^[a-zçğıöşü]$/;

  if (harf.match(turkceKarakterler)) {
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
  const mobilInput = document.getElementById('mobil-input');
  const container = document.querySelector('.container');

  // Mobil cihaz kontrolü
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Container'a tıklandığında input'u aktif et
    container.addEventListener('click', () => {
      mobilInput.focus();
    });

    // Input değiştiğinde harfi kontrol et
    mobilInput.addEventListener('input', (e) => {
      const harf = e.target.value.toLowerCase();
      const turkceKarakterler = /^[a-zçğıöşü]$/;

      if (harf.match(turkceKarakterler)) {
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
      
      // Input'u temizle
      mobilInput.value = '';
    });
  }

  // Animasyonlar
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