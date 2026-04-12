export type FaqLink = { url: string; key: string };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LINK_REF = /\[([^\]]+)\]\[([^\]]+)\]/g;

const INLINE_LINK_CLASS =
  "font-medium text-neutral-700 underline underline-offset-2 transition hover:text-neutral-500 dark:text-neutral-300 dark:hover:text-neutral-400";

/**
 * Turns `[visible label][linkKey]` in `answer` into anchors using `links` keyed by `linkKey`.
 * Other text is HTML-escaped. Unknown keys are left as escaped literal text.
 */
export function renderFaqAnswerWithLinks(
  answer: string,
  links?: FaqLink[],
): string {
  if (!links?.length) {
    return escapeHtml(answer);
  }

  const urlByKey = new Map(links.map((l) => [l.key, l.url]));
  let out = "";
  let last = 0;
  LINK_REF.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = LINK_REF.exec(answer)) !== null) {
    const [full, label, key] = m;
    out += escapeHtml(answer.slice(last, m.index));
    const url = urlByKey.get(key);
    if (url) {
      out += `<a href="${escapeHtml(url)}" class="${INLINE_LINK_CLASS}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
    } else {
      out += escapeHtml(full);
    }
    last = m.index + full.length;
  }
  out += escapeHtml(answer.slice(last));
  return out;
}
