/** First focusable element in the DOM. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-soil focus:px-4 focus:py-3 focus:font-medium focus:text-paper"
    >
      Skip to content
    </a>
  );
}
