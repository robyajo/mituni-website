import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Clean & Fresh Laundry",
      content:
        "Sejak pakai Mituni, pembukuan laundry saya jadi rapi banget. Nggak ada lagi uang hilang atau catatan tercecer. Mantap!",
      rating: 5,
      avatar: "/avatars/01.png",
      initials: "BS",
    },
    {
      name: "Siti Aminah",
      role: "Owner Berkah Laundry",
      content:
        "Fitur notifikasi WhatsApp-nya sangat membantu. Pelanggan senang karena tahu kapan cucian selesai tanpa harus tanya-tanya terus.",
      rating: 5,
      avatar: "/avatars/02.png",
      initials: "SA",
    },
    {
      name: "Rizky Pratama",
      role: "Manager Kiloan Express",
      content:
        "Saya bisa pantau omzet harian dari mana saja lewat HP. Sangat praktis dan membantu saya yang sering mobile.",
      rating: 4,
      avatar: "/avatars/03.png",
      initials: "RP",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Apa Kata Mereka?
          </h2>
          <p className="max-w-175 text-muted-foreground md:text-lg">
            Bergabunglah dengan ratusan pemilik laundry yang telah mempercayakan
            bisnisnya pada Mituni.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
