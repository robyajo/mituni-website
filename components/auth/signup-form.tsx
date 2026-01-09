"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../ui/password-input";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import {
  accountSchema,
  brandSchema,
  locationSchema,
  AuthRegisterValues,
} from "./schema/sch-register";
import { useRouter } from "next/navigation";
import { useForm, useFormContext, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  MapPin,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { defineStepper } from "@stepperize/react";
import { Separator } from "@/components/ui/separator";

const { useStepper, steps, utils } = defineStepper(
  { id: "account", label: "Akun", schema: accountSchema },
  { id: "brand", label: "Brand", schema: brandSchema },
  { id: "location", label: "Lokasi", schema: locationSchema }
);

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const stepper = useStepper();

  const form = useForm<AuthRegisterValues>({
    mode: "onTouched",
    resolver: zodResolver(
      stepper.current.schema
    ) as unknown as Resolver<AuthRegisterValues>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmation_password: "",
      phone_number: "",
      name_brand: "",
      provinsi: "",
      kota: "",
      address: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (stepper.isLast) {
      setIsLoading(true);
      setError(null);
      // const _fullData = form.getValues();

      try {
        // Example registration API call
        // const response = await axios.post("/api/register", _fullData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Assuming successful registration
        toast.success("Registration successful! Please login.");
        router.push("/login");
      } catch (error: any) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        const msg =
          error?.response?.data?.message ||
          "An error occurred during registration.";
        toast.error(msg);
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col h-full p-6 md:p-8"
            >
              <div className="flex flex-col items-center gap-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Lengkapi data diri Anda untuk mendaftar
                </p>
              </div>

              {/* Stepper Indicator */}
              <nav aria-label="Checkout Steps" className="group mb-6">
                <ol className="flex items-center justify-between gap-2">
                  {stepper.all.map((step, index, array) => (
                    <li
                      key={step.id}
                      className="flex items-center gap-2 shrink-0"
                    >
                      <Button
                        type="button"
                        role="tab"
                        variant={
                          index <= currentIndex ? "default" : "secondary"
                        }
                        aria-current={
                          stepper.current.id === step.id ? "step" : undefined
                        }
                        aria-posinset={index + 1}
                        aria-setsize={steps.length}
                        aria-selected={stepper.current.id === step.id}
                        className="flex size-8 items-center justify-center rounded-full p-0"
                        onClick={async () => {
                          const valid = await form.trigger();
                          if (!valid) return;
                          if (index - currentIndex > 1) return;
                          stepper.goTo(step.id);
                        }}
                      >
                        {index + 1}
                      </Button>
                      <span className="text-xs font-medium hidden sm:block">
                        {step.label}
                      </span>
                      {index < array.length - 1 && (
                        <Separator
                          className={cn(
                            "w-8 sm:w-12 h-0.5",
                            index < currentIndex ? "bg-primary" : "bg-muted"
                          )}
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {error && (
                <Alert variant="destructive" className="relative mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="pr-12">{error}</AlertDescription>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-6 w-6 p-0"
                    onClick={() => setError(null)}
                  >
                    <span className="sr-only">Close</span>×
                  </Button>
                </Alert>
              )}

              <div className="flex-1 space-y-4">
                {stepper.switch({
                  account: () => <AccountStep isLoading={isLoading} />,
                  brand: () => <BrandStep isLoading={isLoading} />,
                  location: () => <LocationStep isLoading={isLoading} />,
                })}
              </div>

              <div className="flex justify-between gap-4 mt-8 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={stepper.prev}
                  disabled={stepper.isFirst || isLoading}
                  className={cn(stepper.isFirst && "invisible")}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {stepper.isLast ? (
                    isLoading ? (
                      <>
                        <Spinner className="mr-2" /> Registering...
                      </>
                    ) : (
                      <>
                        Register <Check className="ml-2 h-4 w-4" />
                      </>
                    )
                  ) : (
                    <>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1663789669038-ba180c8c155a?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}

function AccountStep({ isLoading }: { isLoading: boolean }) {
  const { control } = useFormContext<AuthRegisterValues>();
  return (
    <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <Label>
              Name <span className="text-red-500">*</span>
            </Label>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Full Name"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
                  placeholder="Email Address"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
                  placeholder="Password"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="confirmation_password"
        render={({ field }) => (
          <FormItem>
            <Label>
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <FormControl>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <PasswordInput
                  id="confirmation_password"
                  placeholder="Confirm Password"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function BrandStep({ isLoading }: { isLoading: boolean }) {
  const { control } = useFormContext<AuthRegisterValues>();
  return (
    <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <FormField
        control={control}
        name="name_brand"
        render={({ field }) => (
          <FormItem>
            <Label>
              Brand Name <span className="text-red-500">*</span>
            </Label>
            <FormControl>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Brand Name"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <Label>
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="08xxxxxxxxxx"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function LocationStep({ isLoading }: { isLoading: boolean }) {
  const { control } = useFormContext<AuthRegisterValues>();
  return (
    <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="provinsi"
          render={({ field }) => (
            <FormItem>
              <Label>
                Provinsi <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Provinsi"
                    className="pl-10"
                    {...field}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="kota"
          render={({ field }) => (
            <FormItem>
              <Label>
                Kota <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Kota"
                    className="pl-10"
                    {...field}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <Label>
              Address <span className="text-red-500">*</span>
            </Label>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Full Address"
                  className="pl-10"
                  {...field}
                  disabled={isLoading}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
