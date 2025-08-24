import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: 'patient' | 'doctor' | 'admin';
  profile: {
    name: string;
    age: number;
    location: string;
    nationality: string;
    bloodType: string;
    allergies: string;
    avatarUrl?: string;
    address?: string;
    emergencyContact: {
      name: string;
      relation: string;
      phone: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Valid user database with secure credentials
const VALID_USERS = {
  // Patient Account - Original Zaid records from Jordan
  'patient': {
    password: 'patient123',
    user: {
      id: 'JO-2024-00001',
      username: 'patient',
      email: 'zaid.jordan@example.com',
      phone: '+962 7 9931 1030',
      role: 'patient' as const,
      profile: {
        name: 'Zaid Omar',
        age: 21,
        location: 'Amman, Jordan',
        nationality: 'Jordanian',
        bloodType: 'A+',
        allergies: 'None',
        avatarUrl: '/hko.jpg',
        address: '123 Healthcare Street, Amman, Jordan 11181',
        emergencyContact: {
          name: 'Omar Ahmad',
          relation: 'Father',
          phone: '+962 7 9945 1838'
        }
      }
    }
  },
  
  // Doctor Account - Professional medical profile
  'doctor': {
    password: 'doctor123',
    user: {
      id: 'D001',
      username: 'doctor',
      email: 'dr.sarah@ammanmedical.com',
      phone: '+962 6 5000 0001',
      role: 'doctor' as const,
      profile: {
        name: 'Dr. Sarah Johnson',
        age: 42,
        location: 'Amman Medical Center, Jordan',
        nationality: 'Jordanian',
        bloodType: 'O+',
        allergies: 'None',
        avatarUrl: '/dok.jpg',
        address: 'Amman Medical Center, King Hussein Medical City, Amman, Jordan 11181',
        emergencyContact: {
          name: 'Medical Center Security',
          relation: 'Work',
          phone: '+962 6 5000 0000'
        }
      }
    }
  },
  
  // Admin Account - Professional administrative profile
  'admin': {
    password: 'admin123',
    user: {
      id: 'A001',
      username: 'admin',
      email: 'admin@healthguard.jo',
      phone: '+962 6 4000 0001',
      role: 'admin' as const,
      profile: {
        name: 'System Administrator',
        age: 35,
        location: 'HealthGuard HQ, Amman',
        nationality: 'Jordanian',
        bloodType: 'N/A',
        allergies: 'None',
        avatarUrl: '/ram.jpg',
        address: 'HealthGuard Headquarters, Business District, Amman, Jordan 11181',
        emergencyContact: {
          name: 'IT Security Team',
          relation: 'Work',
          phone: '+962 6 4000 0000'
        }
      }
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('healthguard_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('healthguard_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    console.log('Login attempt for:', username);
    
    // Find user in database
    const userData = VALID_USERS[username as keyof typeof VALID_USERS];
    
    if (!userData) {
      console.log('User not found:', username);
      return {
        success: false,
        message: 'Username not found'
      };
    }
    
    if (userData.password !== password) {
      console.log('Invalid password for:', username);
      return {
        success: false,
        message: 'Invalid password'
      };
    }

    console.log('Login successful for:', username);
    
    // Save user data securely
    localStorage.setItem('healthguard_user', JSON.stringify(userData.user));
    setUser(userData.user);
    
    // Navigate to dashboard
    navigate('/dashboard');
    
    return {
      success: true,
      message: `Welcome back, ${userData.user.profile.name}!`
    };
  };

  const logout = () => {
    localStorage.removeItem('healthguard_user');
    setUser(null);
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
