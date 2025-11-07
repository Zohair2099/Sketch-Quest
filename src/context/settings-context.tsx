
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Define the shape of our settings
export interface SettingsState {
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
  playtimeLimitHours: number;
  playtimeLimitMinutes: number;
  isSocialRestricted: boolean;
  colorPalette: string;
}

// Define the default settings
export const defaultSettings: SettingsState = {
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
  playtimeLimitHours: 1,
  playtimeLimitMinutes: 0,
  isSocialRestricted: false,
  colorPalette: 'crimson',
};

// Define the context shape
interface SettingsContextType {
  settings: SettingsState;
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  isDirty: boolean;
  saveSettings: () => void;
  revertSettings: () => void;
}

// Create the context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Define the provider props
interface SettingsProviderProps {
  children: ReactNode;
}

// Create the provider component
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [savedSettings, setSavedSettings] = useState<SettingsState>(defaultSettings);
  const [currentSettings, setCurrentSettings] = useState<SettingsState>(defaultSettings);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('sketchQuestSettings');
      if (storedSettings) {
        const loaded = JSON.parse(storedSettings);
        setSavedSettings(loaded);
        setCurrentSettings(loaded);
      } else {
        // First time load, set default
        setSavedSettings(defaultSettings);
        setCurrentSettings(defaultSettings);
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
      // Fallback to default if localStorage is corrupt or unavailable
      setSavedSettings(defaultSettings);
      setCurrentSettings(defaultSettings);
    }
  }, []);

  // This effect handles applying the PREVIEW of the settings
  useEffect(() => {
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

  const updateSetting = useCallback(<K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setCurrentSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem('sketchQuestSettings', JSON.stringify(currentSettings));
      setSavedSettings(currentSettings);
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
    }
  }, [currentSettings]);

  const revertSettings = useCallback(() => {
    setCurrentSettings(savedSettings);
  }, [savedSettings]);

  const isDirty = React.useMemo(() => JSON.stringify(savedSettings) !== JSON.stringify(currentSettings), [savedSettings, currentSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSetting,
        isDirty,
        saveSettings,
        revertSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Create a custom hook for using the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

    

    

