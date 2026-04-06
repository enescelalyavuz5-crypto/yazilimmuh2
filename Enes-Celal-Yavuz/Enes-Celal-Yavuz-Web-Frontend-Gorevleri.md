# Enes Celal Yavuz - Web Frontend Görevleri

Bu belge, Enes Celal Yavuz tarafından FluentBee projesi kapsamında geliştirilen **Web Frontend** ekranlarının ve bileşenlerinin dokümantasyonunu içermektedir.

**Frontend Deployment Adresi:** https://yazilimmuh1-sxgy.vercel.app

---

### 1. Kullanıcı Kayıt ve Giriş Sayfaları (`/register`, `/login`)
- **Gereksinim Karşılığı:** "Öğrenci Kayıt Olma (POST)"
- Glassmorphism etkili, animasyonlu kayıt ve giriş formları tasarlandı.
- Kayıt sonrası `localStorage`'a `userId`, `userName`, `userEmail` kaydedilir.
- Giriş başarısızsa react-hot-toast ile kullanıcıya hata bildirimi gösterilir.

### 2. Profil Güncelleme Sayfası (`/profile`)
- **Gereksinim Karşılığı:** "Profil Güncelleme (PUT)", "Çalışma Hedefi Güncelleme (PUT)"
- Ad, Soyad ve Günlük Çalışma Hedefi (dakika) anlık olarak güncellenebilir.
- Şifre değiştirme alanı: eski şifre doğrulama → yeni şifre kaydetme akışı.
- Profil başlığında kullanıcının veritabanındaki gerçek İngilizce seviyesi (A1, B1 vb.) gösterilir.

### 3. Sözlük Sayfası (`/words`)
- **Gereksinim Karşılığı:** "Kelimeleri Listeleme (GET)", "Favori Kelime Ekleme (POST)", "Kelime Silme (DELETE)"
- 20+ kelime kart halinde listelenir, kelime/anlam bazlı anlık arama filtresi çalışır.
- "Add to Favorites" butonuyla kelime favorilere eklenir, tekrar tıklanınca kaldırılır.
- Favori durum ikonu ve rengi anlık değişir (altın yıldız / gri yıldız).

### 4. Dersler Sayfası (`/lessons`)
- **Gereksinim Karşılığı:** "Dersleri Listeleme (GET)"
- Dersler `beginner/intermediate/advanced` seviye filtresiyle listelenir.
- Ders açıldığında Markdown içerik renderer ile zengin formatlı ders metni gösterilir.
- Ders altında Yorum bölümü: yorum yazma, yorum listeleme, kendi yorumunu silme.

### 5. Öğrenme İstatistikleri (Profile'de)
- **Gereksinim Karşılığı:** "Öğrenme İstatistiklerini Görme (GET)"
- Profil üst kısmında "Memorized Words" ve "Completed Lessons" sayaçları veritabanından çekilir.
- İstatistikler sayfa yüklendiğinde canlı olarak güncellenir.

### 6. Günlük Hedef Takip Bildirimi (Navbar)
- Kullanıcının günlük çalışma hedafi (dakika bazlı), arka planda sayılır.
- Hedefe ulaşıldığında Navbar üzerinden yeşil animasyonlu toast bildirimi gösterilir.
