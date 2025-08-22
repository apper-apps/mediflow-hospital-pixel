import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const StatusIndicator = ({ 
  status,
  className,
  showDot = true,
  size = "md",
  ...props 
}) => {
  const statusConfig = {
    admitted: {
      variant: "info",
      label: "Admitted",
      dotColor: "bg-info"
    },
    waiting: {
      variant: "warning",
      label: "Waiting",
      dotColor: "bg-warning"
    },
    discharged: {
      variant: "success",
      label: "Discharged",
      dotColor: "bg-success"
    },
    emergency: {
      variant: "danger",
      label: "Emergency",
      dotColor: "bg-error"
    },
    scheduled: {
      variant: "primary",
      label: "Scheduled",
      dotColor: "bg-primary"
    },
    completed: {
      variant: "success",
      label: "Completed",
      dotColor: "bg-success"
    },
    cancelled: {
      variant: "danger",
      label: "Cancelled",
      dotColor: "bg-error"
    },
    occupied: {
      variant: "danger",
      label: "Occupied",
      dotColor: "bg-error"
    },
    available: {
      variant: "success",
      label: "Available",
      dotColor: "bg-success"
    }
  };

  const config = statusConfig[status] || statusConfig.waiting;

  return (
    <Badge 
      variant={config.variant}
      size={size}
      className={cn("gap-2", className)}
      {...props}
    >
      {showDot && (
        <div className={cn("w-2 h-2 rounded-full", config.dotColor, 
          status === "available" && "pulse-green",
          status === "occupied" && "pulse-red"
        )} />
      )}
      {config.label}
    </Badge>
  );
};

export default StatusIndicator;