import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  MessageSquare,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                🚀 Solusi Laundry Masa Depan
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-600 dark:to-blue-400">
                Kelola Bisnis Laundry Anda Lebih Cerdas & Profitable
              </h1>
              <p className="max-w-187.5 text-lg text-muted-foreground md:text-xl leading-relaxed">
                Mituni adalah aplikasi kasir laundry (POS) lengkap yang membantu
                Anda mengelola pesanan, keuangan, dan pelanggan dalam satu
                platform terintegrasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 min-w-50">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link href="/login">
                    Mulai Gratis Sekarang{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                  asChild
                >
                  <Link href="#features">Pelajari Fitur</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <span className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> Tanpa
                  Kartu Kredit
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> 14
                  Hari Trial Pro
                </span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-16 relative mx-auto max-w-5xl rounded-xl border bg-background/50 backdrop-blur p-2 shadow-2xl lg:mt-24 ring-1 ring-gray-900/10 dark:ring-gray-50/10">
              <div className="aspect-video overflow-hidden rounded-lg bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground font-medium text-lg">
                    Dashboard Preview Image Placeholder
                  </span>
                </div>
                {/* Replace with actual image later */}
                {/* <Image src="/dashboard-preview.png" alt="Mituni Dashboard" fill className="object-cover" /> */}
              </div>
            </div>
          </div>

          {/* Background Gradient */}
          <div className="absolute top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-background border px-3 py-1 text-sm">
                Fitur Unggulan
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Semua Kebutuhan Laundry dalam Satu Aplikasi
              </h2>
              <p className="max-w-175 text-muted-foreground md:text-lg">
                Tinggalkan cara manual. Beralihlah ke sistem digital yang
                menghemat waktu dan mencegah kebocoran keuangan.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-background border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>POS Cepat & Mudah</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Input pesanan kiloan atau satuan dengan cepat. Hitung
                    otomatis, cetak struk, dan kirim nota digital.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Laporan Real-time</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Pantau omzet, laba bersih, dan performa karyawan kapan saja.
                    Data disajikan dalam grafik yang mudah dibaca.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Notifikasi WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Kirim notifikasi otomatis ke pelanggan saat cucian diterima,
                    diproses, dan selesai. Tingkatkan kepercayaan pelanggan.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Database Pelanggan</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Kenali pelanggan setia Anda. Simpan riwayat transaksi dan
                    preferensi mereka untuk layanan yang lebih personal.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center shadow-2xl sm:px-12 xl:py-32">
              <div className="relative z-10 flex flex-col items-center gap-6">
                <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
                  Siap Mengubah Bisnis Laundry Anda?
                </h2>
                <p className="max-w-150 text-lg text-primary-foreground/90 md:text-xl">
                  Bergabunglah dengan ribuan pemilik laundry cerdas lainnya.
                  Coba Mituni gratis hari ini, tanpa risiko.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 text-base w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/login">Daftar Gratis Sekarang</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-base bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
                  >
                    Jadwalkan Demo
                  </Button>
                </div>
                <p className="text-sm text-primary-foreground/80 mt-4">
                  *Gratis selamanya untuk paket Starter. Tidak butuh kartu
                  kredit.
                </p>
              </div>

              {/* Decorative circles */}
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
