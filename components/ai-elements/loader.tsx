const LoaderIcon = () => (
  <span className="inline-flex gap-1 ml-1">
    <span className="animate-bounce [animation-delay:0ms]">.</span>
    <span className="animate-bounce [animation-delay:100ms]">.</span>
    <span className="animate-bounce [animation-delay:250ms]">.</span>
  </span>
);

export const Loader = () => (
  <div className="flex items-center h-fit"><span className="inline-flex items-center gap-1 text-sm text-muted-foreground min-h-[20px]">
    Thinking
    <LoaderIcon />
  </span></div>
);
