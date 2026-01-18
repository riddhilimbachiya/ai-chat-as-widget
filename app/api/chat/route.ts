import { convertToModelMessages, smoothStream, streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: 'claude-3-5-sonnet',
      messages: await convertToModelMessages(messages),
      system: 'Your system prompt...',
      experimental_transform: smoothStream({
        delayInMs: 10, // Smooth chunking
        chunking: 'word', // Word-by-word (like ChatGPT)
      }),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
