'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Laptop, Text, Languages, Bot, Trophy, Bell, BellOff, Music, Volume2, Mic, Shield, Hourglass, MessageCircleOff, Bug, Lightbulb as LightbulbIcon, HelpCircle, Save, Undo, Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

// Define the shape of our settings
interface SettingsState {
  language: string;
  textSize: number;
  isDyslexiaFont: boolean;
  isMusicOn: boolean;
  sfxVolume: number;
  isVoiceNarration: boolean;
  isGamification: boolean;
  isAchievementNotifications: boolean;
  isDailyReminders: boolean;
  isEventAnnouncements: boolean;
  isQuietHours: boolean;
  isPlaytimeLimited: boolean;
  isSocialRestricted: boolean;
  colorPalette: string;
}

// Define the default settings
const defaultSettings: SettingsState = {
  language: 'en',
  textSize: 50,
  isDyslexiaFont: false,
  isMusicOn: true,
  sfxVolume: 80,
  isVoiceNarration: false,
  isGamification: true,
  isAchievementNotifications: true,
  isDailyReminders: true,
  isEventAnnouncements: false,
  isQuietHours: false,
  isPlaytimeLimited: false,
  isSocialRestricted: false,
  colorPalette: 'default',
};

const colorPalettes = [
    { name: 'default', label: 'Default', color: 'hsl(262.1 83.3% 57.8%)' },
    { name: 'forest', label: 'Forest', color: 'hsl(142.1 76.2% 36.3%)' },
    { name: 'ocean', label: 'Ocean', color: 'hsl(221.2 83.2% 53.3%)' },
    { name: 'sunset', label: 'Sunset', color: 'hsl(24.6 95% 53.1%)' },
]


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const pathname = usePathname();

  // State for the currently applied settings (saved state)
  const [savedSettings, setSavedSettings] = React.useState<SettingsState>(defaultSettings);
  // State for the currently edited settings (dirty/preview state)
  const [currentSettings, setCurrentSettings] = React.useState<SettingsState>(defaultSettings);
  
  // This effect runs on mount to set the initial saved state, and when we save new settings.
  React.useEffect(() => {
    // Here you would typically load saved settings from a database or localStorage
    const loadedSettings = defaultSettings; // Placeholder
    setSavedSettings(loadedSettings);
    setCurrentSettings(loadedSettings);
  }, [pathname]); // Rerunning on path change is a proxy for component mount in this case

  // This effect handles applying the PREVIEW of the settings
  React.useEffect(() => {
    // Preview color palette
    document.body.dataset.theme = currentSettings.colorPalette;
    
    // Preview font size (as a percentage of the base size)
    document.documentElement.style.fontSize = `${62.5 * (currentSettings.textSize / 50)}%`;

    // Preview dyslexia-friendly font
    if (currentSettings.isDyslexiaFont) {
        document.body.classList.add('font-dyslexic');
    } else {
        document.body.classList.remove('font-dyslexic');
    }

  }, [currentSettings]);


  const isDirty = React.useMemo(() => JSON.stringify(savedSettings) !== JSON.stringify(currentSettings), [savedSettings, currentSettings]);

  const handleSettingChange = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setCurrentSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyChanges = () => {
    setSavedSettings(currentSettings);
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been applied.',
    });
    // In a real app, you would save `currentSettings` to the database here.
  };

  const handleRevertChanges = () => {
    // Revert the preview state to the last saved state
    setCurrentSettings(savedSettings);
    toast({
      title: 'Changes Reverted',
      description: 'Your settings have been reverted to the last saved state.',
    });
  };


  const handleFeedbackClick = (type: string) => {
    toast({
      title: 'Feedback Submitted',
      description: `Thank you for offering to ${type}. This feature is coming soon!`,
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      
      {/* Appearance Card */}
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
              value={theme}
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
          <div className="space-y-2">
            <Label>Color Palette</Label>
            <p className="text-sm text-muted-foreground">
                Select your favorite color theme for the application.
            </p>
            <RadioGroup
              value={currentSettings.colorPalette}
              onValueChange={(value) => handleSettingChange('colorPalette', value)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2"
            >
              {colorPalettes.map((palette) => (
                <div key={palette.name}>
                    <RadioGroupItem value={palette.name} id={palette.name} className="peer sr-only" />
                    <Label
                        htmlFor={palette.name}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                        <div className="w-6 h-6 rounded-full mb-2" style={{ backgroundColor: palette.color }} />
                        {palette.label}
                    </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      {/* Language Card */}
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>
            Choose your preferred language for the app interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="language-select">Language</Label>
            <Select value={currentSettings.language} onValueChange={(value) => handleSettingChange('language', value)}>
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

      {/* Accessibility Card */}
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
              <Slider id="font-size-slider" value={[currentSettings.textSize]} onValueChange={(value) => handleSettingChange('textSize', value[0])} max={100} step={10} />
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
            <Switch id="dyslexia-font-switch" checked={currentSettings.isDyslexiaFont} onCheckedChange={(checked) => handleSettingChange('isDyslexiaFont', checked)} />
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
      
      {/* Audio & Visual Experience Card */}
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
            <Switch id="bg-music-switch" checked={currentSettings.isMusicOn} onCheckedChange={(checked) => handleSettingChange('isMusicOn', checked)} />
          </div>
          <div className="space-y-4">
            <Label htmlFor="sfx-volume-slider">Sound Effects Volume</Label>
            <div className="flex items-center gap-4">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <Slider id="sfx-volume-slider" value={[currentSettings.sfxVolume]} onValueChange={(value) => handleSettingChange('sfxVolume', value[0])} max={100} step={5} />
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
            <Switch id="voice-narration-switch" checked={currentSettings.isVoiceNarration} onCheckedChange={(checked) => handleSettingChange('isVoiceNarration', checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Gamification Card */}
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
            <Switch id="gamification-switch" checked={currentSettings.isGamification} onCheckedChange={(checked) => handleSettingChange('isGamification', checked)} />
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
            <Switch id="notifications-switch" checked={currentSettings.isAchievementNotifications} onCheckedChange={(checked) => handleSettingChange('isAchievementNotifications', checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Reminders Card */}
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
            <Switch id="daily-reminder-switch" checked={currentSettings.isDailyReminders} onCheckedChange={(checked) => handleSettingChange('isDailyReminders', checked)} />
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
            <Switch id="event-announcements-switch" checked={currentSettings.isEventAnnouncements} onCheckedChange={(checked) => handleSettingChange('isEventAnnouncements', checked)} />
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
            <Switch id="quiet-hours-switch" checked={currentSettings.isQuietHours} onCheckedChange={(checked) => handleSettingChange('isQuietHours', checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Parental Controls Card */}
      <Card>
        <CardHeader>
          <CardTitle>Parental Controls</CardTitle>
          <CardDescription>
            Manage settings for younger users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="playtime-switch" className="flex items-center">
                <Hourglass className="mr-2 h-5 w-5 text-rose-500" />
                Limit Playtime
              </Label>
              <p className="text-sm text-muted-foreground">
                Set daily time limits for app usage.
              </p>
            </div>
            <Switch id="playtime-switch" checked={currentSettings.isPlaytimeLimited} onCheckedChange={(checked) => handleSettingChange('isPlaytimeLimited', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="social-switch" className="flex items-center">
                <MessageCircleOff className="mr-2 h-5 w-5 text-muted-foreground" />
                Restrict Social Features
              </Label>
              <p className="text-sm text-muted-foreground">
                Disable chat and friend requests.
              </p>
            </div>
            <Switch id="social-switch" checked={currentSettings.isSocialRestricted} onCheckedChange={(checked) => handleSettingChange('isSocialRestricted', checked)} />
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback & Support Card */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback &amp; Support</CardTitle>
          <CardDescription>
            Need help or have an idea? Let us know.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full justify-start" onClick={() => handleFeedbackClick('report a bug')}>
            <Bug className="mr-2 h-5 w-5 text-destructive" />
            Report a Bug
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => handleFeedbackClick('suggest a feature')}>
            <LightbulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
            Suggest a Feature
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => handleFeedbackClick('contact support')}>
            <HelpCircle className="mr-2 h-5 w-5 text-primary" />
            Contact Support
          </Button>
        </CardContent>
      </Card>
      
      {/* Floating Action Bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-300",
        isDirty ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="max-w-3xl mx-auto">
            <div className="bg-card border rounded-lg shadow-2xl p-4 flex items-center justify-between">
                <p className="text-sm font-medium">You have unsaved changes.</p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={handleRevertChanges}>
                        <Undo className="mr-2 h-4 w-4" />
                        Revert
                    </Button>
                    <Button onClick={handleApplyChanges}>
                        <Save className="mr-2 h-4 w-4" />
                        Apply Changes
                    </Button>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
