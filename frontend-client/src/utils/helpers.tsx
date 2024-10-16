// Helper function to count the lines in the given textarea element
export const countLines = (textarea: HTMLTextAreaElement): number => {
  console.log("countLines3: ", textarea.value);
  const clone = textarea.cloneNode() as HTMLTextAreaElement;
  clone.style.border = "none";
  clone.style.height = "0";
  clone.style.overflow = "hidden";
  clone.style.padding = "0";
  clone.style.position = "absolute";
  clone.style.left = "0";
  clone.style.top = "0";
  clone.style.zIndex = "-1";
  clone.style.visibility = "hidden";
  textarea?.parentNode?.appendChild(clone);

  const cs = window.getComputedStyle(textarea);
  const pl = parseInt(cs.paddingLeft);
  const pr = parseInt(cs.paddingRight);
  let lh = parseInt(cs.lineHeight);

  if (isNaN(lh)) lh = parseInt(cs.fontSize);
  clone.style.width = textarea.clientWidth - pl - pr + "px";
  clone.value = textarea.value;

  // const result = Math.floor(clone.scrollHeight / lh);
  const result = clone.scrollHeight > lh * 2.5 ? textarea.scrollHeight : clone.scrollHeight;
  textarea?.parentNode?.removeChild(clone);
  return result;
};

// Helper function to convert new line characters into <br> elements
export const formatText = (input?: string): JSX.Element[] => {
  if (!input) return [];
  return input.split(/\r?\n/).map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
