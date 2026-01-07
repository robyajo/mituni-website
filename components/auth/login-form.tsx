"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../ui/password-input";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useOutletStore } from "@/store/useOutletStore";
import { AuthLoginValues, loginSchema } from "./schema/sch-login";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Label } from "../ui/label";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const form = useForm<AuthLoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuthData = useOutletStore((state) => state.setAuthData);

  const onSubmit = async (data: AuthLoginValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error(result.error);
        setError(result.error);
      } else {
        // Get the session data which contains the outlet_id_active
        const sessionResponse = await fetch("/api/auth/session");
        const sessionData = await sessionResponse.json();

        if (sessionData?.data?.outlet_id_active) {
          // Update the Zustand store with the outlet_id_active
          setAuthData({
            outlet_id_active: sessionData.data.outlet_id_active.toString(),
          });
        }

        toast.success("Login successful");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {error && (
          <Alert variant="destructive" className="relative">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="pr-12">{error}</AlertDescription>

            {/* Clear error button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0"
              onClick={() => setError(null)}
            >
              <span className="sr-only">Tutup</span>×
            </Button>
          </Alert>
        )}
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Masukkan email Anda"
                      className="pl-10"
                      {...field}
                      disabled={isLoading}
                      required
                      autoComplete="email"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Password <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <PasswordInput
                      id="password"
                      placeholder="Masukkan password Anda"
                      className="pl-10"
                      {...field}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Field>
            <Button
              type="submit"
              size="sm"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Masuk
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Field>
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
