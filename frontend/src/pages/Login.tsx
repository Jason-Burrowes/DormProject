
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Eye, EyeOff, User, Lock, LogIn, Home, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Create a schema for login validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Initialize form with validation schema
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: LoginFormValues) => {
    setError('');
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password reset email
    setTimeout(() => {
      setIsLoading(false);
      setShowForgotPassword(false);
      
      // Show success toast
      alert(`Password reset email sent to ${forgotPasswordEmail}`);
    }, 1500);
  };

  const handleDemoLogin = async (role: UserRole) => {
    let demoEmail = '';
    
    switch (role) {
      case UserRole.TRAINEE:
        demoEmail = 'trainee@example.com';
        break;
      case UserRole.DORM_SUPERVISOR:
        demoEmail = 'dormsupervisor@example.com';
        break;
      case UserRole.NURSE:
        demoEmail = 'nurse@example.com';
        break;
      case UserRole.MANAGEMENT:
        demoEmail = 'management@example.com';
        break;
      case UserRole.SECURITY:
        demoEmail = 'security@example.com';
        break;
      default:
        demoEmail = 'trainee@example.com';
    }
    
    form.setValue('email', demoEmail);
    form.setValue('password', 'password123');
    
    try {
      await login(demoEmail, 'password123');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo login failed');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-primary/5 to-primary/20">
      {/* Image Section (Left side on desktop, hidden on small mobile) */}
      <div className={`${isMobile ? 'hidden sm:flex sm:flex-col' : 'flex flex-col'} md:w-1/2 p-4 md:p-8 lg:p-12 items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm"></div>
          <div className="w-full h-full">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 h-full">
              <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/placeholder.svg" 
                  alt="Cozy dormitory" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 mt-6 sm:mt-8">
                <img 
                  src="/placeholder.svg" 
                  alt="Campus buildings" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/placeholder.svg" 
                  alt="Student lounge" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 mt-6 sm:mt-8">
                <img 
                  src="/placeholder.svg" 
                  alt="Study area" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-center mb-4 md:mb-0 max-w-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-md mb-3 md:mb-4">
            Welcome to Your <span className="text-gradient-primary">Home</span> Away From Home
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed">
            Stony Hill Heart Academy's Dorm Management System provides a comfortable and supportive environment for all residents.
          </p>
        </div>
      </div>
      
      {/* Login Form Section (Right side on desktop, full width on mobile) */}
      <div className="md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
              <span className="text-primary-foreground font-bold text-lg sm:text-xl">SHHA</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-center">Stony Hill Heart Academy</h1>
            <p className="text-muted-foreground text-center mt-1">Dorm Management System</p>
          </div>
          
          {showForgotPassword ? (
            <Card className="glass-card shadow-xl border-border/40 backdrop-blur-lg">
              <CardHeader className="space-y-1 text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">Reset Password</CardTitle>
                <CardDescription>Enter your email to receive reset instructions</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <User size={18} />
                      </div>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="your@email.com"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        required
                        className="pl-10 focus-ring"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="text-destructive text-sm px-3 py-2 bg-destructive/10 rounded-md border border-destructive/20">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-1/2"
                      onClick={() => setShowForgotPassword(false)}
                      disabled={isLoading}
                    >
                      Back to Login
                    </Button>
                    <Button type="submit" className="w-1/2" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card shadow-xl border-border/40 backdrop-blur-lg">
              <CardHeader className="space-y-1 text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to sign in</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <User size={18} />
                            </div>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="your@email.com" 
                                className="pl-10 focus-ring" 
                                autoComplete="email"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Button 
                              type="button" 
                              variant="link" 
                              className="text-xs text-muted-foreground p-0 h-auto"
                              onClick={() => setShowForgotPassword(true)}
                            >
                              Forgot password?
                            </Button>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <Lock size={18} />
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 focus-ring"
                                autoComplete="current-password"
                              />
                            </FormControl>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={toggleShowPassword}
                              >
                                {showPassword ? (
                                  <EyeOff size={16} className="text-muted-foreground" />
                                ) : (
                                  <Eye size={16} className="text-muted-foreground" />
                                )}
                                <span className="sr-only">
                                  {showPassword ? "Hide password" : "Show password"}
                                </span>
                              </Button>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {error && (
                      <div className="text-destructive text-sm px-3 py-2 bg-destructive/10 rounded-md border border-destructive/20">
                        {error}
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full group" disabled={isLoading}>
                      {isLoading ? (
                        'Signing in...'
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          Sign in
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4 border-t pt-4">
                <div className="text-sm text-muted-foreground text-center">
                  Demo Accounts:
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDemoLogin(UserRole.TRAINEE)}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    Trainee
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDemoLogin(UserRole.DORM_SUPERVISOR)}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    Dorm Supervisor
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDemoLogin(UserRole.NURSE)}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    Nurse
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDemoLogin(UserRole.MANAGEMENT)}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    Management
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDemoLogin(UserRole.SECURITY)}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    Security
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
          
          <p className="text-center text-sm text-muted-foreground mt-6 sm:mt-8">
            © {new Date().getFullYear()} Stony Hill Heart Academy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
