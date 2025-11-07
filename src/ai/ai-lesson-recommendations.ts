'use server';

/**
 * @fileOverview Implements the AI-powered lesson recommendation flow.
 *
 * - recommendNextLessons -  A function that takes a student's learning history and recommends the next best lessons or quests.
 * - RecommendNextLessonsInput - The input type for the recommendNextLessons function.
 * - RecommendNextLessonsOutput - The return type for the recommendNextLessons function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendNextLessonsInputSchema = z.object({
  studentId: z.string().describe('The unique identifier of the student.'),
  learningHistory: z.string().describe('A summary of the student\'s learning history, including completed lessons, quiz scores, and areas of difficulty.'),
  availableLessons: z.string().describe('A list of available lessons or quests, including their topics and difficulty levels.'),
});
export type RecommendNextLessonsInput = z.infer<typeof RecommendNextLessonsInputSchema>;

const RecommendNextLessonsOutputSchema = z.object({
  recommendedLessons: z.string().describe('A list of recommended lessons or quests for the student, with explanations for each recommendation.'),
});
export type RecommendNextLessonsOutput = z.infer<typeof RecommendNextLessonsOutputSchema>;

export async function recommendNextLessons(input: RecommendNextLessonsInput): Promise<RecommendNextLessonsOutput> {
  return recommendNextLessonsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendNextLessonsPrompt',
  input: {schema: RecommendNextLessonsInputSchema},
  output: {schema: RecommendNextLessonsOutputSchema},
  prompt: `You are an AI learning assistant that analyzes a student's learning history and recommends the next best lessons or quests to improve their weak areas.

  Student ID: {{{studentId}}}
  Learning History: {{{learningHistory}}}
  Available Lessons: {{{availableLessons}}}

  Based on the student's learning history and the available lessons, recommend the next best lessons or quests for the student. Explain why each lesson is recommended, focusing on how it will help the student improve their weak areas.  Format your response as a list of recommended lessons with explanations.
  `,
});

const recommendNextLessonsFlow = ai.defineFlow(
  {
    name: 'recommendNextLessonsFlow',
    inputSchema: RecommendNextLessonsInputSchema,
    outputSchema: RecommendNextLessonsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
