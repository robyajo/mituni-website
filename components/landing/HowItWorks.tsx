import {
  ArrowRight,
  ClipboardList,
  MonitorSmartphone,
  Rocket,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <MonitorSmartphone className="h-12 w-12 text-primary" />,
      title: "1. Daftar Akun",
      description:
        "Buat akun Mituni gratis hanya dalam hitungan detik. Tidak perlu kartu kredit.",
    },
    {
      icon: <ClipboardList className="h-12 w-12 text-primary" />,
      title: "2. Input Transaksi",
      description:
        "Catat pesanan masuk, pilih layanan, dan cetak struk digital untuk pelanggan.",
    },
    {
      icon: <Rocket className="h-12 w-12 text-primary" />,
      title: "3. Pantau Bisnis",
      description:
        "Lihat laporan pendapatan dan performa bisnis Anda secara real-time dari mana saja.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            Cara Kerja
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Mulai dalam 3 Langkah Mudah
          </h2>
          <p className="max-w-150 text-muted-foreground md:text-lg">
            Tidak perlu keahlian teknis. Mituni dirancang agar mudah digunakan
            oleh siapa saja.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-muted -z-10" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 bg-background p-4"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-muted bg-background shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
