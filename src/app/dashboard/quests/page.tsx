"use client"

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { QuestCard, QuestCardSkeleton } from '@/components/quest-card';

const questsData = [
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

const subjects = ['All', 'Science', 'Coding', 'Art', 'Math', 'History'];

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
