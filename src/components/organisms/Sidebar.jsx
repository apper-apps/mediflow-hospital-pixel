import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: "LayoutDashboard",
      description: "Overview & Analytics"
    },
    {
      name: "Patients",
      href: "/patients",
      icon: "Users",
      description: "Patient Management"
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: "Calendar",
      description: "Schedule & Booking"
    },
    {
      name: "Departments",
      href: "/departments",
      icon: "Building2",
      description: "Queue Management"
    },
    {
      name: "Beds",
      href: "/beds",
      icon: "Bed",
      description: "Ward Management"
    }
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-200 lg:bg-gradient-to-br lg:from-slate-50 lg:via-white lg:to-slate-100 lg:shadow-lg">
      <div className="flex flex-col flex-grow pt-6 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <ApperIcon name="Activity" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-primary bg-clip-text text-transparent">
                MediFlow
              </h1>
              <p className="text-xs text-slate-500 font-medium">Hospital Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-white hover:shadow-md hover:border hover:border-slate-200",
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 transform scale-[1.02]"
                    : "text-slate-700 hover:text-slate-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                    )}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className={cn(
                      "text-xs transition-colors duration-200",
                      isActive ? "text-white/80" : "text-slate-500 group-hover:text-slate-600"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="px-4 mt-8">
          <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl p-4 border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">System Status</span>
              <div className="w-2 h-2 bg-success rounded-full pulse-green"></div>
            </div>
            <div className="text-xs text-slate-500">All systems operational</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-2xl border-r border-slate-200"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="Activity" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-primary bg-clip-text text-transparent">
                      MediFlow
                    </h1>
                    <p className="text-xs text-slate-500">Hospital Management</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-white hover:shadow-md",
                        isActive
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "text-slate-700 hover:text-slate-900"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ApperIcon
                          name={item.icon}
                          className={cn(
                            "mr-3 flex-shrink-0 h-5 w-5",
                            isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                          )}
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{item.name}</div>
                          <div className={cn(
                            "text-xs",
                            isActive ? "text-white/80" : "text-slate-500"
                          )}>
                            {item.description}
                          </div>
                        </div>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;