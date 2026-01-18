# AI Chat as Widget 

AI chat interface built with Vercel AI SDK v6 & Next.js that opens in a modal when clicked on a floating icon.

For AI products that need a chat interface like **Notion**, **Chronicle**, and **Intercom**.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/Vercel_AI_SDK-000000?style=flat&logo=vercel&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white" />&nbsp;
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=radixui&logoColor=white" />
</p>

## Watch it in action!

https://github.com/user-attachments/assets/2e062c74-d606-4343-a84a-7e462344bd33


## Quick Start / Setup

### 1. Install Dependencies

```bash
npm install 
```

### 2. Add API Key

Create `.env.local`:

```bash
# OpenAI
OPENAI_API_KEY=sk-your-key-here

# OR Anthropic
ANTHROPIC_API_KEY=sk-ant-your-key-here

# OR Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your-key-here

# OR Vercel API Gateway AI
AI_GATEWAY_API_KEY=your-key-here
```

### 3. Update API Route

Modify `app/api/generate/route.ts` to configure the AI model (OpenAI, Anthropic, Google AI, or Vercel API Gateway) you want to use for your chat.

**For OpenAI:**
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

**For Anthropic:**
```typescript
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

**For Google AI:**
```typescript
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.0-flash-exp'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

**For Vercel API Gateway:**
```typescript
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'gemini-2.0',
    messages,
  });

  return result.toDataStreamResponse();
}
```

### 4. Run

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000), click the floating icon on bottom right, and start chatting — fully handling loading, streaming, and errors! ✅

---


## The real pain of building chat UIs & how its all handled 

| ⚠️ Pain when building chat                 | ✅ How it’s handled |
|-------------------------------------------|-------------------|
| ⚡ Layout jumps during streaming           | Space is reserved upfront to keep layout stable ⚡ |
| ⏳ Loading flicker                          | Loader stays visible until content is ready ⏳ |
| ❌ Edge case errors break the chat          | All edge cases are handled gracefully ✅ |
| 📝 Unformatted responses                    | Content is automatically formatted (code, tables, text) 📝 |
| 🤖 Robotic streaming                         | Word-by-word streaming for a natural feel ✨ |
| 📌 Broken auto-scroll                        | Smart scroll follows new messages but respects reading position 📌 |
| 👍 Extra logic for feedback actions         | Built-in per-message feedback actions you can hook into easily 💬 |


---


## What you get out of the box handled

- ⚡ Automatic message lifecycle handling (send → loading → streaming → complete / error)
- 🚀 Real-time streaming with smooth loader-to-text transitions
- 🖼️ Zero layout shift, even for long or streaming responses
- 📜 Smart scrolling that respects the user’s reading position
- 👍/👎 Built-in feedback actions and copy support
- 📝 Properly styled output for all content types (code, tables, rich text)

---

## Use Cases

- **Notion-style AI assistant** - Help users with content
- **Customer support widget** - Floating help chat
- **Code assistant** - AI coding help in IDE-like apps
- **Documentation helper** - Answer questions about your product
- **General chatbot** - Any app that needs AI chat in a modal

---

## License

MIT - Use it however you want.

---

## Built With

[Vercel AI SDK v6](https://sdk.vercel.ai/) - Following official best practices.
