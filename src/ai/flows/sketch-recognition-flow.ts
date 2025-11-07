'use server';
/**
 * @fileOverview An AI flow for recognizing and analyzing user-drawn sketches.
 *
 * - analyzeSketch - A function that handles the sketch analysis process.
 * - AnalyzeSketchInput - The input type for the analyzeSketch function.
 * - AnalyzeSketchOutput - The return type for the analyzeSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSketchInputSchema = z.object({
  sketchDataUri: z
    .string()
    .describe(
      "The user's drawing, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('The prompt or task the user was asked to draw.'),
});
export type AnalyzeSketchInput = z.infer<typeof AnalyzeSketchInputSchema>;

const AnalyzeSketchOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the drawing correctly represents the prompt.'),
  feedback: z.string().describe('Constructive feedback about the drawing, explaining why it is correct or incorrect.'),
});
export type AnalyzeSketchOutput = z.infer<typeof AnalyzeSketchOutputSchema>;

export async function analyzeSketch(input: AnalyzeSketchInput): Promise<AnalyzeSketchOutput> {
  return analyzeSketchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSketchPrompt',
  input: {schema: AnalyzeSketchInputSchema},
  output: {schema: AnalyzeSketchOutputSchema},
  prompt: `You are an AI teaching assistant. Your task is to analyze a student's drawing and determine if it correctly fulfills the given prompt. Provide clear and encouraging feedback.

You must evaluate if the drawing is a reasonable representation of the concept described in the prompt. Do not be overly strict about artistic quality, but ensure the core components are present and correctly related.

Prompt: "{{{prompt}}}"

Student's Sketch:
{{media url=sketchDataUri}}

Analyze the sketch and provide a boolean 'isCorrect' and a 'feedback' string.
- If correct, praise the student and briefly mention what they did right.
- If incorrect, gently point out what's missing or wrong and suggest how to improve it.
`,
});

const analyzeSketchFlow = ai.defineFlow(
  {
    name: 'analyzeSketchFlow',
    inputSchema: AnalyzeSketchInputSchema,
    outputSchema: AnalyzeSketchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
