import { GalleryVerticalEnd } from "lucide-react";

import { SignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
};
export default function SignupPage() {
  return <SignupForm />;
}
