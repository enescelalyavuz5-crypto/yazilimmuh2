# Enes Celal Yavuz - Mobil Frontend Görevleri

> **Not:** Bu proje kapsamında mobil uygulama geliştirilmemiştir. Proje, modern web tarayıcıları için optimize edilmiş **responsive (mobil uyumlu)** bir web uygulaması olarak geliştirilmiştir.

**Canlı Site Adresi:** https://yazilimmuh1-sxgy.vercel.app

## Mobil Uyumluluk

Aşağıdaki ekranlar mobil cihazlarda da tam işlevsel olarak çalışmaktadır:

| Sayfa | Mobil Uyumlu mu? | Not |
|---|---|---|
| `/register` - Kayıt | ✅ Evet | Tek kolon responsive form |
| `/login` - Giriş | ✅ Evet | Tek kolon responsive form |
| `/profile` - Profil | ✅ Evet | İstatistik + Ayarlar kolonları mobilde üst üste |
| `/words` - Sözlük | ✅ Evet | 1-2-3 kolon breakpoint'li grid |
| `/lessons` - Dersler | ✅ Evet | Ders içerik okuyucu, yorum kutusu |

Tüm ekranlar `Tailwind CSS` grid ve flex sistemiyle `lg:`, `md:`, `sm:` breakpoint'ler üzerinde responsive davranır.
