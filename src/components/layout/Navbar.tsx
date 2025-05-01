
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BookOpen,
  Calendar,
  Menu,
  MessageSquare,
  Search,
  User,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mock authentication state - replace with actual auth
  const isAuthenticated = false;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="uni-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-university-primary" />
          <span className="font-bold text-xl hidden sm:inline text-university-dark">UniCommunity</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/portal" className="text-university-dark hover:text-university-primary font-medium">
            Portal
          </Link>
          <Link to="/departments" className="text-university-dark hover:text-university-primary font-medium">
            Departments
          </Link>
          <Link to="/calendar" className="text-university-dark hover:text-university-primary font-medium">
            Calendar
          </Link>
          <Link to="/documents" className="text-university-dark hover:text-university-primary font-medium">
            Documents
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-university-dark hover:bg-university-light rounded-full"
          >
            <Search className="h-5 w-5" />
          </button>

          {isAuthenticated ? (
            <>
              <button className="p-2 text-university-dark hover:bg-university-light rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <Link to="/profile" className="p-2 text-university-dark hover:bg-university-light rounded-full">
                <User className="h-5 w-5" />
              </Link>
            </>
          ) : (
            <div className="hidden sm:block">
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden text-university-dark hover:bg-university-light rounded-full"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={cn(
        "px-4 py-3 border-t border-gray-200 md:hidden",
        isSearchOpen ? "block" : "hidden"
      )}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={cn(
        "px-4 py-3 border-t border-gray-200 md:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/portal" 
            className="p-2 rounded-lg hover:bg-university-light flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <BookOpen className="h-5 w-5 text-university-primary" />
            <span>Portal</span>
          </Link>
          <Link 
            to="/departments" 
            className="p-2 rounded-lg hover:bg-university-light flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageSquare className="h-5 w-5 text-university-primary" />
            <span>Departments</span>
          </Link>
          <Link 
            to="/calendar" 
            className="p-2 rounded-lg hover:bg-university-light flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Calendar className="h-5 w-5 text-university-primary" />
            <span>Calendar</span>
          </Link>
          <Link 
            to="/documents" 
            className="p-2 rounded-lg hover:bg-university-light flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <BookOpen className="h-5 w-5 text-university-primary" />
            <span>Documents</span>
          </Link>
          {!isAuthenticated && (
            <div className="pt-3 flex flex-col space-y-2">
              <Button asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
