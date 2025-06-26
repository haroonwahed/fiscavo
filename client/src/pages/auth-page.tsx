import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";
import { ArrowRight, Shield, CheckCircle, Euro, Calculator, FileText } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Gebruikersnaam moet minimaal 3 karakters zijn"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 karakters zijn"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Gebruikersnaam moet minimaal 3 karakters zijn"),
  email: z.string().email("Ongeldig e-mailadres"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 karakters zijn"),
  firstName: z.string().min(2, "Voornaam is verplicht"),
  lastName: z.string().min(2, "Achternaam is verplicht"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  const onLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const features = [
    {
      icon: Calculator,
      title: "BTW Automatisering",
      description: "Automatische BTW-berekeningen en aangiftes"
    },
    {
      icon: FileText,
      title: "Transactie Beheer",
      description: "Slimme categorisering van al je uitgaven"
    },
    {
      icon: Euro,
      title: "Aftrekposten Optimizer",
      description: "Maximaliseer je fiscale voordelen"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Auth Forms */}
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <Logo size="lg" className="mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welkom bij Fiscavo
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Simpel | Veilig | Accuraat
              </p>
            </div>

            <Card className="card-premium">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {activeTab === "login" ? "Inloggen" : "Account Aanmaken"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "login" 
                    ? "Log in op je Fiscavo account" 
                    : "Start je 30 dagen gratis proefperiode"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Inloggen</TabsTrigger>
                    <TabsTrigger value="register">Registreren</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <div>
                        <Label htmlFor="login-username">Gebruikersnaam</Label>
                        <Input
                          id="login-username"
                          className="input-premium"
                          {...loginForm.register("username")}
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-red-500 text-sm mt-1">
                            {loginForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="login-password">Wachtwoord</Label>
                        <Input
                          id="login-password"
                          type="password"
                          className="input-premium"
                          {...loginForm.register("password")}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Inloggen..." : "Inloggen"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Voornaam</Label>
                          <Input
                            id="firstName"
                            className="input-premium"
                            {...registerForm.register("firstName")}
                          />
                          {registerForm.formState.errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {registerForm.formState.errors.firstName.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Achternaam</Label>
                          <Input
                            id="lastName"
                            className="input-premium"
                            {...registerForm.register("lastName")}
                          />
                          {registerForm.formState.errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {registerForm.formState.errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="register-username">Gebruikersnaam</Label>
                        <Input
                          id="register-username"
                          className="input-premium"
                          {...registerForm.register("username")}
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-red-500 text-sm mt-1">
                            {registerForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="register-email">E-mailadres</Label>
                        <Input
                          id="register-email"
                          type="email"
                          className="input-premium"
                          {...registerForm.register("email")}
                        />
                        {registerForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {registerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="register-password">Wachtwoord</Label>
                        <Input
                          id="register-password"
                          type="password"
                          className="input-premium"
                          {...registerForm.register("password")}
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {registerForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Account aanmaken..." : "Start gratis proefperiode"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Door een account aan te maken ga je akkoord met onze{" "}
                <a href="/terms" className="text-blue-600 hover:underline">Algemene Voorwaarden</a>
                {" "}en{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">Privacybeleid</a>
              </p>
            </div>
          </div>

          {/* Right Column - Hero Section */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Nederlandse belastingen,<br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    volledig geautomatiseerd
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bespaar gemiddeld 15 uur per maand op administratie met onze AI-powered belastingtools.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 p-6 rounded-xl bg-gradient-premium text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-200" />
                  <div>
                    <h3 className="font-semibold text-lg">30 dagen gratis proberen</h3>
                    <p className="text-blue-100 text-sm">Geen setup kosten • Nederlandse support</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-blue-400/30 pt-4">
                  <div>
                    <div className="text-2xl font-bold">99.8%</div>
                    <div className="text-blue-100 text-xs">Nauwkeurigheid</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12K+</div>
                    <div className="text-blue-100 text-xs">Gebruikers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15u</div>
                    <div className="text-blue-100 text-xs">Besparing/maand</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}