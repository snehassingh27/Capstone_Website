import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

const pageFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

export default function EditContentPage() {
  const [activeTab, setActiveTab] = useState("pages");
  const { toast } = useToast();
  
  const { data: pages, isLoading: isLoadingPages } = useQuery({
    queryKey: ['/api/pages'],
    queryFn: async () => {
      const res = await fetch('/api/pages');
      if (!res.ok) throw new Error('Failed to fetch pages');
      return res.json();
    }
  });

  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  
  const form = useForm({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
  });

  useQuery({
    queryKey: ['/api/pages', selectedPage],
    queryFn: async () => {
      if (!selectedPage) return null;
      
      const res = await fetch(`/api/pages/${selectedPage}`);
      if (!res.ok) throw new Error('Failed to fetch page');
      
      const pageData = await res.json();
      form.reset({
        title: pageData.title,
        subtitle: pageData.subtitle || "",
        content: pageData.content,
      });
      
      return pageData;
    },
    enabled: !!selectedPage,
  });

  const updateMutation = useMutation({
    mutationFn: async (values: typeof form.getValues) => {
      if (!selectedPage) throw new Error('No page selected');
      
      return apiRequest("PATCH", `/api/pages/${selectedPage}`, {
        title: values.title,
        subtitle: values.subtitle,
        content: values.content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({
        title: "Page updated",
        description: "The page content has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating page",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof pageFormSchema>) => {
    updateMutation.mutate(values);
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">Manage the content of the project documentation</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingPages ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {pages?.map((page: any) => (
                      <li key={page.id}>
                        <Button
                          variant={selectedPage === page.pageName ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedPage(page.pageName)}
                        >
                          {page.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Edit Page Content</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPage ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <RichTextEditor 
                                value={field.value} 
                                onChange={field.onChange}
                                minHeight={300}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    Select a page to edit its content
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section allows you to manage team members. Interface will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sprints">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section allows you to manage project sprints. Interface will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
