import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Apakah Mituni gratis digunakan?",
      answer:
        "Ya, kami menyediakan paket Starter yang 100% gratis selamanya untuk usaha laundry skala kecil. Anda bisa upgrade ke paket Pro kapan saja jika bisnis Anda berkembang.",
    },
    {
      question: "Apakah perlu instalasi aplikasi di komputer?",
      answer:
        "Tidak perlu. Mituni adalah aplikasi berbasis web, jadi Anda bisa mengaksesnya langsung melalui browser di laptop, tablet, atau smartphone tanpa perlu instalasi.",
    },
    {
      question: "Bagaimana cara kerja notifikasi WhatsApp?",
      answer:
        "Sistem kami terintegrasi dengan gateway WhatsApp. Ketika status pesanan berubah (misal: Selesai), sistem akan otomatis mengirim pesan template ke nomor WhatsApp pelanggan.",
    },
    {
      question: "Apakah data transaksi saya aman?",
      answer:
        "Sangat aman. Kami menggunakan enkripsi standar industri untuk melindungi data Anda. Backup data juga dilakukan secara berkala untuk mencegah kehilangan data.",
    },
    {
      question: "Bisakah saya menggunakan printer struk bluetooth?",
      answer:
        "Tentu bisa! Mituni mendukung pencetakan struk ke berbagai jenis printer thermal, termasuk printer bluetooth yang terhubung ke smartphone Anda.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Pertanyaan Umum
          </h2>
          <p className="max-w-175 text-muted-foreground md:text-lg">
            Jawaban untuk pertanyaan yang sering diajukan oleh pengguna baru.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
