export function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {
      /* silencioso: si falla, el usuario igual llega al chat */
    });
  }
}
