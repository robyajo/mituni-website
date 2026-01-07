import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Gratis",
      description: "Untuk bisnis laundry rumahan yang baru merintis.",
      features: [
        "Mencatat hingga 50 transaksi/bulan",
        "Laporan pendapatan harian",
        "Struk digital sederhana",
        "1 Akun Pengguna",
      ],
      cta: "Mulai Gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "Rp 49.000",
      period: "/bulan",
      description: "Untuk bisnis laundry yang sedang berkembang pesat.",
      features: [
        "Transaksi tanpa batas",
        "Laporan keuangan lengkap",
        "Notifikasi WhatsApp otomatis",
        "Manajemen pelanggan",
        "Struk digital custom",
        "3 Akun Pengguna",
      ],
      cta: "Coba Pro Gratis",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Rp 99.000",
      period: "/bulan",
      description: "Solusi lengkap untuk jaringan laundry multi-outlet.",
      features: [
        "Semua fitur Pro",
        "Multi-outlet / Cabang",
        "Manajemen stok inventory",
        "Laporan laba rugi detail",
        "Prioritas support 24/7",
        "Unlimited Akun Pengguna",
      ],
      cta: "Hubungi Kami",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Pilihan Paket Harga
          </h2>
          <p className="max-w-175 text-muted-foreground md:text-lg">
            Pilih paket yang sesuai dengan kebutuhan bisnis laundry Anda. Mulai
            dari gratis, upgrade kapan saja.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col relative ${
                plan.popular ? "border-primary shadow-lg scale-105 z-10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Paling Laris
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
