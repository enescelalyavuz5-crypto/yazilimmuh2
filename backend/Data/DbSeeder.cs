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

            if (!context.Lessons.Any())
            {
                context.Lessons.AddRange(
                    new Lesson { Id = Guid.NewGuid(), Title = "Geniş Zaman (Simple Present Tense)", Description = "Günlük rutinlerimizi ve genel gerçekleri ifade ederken kullandığımız temel zaman kalıpları.", Level = "beginner", DurationMinutes = 15 },
                    new Lesson { Id = Guid.NewGuid(), Title = "Geçmiş Zaman (Past Tense)", Description = "Geçmişte yaşanmış bitmiş olayları anlatma ve irregular (düzensiz) fiillerin kullanımı.", Level = "beginner", DurationMinutes = 20 },
                    new Lesson { Id = Guid.NewGuid(), Title = "Gelecek Zaman (Future Tense)", Description = "'Will' ve 'Going to' arasındaki kritik farklar ve gelecek planlarını ifade etme yöntemleri.", Level = "intermediate", DurationMinutes = 25 },
                    new Lesson { Id = Guid.NewGuid(), Title = "If Clauses (Conditionals)", Description = "Şart cümleleri. Tip 0, Tip 1, Tip 2 ve Tip 3 koşul cümlelerinin zengin örnekleri.", Level = "intermediate", DurationMinutes = 30 },
                    new Lesson { Id = Guid.NewGuid(), Title = "Passive Voice (Edilgen Yapı)", Description = "Eylemi yapanın değil de, eylemden etkilenenin vurgulandığı daha akademik ve ileri seviye cümle yapıları.", Level = "advanced", DurationMinutes = 35 }
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
