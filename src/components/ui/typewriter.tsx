"use client";

import { useEffect, useState } from "react";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 1200);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? 50 : 100,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <code className={className}>
      {text}
      <span className="ml-[2px] inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current" />
    </code>
  );
}
