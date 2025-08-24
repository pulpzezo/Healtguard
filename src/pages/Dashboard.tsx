import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { HealthCard } from "@/components/ui/health-card"
import { MedicationCard } from "@/components/ui/medication-card"
import { VitalSignsForm } from "@/components/vital-signs-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { 
  Heart, 
  Activity, 
  Droplets, 
  Thermometer, 
  Plus,
  TrendingUp,
  Calendar,
  AlertTriangle
} from "lucide-react"

interface VitalData {
  bloodPressureSystolic: string
  bloodPressureDiastolic: string
  heartRate: string
  bloodGlucose: string
  temperature: string
  timestamp: Date
}

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
  missed: boolean
}

export default function Dashboard() {
  const [showVitalForm, setShowVitalForm] = useState(false)
  const [vitals, setVitals] = useState<VitalData[]>([])
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      time: "8:00 AM",
      taken: true,
      missed: false
    },
    {
      id: "2", 
      name: "Metformin",
      dosage: "500mg",
      time: "12:00 PM",
      taken: false,
      missed: false
    },
    {
      id: "3",
      name: "Atorvastatin",
      dosage: "20mg",
      time: "6:00 PM",
      taken: false,
      missed: true
    }
  ])

  const { toast } = useToast()

  const handleVitalSubmit = (newVital: VitalData) => {
    setVitals(prev => [newVital, ...prev])
    setShowVitalForm(false)
    
    // Check for concerning values and create alerts
    const systolic = parseInt(newVital.bloodPressureSystolic)
    const heartRate = parseInt(newVital.heartRate)
    const glucose = parseInt(newVital.bloodGlucose)
    
    if (systolic > 140 || heartRate > 100 || glucose > 180) {
      toast({
        title: "Health Alert",
        description: "Some vital signs are outside normal range. Consider contacting your healthcare provider.",
        variant: "destructive"
      })
    }
  }

  const handleMedicationTaken = (id: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, taken: true, missed: false } : med
      )
    )
    toast({
      title: "Medication Recorded",
      description: "Medication marked as taken successfully."
    })
  }

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your emergency contacts and healthcare provider have been notified."
    })
  }

  const getLatestVital = () => {
    return vitals.length > 0 ? vitals[0] : null
  }

  const getHealthStatus = (value: number, type: 'bp' | 'hr' | 'glucose' | 'temp') => {
    switch (type) {
      case 'bp':
        if (value < 120) return 'excellent'
        if (value < 130) return 'good'
        if (value < 140) return 'warning'
        return 'danger'
      case 'hr':
        if (value >= 60 && value <= 100) return 'excellent'
        if (value < 60 || value <= 110) return 'warning'
        return 'danger'
      case 'glucose':
        if (value < 100) return 'excellent'
        if (value < 126) return 'good'
        if (value < 180) return 'warning'
        return 'danger'
      case 'temp':
        if (value >= 97 && value <= 99) return 'excellent'
        if (value < 97 || value <= 100.4) return 'warning'
        return 'danger'
      default:
        return 'good'
    }
  }

  const latestVital = getLatestVital()
  const pendingMeds = medications.filter(med => !med.taken && !med.missed).length
  const missedMeds = medications.filter(med => med.missed).length

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          alertCount={missedMeds}
          onEmergencyCall={handleEmergencyCall}
        />

        {/* Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <HealthCard
            title="Blood Pressure"
            value={latestVital ? `${latestVital.bloodPressureSystolic}/${latestVital.bloodPressureDiastolic}` : "--/--"}
            unit="mmHg"
            status={latestVital ? getHealthStatus(parseInt(latestVital.bloodPressureSystolic), 'bp') : 'good'}
            icon={<Heart className="h-5 w-5" />}
            trend="stable"
          />
          <HealthCard
            title="Heart Rate"
            value={latestVital?.heartRate || "--"}
            unit="bpm"
            status={latestVital ? getHealthStatus(parseInt(latestVital.heartRate), 'hr') : 'good'}
            icon={<Activity className="h-5 w-5" />}
            trend="stable"
          />
          <HealthCard
            title="Blood Glucose"
            value={latestVital?.bloodGlucose || "--"}
            unit="mg/dL"
            status={latestVital ? getHealthStatus(parseInt(latestVital.bloodGlucose), 'glucose') : 'good'}
            icon={<Droplets className="h-5 w-5" />}
            trend="stable"
          />
          <HealthCard
            title="Temperature"
            value={latestVital?.temperature || "--"}
            unit="°F"
            status={latestVital ? getHealthStatus(parseFloat(latestVital.temperature), 'temp') : 'good'}
            icon={<Thermometer className="h-5 w-5" />}
            trend="stable"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vital Signs Recording */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span>Vital Signs</span>
              </h2>
              <Button 
                onClick={() => setShowVitalForm(!showVitalForm)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {showVitalForm ? 'Hide Form' : 'Record New'}
              </Button>
            </div>
            
            {showVitalForm && (
              <VitalSignsForm onSubmit={handleVitalSubmit} />
            )}

            {vitals.length === 0 && !showVitalForm && (
              <Card className="bg-gradient-card shadow-soft">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Vital Signs Recorded</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Start tracking your health by recording your first vital signs measurement.
                  </p>
                  <Button 
                    onClick={() => setShowVitalForm(true)}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Record Vital Signs
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Medication Tracker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-secondary" />
                <span>Today's Medications</span>
              </h2>
              {missedMeds > 0 && (
                <div className="flex items-center space-x-2 text-health-danger">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">{missedMeds} missed</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {medications.map((medication) => (
                <MedicationCard
                  key={medication.id}
                  name={medication.name}
                  dosage={medication.dosage}
                  time={medication.time}
                  taken={medication.taken}
                  missed={medication.missed}
                  onMarkTaken={() => handleMedicationTaken(medication.id)}
                />
              ))}
            </div>

            {pendingMeds > 0 && (
              <Card className="bg-health-warning/10 border-health-warning/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-health-warning">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Medication Reminder</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    You have {pendingMeds} medication{pendingMeds > 1 ? 's' : ''} pending. 
                    Don't forget to take your prescribed medications on time.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}