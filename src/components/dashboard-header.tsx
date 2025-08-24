import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, User, Shield, Phone, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'reminder' | 'success' | 'appointment' | 'summary';
  unread?: boolean;
}

interface DashboardHeaderProps {
  alertCount?: number;
  onEmergencyCall?: () => void;
}

export function DashboardHeader({ 
  alertCount = 0,
  onEmergencyCall 
}: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Generate notifications based on user role
  const getNotifications = (): Notification[] => {
    if (!user) return [];
    
    const baseNotifications: Notification[] = [
      { id: 1, title: "Blood Pressure Reading High", message: "Your last reading (145/92) is above normal range. Consider contacting your doctor.", time: "2 hours ago", type: 'alert', unread: true },
      { id: 2, title: "Medication Reminder", message: "Time to take your Lisinopril (10mg). Don't forget to log it after taking.", time: "30 minutes ago", type: 'reminder', unread: true },
      { id: 3, title: "Daily Goals Completed", message: "Great job! You've completed all your health tracking for today.", time: "Yesterday", type: 'success' },
      { id: 4, title: "Upcoming Appointment", message: "Reminder: Dr. Ahmad appointment tomorrow at 2:00 PM", time: "Yesterday", type: 'appointment' },
      { id: 5, title: "Weekly Health Summary", message: "Your weekly health report is ready. Overall trends look good!", time: "Yesterday", type: 'summary' },
    ];

    // Customize notifications based on user role
    if (user.role === 'doctor') {
      return [
        { id: 1, title: "New Patient Alert", message: "Patient Zaid Ahmad has submitted new vital signs requiring review.", time: "1 hour ago", type: 'alert', unread: true },
        { id: 2, title: "Schedule Update", message: "Your afternoon appointments have been rescheduled due to emergency.", time: "2 hours ago", type: 'reminder', unread: true },
        { id: 3, title: "Lab Results Ready", message: "Blood work results for Patient #JO-2024-00001 are now available.", time: "Yesterday", type: 'success' },
      ];
    } else if (user.role === 'admin') {
      return [
        { id: 1, title: "System Maintenance", message: "Scheduled maintenance tonight at 2:00 AM. System will be offline for 1 hour.", time: "3 hours ago", type: 'alert', unread: true },
        { id: 2, title: "New User Registration", message: "Dr. Sarah Johnson has requested account activation.", time: "1 day ago", type: 'reminder', unread: true },
        { id: 3, title: "Security Update", message: "All security patches have been successfully applied to the system.", time: "Yesterday", type: 'success' },
      ];
    }

    return baseNotifications;
  };

  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => n.unread).length;
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  const handleLogout = () => {
    logout();
  };

  // Helper for notification icons/colors
  const notificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <span className="inline-flex items-center justify-center w-7 h-7 bg-yellow-100 text-yellow-600 rounded-full mr-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" /></svg></span>;
      case 'reminder':
        return <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-full mr-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></span>;
      case 'success':
        return <span className="inline-flex items-center justify-center w-7 h-7 bg-green-100 text-green-600 rounded-full mr-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>;
      case 'appointment':
        return <span className="inline-flex items-center justify-center w-7 h-7 bg-teal-100 text-teal-600 rounded-full mr-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" /></svg></span>;
      case 'summary':
        return <span className="inline-flex items-center justify-center w-7 h-7 bg-green-50 text-green-500 rounded-full mr-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M9 17v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" /></svg></span>;
      default:
        return null;
    }
  };

  // Profile Modal Component
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowProfile(false)}>
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4 overflow-hidden">
                {user?.profile?.avatarUrl ? (
                  <img src={user.profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-blue-600" />
                )}
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">{user?.profile?.name}</div>
                <div className="text-sm text-gray-500 capitalize">{user?.role}</div>
              </div>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowProfile(false)}
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="font-semibold mb-3 text-gray-800 text-lg">Personal Information</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-16">Age:</span>
                  <span>{user?.profile?.age}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-16">ID:</span>
                  <span>{user?.id}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
                  </svg>
                  <span>{user?.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-9 9m4.5-1.206a8.959 8.959 0 0 1-4.5 1.207" />
                  </svg>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 1 0-1.414 1.414l4.243 4.243a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  <span>{user?.profile?.address || user?.profile?.location}</span>
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="font-semibold mb-3 text-gray-800 text-lg">Medical Information</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-24">Blood Type:</span>
                  <span>{user?.profile?.bloodType}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <span className="font-medium w-24">Allergies:</span>
                  <span>{user?.profile?.allergies}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="font-semibold mb-3 text-gray-800 text-lg">Emergency Contact</div>
              <div className="space-y-2 text-sm">
                <div className="text-gray-700">
                  <span className="font-medium">{user?.profile?.emergencyContact?.name}</span>
                  <span className="text-gray-500"> ({user?.profile?.emergencyContact?.relation})</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
                  </svg>
                  <span>{user?.profile?.emergencyContact?.phone}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 text-blue-600 hover:text-blue-700 font-medium rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 1 1-3 3L7 13v4h4l6.5-6.5a2.121 2.121 0 0 0-3-3Z" />
                </svg>
                Edit Profile
              </button>
              <button 
                className="flex-1 py-3 text-red-600 hover:text-red-700 font-medium rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return null;
  }

  return (
    <header className="bg-gradient-primary shadow-medium rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            className="mr-4 flex items-center px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition shadow"
            onClick={() => navigate("/")}
            title="Back to Main Page"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">HealthGuard</h1>
              <p className="text-blue-100">Remote Health Monitoring</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Emergency Call Button */}
          <Button 
            variant="destructive"
            size="lg"
            onClick={onEmergencyCall}
            className="bg-health-danger hover:bg-health-critical text-white font-semibold"
          >
            <Phone className="h-5 w-5 mr-2" />
            Emergency
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative" onClick={() => setShowNotifications(v => !v)}>
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl z-30 text-black border border-gray-200 animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b font-semibold text-lg bg-gray-50 rounded-t-xl">
                  <span className="flex items-center"><Bell className="h-5 w-5 mr-2 text-blue-500" />Notifications</span>
                  <button className="text-gray-400 hover:text-red-500 text-2xl" onClick={() => setShowNotifications(false)}>&times;</button>
                </div>
                <div className="max-h-96 overflow-y-auto px-2 py-2">
                  {notifications.map(n => (
                    <div key={n.id} className={`flex items-start mb-3 rounded-lg border ${n.unread ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'} p-3 shadow-sm`}>
                      {notificationIcon(n.type)}
                      <div className="flex-1">
                        <div className="font-semibold text-base mb-0.5">{n.title}</div>
                        <div className="text-sm text-gray-600 mb-1">{n.message}</div>
                        <div className="text-xs text-gray-400">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-2 p-3 border-t bg-gray-50 rounded-b-xl">
                  <button className="flex-1 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition">Mark All Read</button>
                  <button className="flex-1 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition">Clear All</button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 relative">
            <Avatar className="h-10 w-10 border-2 border-white/20 cursor-pointer" onClick={() => setShowProfile(v => !v)}>
              {user.profile?.avatarUrl ? (
                <AvatarImage src={user.profile.avatarUrl} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-white/10 text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-white">
              <p className="font-medium cursor-pointer" onClick={() => setShowProfile(v => !v)}>Welcome, {user.profile?.name}</p>
              <p className="text-sm text-blue-100">Stay healthy & safe</p>
            </div>
            {showProfile && <ProfileModal />}
          </div>
        </div>
      </div>
    </header>
  );
}
