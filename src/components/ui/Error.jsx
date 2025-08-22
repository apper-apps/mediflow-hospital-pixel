import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  title = "Something went wrong",
  message = "We encountered an error while loading your data. Please try again.",
  onRetry,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center space-y-4", className)} {...props}>
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center">
          <ApperIcon name="X" className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-slate-600 max-w-md leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;