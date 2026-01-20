import OpenAI from 'openai';

interface GeneratedCocktail {
  name: string;
  ingredients: string[];
  quantities: string[];
  instructions: string[];
  description: string;
  glassware: string;
  garnish: string;
}

class CocktailGenerator {
  private openai: OpenAI | null = null;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    // Try localStorage first, then environment variable
    const apiKey = localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
      });
    } else {
      this.openai = null;
    }
  }

  public updateApiKey(apiKey: string) {
    localStorage.setItem('openai_api_key', apiKey);
    this.initializeClient();
  }

  async generateCocktails(selectedIngredients: string[], count: number = 6, userPrompt: string = ''): Promise<GeneratedCocktail[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const ingredientList = selectedIngredients.length > 0 
      ? selectedIngredients.join(', ')
      : 'any common bar ingredients';

    const promptDescription = userPrompt.trim() 
      ? `\n\nUser's specific request: "${userPrompt}"\nPlease create cocktails that match this description while using the available ingredients.`
      : '';

    const prompt = `Create ${count} unique cocktail recipes. Each cocktail should have a creative, memorable name that's fun and engaging.
Available ingredients to prioritize: ${ingredientList}

For each cocktail, provide:
1. A creative, catchy cocktail name
2. List of ingredients with exact quantities
3. Step-by-step mixing instructions
4. A brief, enticing description
5. Appropriate glassware
6. Garnish suggestions

Make the cocktails diverse in style (some strong, some refreshing, some sweet, etc.) and ensure they're actually mixable with realistic proportions. Focus on creativity and flavor balance.

Format your response as a JSON array with this structure:
[
  {
    "name": "cocktail name",
    "ingredients": ["ingredient1", "ingredient2"],
    "quantities": ["2 oz", "1 oz"],
    "instructions": ["step 1", "step 2"],
    "description": "brief description",
    "glassware": "glass type",
    "garnish": "garnish description"
  }
]`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a creative mixologist specializing in craft cocktails. Always respond with valid JSON only, no additional text."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Clean up the response to ensure it's valid JSON
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      const cocktails = JSON.parse(cleanedContent);

      return cocktails;
    } catch (error) {
      console.error('Error generating cocktails:', error);
      throw new Error('Failed to generate cocktails. Please try again.');
    }
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }
}

export const cocktailGenerator = new CocktailGenerator();
export type { GeneratedCocktail };