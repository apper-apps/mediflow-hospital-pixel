import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch,
  placeholder = "Search...",
  className,
  showFilter = false,
  filterOptions = [],
  onFilterChange,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearch = () => {
    onSearch?.(searchTerm, selectedFilter);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("flex items-center space-x-3", className)} {...props}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4"
        />
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" 
        />
      </div>
      
      {showFilter && filterOptions.length > 0 && (
        <select
          value={selectedFilter}
          onChange={(e) => {
            setSelectedFilter(e.target.value);
            onFilterChange?.(e.target.value);
          }}
          className="h-10 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        >
          <option value="">All</option>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      <Button 
        onClick={handleSearch}
        variant="primary"
        className="px-4"
      >
        <ApperIcon name="Search" className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBar;