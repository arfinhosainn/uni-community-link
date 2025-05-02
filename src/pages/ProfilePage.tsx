
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  student_id: string | null;
  department: string | null;
  avatar_url: string | null;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch profile data when component mounts
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error fetching profile',
          description: error.message || 'Unable to load profile information.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  // Handle profile update
  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user || !profile) return;

    setUpdating(true);
    try {
      const updates = {
        id: user.id,
        full_name: profile.full_name,
        student_id: profile.student_id,
        department: profile.department,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.message || 'Unable to update profile.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  // Handle profile field change
  const handleChange = (field: keyof Profile, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const getInitials = () => {
    if (!profile?.full_name) return "U";
    
    return profile.full_name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-university-primary" />
      </div>
    );
  }

  return (
    <div className="uni-container py-8">
      <h1 className="page-title mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile?.full_name || "User"} />
                ) : (
                  <AvatarFallback className="text-2xl bg-university-primary text-white">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle className="mt-4">{profile?.full_name || "Student"}</CardTitle>
              <CardDescription>{profile?.email || "No email provided"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Student ID</span>
                  <span className="text-sm font-medium">{profile?.student_id || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Department</span>
                  <span className="text-sm font-medium">{profile?.department || "Not set"}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <a href="#edit-profile">Edit Profile</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account Information</TabsTrigger>
              <TabsTrigger value="academic">Academic Details</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="account" id="edit-profile">
              <Card>
                <form onSubmit={handleUpdateProfile}>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile?.full_name || ""}
                        onChange={(e) => handleChange("full_name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={profile?.email || ""}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">Email changes require verification and are managed through account settings.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          value={profile?.student_id || ""}
                          onChange={(e) => handleChange("student_id", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={profile?.department || ""}
                          onValueChange={(value) => handleChange("department", value)}
                        >
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="CSE">Computer Science & Engineering (CSE)</SelectItem>
                              <SelectItem value="EEE">Electrical & Electronic Engineering (EEE)</SelectItem>
                              <SelectItem value="BBA">Business Administration (BBA)</SelectItem>
                              <SelectItem value="LAW">Law & Justice (LAW)</SelectItem>
                              <SelectItem value="ENG">English & Literature (ENG)</SelectItem>
                              <SelectItem value="PHY">Physics (PHY)</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={updating}>
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>View your course information and academic status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-white p-4 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Current Semester</h3>
                      <p className="mb-2"><span className="font-medium">Status:</span> Enrolled</p>
                      <p className="mb-2"><span className="font-medium">Credits:</span> 15</p>
                      <p><span className="font-medium">Academic Standing:</span> Good Standing</p>
                    </div>

                    <div className="bg-white p-4 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-2 px-3 text-left text-sm font-medium text-gray-500 border">Course Code</th>
                              <th className="py-2 px-3 text-left text-sm font-medium text-gray-500 border">Course Name</th>
                              <th className="py-2 px-3 text-left text-sm font-medium text-gray-500 border">Credits</th>
                              <th className="py-2 px-3 text-left text-sm font-medium text-gray-500 border">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-3 text-sm text-gray-700 border">CSE101</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">Introduction to Computer Science</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">3</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">In Progress</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-2 px-3 text-sm text-gray-700 border">MAT102</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">Calculus I</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">4</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">In Progress</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3 text-sm text-gray-700 border">PSY101</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">Introduction to Psychology</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">3</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">In Progress</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-2 px-3 text-sm text-gray-700 border">ENG101</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">English Composition</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">3</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">In Progress</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3 text-sm text-gray-700 border">HST101</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">World History</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">3</td>
                              <td className="py-2 px-3 text-sm text-gray-700 border">In Progress</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
