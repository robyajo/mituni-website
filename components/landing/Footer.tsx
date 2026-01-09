import Link from "next/link";
import { WashingMachine } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <WashingMachine className="h-6 w-6 text-primary" />
              <span>Mituni</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Solusi kasir laundry modern untuk bisnis yang lebih efisien dan
              menguntungkan.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Produk</h3>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Fitur
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Harga
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Integrasi
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Perusahaan</h3>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Tentang Kami
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Karir
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Legal</h3>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privasi
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mituni. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
