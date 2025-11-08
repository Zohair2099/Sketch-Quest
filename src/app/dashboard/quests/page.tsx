
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
          "Understand what Python is and why it's popular.",
          'Learn the basic syntax for printing output.',
          'Write and run your very first line of code.',
        ],
        miniLessons: [
          {
            title: 'What is Python?',
            content: 'Python is a high-level, interpreted, general-purpose programming language. It is designed for readability and simplicity, making it perfect for beginners. Let\'s break down what that means:\n\n- **High-level**: You can write code that is closer to human language without worrying about complex details of the computer\'s hardware (like memory management).\n- **Interpreted**: Python code is executed line by line by an interpreter. This is different from "compiled" languages that need to be fully converted to machine code before they can run. Interpretation makes testing and debugging much faster.\n- **General-purpose**: You can use Python for almost anything! From building websites and analyzing data to creating AI and making games.\n- **Open-source**: It\'s completely free to use, and a massive global community of developers contributes to its improvement.',
          },
          {
            title: 'A Fun Fact About the Name',
            content: 'Python was created by Guido van Rossum and first released in 1991. Contrary to popular belief, it wasn\'t named after the snake! Guido was a fan of the British comedy group Monty Python, and he named the language after their show, "Monty Python\'s Flying Circus".',
          },
          {
            title: 'Why is Python So Popular?',
            content: 'Python\'s popularity has exploded for a few key reasons:\n\n- **Easy to Learn**: Its syntax is clean and intuitive, often described as being like "executable pseudocode."\n- **Versatile**: It\'s a Swiss Army knife for programmers, used in web development (Django, Flask), data science (Pandas, NumPy), machine learning (TensorFlow, PyTorch), automation, and more.\n- **Huge Ecosystem**: Python has a vast collection of "libraries" and "frameworks"—pre-written code that you can use to perform complex tasks without starting from scratch.',
          },
          {
            title: 'Your First Command: print()',
            content: 'The most basic and often first command you\'ll learn in any language is how to display output. In Python, this is done with the `print()` function.\n\nA "function" is a reusable block of code that performs a specific action. The `print()` function\'s action is to show whatever you put inside its parentheses on the screen.\n\nText that you want to print is called a "string," and it must be enclosed in either single quotes (\'\') or double quotes ("").\n\n**Example:**\n`print("Welcome to SketchQuest!")`',
          },
        ],
        miniQuests: [
          {
            title: 'Print Your Name',
            description: 'Use the print() function to display your name on the screen.',
          },
          {
            title: 'Print a Quote',
            description: 'Try printing a famous quote. Remember to handle quotation marks inside the string correctly, like this: `print("Someone said, \\"I love coding!\\"")`',
          },
        ],
        xpReward: 50,
        badge: 'First Code Run',
      },
      {
        id: 'py2',
        level: 2,
        title: '⚙️ Installing Python and Tools',
        description: 'Set up your coding environment to start building.',
        learningGoals: [
          'Install Python on your computer.',
          'Verify that the installation was successful.',
          'Understand what an IDE is and why it helps.',
        ],
        miniLessons: [
          {
            title: 'Getting Python on Your Machine',
            content: 'To start coding in Python on your own computer, you first need to install it. The official Python website is the best place to get it.\n\n1.  **Visit python.org/downloads**.\n2.  The site will automatically detect your operating system (Windows, macOS) and suggest the best version to download.\n3.  Click the download button for the latest version.\n4.  **Crucial Step for Windows Users**: When the installer runs, make sure to check the box that says **"Add Python to PATH"** or **"Add python.exe to PATH"**. This allows you to run Python from any folder on your computer.',
          },
          {
            title: 'Verifying Your Installation',
            content: 'Once the installation is complete, you need to verify that it worked. You can do this using your computer\'s command line interface (CLI).\n\n- **On Windows**: Open Command Prompt, PowerShell, or Windows Terminal.\n- **On macOS**: Open the Terminal app.\n\nOnce opened, type the following command and press Enter:\n`python --version`\n\nIf the installation was successful, you should see something like `Python 3.12.4`. The exact numbers may differ, but as long as it shows a version, you are ready to go!',
          },
          {
            title: 'What is an IDE?',
            content: 'An Integrated Development Environment (IDE) is a software application that makes programming much easier. Think of it as a super-powered text editor designed specifically for writing code. Most IDEs include:\n\n- **Code Editor**: With syntax highlighting to make code readable.\n- **Debugger**: A tool to help you find and fix errors in your code.\n- **Terminal Integration**: To run your code directly within the application.\n- **Extensions**: To add new features and tools.\n\nPopular IDEs for Python include **VS Code** (highly recommended for beginners), **PyCharm**, and the simple **IDLE** which comes bundled with Python. For online coding without any installation, tools like **Replit** are fantastic.',
          },
        ],
        miniQuests: [
          { title: 'System Check', description: 'Open your terminal and run the `python --version` command.' },
          {
            title: 'Create a Python File',
            description: 'Create a new file named `hello.py` on your computer.',
          },
        ],
        xpReward: 70,
        badge: 'Setup Wizard',
      },
      {
        id: 'py3',
        level: 3,
        title: '✍️ Your First Program',
        description: 'Write and run your first multi-line Python program.',
        learningGoals: [
          'Understand how a program is executed.',
          'Write multiple lines of code in a single file.',
          'Learn about common beginner syntax errors.',
        ],
        miniLessons: [
          {
            title: 'What is a Program?',
            content: 'A program is simply a sequence of instructions that a computer can execute. When you run a Python script, the Python interpreter reads your file from top to bottom, executing each instruction one by one. This sequential execution is a fundamental concept in programming.',
          },
          {
            title: 'Running Your Code',
            content: 'There are two primary ways to run Python code:\n\n1.  **Interactive Mode**: You can open your terminal and type `python`. This starts an interactive session where you can type commands one at a time and see the results instantly. It\'s great for quick tests.\n\n2.  **Script Mode**: This is the most common way. You save your code in a file with a `.py` extension (e.g., `my_program.py`). Then, you navigate to that file\'s directory in your terminal and run it using the command: `python my_program.py`.',
          },
          {
            title: 'Strings vs. Numbers',
            content: 'Python treats data differently based on its type. Text values are called **strings** and must be wrapped in quotes (e.g., `"Hello"`). Numbers can be integers (e.g., `10`) or decimals (e.g., `3.14`) and are not wrapped in quotes. The `print()` function can handle both, but the output changes:\n\n- `print("5 + 3")` will print the literal text `5 + 3`.\n- `print(5 + 3)` will first perform the addition and then print the result, `8`.',
          },
          {
            title: 'Common Beginner Errors',
            content: 'When you\'re starting, you\'ll encounter errors—and that\'s perfectly normal! Here are a few common ones:\n\n- **SyntaxError**: This happens when your code violates Python\'s grammar rules, like forgetting a closing parenthesis or quotation mark. The error message will often point you to the line where the mistake is.\n- **NameError**: This occurs if you try to use a variable or function that hasn\'t been defined yet.\n- **IndentationError**: Python uses whitespace (spaces and tabs) to structure code. If your lines aren\'t indented correctly, Python will raise this error. We\'ll cover this more in future lessons!',
          },
        ],
        miniQuests: [
          {
            title: 'Create welcome.py',
            description: 'Create a file named welcome.py and write two print statements in it: one to say "Welcome to SketchQuest!" and another saying "Let\'s learn Python together!". Run it from your terminal.',
          },
          {
            title: 'Number Challenge',
            description: 'Write a program that calculates and prints the result of `100 - 25`.',
          },
        ],
        xpReward: 100,
        badge: 'Program Author',
      },
      {
        id: 'py4',
        level: 4,
        title: '📝 Comments and Clean Code',
        description: 'Learn to write code that is easy for you and others to read.',
        learningGoals: [
          'Understand the purpose of comments in code.',
          'Learn to write single-line and multi-line comments.',
          'Follow best practices for writing clean and readable code.',
        ],
        miniLessons: [
          {
            title: 'What Are Comments?',
            content: 'Comments are explanatory notes within your code. They are completely ignored by the Python interpreter, meaning they do not affect how your program runs. Their sole purpose is to make the code more understandable for humans.',
          },
          {
            title: 'Types of Comments in Python',
            content: 'Python has two main ways to create comments:\n\n1.  **Single-Line Comments**: These start with a hash symbol (`#`) and extend to the end of the line. They are perfect for brief notes.\n    *Example*: `# This line calculates the total score.`\n\n2.  **Multi-Line Comments**: While Python doesn\'t have an official syntax for multi-line comments, you can use triple-quoted strings (`"""` or `\'\'\'`) to achieve a similar effect. These are often used at the beginning of a file or function to provide a detailed description (this is called a "docstring").\n    *Example*:\n    ```\n    """\n    This program is a simple calculator.\n    Author: Alex\n    Date: 2024-08-15\n    """\n    ```',
          },
          {
            title: 'Why Writing Comments is a Superpower',
            content: 'Good code explains *what* it does. Good comments explain *why* it does it. Commenting is crucial because:\n\n- **It helps your future self**: When you look at your code months later, you\'ll be glad you left notes explaining your logic.\n- **It improves teamwork**: It allows other developers to understand your code quickly without having to decipher every line.\n- **It aids in debugging**: You can temporarily "comment out" lines of code to disable them and help isolate a problem.',
          },
          {
            title: 'Best Practices for Clean Code',
            content: 'Clean code is more than just comments. It\'s about writing code that is readable and maintainable.\n\n- **Use descriptive names**: Name your variables and functions in a way that describes their purpose (e.g., `user_name` is better than `un`).\n- **Be consistent**: Stick to a consistent style for naming and formatting.\n- **Don\'t over-comment**: Avoid stating the obvious. For example, `x = x + 1 # Add one to x` is a redundant comment.',
          },
        ],
        miniQuests: [
          {
            title: 'Comment Your Code',
            description: 'Take the `welcome.py` program from the last lesson and add a single-line comment above each print statement explaining what it does.',
          },
          {
            title: 'Add a Header',
            description: 'Add a multi-line comment at the top of your `welcome.py` file with your name, the date, and a short description of the program.',
          },
        ],
        xpReward: 80,
        badge: 'Code Communicator',
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




