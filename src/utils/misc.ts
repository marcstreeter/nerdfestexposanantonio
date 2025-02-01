interface WordProps {
  targetWord: string;
  words: string[];
}
export const removeWord = ({ targetWord, words }: WordProps): string[] => {
  let uniqueWords = new Set(words);
  if (uniqueWords.has(targetWord)) {
    uniqueWords.delete(targetWord);
  }
  return [...uniqueWords];
};

export const addWord = ({ targetWord, words }: WordProps): string[] => {
  let uniqueWords = new Set(words);
  uniqueWords.add(targetWord);
  return [...uniqueWords];
};

export const hasWord = ({ targetWord, words }: WordProps): boolean =>
  new Set(words).has(targetWord);
