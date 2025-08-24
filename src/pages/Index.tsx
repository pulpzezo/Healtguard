import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Heart, Bell, Users, Lock, Phone } from "lucide-react"
import heroImage from "@/assets/health-dashboard-hero.jpg"

const Index = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-health-danger" />,
      title: "Vital Signs Monitoring",
      description: "Track blood pressure, heart rate, glucose levels, and temperature with easy-to-use logging tools."
    },
    {
      icon: <Bell className="h-8 w-8 text-health-warning" />,
      title: "Medication Reminders",
      description: "Never miss a dose with personalized medication schedules and automated reminders."
    },
    {
      icon: <Phone className="h-8 w-8 text-health-danger" />,
      title: "Emergency Alerts",
      description: "Instant notifications to healthcare providers and caregivers when vital signs are concerning."
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Caregiver Connection",
      description: "Keep family members and healthcare providers informed about your health status."
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description: "Your health data is protected with end-to-end encryption and HIPAA-compliant security."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Healthcare Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Shield className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold">HealthGuard</h1>
            </div>
            <p className="text-xl text-blue-100 mb-4">
              Remote Health Monitoring & Alert System for Seniors
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto">
              Stay independent while staying connected to your healthcare team. 
              Monitor vital signs, track medications, and get instant alerts when you need them most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
              >
                <Heart className="h-5 w-5 mr-2" />
                Start Monitoring
              </Button>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = 'tel:911'}
              >
                <Phone className="h-5 w-5 mr-2" />
                Emergency Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Health Monitoring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to maintain your health and independence, 
              with the peace of mind that help is always available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-medium hover:shadow-large transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {features.slice(3).map((feature, index) => (
              <Card key={index + 3} className="bg-gradient-card shadow-medium hover:shadow-large transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-health">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Join thousands of seniors who trust HealthGuard to monitor their well-being 
            and connect them with the care they need.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-4"
          >
            <Shield className="h-5 w-5 mr-2" />
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
