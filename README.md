# LingoLearn (İngilizce Öğrenme Platformu)

Bu proje, Yazılım Mühendisliği dersi kapsamında geliştirilmiş bir İngilizce öğrenme ve pratik yapma platformudur. Sistem, öğrencilerin online olarak İngilizce eğitimleri almasını, kelime dağarcığını geliştirmesini, kendilerini test etmelerini ve yapay zeka destekli dilbilgisi geri bildirimleri almasını sağlamaktadır.

## Kullanılan Teknolojiler
- **Frontend / Web Arayüzü:** Next.js
- **Backend / Sunucu:** .NET Core API
- **Veritabanı:** İlişkisel Veritabanı
- **Yapay Zeka:** OpenAI API / Gemini API

## Genel Konsept
LingoLearn, kullanıcıların seviyelerine uygun İngilizce dersleri alabildiği, kelime listeleri oluşturabildiği, sınavlarla kendilerini test edebildiği ve yapay zeka destekli İngilizce pratiği yapabildiği modern bir web platformudur.

## Gereksinim Analizi

Projemizdeki fonksiyonel gereksinimler, proje ekibi tarafından paylaşılmıştır. Sistem genelinde toplam **16 adet** temel fonksiyonel gereksinim belirlenmiştir:

### Enes Celal Yavuz Tarafından Üstlenilen Gereksinimler
1. **Öğrenci Kayıt Olma** (POST API Metodu): Sisteme yeni bir kullanıcı hesabının oluşturulması.
2. **Profil Güncelleme** (PUT API Metodu): Kullanıcının kendi ad, soyad ve şifre gibi kişisel bilgilerini değiştirmesi.
3. **Kelimeleri Listeleme** (GET API Metodu): Sistemdeki tüm İngilizce kelimelerin Türkçe anlamlarıyla birlikte liste halinde ekrana getirilmesi.
4. **Kelime Silme** (DELETE API Metodu): Kullanıcının kendi özel çalışma listesinden artık istemediği kelimeleri çıkarması.
5. **Dersleri Listeleme** (GET API Metodu): İngilizce seviyelerine göre hazırlanmış ders modüllerinin seviye bazlı gösterilmesi.
6. **Çalışma Hedefi Güncelleme** (PUT API Metodu): Kullanıcının uygulama üzerinde belirlediği günlük hedef çalışma süresini yeniden ayarlaması.
7. **Favori Kelime Ekleme** (POST API Metodu): Öğrencinin çalışma listesine yepyeni bir İngilizce kelime kaydetmesi.
8. **Öğrenme İstatistiklerini Görme** (GET API Metodu): Öğrencinin kaç kelime ezberlediğine ve hangi dersleri bitirdiğine dair verilerin sunulması.

### Ali Şeker Tarafından Üstlenilen Gereksinimler
1. **Kursa Katılma** (POST API Metodu): Kullanıcının belirlediği bir İngilizce eğitim seviyesi kuruna kayıt olması.
2. **Sınav Sonucu Ekleme** (POST API Metodu): Çözülen İngilizce deneme sınavı puanlarının ve cevaplarının hesaba kaydedilmesi.
3. **Sınavları Listeleme** (GET API Metodu): Öğrencilerin İngilizce seviyelerini test edebilecekleri uygun sınavların dökümünün yapılması.
4. **Sınav Puanı Güncelleme** (PUT API Metodu): Kullanıcının daha önce çözdüğü bir testi yeniden çözmesi durumunda güncel puanının değiştirilmesi.
5. **Kullanıcı Hesabını Silme** (DELETE API Metodu): Kullanıcının üyelik sisteminden tüm kaydının ve ilerleme verilerinin kalıcı olarak silinmesi.
6. **Yorum Silme** (DELETE API Metodu): Kullanıcının bir İngilizce dersine veya içeriğine yaptığı değerlendirme yorumunu siteden tamamen kaldırması.
7. **Sertifikaları Görme** (GET API Metodu): Başarıyla bitirilen İngilizce eğitimlerinin dijital başarı belgelerinin kullanıcıya sunulması.
8. **Yapay Zeka ile İngilizce Pratiği Yapma (+5 Puanlık Yapay Zeka Gereksinimi)** (POST API Metodu): Kullanıcının yazdığı İngilizce cümlelerin yapay zeka tarafından incelenip hatalarının düzeltilmesi ve geri bildirim verilmesi.
