import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};
export default function LoginPage() {
  return <LoginForm />;
}
