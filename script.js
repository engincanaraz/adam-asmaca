const kelimeler = [
  {
    kelime: 'javascript',
    ipucu: 'Web geliştirmede kullanılan popüler bir programlama dili'
  },
  {
    kelime: 'programlama',
    ipucu: 'Bilgisayara ne yapması gerektiğini söyleme sanatı'
  },
  {
    kelime: 'geliştirici',
    ipucu: 'Yazılım üreten kişi'
  },
  {
    kelime: 'tasarım',
    ipucu: 'Bir ürünün görsel planlaması'
  },
  {
    kelime: 'responsive',
    ipucu: 'Farklı ekran boyutlarına uyum sağlayan'
  },
  {
    kelime: 'algoritma',
    ipucu: 'Bir problemi çözmek için izlenen yol'
  },
  {
    kelime: 'framework',
    ipucu: 'Yazılım geliştirmeyi kolaylaştıran yapı'
  },
  {
    kelime: 'veritabanı',
    ipucu: 'Bilgilerin saklandığı dijital ortam'
  },
  {
    kelime: 'uygulama',
    ipucu: 'Belirli bir amacı olan yazılım'
  },
  {
    kelime: 'yazılım',
    ipucu: 'Bilgisayar programlarının genel adı'
  },
  {
    kelime: 'teknoloji',
    ipucu: 'Bilim ve mühendisliğin pratik kullanımı'
  },
  {
    kelime: 'bilgisayar',
    ipucu: 'Veri işleyen elektronik cihaz'
  },
  {
    kelime: 'internet',
    ipucu: 'Dünya çapında bilgisayar ağı'
  },
  {
    kelime: 'linkedin',
    ipucu: 'Profesyonel iş ağı platformu'
  },
  {
    kelime: 'profesyonel',
    ipucu: 'İşini en iyi şekilde yapan kişi'
  },
  {
    kelime: 'şifreleme',
    ipucu: 'Veriyi güvenli hale getirme işlemi'
  },
  {
    kelime: 'güvenlik',
    ipucu: 'Sistemleri koruma yöntemleri'
  },
  {
    kelime: 'öğrenme',
    ipucu: 'Yeni bilgiler edinme süreci'
  },
  {
    kelime: 'çözüm',
    ipucu: 'Bir sorunu giderme yolu'
  },
  {
    kelime: 'işlemci',
    ipucu: 'Bilgisayarın beyni'
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