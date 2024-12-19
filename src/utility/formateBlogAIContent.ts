type Param = {
  title: string;
  description: string;
  wordCount: number;
  references: string[];
};

export default function formateBlogAIContent(value: Param): string {
  const { title, description, wordCount, references } = value;

  const prompt = `the blog title is (${title}) and the description is (${description}), word count should be in range of (${wordCount}) word (can be lower or higher but not big deferent)`;

  if (!references) return prompt;

  return `${prompt} use these resources when right the blog (${description})`;
}
