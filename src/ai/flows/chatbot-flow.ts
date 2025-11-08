
'use server';
/**
 * @fileOverview A conversational AI flow for the SketchQuest chatbot assistant.
 *
 * - getChatbotResponse - A function that takes conversation history and returns the AI's response.
 * - ChatbotInput - The input type for the getChatbotResponse function.
 * - ChatbotOutput - The return type for the getChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {getUsers} from '@/lib/user-data';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatbotInputSchema = z.object({
  history: z
    .array(MessageSchema)
    .describe('The conversation history between the user and the AI.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

const getStudentInfo = ai.defineTool(
  {
    name: 'getStudentInfo',
    description:
      "Get information about students, such as their experience points (XP) or quest completion status. Use this to answer questions about student rankings or who has finished a specific quest.",
    inputSchema: z.object({
      questId: z.string().optional().describe('The ID of a quest to check for completion, e.g., "py1".'),
      minXp: z.number().optional().describe('The minimum XP a student must have.'),
    }),
    outputSchema: z.object({
        students: z.array(z.object({
            username: z.string(),
            xp: z.number(),
        }))
    }),
  },
  async (input) => {
    const students = await getUsers({
        completedLesson: input.questId,
        minXp: input.minXp,
    });
    return { students };
  }
);


export async function getChatbotResponse(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  tools: [getStudentInfo],
  prompt: `You are a friendly and encouraging AI assistant for SketchQuest, a gamified learning platform. Your goal is to help students with their learning journey.

Keep your responses concise, helpful, and positive. You can answer questions about quests, explain concepts, or just provide encouragement.

If the user asks for a list of students based on their performance, like who has the most XP or who has completed a specific quest, use the getStudentInfo tool to fetch the data and then present it in a friendly, readable format.

Here is the conversation history so far:
{{#each history}}
- {{role}}: {{content}}
{{/each}}

Based on this history, provide a helpful and encouraging response to the user's last message.
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
