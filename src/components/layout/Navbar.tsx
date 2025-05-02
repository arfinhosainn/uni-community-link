
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BookOpen,
  Calendar,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  User,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was an issue signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  };

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

          {user ? (
            <>
              <button className="p-2 text-university-dark hover:bg-university-light rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center ml-2 focus:outline-none">
                    <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-university-primary transition-all">
                      <AvatarFallback className="bg-university-primary text-white">{getInitials()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-normal text-sm text-gray-500">Signed in as</div>
                    <div className="font-medium">{user.user_metadata?.full_name || user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/portal" className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Student Portal</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          {!user ? (
            <div className="pt-3 flex flex-col space-y-2">
              <Button asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          ) : (
            <div className="pt-3">
              <Button onClick={handleSignOut} variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
