# Ali Şeker - REST API Görevleri

Bu belge, Ali Şeker tarafından FluentBee projesi kapsamında geliştirilen REST API endpoint'lerinin detaylı dokümantasyonunu içermektedir. Toplamda 8 adet API metodu ve 1 adet Yapay Zeka (AI) entegrasyonu başarıyla geliştirilmiş ve sisteme entegre edilmiştir.

### 1. Sınavları Listeleme
- **Endpoint:** `GET /v1/exams`
- **Açıklama:** Veritabanındaki tüm İngilizce deneme sınavlarını liste halinde, sayfalama (pagination) özelliğiyle getirir.
- **Parametreler:** `page`, `limit`, `level` (filtreleme için).
- **Gereksinim Karşılığı:** "Sınavları Listeleme (GET API Metodu)"

### 2. Kursa Katılma
- **Endpoint:** `POST /v1/users/{userId}/courses`
- **Açıklama:** Sisteme giriş yapmış bir kullanıcının seçeceği bir kursa/seviyeye kayıt olmasını sağlar.
- **Body:** `{ "courseId": "GUID" }`
- **Gereksinim Karşılığı:** "Kursa Katılma (POST API Metodu)"

### 3. Sınav Sonucu Ekleme
- **Endpoint:** `POST /v1/users/{userId}/exam-results` (veya `POST /v1/exams/{id}/submit`)
- **Açıklama:** Kullanıcının çözdüğü soruların doğruluğunu ölçer, puanını (Score) hesaplar ve veritabanına kaydeder.
- **Gereksinim Karşılığı:** "Sınav Sonucu Ekleme (POST API Metodu)"

### 4. Sınav Puanı Güncelleme
- **Endpoint:** `PUT /v1/users/{userId}/exam-results/{examResultId}`
- **Açıklama:** Kullanıcının daha önce girdiği bir sınav sonucunu güncellemesini sağlar.
- **Gereksinim Karşılığı:** "Sınav Puanı Güncelleme (PUT API Metodu)"

### 5. Sertifikaları Görme
- **Endpoint:** `GET /v1/users/{userId}/certificates`
- **Açıklama:** Kullanıcının sınav başarısı sonucu elde ettiği dijital belgeleri getirir.
- **Gereksinim Karşılığı:** "Sertifikaları Görme (GET API Metodu)"

### 6. Kullanıcı Hesabını Silme
- **Endpoint:** `DELETE /v1/users/{userId}`
- **Açıklama:** Bir kullanıcının tüm verilerinin (hesap, sınavlar, favoriler) veritabanından kalıcı olarak temizlenmesini sağlar.
- **Gereksinim Karşılığı:** "Kullanıcı Hesabını Silme (DELETE API Metodu)"

### 7. Yorum Silme
- **Endpoint:** `DELETE /v1/lessons/{lessonId}/comments/{commentId}`
- **Açıklama:** Kullanıcının bir derse yaptığı yorumu veritabanından tamamen siler.
- **Gereksinim Karşılığı:** "Yorum Silme (DELETE API Metodu)"

### 8. Yapay Zeka (AI) ile İngilizce Pratiği (+5 Puan)
- **Endpoint:** `POST /v1/ai/practice`
- **Açıklama:** Google Gemini AI API'sini kullanarak kullanıcının yazdığı serbest İngilizce metni dilbilgisi kurallarına göre denetler. Yanlışları analiz edip HTTP 200 başarı koduyla detaylı ve JSON formatlı bir feedback döndürür.
- **Gereksinim Karşılığı:** "Yapay Zeka ile İngilizce Pratiği Yapma (+5 Puanlık Gereksinim)"
