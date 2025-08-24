import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Heart, Thermometer, Droplets, Activity } from "lucide-react"

interface VitalSigns {
  bloodPressureSystolic: string
  bloodPressureDiastolic: string
  heartRate: string
  bloodGlucose: string
  temperature: string
}

interface VitalSignsFormProps {
  onSubmit?: (vitals: VitalSigns & { timestamp: Date }) => void
}

export function VitalSignsForm({ onSubmit }: VitalSignsFormProps) {
  const [vitals, setVitals] = useState<VitalSigns>({
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    bloodGlucose: "",
    temperature: ""
  })
  
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!vitals.bloodPressureSystolic || !vitals.bloodPressureDiastolic || 
        !vitals.heartRate || !vitals.bloodGlucose || !vitals.temperature) {
      toast({
        title: "Missing Information",
        description: "Please fill in all vital signs before submitting.",
        variant: "destructive"
      })
      return
    }

    onSubmit?.({
      ...vitals,
      timestamp: new Date()
    })

    toast({
      title: "Vital Signs Recorded",
      description: "Your health data has been successfully logged.",
    })

    // Reset form
    setVitals({
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      heartRate: "",
      bloodGlucose: "",
      temperature: ""
    })
  }

  const handleInputChange = (field: keyof VitalSigns, value: string) => {
    setVitals(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-gradient-card shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <Activity className="h-6 w-6 text-primary" />
          <span>Record Vital Signs</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blood Pressure */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center space-x-2">
                <Heart className="h-4 w-4 text-health-danger" />
                <span>Blood Pressure (mmHg)</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Systolic"
                  value={vitals.bloodPressureSystolic}
                  onChange={(e) => handleInputChange("bloodPressureSystolic", e.target.value)}
                  className="text-lg p-3"
                />
                <span className="flex items-center text-muted-foreground">/</span>
                <Input
                  type="number"
                  placeholder="Diastolic"
                  value={vitals.bloodPressureDiastolic}
                  onChange={(e) => handleInputChange("bloodPressureDiastolic", e.target.value)}
                  className="text-lg p-3"
                />
              </div>
            </div>

            {/* Heart Rate */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center space-x-2">
                <Activity className="h-4 w-4 text-health-excellent" />
                <span>Heart Rate (bpm)</span>
              </Label>
              <Input
                type="number"
                placeholder="Enter heart rate"
                value={vitals.heartRate}
                onChange={(e) => handleInputChange("heartRate", e.target.value)}
                className="text-lg p-3"
              />
            </div>

            {/* Blood Glucose */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-primary" />
                <span>Blood Glucose (mg/dL)</span>
              </Label>
              <Input
                type="number"
                placeholder="Enter glucose level"
                value={vitals.bloodGlucose}
                onChange={(e) => handleInputChange("bloodGlucose", e.target.value)}
                className="text-lg p-3"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-health-warning" />
                <span>Temperature (°F)</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="Enter temperature"
                value={vitals.temperature}
                onChange={(e) => handleInputChange("temperature", e.target.value)}
                className="text-lg p-3"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg"
            className="w-full text-lg py-6 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Record Vital Signs
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}