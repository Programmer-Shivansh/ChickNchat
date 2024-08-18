import { useStore } from '@/lib/store';
import { useWebRTC } from '@/providers/webrtc-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateUsername } from 'unique-username-generator';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  keywords: z.string().optional(),
});

const SettingsDialog = () => {
  const { keywords, saveSettings, me, setName } = useStore();
  const [open, setOpen] = useState(!me?.name);
  const { setName: setChatName } = useWebRTC();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: me?.name || generateUsername(),
      keywords: keywords?.join(', ') || '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setOpen(false);
    saveSettings(data.keywords?.split(',').map(keyword => keyword.trim()) ?? []);
    setName(data.name);
    setChatName?.(data.name);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-indigo-600 hover:text-indigo-800" onClick={() => setOpen(true)}>
          Change name
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Pick a name, stranger!</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            This is the name that will be displayed to your chat partner. You can also add some keywords that you want to talk about.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="space-y-4"
          >
           <w3m-button/>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="What do you want to be called?"
                      {...field}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Topics you want to talk about (comma separated)"
                      {...field}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    You can leave this blank if you want to talk about anything.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setOpen(false)} className="text-gray-600">
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
