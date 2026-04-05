using FluentBee.Api.Models;

namespace FluentBee.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Words.Any())
            {
                context.Words.AddRange(
                    new Word { Id = Guid.NewGuid(), English = "Abandon", Turkish = "Terk etmek", Level = "B2", ExampleSentence = "He abandoned his car in the snow." },
                    new Word { Id = Guid.NewGuid(), English = "Benevolent", Turkish = "İyiliksever", Level = "C1", ExampleSentence = "She was a benevolent woman, volunteering all of her free time." },
                    new Word { Id = Guid.NewGuid(), English = "Comprehensive", Turkish = "Kapsamlı", Level = "B2", ExampleSentence = "The computer comes with a comprehensive user manual." },
                    new Word { Id = Guid.NewGuid(), English = "Diligent", Turkish = "Çalışkan", Level = "B2", ExampleSentence = "He is a diligent student who always does his homework." },
                    new Word { Id = Guid.NewGuid(), English = "Eloquent", Turkish = "Güzel konuşan / Hitabeti güçlü", Level = "C1", ExampleSentence = "She made an eloquent appeal for action." },
                    new Word { Id = Guid.NewGuid(), English = "Apple", Turkish = "Elma", Level = "A1", ExampleSentence = "I eat an apple every day." },
                    new Word { Id = Guid.NewGuid(), English = "Book", Turkish = "Kitap", Level = "A1", ExampleSentence = "The book is on the table." },
                    new Word { Id = Guid.NewGuid(), English = "Computer", Turkish = "Bilgisayar", Level = "A2", ExampleSentence = "I use my computer for work." }
                );
            }

            // Eğer hiç ders yoksa veya içeriksiz dersler varsa yeniden seed et
            if (!context.Lessons.Any() || context.Lessons.Any(l => string.IsNullOrEmpty(l.Content)))
            {
                // Mevcut dersleri silmek yerine, sadece yeni içerikli versiyonlarını listeye ekle
                // Eğer ID'ler çakışacaksa silme yerine 'Update' mantığı daha iyidir
                // Ama şimdilik sadece eksik olanları ekleyelim ya da tabloyu temizleyelim (bağımlılık yoksa)
                
                try {
                    // Bağımlı verileri (ExamResults) kontrol et
                    var hasResults = context.ExamResults.Any();
                    if (!hasResults) {
                        context.Lessons.RemoveRange(context.Lessons);
                        context.SaveChanges();
                    }
                } catch { /* Ignore */ }

                if (!context.Lessons.Any())
                {
                    context.Lessons.AddRange(
                    new Lesson { Id = Guid.NewGuid(), Title = "Geniş Zaman (Simple Present Tense)", Description = "Günlük rutinlerimizi ve genel gerçekleri ifade ederken kullandığımız temel zaman kalıpları.", Level = "beginner", DurationMinutes = 15,
                        Content = "## Geniş Zaman (Simple Present Tense)\n\n### Ne Zaman Kullanılır?\n- Alışkanlıklar ve rutinler: *I wake up at 7 every day.*\n- Genel gerçekler: *The sun rises in the east.*\n- Programlar: *The train leaves at 9 AM.*\n\n### Yapı\n| Özne | Yardımcı | Fiil |\n|------|----------|------|\n| I / You / We / They | — | work, play |\n| He / She / It | — | works, plays |\n\n### Soru\n- **Do** you work here? → Yes, I **do**.\n- **Does** she drive? → No, she **doesn't**.\n\n### Olumsuz\n- I **don't** like coffee.\n- He **doesn't** watch TV.\n\n### Örnek Cümleler\n1. She **reads** a book every night.\n2. They **don't** eat meat.\n3. **Does** he speak French? Yes, he **does**.\n4. Water **boils** at 100°C.\n5. I **play** football on Sundays." },

                    new Lesson { Id = Guid.NewGuid(), Title = "Geçmiş Zaman (Past Tense)", Description = "Geçmişte yaşanmış bitmiş olayları anlatma ve irregular (düzensiz) fiillerin kullanımı.", Level = "beginner", DurationMinutes = 20,
                        Content = "## Geçmiş Zaman (Simple Past Tense)\n\n### Ne Zaman Kullanılır?\n- Geçmişte belirli bir anda tamamlanmış eylemler.\n- *I visited Paris last year.*\n\n### Regular Fiiller (Düzenli)\nFiil sonuna **-ed** eklenir:\n- work → work**ed**\n- play → play**ed**\n- visit → visit**ed**\n\n### Irregular Fiiller (Düzensiz) — Ezberle!\n| Base | Past |\n|------|------|\n| go | went |\n| eat | ate |\n| see | saw |\n| buy | bought |\n| come | came |\n\n### Yapı\n- (+) She **went** to school.\n- (-) She **didn't go** to school.\n- (?) **Did** she go to school? Yes, she **did**.\n\n### Örnek Cümleler\n1. I **ate** pizza yesterday.\n2. They **didn't watch** the game.\n3. **Did** he call you? No, he **didn't**.\n4. We **visited** our grandparents last weekend." },

                    new Lesson { Id = Guid.NewGuid(), Title = "Gelecek Zaman (Future Tense)", Description = "'Will' ve 'Going to' arasındaki kritik farklar ve gelecek planlarını ifade etme.", Level = "intermediate", DurationMinutes = 25,
                        Content = "## Gelecek Zaman (Future Tense)\n\n### Will vs Going To\n\n#### WILL — Anlık Karar / Tahmin / Söz\n- Anlık karar: *I'm thirsty. I **will** drink water.*\n- Tahmin (kanıt yok): *I think it **will** rain tomorrow.*\n- Söz: *I **will** help you.*\n\n#### GOING TO — Önceden Planlanmış / Kesin Belirti\n- Plan: *I **am going to** visit London next month.*\n- Kesin belirti: *Look at those clouds! It **is going to** rain.*\n\n### Yapı — Will\n- (+) She **will** come.\n- (-) She **won't** come.\n- (?) **Will** she come? Yes, she **will**.\n\n### Yapı — Going To\n- (+) He **is going to** study.\n- (-) He **isn't going to** study.\n- (?) **Is** he **going to** study?\n\n### Örnek Cümleler\n1. I **will** call you tonight. *(anlık karar)*\n2. We **are going to** get married next year. *(plan)*\n3. She **will** probably pass the exam. *(tahmin)*\n4. Watch out! You **are going to** fall! *(belirti)*" },

                    new Lesson { Id = Guid.NewGuid(), Title = "If Clauses (Conditionals)", Description = "Şart cümleleri. Tip 0, Tip 1, Tip 2 ve Tip 3 koşul cümlelerinin zengin örnekleri.", Level = "intermediate", DurationMinutes = 30,
                        Content = "## If Clauses (Conditionals)\n\n### Type 0 — Genel Gerçekler\n**If + Present Simple, Present Simple**\n- *If you heat water to 100°C, it boils.*\n- *If I don't sleep, I feel tired.*\n\n### Type 1 — Gerçekleşmesi Mümkün\n**If + Present Simple, Will + V1**\n- *If it rains, I **will** take an umbrella.*\n- *If she studies hard, she **will** pass.*\n\n### Type 2 — Gerçekleşmesi Zor/Hayali\n**If + Past Simple, Would + V1**\n- *If I **were** rich, I **would** travel the world.*\n- *If I **had** more time, I **would** learn piano.*\n\n> ⚠️ Type 2'de 'I/he/she/it' için **were** kullanılır!\n\n### Type 3 — Geçmişte Olmadı\n**If + Past Perfect, Would Have + V3**\n- *If she **had studied**, she **would have passed**.*\n- *If I **had known**, I **would have helped**.*\n\n### Özet Tablo\n| Type | If-clause | Main clause |\n|------|-----------|-------------|\n| 0 | Present Simple | Present Simple |\n| 1 | Present Simple | Will + V1 |\n| 2 | Past Simple | Would + V1 |\n| 3 | Past Perfect | Would have + V3 |" },

                    new Lesson { Id = Guid.NewGuid(), Title = "Passive Voice (Edilgen Yapı)", Description = "Eylemi yapanın değil de, eylemden etkilenenin vurgulandığı daha akademik ve ileri seviye cümle yapıları.", Level = "advanced", DurationMinutes = 35,
                        Content = "## Passive Voice (Edilgen Yapı)\n\n### Neden Kullanılır?\n- Eylemi yapan bilinmiyorsa: *The window was broken.*\n- Yapan önemsizse: *The report was submitted on time.*\n- Akademik/resmi bir üslup için.\n\n### Yapı\n**BE (doğru zamanda) + Past Participle (V3)**\n\n### Zaman Dönüşümleri\n| Zaman | Active | Passive |\n|-------|--------|---------|\n| Present Simple | She writes a report. | A report **is written**. |\n| Past Simple | They built the bridge. | The bridge **was built**. |\n| Future | He will send the email. | The email **will be sent**. |\n| Present Perfect | She has fixed the car. | The car **has been fixed**. |\n\n### By — Kim Tarafından?\n- *The novel **was written by** Orhan Pamuk.*\n- *The contract **was signed by** the manager.*\n\n### Örnek Cümleler\n1. English **is spoken** all over the world.\n2. The thief **was caught** by the police.\n3. The project **will be completed** next week.\n4. This building **was designed** by a famous architect.\n5. Mistakes **were made**, but lessons **were learned**." }
                );
            }

            if (!context.Exams.Any())
            {
                context.Exams.AddRange(
                    new Exam { Id = Guid.NewGuid(), Title = "A1 Temel Seviye Sertifika Sınavı", Level = "A1" },
                    new Exam { Id = Guid.NewGuid(), Title = "B1 Orta Seviye Genel Sınav", Level = "B1" },
                    new Exam { Id = Guid.NewGuid(), Title = "C1 İleri Seviye (Fluency) Değerlendirmesi", Level = "C1" }
                );
            }

            if (!context.Courses.Any())
            {
                context.Courses.AddRange(
                    new Course { Id = Guid.NewGuid(), Title = "Seyahat İçin İngilizce", Description = "Yurtdışına çıkacaklar için havaalanı, otel ve restoran diyaloglarını içeren hızlandırılmış kamp.", Level = "A2" },
                    new Course { Id = Guid.NewGuid(), Title = "İş İngilizcesi (Business English)", Description = "Toplantılar, resmi e-postalar ve mülakatlar için gerekli olan profesyonel kalıplar.", Level = "B2" },
                    new Course { Id = Guid.NewGuid(), Title = "Gramer Ustası", Description = "Bütün temel İngilizce gramer konularının bol soruyla pekiştirildiği ana eğitim modülü.", Level = "All" }
                );
            }

            context.SaveChanges();
        }
    }
}
