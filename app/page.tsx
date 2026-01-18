import { AlertCircleIcon, SunMoonIcon, LoaderIcon, MessageSquareIcon } from 'lucide-react';
import { ScrollIcon } from 'lucide-react';
import { CodeIcon } from 'lucide-react';

import { Widget } from '@/components/widget';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-muted notion-bg">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-12">
        {/* Hero Section */}
        <div className="w-full flex justify-between">
          <div className="mb-12 space-y-3">
            <h1 className="text-4xl font-semibold">
              AI Chat as a Widget
            </h1>
            <p className="text-lg text-muted-foreground">
              AI chat interface built with Vercel AI SDK v6 & Next.js that opens in a modal when clicked on a floating icon.
              <br />
              For AI products that need a chat interface like Notion, Chronicle, and Intercom.
            </p>
          </div>
        </div>

        <div className="flex gap-8 flex-col">

          {/* What You Get */}
          <div className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">
              What this template handles for you
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-base font-semibold flex gap-2 items-center">
                  <MessageSquareIcon size={14} /> Smooth Message streaming
                </h3>
                <p className="text-base text-muted-foreground">
                  Responses stream smoothly instead of appearing all at once,
                  making the chat feel alive and responsive.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-base font-semibold flex gap-2 items-center">
                  <LoaderIcon size={16} /> Clear loading states
                </h3>
                <p className="text-base text-muted-foreground">
                  Users always know when the AI is thinking or responding.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-base font-semibold flex gap-2 items-center">
                  <AlertCircleIcon size={16} /> Graceful error handling
                </h3>
                <p className="text-base text-muted-foreground">
                  Errors are shown clearly without breaking the chat experience.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-base font-semibold flex gap-2 items-center">
                  <ScrollIcon size={16} /> Smart auto-scroll
                </h3>
                <p className="text-base text-muted-foreground">
                  Long conversations stay readable without jumpy or intrusive
                  scrolling.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-base font-semibold flex gap-2 items-center">
                  <CodeIcon size={16} /> Formatted AI output
                </h3>
                <p className="text-base text-muted-foreground">
                  Paragraphs, lists, tables, and code blocks render cleanly by
                  default.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-base font-semibold flex gap-2 items-center">
                  <SunMoonIcon size={16} /> Light & dark mode support
                </h3>
                <p className="text-base text-muted-foreground">
                  The chat looks correct and comfortable in both themes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Widget />
    </div>
  );
}
