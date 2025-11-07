
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Laptop, Text, Languages, Bot, Trophy, Bell, BellOff, Music, Volume2, Mic, Shield, Hourglass, MessageCircleOff, Bug, Lightbulb as LightbulbIcon, HelpCircle, Save, Undo, Palette, Wand2, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useSettings, defaultSettings } from '@/context/settings-context';
import { translations, colorPalettes } from '@/lib/translations';


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const {
    settings,
    updateSetting,
    isDirty,
    revertSettings,
    saveSettings
  } = useSettings();

  const handleRandomizePalette = () => {
    const availablePalettes = colorPalettes.filter(p => p.name !== 'default');
    const randomIndex = Math.floor(Math.random() * availablePalettes.length);
    const randomPalette = availablePalettes[randomIndex];
    updateSetting('colorPalette', randomPalette.name);
  };

  const handleApplyChanges = () => {
    saveSettings();
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been applied.',
    });
  };

  const handleRevertChanges = () => {
    revertSettings();
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

  const t = (key: keyof typeof translations['en']) => {
    if(!settings) return translations['en'][key];
    return translations[settings.language as keyof typeof translations]?.[key] || translations['en'][key];
  };

  if (!settings) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-3xl font-bold font-headline">{t('settings')}</h1>
      
      {/* Appearance Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('appearance')}</CardTitle>
          <CardDescription>
            {t('appearance_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t('theme')}</Label>
            <p className="text-sm text-muted-foreground">
              {t('theme_desc')}
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
                  {t('theme_light')}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-2 h-6 w-6" />
                  {t('theme_dark')}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Laptop className="mb-2 h-6 w-6" />
                  {t('theme_system')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <div>
                    <Label>{t('color_palette')}</Label>
                    <p className="text-sm text-muted-foreground">
                        {t('color_palette_desc')}
                    </p>
                </div>
                <Button variant="outline" onClick={handleRandomizePalette}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {t('randomize')}
                </Button>
            </div>
            <RadioGroup
              value={settings.colorPalette}
              onValueChange={(value) => updateSetting('colorPalette', value)}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-2"
            >
              {colorPalettes.map((palette) => (
                <div key={palette.name}>
                    <RadioGroupItem value={palette.name} id={palette.name} className="peer sr-only" />
                    <Label
                        htmlFor={palette.name}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                        <div className="w-6 h-6 rounded-full mb-2" style={{ backgroundColor: palette.color }} />
                        {t(palette.name as keyof typeof translations['en'])}
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
          <CardTitle>{t('language')}</CardTitle>
          <CardDescription>
            {t('language_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="language-select">{t('language_select_label')}</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
              <SelectTrigger id="language-select" className="w-full md:w-1/2">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español (Spanish)</SelectItem>
                <SelectItem value="fr">Français (French)</SelectItem>
                <SelectItem value="de">Deutsch (German)</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="ur">اردو (Urdu)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('accessibility')}</CardTitle>
          <CardDescription>
            {t('accessibility_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size-slider">{t('text_size')}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateSetting('textSize', defaultSettings.textSize)}
                disabled={settings.textSize === defaultSettings.textSize}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to default
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Text className="h-5 w-5 text-muted-foreground" />
              <div className="relative w-full">
                <Slider 
                  id="font-size-slider" 
                  value={[settings.textSize]} 
                  onValueChange={(value) => updateSetting('textSize', value[0])} 
                  max={100} 
                  step={10} 
                />
                <div className="absolute top-full w-full flex justify-between text-xs text-muted-foreground mt-2 px-1">
                  <span>|</span>
                  <span>|</span>
                  <span className="font-bold text-primary">|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                </div>
                 <div className="absolute top-full w-full text-center text-xs text-muted-foreground mt-6">
                    <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Default</span>
                </div>
              </div>
              <Text className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dyslexia-font-switch">{t('dyslexia_font')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('dyslexia_font_desc')}
              </p>
            </div>
            <Switch id="dyslexia-font-switch" checked={settings.isDyslexiaFont} onCheckedChange={(checked) => updateSetting('isDyslexiaFont', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="screen-reader-info">{t('screen_reader')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('screen_reader_desc')}
              </p>
            </div>
            <Bot className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      {/* Audio & Visual Experience Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('audio_visual')}</CardTitle>
          <CardDescription>
            {t('audio_visual_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="bg-music-switch" className="flex items-center">
                <Music className="mr-2 h-5 w-5 text-purple-500" />
                {t('background_music')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('background_music_desc')}
              </p>
            </div>
            <Switch id="bg-music-switch" checked={settings.isMusicOn} onCheckedChange={(checked) => updateSetting('isMusicOn', checked)} />
          </div>
          <div className="space-y-4">
            <Label htmlFor="sfx-volume-slider">{t('sfx_volume')}</Label>
            <div className="flex items-center gap-4">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <Slider id="sfx-volume-slider" value={[settings.sfxVolume]} onValueChange={(value) => updateSetting('sfxVolume', value[0])} max={100} step={5} />
              <Volume2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice-narration-switch" className="flex items-center">
                <Mic className="mr-2 h-5 w-5 text-blue-500" />
                {t('voice_narration')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('voice_narration_desc')}
              </p>
            </div>
            <Switch id="voice-narration-switch" checked={settings.isVoiceNarration} onCheckedChange={(checked) => updateSetting('isVoiceNarration', checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Gamification Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('gamification')}</CardTitle>
          <CardDescription>
            {t('gamification_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="gamification-switch" className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                {t('enable_gamification')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('enable_gamification_desc')}
              </p>
            </div>
            <Switch id="gamification-switch" checked={settings.isGamification} onCheckedChange={(checked) => updateSetting('isGamification', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications-switch" className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                {t('achievement_notifications')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('achievement_notifications_desc')}
              </p>
            </div>
            <Switch id="notifications-switch" checked={settings.isAchievementNotifications} onCheckedChange={(checked) => updateSetting('isAchievementNotifications', checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Reminders Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('notifications')}</CardTitle>
          <CardDescription>
            {t('notifications_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="daily-reminder-switch" className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                {t('daily_reminders')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('daily_reminders_desc')}
              </p>
            </div>
            <Switch id="daily-reminder-switch" checked={settings.isDailyReminders} onCheckedChange={(checked) => updateSetting('isDailyReminders', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="event-announcements-switch" className="flex items-center">
                <Languages className="mr-2 h-5 w-5 text-blue-500" />
                {t('event_announcements')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('event_announcements_desc')}
              </p>
            </div>
            <Switch id="event-announcements-switch" checked={settings.isEventAnnouncements} onCheckedChange={(checked) => updateSetting('isEventAnnouncements', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="quiet-hours-switch" className="flex items-center">
                <BellOff className="mr-2 h-5 w-5 text-muted-foreground" />
                {t('quiet_hours')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('quiet_hours_desc')}
              </p>
            </div>
            <Switch id="quiet-hours-switch" checked={settings.isQuietHours} onCheckedChange={(checked) => updateSetting('isQuietHours', checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Parental Controls Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('parental_controls')}</CardTitle>
          <CardDescription>
            {t('parental_controls_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="playtime-switch" className="flex items-center">
                <Hourglass className="mr-2 h-5 w-5 text-rose-500" />
                {t('limit_playtime')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('limit_playtime_desc')}
              </p>
            </div>
            <Switch id="playtime-switch" checked={settings.isPlaytimeLimited} onCheckedChange={(checked) => updateSetting('isPlaytimeLimited', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="social-switch" className="flex items-center">
                <MessageCircleOff className="mr-2 h-5 w-5 text-muted-foreground" />
                {t('restrict_social')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('restrict_social_desc')}
              </p>
            </div>
            <Switch id="social-switch" checked={settings.isSocialRestricted} onCheckedChange={(checked) => updateSetting('isSocialRestricted', checked)} />
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback & Support Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('feedback_support')}</CardTitle>
          <CardDescription>
            {t('feedback_support_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full justify-start" onClick={() => handleFeedbackClick('report a bug')}>
            <Bug className="mr-2 h-5 w-5 text-destructive" />
            {t('report_bug')}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => handleFeedbackClick('suggest a feature')}>
            <LightbulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
            {t('suggest_feature')}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => handleFeedbackClick('contact_support')}>
            <HelpCircle className="mr-2 h-5 w-5 text-primary" />
            {t('contact_support')}
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
                <p className="text-sm font-medium">{t('unsaved_changes')}</p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={handleRevertChanges}>
                        <Undo className="mr-2 h-4 w-4" />
                        {t('revert')}
                    </Button>
                    <Button onClick={handleApplyChanges}>
                        <Save className="mr-2 h-4 w-4" />
                        {t('apply_changes')}
                    </Button>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}

    