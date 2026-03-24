export function handleShare(title: string, text: string) {
  if (navigator.share) {
    navigator.share({ title, text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard
      .writeText(`${title}\n${text}\n${window.location.href}`)
      .then(() => alert("Copied to clipboard!"));
  }
}
