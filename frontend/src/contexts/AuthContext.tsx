
import * as React from 'react';
import { AuthContextType, AuthUser, UserRole } from '@/types';
import { toast } from '@/hooks/use-toast';

// Create auth context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Sample users for authentication (in a real app, these would be in a database)
const MOCK_USERS = [
  { 
    id: '1', 
    email: 'trainee@example.com', 
    password: 'password123', 
    firstName: 'John', 
    lastName: 'Doe', 
    role: UserRole.TRAINEE 
  },
  { 
    id: '2', 
    email: 'dormsupervisor@example.com', 
    password: 'password123', 
    firstName: 'Michael', 
    lastName: 'Johnson', 
    role: UserRole.DORM_SUPERVISOR,
    onShift: true 
  },
  { 
    id: '3', 
    email: 'nurse@example.com', 
    password: 'password123', 
    firstName: 'Emily', 
    lastName: 'Williams', 
    role: UserRole.NURSE,
    onShift: true 
  },
  { 
    id: '4', 
    email: 'management@example.com', 
    password: 'password123', 
    firstName: 'David', 
    lastName: 'Brown', 
    role: UserRole.MANAGEMENT 
  },
  { 
    id: '5', 
    email: 'security@example.com', 
    password: 'password123', 
    firstName: 'Robert', 
    lastName: 'Johnson', 
    role: UserRole.SECURITY 
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('dorm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email and password
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create auth user object (excluding password)
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
        onShift: foundUser.onShift, // Include onShift status if present
      };
      
      // Save user to state and localStorage
      setUser(authUser);
      localStorage.setItem('dorm_user', JSON.stringify(authUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${authUser.firstName}!`,
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (data: Partial<AuthUser>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('dorm_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dorm_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
