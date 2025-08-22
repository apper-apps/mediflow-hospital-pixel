import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className,
  icon = "Inbox",
  title = "No data available",
  description = "There's nothing to show here right now.",
  actionLabel,
  onAction,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center space-y-6", className)} {...props}>
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200">
          <ApperIcon name={icon} className="w-12 h-12 text-slate-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="Plus" className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="space-y-3 max-w-md">
        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;