import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, Pill, CheckCircle, AlertTriangle } from "lucide-react"

interface MedicationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  dosage: string
  time: string
  taken?: boolean
  missed?: boolean
  onMarkTaken?: () => void
}

export function MedicationCard({
  name,
  dosage,
  time,
  taken = false,
  missed = false,
  onMarkTaken,
  className,
  ...props
}: MedicationCardProps) {
  const getStatusStyles = () => {
    if (taken) {
      return "border-health-excellent/30 bg-health-excellent/10"
    }
    if (missed) {
      return "border-health-danger/30 bg-health-danger/10"
    }
    return "border-health-warning/30 bg-health-warning/10"
  }

  const getStatusIcon = () => {
    if (taken) {
      return <CheckCircle className="h-5 w-5 text-health-excellent" />
    }
    if (missed) {
      return <AlertTriangle className="h-5 w-5 text-health-danger" />
    }
    return <Clock className="h-5 w-5 text-health-warning" />
  }

  const getStatusText = () => {
    if (taken) return "Taken"
    if (missed) return "Missed"
    return "Pending"
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-medium",
        "bg-gradient-card border-2",
        getStatusStyles(),
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <Pill className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          {getStatusIcon()}
          <span className="text-sm">{getStatusText()}</span>
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Dosage: {dosage}</p>
            <p className="text-sm text-muted-foreground">Time: {time}</p>
          </div>
          {!taken && !missed && onMarkTaken && (
            <Button 
              onClick={onMarkTaken}
              variant="secondary"
              size="sm"
              className="ml-4"
            >
              Mark as Taken
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}