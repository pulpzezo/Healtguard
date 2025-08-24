import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HealthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  unit?: string
  status?: "excellent" | "good" | "warning" | "danger" | "critical"
  trend?: "up" | "down" | "stable"
  icon?: React.ReactNode
}

export function HealthCard({
  title,
  value,
  unit,
  status = "good",
  trend,
  icon,
  className,
  ...props
}: HealthCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-health-excellent border-health-excellent/20 bg-health-excellent/5"
      case "good":
        return "text-health-good border-health-good/20 bg-health-good/5"
      case "warning":
        return "text-health-warning border-health-warning/20 bg-health-warning/5"
      case "danger":
        return "text-health-danger border-health-danger/20 bg-health-danger/5"
      case "critical":
        return "text-health-critical border-health-critical/20 bg-health-critical/5"
      default:
        return "text-primary border-primary/20 bg-primary/5"
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      case "stable":
        return "→"
      default:
        return null
    }
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-medium cursor-pointer",
        "bg-gradient-card border-2",
        getStatusColor(status),
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
          </div>
          {trend && (
            <span className="text-sm text-muted-foreground">
              {getTrendIcon(trend)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}