# Ali Şeker - Web Frontend Görevleri

Bu belge, Ali Şeker tarafından FluentBee projesi kapsamında geliştirilen **Web Frontend** ekranlarının ve bileşenlerinin dokümantasyonunu içermektedir.

**Frontend Deployment Adresi:** https://yazilimmuh1-sxgy.vercel.app

---

### 1. Sınavlar Sayfası (`/exams`)
- **Gereksinim Karşılığı:** "Sınavları Listeleme (GET)" ve "Sınav Sonucu Ekleme (POST)"
- Backend'den sınav listesi çekilip seviyelerine göre (A1, B1, C1) kartlar halinde listelendi.
- Kullanıcı "Start Exam" butonuna tıklayınca 5 soruluk çoktan seçmeli sınav başlar.
- Her soru için cevap seçilip "Submit" ile sınav tamamlanır, skor hesaplanır ve backend'e kaydedilir.
- %60 ve üzeri skor "GEÇTİN" mesajıyla, altında ise "Geçemedin" mesajıyla döner.
- Sınav geçilirse otomatik sertifika veritabanına işlenir ve kullanıcı profili güncellenir.

### 2. Yapay Zeka Tutor Sayfası - AI Entegrasyonu (`/ai`)
- **Gereksinim Karşılığı:** "Yapay Zeka ile İngilizce Pratiği Yapma (+5 Puan)"
- Kullanıcının girdiği İngilizce metin, Gemini AI API'sine gönderilir.
- AI, dilbilgisi hatalarını tespit ederek JSON formatında geri bildirim verir.
- Sonuç ekranda "Düzeltilmiş Hali", "Açıklama" ve "Skor" olarak gösterilir.
- Google Gemini 2.0 Flash modeli kullanılmış, backend `GeminiAiService` üzerinden tetiklenir.

### 3. Sertifika Görüntüleyici (Profile'de)
- **Gereksinim Karşılığı:** "Sertifikaları Görme (GET)"
- Kullanıcının profil sayfasında kazandığı sertifikalar altın renkli kartlar halinde listelendi.
- Her sertifikaya tıklanınca A4 boyutunda, çift çerçeveli, imzalı tam CSS sertifika ekranı açılır.
- "PDF İndir / Yazdır" butonuyla tarayıcı üzerinden PDF olarak kaydedilebilir.

### 4. Sınav Geçmişi Ekranı (Profile'de)
- **Gereksinim Karşılığı:** "Sınav Puanı Güncelleme (PUT)"
- Kullanıcı aynı sınavı birden fazla çözerse en yüksek skoru görüntülenir.
- Her sınav için "Başarılı / Başarısız" rozeti, doğru soru sayısı ve tarih gösterilir.

### 5. Kullanıcı Hesabı Yönetimi (Profile'de - Danger Zone)
- **Gereksinim Karşılığı:** "Kullanıcı Hesabını Silme (DELETE)"
- Profil sayfasında "Danger Zone" bölümünde "Delete Account" butonu mevcuttur.

### 6. Yorum Silme (Dersler Sayfasında)
- **Gereksinim Karşılığı:** "Yorum Silme (DELETE)"
- Ders ekranında kullanıcı sadece kendi yorumunu silebilir. Hover durumunda "Sil" butonu görünür hale gelir.
