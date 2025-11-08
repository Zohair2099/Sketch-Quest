
"use client"

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { QuestCard, QuestCardSkeleton } from '@/components/quest-card';

const questsData = [
  {
    id: 'py1',
    title: '🐍 Your First Line of Code',
    topic: 'Python',
    level: 1,
    xpReward: 100,
    imageUrlId: 'quest-python',
    description: 'Understand what Python is, print output, and learn syntax basics.'
  },
  {
    id: 'py2',
    title: '💎 Treasure of Variables',
    topic: 'Python',
    level: 2,
    xpReward: 150,
    imageUrlId: 'quest-python',
    description: 'Understand variables, learn different data types, and perform type conversion.'
  },
  {
    id: 'py3',
    title: '⚙️ Math Magic',
    topic: 'Python',
    level: 3,
    xpReward: 180,
    imageUrlId: 'quest-python',
    description: 'Use arithmetic & logical operators, understand precedence, and build expressions.'
  },
  {
    id: 'py4',
    title: '🧭 Path of Decisions',
    topic: 'Python',
    level: 4,
    xpReward: 200,
    imageUrlId: 'quest-python',
    description: 'Learn to use if, elif, else statements, boolean logic, and nested conditions.'
  },
  {
    id: 'py5',
    title: '🔄 Cycle of Codes',
    topic: 'Python',
    level: 5,
    xpReward: 250,
    imageUrlId: 'quest-python',
    description: 'Master for loops, while loops, and control statements like break and continue.'
  },
  {
    id: 'py6',
    title: '🧮 Magic Spells (Functions)',
    topic: 'Python',
    level: 6,
    xpReward: 300,
    imageUrlId: 'quest-python',
    description: 'Define and call functions, understand parameters, return values, and variable scope.'
  },
  {
    id: 'py7',
    title: '📜 Scroll of Collections',
    topic: 'Python',
    level: 7,
    xpReward: 350,
    imageUrlId: 'quest-python',
    description: 'Learn list creation, indexing, slicing, and the immutability of tuples.'
  },
  {
    id: 'py8',
    title: '🗝️ Map of Keys',
    topic: 'Python',
    level: 8,
    xpReward: 400,
    imageUrlId: 'quest-python',
    description: 'Create dictionaries, modify them, and perform set operations to handle unique items.'
  },
  {
    id: 'py9',
    title: '✨ String Sorcery',
    topic: 'Python',
    level: 9,
    xpReward: 450,
    imageUrlId: 'quest-python',
    description: 'Master string concatenation, slicing, formatting, and common string methods.'
  },
  {
    id: 'py10',
    title: '📁 Keeper of Files',
    topic: 'Python',
    level: 10,
    xpReward: 500,
    imageUrlId: 'quest-python',
    description: 'Learn to read from and write to files using with open(), and handle different file modes.'
  },
  {
    id: 'py11',
    title: '⚠️ Guardian of Errors',
    topic: 'Python',
    level: 11,
    xpReward: 550,
    imageUrlId: 'quest-python',
    description: 'Handle exceptions gracefully using try, except, and finally blocks.'
  },
  {
    id: 'py12',
    title: '🧰 Library Explorer',
    topic: 'Python',
    level: 12,
    xpReward: 600,
    imageUrlId: 'quest-python',
    description: 'Learn to import and use powerful Python modules like math, random, and datetime.'
  },
  {
    id: 'py13',
    title: '🏰 Class of Heroes',
    topic: 'Python',
    level: 13,
    xpReward: 650,
    imageUrlId: 'quest-python',
    description: 'Dive into Object-Oriented Programming by defining classes, objects, and using inheritance.'
  },
  {
    id: 'py14',
    title: '🏆 Python Master’s Challenge',
    topic: 'Python',
    level: 14,
    xpReward: 1000,
    imageUrlId: 'quest-python',
    description: 'Combine everything you\'ve learned into one creative mini-project to prove your mastery.'
  },
  {
    id: '1',
    title: 'The Wonders of the Cosmos',
    topic: 'Science',
    level: 2,
    xpReward: 150,
    imageUrlId: 'quest-science',
    description: 'Explore the vastness of our solar system, from the scorching sun to the icy outer planets.'
  },
  {
    id: '2',
    title: 'Introduction to JavaScript',
    topic: 'Coding',
    level: 1,
    xpReward: 100,
    imageUrlId: 'quest-coding',
    description: 'Learn the fundamentals of JavaScript, the language of the web. No prior experience needed!'
  },
  {
    id: '3',
    title: 'The Art of the Renaissance',
    topic: 'Art',
    level: 3,
    xpReward: 200,
    imageUrlId: 'quest-art',
    description: 'Discover the masterpieces of Leonardo, Michelangelo, and Raphael.'
  },
  {
    id: '4',
    title: 'Algebra Basics',
    topic: 'Math',
    level: 1,
    xpReward: 100,
    // No image for this one to test fallback
    description: 'Build a strong foundation in algebraic concepts, solving equations and inequalities.'
  },
];

const subjects = ['All', 'Python', 'Science', 'Coding', 'Art', 'Math', 'History'];

export default function QuestsPage() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuests = questsData.filter(quest => {
    return (selectedSubject === 'All' || quest.topic === selectedSubject) &&
           quest.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Explore Quests</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search quests..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2">
        {subjects.map(subject => (
          <button 
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSubject === subject 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card hover:bg-muted'
            }`}
          >
            {subject}
          </button>
        ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredQuests.length > 0 ? (
          filteredQuests.map(quest => <QuestCard key={quest.id} quest={quest} />)
        ) : (
          <p className="text-muted-foreground md:col-span-2 lg:col-span-3 xl:col-span-4 text-center">
            No quests found. Try a different search or filter.
          </p>
        )}
      </div>
    </div>
  );
}
