type SplitTextTarget = string | Element | ArrayLike<string | Element>;

type SplitTextOptions = {
  type?: string;
  linesClass?: string;
};

function resolveTargets(target: SplitTextTarget): Element[] {
  if (typeof target === "string") {
    return Array.from(document.querySelectorAll(target));
  }

  if (typeof (target as ArrayLike<Element>).length === "number") {
    return Array.from(target as ArrayLike<string | Element>).flatMap((item) => {
      if (typeof item === "string") {
        return Array.from(document.querySelectorAll(item));
      }

      return [item];
    });
  }

  return [target as Element];
}

function escapeHtml(text: string) {
  return text
    .split("&")
    .join("&amp;")
    .split("<")
    .join("&lt;")
    .split(">")
    .join("&gt;")
    .split('"')
    .join("&quot;")
    .split("'")
    .join("&#39;");
}

export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];

  private originals: Array<{ element: Element; html: string }> = [];

  constructor(target: SplitTextTarget, _options: SplitTextOptions = {}) {
    const elements = resolveTargets(target);

    elements.forEach((element) => {
      this.originals.push({ element, html: element.innerHTML });

      // Split only this element's own direct text, not children's text
      const text = element.textContent ?? "";
      element.innerHTML = Array.from(text)
        .map(
          (char) =>
            `<span class="split-char" style="display:inline-block;">${
              char === " " ? "&nbsp;" : escapeHtml(char)
            }</span>`
        )
        .join("");

      const chars = Array.from(
        element.querySelectorAll<HTMLElement>(".split-char")
      );
      this.chars.push(...chars);
      this.words.push(...chars);
    });
  }

  revert() {
    this.originals.forEach(({ element, html }) => {
      element.innerHTML = html;
    });

    this.originals = [];
    this.chars = [];
    this.words = [];
  }
}