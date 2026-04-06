# Enes Celal Yavuz - Mobil Backend Görevleri

> **Not:** Bu proje kapsamında mobil uygulama geliştirilmemiştir. Projenin odak noktası Web Frontend ve REST API'dir. Bu nedenle mobil backend görevleri, REST API görevleriyle örtüşmekte olup `Enes-Celal-Yavuz-Rest-API-Gorevleri.md` dosyasında ayrıntılı dokümante edilmiştir.

**Backend Deployment Adresi:** https://yazilimmuh1-1.onrender.com

Aşağıdaki API endpoint'leri, teorik olarak mobil uygulama tarafından da tüketilebilir niteliktedir:

| Endpoint | HTTP Metodu | Açıklama |
|---|---|---|
| `/v1/auth/register` | POST | Öğrenci kayıt |
| `/v1/users/{userId}/profile` | PUT | Profil güncelle |
| `/v1/words` | GET | Kelimeleri listele |
| `/v1/words/{wordId}/favorite` | DELETE | Kelime sil (favoriden çıkar) |
| `/v1/lessons` | GET | Dersleri listele |
| `/v1/users/{userId}/study-goal` | PUT | Çalışma hedefi güncelle |
| `/v1/users/{userId}/favorite-words` | POST | Favori kelime ekle |
| `/v1/users/{userId}/statistics` | GET | Öğrenme istatistikleri |
