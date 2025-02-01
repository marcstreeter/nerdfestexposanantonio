export default function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (event: Event) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (event: Event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(event);
    }, delay);
  };
}
