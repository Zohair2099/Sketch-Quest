
"use client"

import { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { QuestCard } from '@/components/quest-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface MiniLesson {
  title: string;
  content: string;
}

export interface MiniQuest {
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  level: number;
  title: string;
  learningGoals: string[];
  miniLessons: MiniLesson[];
  miniQuests: MiniQuest[];
  xpReward: number;
  badge: string;
  description: string;
}

export interface QuestTopic {
  topicId: string;
  topic: string;
  title: string;
  imageUrlId: string;
  description: string;
  lessons: Lesson[];
  dateAdded: string;
  trending: boolean;
}

export type Quest = QuestTopic | {
  id: string;
  title: string;
  topic: string;
  level: number;
  xpReward: number;
  imageUrlId?: string;
  description: string;
  dateAdded: string;
  trending: boolean;
};


export const questsData: Quest[] = [
  {
    topicId: 'python',
    topic: 'Python',
    title: 'The Path of the Python',
    imageUrlId: 'quest-python',
    description: 'A comprehensive journey to master the Python programming language, from basic syntax to advanced concepts like object-oriented programming.',
    dateAdded: '2024-08-01T12:00:00Z',
    trending: true,
    lessons: [
      { id: 'py1', level: 1, title: '🐍 Your First Line of Code', learningGoals: ['Understand what Python is', 'Print output', 'Learn syntax basics'], miniLessons: [{ title: 'What is Python?', content: 'A high-level, interpreted programming language.' }, { title: 'Writing your first program', content: 'Use the print() function to display output.' }, { title: 'Comments in Python', content: 'Use the # symbol for single-line comments.' }, { title: 'The print() function', content: 'Outputs text or variables to the console.' }], miniQuests: [{ title: '🧩 “Hello, World!”', description: 'Print “Hello, SketchQuest!”' }, { title: '⚡ “Comment Quest”', description: 'Add a comment explaining your code' }, { title: '🎯 “Syntax Master”', description: 'Spot and fix errors in sample code' }], xpReward: 100, badge: 'Code Beginner', description: 'Start your coding journey.' },
      { id: 'py2', level: 2, title: '💎 Treasure of Variables', learningGoals: ['Understand variables', 'Learn different data types', 'Type conversion'], miniLessons: [{ title: 'What is a variable?', content: 'A container for storing data values.' }, { title: 'Data types: int, float, str, bool', content: 'Learn about numbers, text, and true/false values.' }, { title: 'Type casting', content: 'How to convert between data types, e.g., int() or str().' }, { title: 'Checking types with type()', content: 'Use the type() function to find a variable\'s type.' }], miniQuests: [{ title: '🎯 “Treasure Chest”', description: 'Assign variables to store gold coins, player name' }, { title: '🧩 “Type Hunter”', description: 'Identify the correct type of given values' }, { title: '⚡ “Conversion Wizard”', description: 'Convert string to integer' }], xpReward: 150, badge: 'Variable Explorer', description: 'Learn to store and manage data.' },
      { id: 'py3', level: 3, title: '⚙️ Math Magic', learningGoals: ['Use arithmetic & logical operators', 'Understand precedence', 'Build expressions'], miniLessons: [], miniQuests: [{ title: '🧩 “Calculator Quest”', description: 'Create a mini calculator' }, { title: '🎯 “True or False?”', description: 'Use logical operators' }, { title: '⚡ “Battle of Brackets”', description: 'Solve precedence puzzles' }], xpReward: 180, badge: 'Math Magician', description: 'Perform calculations and logic.' },
      { id: 'py4', level: 4, title: '🧭 Path of Decisions', learningGoals: ['if, elif, else', 'Boolean logic', 'Nested conditions'], miniLessons: [], miniQuests: [{ title: '🎯 “Weather Wizard”', description: 'Write code to decide if you need an umbrella' }, { title: '🧩 “Pass or Fail”', description: 'Grade student marks' }, { title: '⚡ “Guess the Number”', description: 'Simple if-else game' }], xpReward: 200, badge: 'Logic Knight', description: 'Control your code\'s flow.' },
      { id: 'py5', level: 5, title: '🔄 Cycle of Codes', learningGoals: ['for loops, while loops', 'break and continue', 'Nested loops'], miniLessons: [], miniQuests: [{ title: '🎯 “Multiplication Matrix”', description: 'Generate 1–10 tables' }, { title: '⚡ “Countdown Quest”', description: 'Print countdown from 10' }, { title: '🧩 “Treasure Hunt”', description: 'Loop through list items' }], xpReward: 250, badge: 'Loop Master', description: 'Repeat actions with loops.' },
      { id: 'py6', level: 6, title: '🧮 Magic Spells (Functions)', learningGoals: ['Defining & calling functions', 'Parameters & return values', 'Scope of variables'], miniLessons: [], miniQuests: [{ title: '🧩 “Spell Creator”', description: 'Write a function to print a greeting' }, { title: '🎯 “Sum Wizard”', description: 'Add two numbers using function' }, { title: '⚡ “Mystery Function”', description: 'Debug a faulty function' }], xpReward: 300, badge: 'Function Magician', description: 'Create reusable blocks of code.' },
      { id: 'py7', level: 7, title: '📜 Scroll of Collections', learningGoals: ['List creation, indexing, slicing', 'Tuple immutability'], miniLessons: [], miniQuests: [{ title: '🎯 “Shopping Quest”', description: 'Store and print grocery items' }, { title: '⚡ “Slice the List”', description: 'Extract a portion of the list' }, { title: '🧩 “Count It”', description: 'Count elements in a list' }], xpReward: 350, badge: 'Collection Keeper', description: 'Organize data in lists and tuples.' },
      { id: 'py8', level: 8, title: '🗝️ Map of Keys', learningGoals: ['Create and modify dictionaries', 'Add/remove keys and values', 'Set operations'], miniLessons: [], miniQuests: [{ title: '🧩 “Phone Book”', description: 'Create a dictionary of names & numbers' }, { title: '⚡ “Key Finder”', description: 'Check if a key exists' }, { title: '🎯 “Unique Collector”', description: 'Use sets to remove duplicates' }], xpReward: 400, badge: 'Map Master', description: 'Use key-value pairs and sets.' },
      { id: 'py9', level: 9, title: '✨ String Sorcery', learningGoals: ['Concatenation, slicing, formatting', 'Common string methods'], miniLessons: [], miniQuests: [{ title: '🎯 “Word Reverser”', description: 'Reverse a given word' }, { title: '⚡ “Name Formatter”', description: 'Use .title() method' }, { title: '🧩 “Letter Counter”', description: 'Count characters in a string' }], xpReward: 450, badge: 'Wordsmith', description: 'Master text manipulation.' },
      { id: 'py10', level: 10, title: '📁 Keeper of Files', learningGoals: ['Read and write files', 'Use with open()', 'File modes and handling'], miniLessons: [], miniQuests: [{ title: '🎯 “Create Log”', description: 'Write to a text file' }, { title: '⚡ “Read the Secret”', description: 'Read from a file and display' }, { title: '🧩 “Error Buster”', description: 'Handle file not found error' }], xpReward: 500, badge: 'File Keeper', description: 'Work with files on your computer.' },
      { id: 'py11', level: 11, title: '⚠️ Guardian of Errors', learningGoals: ['try, except, finally', 'Handling multiple errors'], miniLessons: [], miniQuests: [{ title: '🎯 “Safe Division”', description: 'Handle division by zero' }, { title: '⚡ “Input Guard”', description: 'Catch invalid input' }, { title: '🧩 “Mystery Box”', description: 'Debug hidden errors' }], xpReward: 550, badge: 'Debugger', description: 'Handle errors gracefully.' },
      { id: 'py12', level: 12, title: '🧰 Library Explorer', learningGoals: ['import statements', 'math, random, datetime modules'], miniLessons: [], miniQuests: [{ title: '🎯 “Dice Roller”', description: 'Use random.randint()' }, { title: '⚡ “Square Root Wizard”', description: 'Use math.sqrt()' }, { title: '🧩 “Date Tracker”', description: 'Print current date' }], xpReward: 600, badge: 'Library Explorer', description: 'Use powerful Python modules.' },
      { id: 'py13', level: 13, title: '🏰 Class of Heroes', learningGoals: ['Define classes & objects', 'Inheritance, constructors', 'Methods & attributes'], miniLessons: [], miniQuests: [{ title: '🎯 “Hero Creator”', description: 'Create a Hero class with attributes' }, { title: '⚡ “Power Inheritance”', description: 'Create subclass Wizard(Hero)' }, { title: '🧩 “Battle Simulation”', description: 'Make two objects interact' }], xpReward: 650, badge: 'OOP Knight', description: 'Learn Object-Oriented Programming.' },
      { id: 'py14', level: 14, title: '🏆 Python Master’s Challenge', learningGoals: ['Combine everything learned into one creative mini project.'], miniLessons: [], miniQuests: [], xpReward: 1000, badge: 'Python Master', description: 'Prove your mastery.' },
    ]
  },
  {
    id: '1',
    title: 'The Wonders of the Cosmos',
    topic: 'Science',
    level: 2,
    xpReward: 150,
    imageUrlId: 'quest-science',
    description: 'Explore the vastness of our solar system, from the scorching sun to the icy outer planets.',
    dateAdded: '2024-07-20T10:00:00Z',
    trending: true,
  },
  {
    id: '2',
    title: 'Introduction to JavaScript',
    topic: 'Coding',
    level: 1,
    xpReward: 100,
    imageUrlId: 'quest-coding',
    description: 'Learn the fundamentals of JavaScript, the language of the web. No prior experience needed!',
    dateAdded: '2024-07-15T09:00:00Z',
    trending: false,
  },
  {
    id: '3',
    title: 'The Art of the Renaissance',
    topic: 'Art',
    level: 3,
    xpReward: 200,
    imageUrlId: 'quest-art',
    description: 'Discover the masterpieces of Leonardo, Michelangelo, and Raphael.',
    dateAdded: '2024-08-05T11:00:00Z',
    trending: false,
  },
  {
    id: '4',
    title: 'Algebra Basics',
    topic: 'Math',
    level: 1,
    xpReward: 100,
    description: 'Build a strong foundation in algebraic concepts, solving equations and inequalities.',
    dateAdded: '2024-06-30T15:00:00Z',
    trending: true,
  },
];

const subjects = ['All', 'Python', 'Science', 'Coding', 'Art', 'Math', 'History'];

export default function QuestsPage() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const getQuestXp = (quest: Quest) => {
    if ('lessons' in quest) {
      return quest.lessons.reduce((total, lesson) => total + lesson.xpReward, 0);
    }
    return quest.xpReward;
  };

  const sortedQuests = [...questsData].sort((a, b) => {
    switch (sortOption) {
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'xp':
        return getQuestXp(a) - getQuestXp(b);
      default:
        return 0;
    }
  });

  const filteredQuests = sortedQuests.filter(quest => {
    return (selectedSubject === 'All' || quest.topic === selectedSubject) &&
           quest.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Explore Quests</h1>
        <div className="flex w-full md:w-auto items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search quests..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full md:w-[180px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="xp">XP: Low to High</SelectItem>
              </SelectContent>
            </Select>
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
          filteredQuests.map(quest => <QuestCard key={'topicId' in quest ? quest.topicId : quest.id} quest={quest} />)
        ) : (
          <p className="text-muted-foreground md:col-span-2 lg:col-span-3 xl:col-span-4 text-center">
            No quests found. Try a different search or filter.
          </p>
        )}
      </div>
    </div>
  );
}

  