# Enes Celal Yavuz - REST API Görevleri

Bu belge, Enes Celal Yavuz tarafından FluentBee projesi kapsamında geliştirilen REST API endpoint'lerinin detaylı dokümantasyonunu içermektedir. Belirlenen 8 adet REST API endpoint'in modellemeleri, rotalandırması ve entegrasyonu Controller katmanında tamamlanmıştır.

### 1. Öğrenci Kayıt Olma
- **Endpoint:** `POST /v1/auth/register`
- **Açıklama:** Kullanıcının Ad, Soyad, Email ve Şifre bilgileri alınarak sisteme yeni bir öğrencinin eklenmesi işlemi gerçekleştirilir. Şifrelerin doğruluğu kontrol edilir ve otomatik kimlik ataması yapılır.
- **Gereksinim Karşılığı:** "Öğrenci Kayıt Olma (POST API Metodu)"

### 2. Dersleri Listeleme
- **Endpoint:** `GET /v1/lessons`
- **Açıklama:** Sistemde kayıtlı olan içerikli eğitim setlerini, sayfalama ve zorluk derecesi (level) filtresi uygulanabilecek şekilde JSON formunda döndürür.
- **Gereksinim Karşılığı:** "Dersleri Listeleme (GET API Metodu)"

### 3. Kelimeleri Listeleme
- **Endpoint:** `GET /v1/words`
- **Açıklama:** Sistemin sözlük veritabanındaki kelimelerin listelenmesi, arama yapılarak ve seviyelere (A1, B1, vb.) göre süzülerek sunulması işlemini yürütür.
- **Gereksinim Karşılığı:** "Kelimeleri Listeleme (GET API Metodu)"

### 4. Öğrenme İstatistiklerini Görme
- **Endpoint:** `GET /v1/users/{userId}/statistics`
- **Açıklama:** Kullanıcının veritabanında ezberlediği (favorilediği) kelime sayısını ve bitirdiği ders modülü sayısını tek bir JSON objesi halinde hesaplayarak sunar.
- **Gereksinim Karşılığı:** "Öğrenme İstatistiklerini Görme (GET API Metodu)"

### 5. Favori Kelime Ekleme
- **Endpoint:** `POST /v1/users/{userId}/favorite-words`
- **Açıklama:** Öğrencinin seçtiği bir kelimenin, kendi kullanıcı hesabıyla ilişkili olarak `FavoriteWords` tablosuna Foreign Key aracılığıyla kaydedilmesi.
- **Gereksinim Karşılığı:** "Favori Kelime Ekleme (POST API Metodu)"

### 6. Kelime Silme
- **Endpoint:** `DELETE /v1/users/{userId}/favorite-words/{wordId}`
- **Açıklama:** Öğrencinin daha önceden elediği İngilizce kelimeyi kendi çalışma (favori) listesinden veritabanı üzerinden kalıcı olarak kaldırması.
- **Gereksinim Karşılığı:** "Kelime Silme (DELETE API Metodu)"

### 7. Profil Güncelleme
- **Endpoint:** `PUT /v1/users/{userId}/profile`
- **Açıklama:** Kullanıcının temel ayarlar menüsünde Ad, Soyad veya Güvenlik Parolası alanlarını değiştirdiği talepleri karşılayarak veritabanında "Update" işlemini sağlar.
- **Gereksinim Karşılığı:** "Profil Güncelleme (PUT API Metodu)"

### 8. Çalışma Hedefi Güncelleme
- **Endpoint:** `PUT /v1/users/{userId}/study-goal`
- **Açıklama:** Kullanıcının profil safyasında belirlediği günlük dakika bazlı çalışma süresini güncelleyen modüldür.
- **Gereksinim Karşılığı:** "Çalışma Hedefi Güncelleme (PUT API Metodu)"
