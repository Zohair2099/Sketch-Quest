'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Laptop, Text, Languages, Bot, Trophy, Bell, BellOff, Music, Volume2, Mic } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your SketchQuest experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <p className="text-sm text-muted-foreground">
              Choose how you want to experience SketchQuest.
            </p>
            <RadioGroup
              defaultValue={theme}
              onValueChange={setTheme}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-2 h-6 w-6" />
                  Light
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-2 h-6 w-6" />
                  Dark
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Laptop className="mb-2 h-6 w-6" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>
            Choose your preferred language for the app interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
             <Label htmlFor="language-select">Language</Label>
             <Select defaultValue="en">
                <SelectTrigger id="language-select" className="w-full md:w-1/2">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español (Spanish)</SelectItem>
                    <SelectItem value="fr">Français (French)</SelectItem>
                    <SelectItem value="de">Deutsch (German)</SelectItem>
                </SelectContent>
             </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>
            Make SketchQuest easier to use with these accessibility settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="space-y-4">
                <Label htmlFor="font-size-slider">Text Size</Label>
                <div className="flex items-center gap-4">
                    <Text className="h-5 w-5 text-muted-foreground" />
                    <Slider id="font-size-slider" defaultValue={[50]} max={100} step={10} />
                    <Text className="h-8 w-8 text-muted-foreground" />
                </div>
            </div>
             <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="dyslexia-font-switch">Dyslexia-Friendly Font</Label>
                     <p className="text-sm text-muted-foreground">
                        Uses a font designed for easier reading.
                    </p>
                </div>
                <Switch id="dyslexia-font-switch" />
            </div>
             <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="screen-reader-info">Screen Reader Support</Label>
                     <p className="text-sm text-muted-foreground">
                        The app is built with ARIA landmarks for screen readers.
                    </p>
                </div>
                 <Bot className="h-6 w-6 text-muted-foreground" />
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Audio &amp; Visual Experience</CardTitle>
          <CardDescription>
            Manage sound, music, and voice settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="bg-music-switch" className="flex items-center">
                        <Music className="mr-2 h-5 w-5 text-purple-500" />
                        Background Music
                    </Label>
                     <p className="text-sm text-muted-foreground">
                        Toggle ambient music during quests.
                    </p>
                </div>
                <Switch id="bg-music-switch" defaultChecked />
            </div>
            <div className="space-y-4">
                <Label htmlFor="sfx-volume-slider">Sound Effects Volume</Label>
                <div className="flex items-center gap-4">
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                    <Slider id="sfx-volume-slider" defaultValue={[80]} max={100} step={5} />
                    <Volume2 className="h-8 w-8 text-muted-foreground" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="voice-narration-switch" className="flex items-center">
                        <Mic className="mr-2 h-5 w-5 text-blue-500" />
                        Voice Narration
                    </Label>
                     <p className="text-sm text-muted-foreground">
                        Enable voice-over for instructions and content.
                    </p>
                </div>
                <Switch id="voice-narration-switch" />
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Gamification</CardTitle>
          <CardDescription>
            Manage your gaming and engagement experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="gamification-switch" className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                        Enable Gamification
                    </Label>
                     <p className="text-sm text-muted-foreground">
                        Turn badges, streaks, and leaderboards on or off.
                    </p>
                </div>
                <Switch id="gamification-switch" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="notifications-switch" className="flex items-center">
                        <Bell className="mr-2 h-5 w-5 text-primary" />
                        Achievement Notifications
                    </Label>
                     <p className="text-sm text-muted-foreground">
                        Receive alerts for new badges and milestones.
                    </p>
                </div>
                <Switch id="notifications-switch" defaultChecked />
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications &amp; Reminders</CardTitle>
          <CardDescription>
            Manage when and how you receive notifications from SketchQuest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="daily-reminder-switch" className="flex items-center">
                        <Bell className="mr-2 h-5 w-5 text-primary" />
                        Daily Learning Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Get a push notification to keep your streak going.
                    </p>
                </div>
                <Switch id="daily-reminder-switch" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="achievement-alerts-switch-2" className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                        Achievement Unlock Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Receive an alert when you earn a new badge or milestone.
                    </p>
                </div>
                <Switch id="achievement-alerts-switch-2" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="event-announcements-switch" className="flex items-center">
                        <Languages className="mr-2 h-5 w-5 text-blue-500" />
                        Event &amp; Competition Announcements
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Stay informed about upcoming special events.
                    </p>
                </div>
                <Switch id="event-announcements-switch" />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="quiet-hours-switch" className="flex items-center">
                        <BellOff className="mr-2 h-5 w-5 text-muted-foreground" />
                        Quiet Hours
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Mute all notifications between 10 PM and 8 AM.
                    </p>
                </div>
                <Switch id="quiet-hours-switch" />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
