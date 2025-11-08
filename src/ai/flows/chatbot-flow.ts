
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

export async function getChatbotResponse(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a friendly and encouraging AI assistant for SketchQuest, a gamified learning platform. Your goal is to help students with their learning journey.

Keep your responses concise, helpful, and positive. You can answer questions about quests, explain concepts, or just provide encouragement.

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
