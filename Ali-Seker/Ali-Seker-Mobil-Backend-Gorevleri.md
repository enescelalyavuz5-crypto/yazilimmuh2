# Ali Şeker - Mobil Backend Görevleri

> **Not:** Bu proje kapsamında mobil uygulama geliştirilmemiştir. Projenin odak noktası Web Frontend ve REST API'dir. Bu nedenle mobil backend görevleri, REST API görevleriyle örtüşmekte olup `Ali-Seker-Rest-API-Gorevleri.md` dosyasında ayrıntılı dokümante edilmiştir.

**Backend Deployment Adresi:** https://yazilimmuh1-1.onrender.com

Aşağıdaki API endpoint'leri, teorik olarak mobil uygulama tarafından da tüketilebilir niteliktedir:

| Endpoint | HTTP Metodu | Açıklama |
|---|---|---|
| `/v1/exams` | GET | Sınavları listele |
| `/v1/users/{userId}/courses` | POST | Kursa katıl |
| `/v1/exams/{id}/submit` | POST | Sınav sonucu gönder |
| `/v1/users/{userId}/exam-results/{id}` | PUT | Sınav puanı güncelle |
| `/v1/users/{userId}/certificates` | GET | Sertifikaları gör |
| `/v1/users/{userId}` | DELETE | Hesabı sil |
| `/v1/lessons/{lessonId}/comments/{commentId}` | DELETE | Yorum sil |
| `/v1/ai/practice` | POST | AI ile İngilizce pratiği |
