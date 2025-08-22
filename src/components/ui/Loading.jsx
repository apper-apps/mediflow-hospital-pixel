import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "default", ...props }) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-4", className)} {...props}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-slate-100 rounded-xl p-6">
              <div className="shimmer h-8 w-24 rounded mb-3"></div>
              <div className="shimmer h-12 w-16 rounded-lg mb-2"></div>
              <div className="shimmer h-4 w-32 rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-100 rounded-xl p-6">
            <div className="shimmer h-6 w-40 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="shimmer h-4 w-32 rounded"></div>
                  <div className="shimmer h-6 w-16 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-100 rounded-xl p-6">
            <div className="shimmer h-6 w-36 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="shimmer h-10 w-10 rounded-full"></div>
                  <div className="flex-1">
                    <div className="shimmer h-4 w-24 rounded mb-1"></div>
                    <div className="shimmer h-3 w-16 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-4", className)} {...props}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin opacity-40" style={{ animationDelay: "0.15s" }}></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Loading</h3>
        <p className="text-sm text-slate-500">Please wait while we fetch your data...</p>
      </div>
    </div>
  );
};

export default Loading;