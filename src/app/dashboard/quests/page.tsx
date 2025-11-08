
"use client"

import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { QuestCard, QuestCardSkeleton } from '@/components/quest-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { QuestListItem, QuestListItemSkeleton } from '@/components/quest-list-item';
import { cn } from '@/lib/utils';

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
      { 
        id: 'py1', 
        level: 1, 
        title: '🐍 What is Python?', 
        description: 'Begin your adventure into the world of Python.',
        learningGoals: [
          'Understand what Python is and why it\'s popular.',
          'Learn the basic syntax for printing output.',
          'Write and run your very first line of code.'
        ], 
        miniLessons: [
          { title: 'What is Python?', content: 'Python is a high-level, interpreted, general-purpose programming language. It is designed for readability and ease of use, making it perfect for beginners.\n\nHigh-level: You don’t need to manage memory or hardware details.\nInterpreted: Python executes code line-by-line, so you can test quickly.\nOpen-source: Free to use and has a huge global community.' },
          { title: 'Why Learn Python?', content: 'It has a simple syntax, like reading English. It\'s used everywhere: AI, Web Development, Data Science, and Automation.' },
          { title: 'Your First Command: print()', content: 'The `print()` function is used to display output on the screen. Anything inside the parentheses and quotes will be printed. For example: `print("Welcome to SketchQuest!")`' }
        ], 
        miniQuests: [
          { title: 'Print Your Name', description: 'Use the print() function to display your name on the screen.' }, 
          { title: 'Print a Quote', description: 'Try printing a famous quote. Remember to handle quotation marks inside the string correctly, like this: `print("Someone said, \\"I love coding!\\"")`' }
        ], 
        xpReward: 50, 
        badge: 'First Code Run' 
      },
      { 
        id: 'py2', 
        level: 2, 
        title: '⚙️ Installing Python and Tools', 
        description: 'Set up your coding environment to start building.',
        learningGoals: [
          'Install Python on your computer.',
          'Verify that the installation was successful.',
          'Understand what an IDE is and why it helps.'
        ], 
        miniLessons: [
          { title: 'Installing Python', content: 'Go to python.org/downloads and download the latest version. During installation, make sure to check the box that says "Add Python to PATH".' }, 
          { title: 'Checking Your Installation', content: 'Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and type `python --version`. If you see a version number like "Python 3.12.1", you\'re all set!' },
          { title: 'What is an IDE?', content: 'An Integrated Development Environment (IDE) is a software application that provides comprehensive facilities to computer programmers for software development. An IDE normally consists of at least a source code editor, build automation tools, and a debugger. VS Code, PyCharm, and Replit are popular choices.' }
        ], 
        miniQuests: [
          { title: 'System Check', description: 'Open your terminal and run the `python --version` command.' }, 
          { title: 'Create a Python File', description: 'Create a new file named `hello.py` on your computer.' }
        ], 
        xpReward: 70, 
        badge: 'Setup Wizard' 
      },
      { 
        id: 'py3', 
        level: 3, 
        title: '✍️ Your First Program', 
        description: 'Write and run your first multi-line Python program.',
        learningGoals: [
          'Understand how a program is executed.',
          'Write multiple lines of code in a single file.',
          'Learn about common beginner syntax errors.'
        ], 
        miniLessons: [
          { title: 'What is a Program?', content: 'A program is a set of instructions you give to the computer. Python executes these instructions one by one, from top to bottom.' },
          { title: 'Strings and Numbers', content: 'Text inside quotes (like "Hello") is called a string. Numbers (like 5 or 3.14) can be used for calculations. `print("5 + 3")` will print the text "5 + 3", but `print(5 + 3)` will print the result, 8.' },
          { title: 'Running a .py File', content: 'You can save your code in a file with a `.py` extension. To run it, navigate to the file\'s directory in your terminal and type `python your_file_name.py`.' }
        ], 
        miniQuests: [
          { title: 'Create welcome.py', description: 'Create a file named welcome.py and write two print statements in it: one to say "Welcome to SketchQuest!" and another saying "Let\'s learn Python together!". Run it from your terminal.' },
          { title: 'Number Challenge', description: 'Write a program that calculates and prints the result of `100 - 25`.' }
        ], 
        xpReward: 100, 
        badge: 'Program Author' 
      },
      { 
        id: 'py4', 
        level: 4, 
        title: '📝 Comments and Clean Code', 
        description: 'Learn to write code that is easy for you and others to read.',
        learningGoals: [
          'Understand the purpose of comments in code.',
          'Learn to write single-line and multi-line comments.',
          'Follow best practices for writing clean and readable code.'
        ], 
        miniLessons: [
          { title: 'Single-Line Comments', content: 'Use the hash symbol (`#`) to add a comment. Python will ignore everything on the line after the `#`. \nExample: `# This is a comment`' },
          { title: 'Multi-Line Comments', content: 'Use triple quotes (`"""` or `\'\'\'`) to create a multi-line comment. This is often used for explaining the purpose of a file or a complex function.\nExample: `"""This program is for my first quest."""`' },
          { title: 'Why Use Comments?', content: 'Comments make your code easier to understand for your future self and for others who might read it. They help explain *why* you did something, not just *what* the code does.' }
        ], 
        miniQuests: [
          { title: 'Comment Your Code', description: 'Take the `welcome.py` program from the last lesson and add a single-line comment above each print statement explaining what it does.' }, 
          { title: 'Add a Header', description: 'Add a multi-line comment at the top of your `welcome.py` file with your name, the date, and a short description of the program.' }
        ], 
        xpReward: 80, 
        badge: 'Code Communicator' 
      },
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
];

const subjects = ['All', 'Python', 'Science', 'Coding', 'Art', 'Math', 'History'];

export default function QuestsPage() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
      case 'oldest':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case 'xp-low-high':
        return getQuestXp(a) - getQuestXp(b);
      case 'xp-high-low':
        return getQuestXp(b) - getQuestXp(a);
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
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search quests..." 
                className="pl-12 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full md:w-[240px] h-12">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="xp-low-high">XP: Low to High</SelectItem>
                <SelectItem value="xp-high-low">XP: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
                <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                    <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                    <List className="h-5 w-5" />
                </Button>
            </div>
        </div>
      </div>

      <div className="flex items-center overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2">
        {subjects.map(subject => (
          <button 
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
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

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <QuestCardSkeleton key={index} />)
            ) : filteredQuests.length > 0 ? (
            filteredQuests.map(quest => <QuestCard key={'topicId' in quest ? quest.topicId : quest.id} quest={quest} />)
            ) : (
            <p className="text-muted-foreground md:col-span-2 lg:col-span-3 xl:col-span-4 text-center">
                No quests found. Try a different search or filter.
            </p>
            )}
        </div>
      ) : (
        <div className="space-y-4">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => <QuestListItemSkeleton key={index} />)
            ) : filteredQuests.length > 0 ? (
                filteredQuests.map(quest => <QuestListItem key={'topicId' in quest ? quest.topicId : quest.id} quest={quest} />)
            ) : (
                 <p className="text-muted-foreground text-center pt-8">
                    No quests found. Try a different search or filter.
                </p>
            )}
        </div>
      )}
    </div>
  );
}



