export default function debounce<A extends unknown[]>(
  func: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
