import AnimatedHeader from "@/components/landing/AnimatedHeader";
import { Footer } from "@/components/landing/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatedHeader />
      {children}
      <Footer />
    </>
  );
}
