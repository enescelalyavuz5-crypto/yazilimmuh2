# Ali Şeker - Gereksinim Analizi

Bu dosyada, LingoLearn (İngilizce Öğrenme Platformu) projesinde şahsım tarafından üstlenilmiş olan fonksiyonel gereksinimler yer almaktadır. Tüm gereksinimler, eylem bildiren isimlerle adlandırılmış ve teknik jargon içermeyen tanımlamalarla açıklanmıştır. Gereksinimler içerisinde 1 adet yapay zeka etkileşimli özellik bulunmaktadır.

- **Kursa Katılma** (POST API Metodu)
  - **Açıklama:** Kullanıcının belirlediği bir İngilizce eğitim seviyesi kuruna kayıt olması.
- **Sınav Sonucu Ekleme** (POST API Metodu)
  - **Açıklama:** Çözülen İngilizce deneme sınavı puanlarının ve cevaplarının hesaba kaydedilmesi.
- **Sınavları Listeleme** (GET API Metodu)
  - **Açıklama:** Öğrencilerin İngilizce seviyelerini test edebilecekleri uygun sınavların dökümünün yapılması.
- **Sınav Puanı Güncelleme** (PUT API Metodu)
  - **Açıklama:** Kullanıcının daha önce çözdüğü bir testi yeniden çözmesi durumunda güncel puanının değiştirilmesi.
- **Kullanıcı Hesabını Silme** (DELETE API Metodu)
  - **Açıklama:** Kullanıcının üyelik sisteminden tüm kaydının ve ilerleme verilerinin kalıcı olarak silinmesi.
- **Yorum Silme** (DELETE API Metodu)
  - **Açıklama:** Kullanıcının bir İngilizce dersine veya içeriğine yaptığı değerlendirme yorumunu siteden tamamen kaldırması.
- **Sertifikaları Görme** (GET API Metodu)
  - **Açıklama:** Başarıyla bitirilen İngilizce eğitimlerinin dijital başarı belgelerinin kullanıcıya sunulması.
- **Yapay Zeka ile İngilizce Pratiği Yapma (+5 Puanlık Gereksinim)** (POST API Metodu)
  - **Açıklama:** Kullanıcının yazdığı İngilizce cümlelerin yapay zeka tarafından incelenip hatalarının düzeltilmesi ve geri bildirim verilmesi.
