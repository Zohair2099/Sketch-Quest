# Sketch-Quest

**Transforming Education into an Epic Adventure.**

Sketch-Quest is a modern, gamified learning platform designed to make education engaging, interactive, and fun. By blending educational content with game mechanics like quests, experience points (XP), badges, and leaderboards, Sketch-Quest turns the learning process into a thrilling adventure for students of all ages.

## ✨ Key Features

- **Interactive Quests**: Bite-sized lessons are framed as exciting quests. Users progress through various levels, tackling challenges and mastering subjects from coding and science to art and math.
- **Gamified Progress**: Earn XP for completing lessons, maintain a daily activity streak, and collect unique badges to showcase achievements.
- **Comprehensive User Profiles**: A detailed profile page that serves as a personal dashboard, showcasing a user's rank, stats, earned badges, skill levels, recent activity, and personal goals.
- **AI-Powered Sketch Analysis**: An innovative feature where students can draw concepts, and our AI assistant provides real-time feedback on whether the sketch correctly represents the prompt.
- **AI Lesson Recommendations**: A smart recommendation engine analyzes a student's performance and learning history to suggest the next best quests, helping them focus on areas for improvement.
- **Competitive Leaderboards**: Students can see how they rank against their peers within their class, school, or on a global scale.
- **Deep Customization**: A robust settings page allows users to personalize their experience, including:
  - **Appearance**: Light/Dark mode and a wide variety of color palettes.
  - **Accessibility**: Adjustable text size and a dyslexia-friendly font.
  - **Gamification**: Toggles for notifications and game elements.
  - **Parental Controls**: Options to limit playtime and restrict social features.
- **Responsive Design**: A seamless experience across desktop and mobile devices, with a dedicated mobile UI featuring a bottom navigation bar for easy access.

## 🚀 Tech Stack

Sketch-Quest is built with a modern, powerful, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN/UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (for LLM and multimodal flows)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Charting**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/Sketch-Quest.git
    cd Sketch-Quest
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up Firebase:**
    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - Add a new Web App to your project.
    - Copy the `firebaseConfig` object and paste it into `src/firebase/config.ts`.
    - In the Firebase console, go to **Build > Firestore Database** and create a new database in Test Mode for now.
    - Go to **Build > Authentication** and enable the "Email/Password" sign-in provider.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9003](http://localhost:9003) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
/
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js pages and layouts
│   │   ├── (auth)/         # Auth-related pages (Login, Signup)
│   │   └── dashboard/      # Protected dashboard routes
│   ├── components/         # Reusable UI components
│   │   └── ui/             # ShadCN UI components
│   ├── ai/                 # Genkit AI flows and configuration
│   ├── context/            # React Context providers (e.g., Settings)
│   ├── firebase/           # Firebase initialization, hooks, and providers
│   ├── hooks/              # Custom React hooks (e.g., useIsMobile)
│   └── lib/                # Utility functions and static data
├── firestore.rules         # Security rules for Firestore
└── tailwind.config.ts      # Tailwind CSS configuration
```

This detailed README should make it much easier to understand the project. Let me know what's next