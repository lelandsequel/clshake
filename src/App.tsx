import React, { useState, useEffect } from 'react';
import { Wine, Plus, Minus, Menu, X, Printer as Print, Loader2, AlertCircle, Settings } from 'lucide-react';
import { cocktailGenerator, GeneratedCocktail } from './services/cocktailGenerator';

interface Ingredient {
  name: string;
  category: string;
}

interface Cocktail {
  name: string;
  ingredients: string[];
  quantities: string[];
  instructions: string[];
  description: string;
  glassware: string;
  garnish: string;
}

const availableIngredients: Ingredient[] = [
  // Spirits
  { name: 'Vodka', category: 'Spirits' },
  { name: 'Gin', category: 'Spirits' },
  { name: 'Rum (Light)', category: 'Spirits' },
  { name: 'Rum (Dark)', category: 'Spirits' },
  { name: 'Whiskey', category: 'Spirits' },
  { name: 'Bourbon', category: 'Spirits' },
  { name: 'Tequila', category: 'Spirits' },
  { name: 'Brandy', category: 'Spirits' },
  
  // Liqueurs
  { name: 'Triple Sec', category: 'Liqueurs' },
  { name: 'Cointreau', category: 'Liqueurs' },
  { name: 'Peach Schnapps', category: 'Liqueurs' },
  { name: 'Amaretto', category: 'Liqueurs' },
  { name: 'Kahlua', category: 'Liqueurs' },
  { name: 'Bailey\'s', category: 'Liqueurs' },
  { name: 'Chambord', category: 'Liqueurs' },
  
  // Wines & Champagne
  { name: 'Chardonnay', category: 'Wine' },
  { name: 'Prosecco', category: 'Wine' },
  { name: 'Champagne', category: 'Wine' },
  
  // Mixers & Juices
  { name: 'Cranberry Juice', category: 'Mixers' },
  { name: 'Orange Juice', category: 'Mixers' },
  { name: 'Pineapple Juice', category: 'Mixers' },
  { name: 'Lime Juice', category: 'Mixers' },
  { name: 'Lemon Juice', category: 'Mixers' },
  { name: 'Simple Syrup', category: 'Mixers' },
  { name: 'Grenadine', category: 'Mixers' },
  { name: 'Club Soda', category: 'Mixers' },
  { name: 'Tonic Water', category: 'Mixers' },
  { name: 'Ginger Beer', category: 'Mixers' },
];

const cocktailRecipes: Cocktail[] = [
  {
    name: "Christina's Crimson Kiss",
    ingredients: ['Vodka', 'Cranberry Juice', 'Lime Juice', 'Triple Sec'],
    quantities: ['2 oz', '3 oz', '0.5 oz', '0.5 oz'],
    instructions: [
      'Fill a shaker with ice',
      'Add vodka, cranberry juice, lime juice, and triple sec',
      'Shake vigorously for 15 seconds',
      'Strain into a chilled martini glass',
      'Garnish and serve immediately'
    ],
    description: 'A sultry twist on the classic cosmopolitan with extra attitude.',
    glassware: 'Martini Glass',
    garnish: 'Lime wheel and fresh cranberries'
  },
  {
    name: "Cheeky Christina",
    ingredients: ['Peach Schnapps', 'Chardonnay', 'Pineapple Juice', 'Grenadine'],
    quantities: ['1 oz', '4 oz', '1 oz', '0.25 oz'],
    instructions: [
      'Fill a wine glass with ice',
      'Pour peach schnapps and pineapple juice',
      'Top with chardonnay',
      'Slowly drizzle grenadine for color gradient',
      'Stir gently before serving'
    ],
    description: 'Playful and sweet with a beautiful sunset presentation.',
    glassware: 'Wine Glass',
    garnish: 'Peach slice and maraschino cherry'
  },
  {
    name: "Christina's Confidence",
    ingredients: ['Bourbon', 'Amaretto', 'Lemon Juice', 'Simple Syrup'],
    quantities: ['2 oz', '0.75 oz', '0.75 oz', '0.25 oz'],
    instructions: [
      'Combine all ingredients in a shaker with ice',
      'Shake well until properly chilled',
      'Double strain into a rocks glass over fresh ice',
      'Express lemon peel oils over the drink',
      'Drop peel into glass and serve'
    ],
    description: 'Bold and smooth - a drink that means business.',
    glassware: 'Rocks Glass',
    garnish: 'Lemon twist and luxardo cherry'
  },
  {
    name: "Sparkling Christina",
    ingredients: ['Gin', 'Chambord', 'Lemon Juice', 'Prosecco'],
    quantities: ['1.5 oz', '0.5 oz', '0.5 oz', '3 oz'],
    instructions: [
      'Add gin, Chambord, and lemon juice to shaker with ice',
      'Shake until well chilled',
      'Fine strain into a champagne flute',
      'Top with prosecco',
      'Garnish and serve immediately'
    ],
    description: 'Effervescent and sophisticated with a hint of raspberry luxury.',
    glassware: 'Champagne Flute',
    garnish: 'Fresh raspberries and lemon twist'
  },
  {
    name: "Christina's Temptation",
    ingredients: ['Dark Rum', 'Kahlua', 'Bailey\'s', 'Orange Juice'],
    quantities: ['1.5 oz', '0.5 oz', '0.5 oz', '2 oz'],
    instructions: [
      'Fill a hurricane glass with ice',
      'Layer dark rum at the bottom',
      'Slowly pour orange juice over the back of a spoon',
      'Float Kahlua and Bailey\'s on top',
      'Serve with a straw for mixing'
    ],
    description: 'Rich, creamy, and dangerously smooth.',
    glassware: 'Hurricane Glass',
    garnish: 'Orange slice and whipped cream'
  },
  {
    name: "Sassy Christina",
    ingredients: ['Tequila', 'Triple Sec', 'Lime Juice', 'Pineapple Juice', 'Grenadine'],
    quantities: ['2 oz', '1 oz', '1 oz', '1 oz', '0.25 oz'],
    instructions: [
      'Rim glass with lime juice and salt',
      'Fill shaker with ice and add tequila, triple sec, lime juice, and pineapple juice',
      'Shake vigorously',
      'Strain into prepared rocks glass over ice',
      'Drizzle grenadine for color and sweetness'
    ],
    description: 'A tropical margarita variation with extra personality.',
    glassware: 'Rocks Glass (Salt Rim)',
    garnish: 'Lime wheel and pineapple wedge'
  },
  {
    name: "Christina's Midnight",
    ingredients: ['Vodka', 'Chambord', 'Cranberry Juice', 'Club Soda'],
    quantities: ['2 oz', '0.75 oz', '1 oz', '2 oz'],
    instructions: [
      'Fill a highball glass with ice',
      'Add vodka, Chambord, and cranberry juice',
      'Stir gently to combine',
      'Top with club soda',
      'Garnish and serve with a straw'
    ],
    description: 'Dark, mysterious, and refreshing - perfect for late-night conversations.',
    glassware: 'Highball Glass',
    garnish: 'Blackberries and lime wheel'
  },
  {
    name: "Wild Christina",
    ingredients: ['Light Rum', 'Peach Schnapps', 'Orange Juice', 'Pineapple Juice', 'Ginger Beer'],
    quantities: ['1.5 oz', '0.5 oz', '1 oz', '1 oz', '2 oz'],
    instructions: [
      'Fill a copper mug or highball glass with ice',
      'Add rum, peach schnapps, and fruit juices',
      'Stir well to combine',
      'Top with ginger beer',
      'Garnish generously and serve'
    ],
    description: 'Tropical and spicy with an adventurous spirit.',
    glassware: 'Copper Mug',
    garnish: 'Pineapple leaves, orange slice, and candied ginger'
  }
];

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [cocktailPrompt, setCocktailPrompt] = useState<string>('');
  const [generatedMenu, setGeneratedMenu] = useState<(Cocktail | GeneratedCocktail)[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const generateMenu = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Use AI to generate cocktails
      const aiCocktails = await cocktailGenerator.generateCocktails(selectedIngredients, 6, cocktailPrompt);
      setGeneratedMenu(aiCocktails);
      setShowMenu(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate menu');
    } finally {
      setIsGenerating(false);
    }
  };

  const printMenu = () => {
    window.print();
  };

  const categorizedIngredients = availableIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  useEffect(() => {
    document.title = "CandLShake - AI Cocktail Generator";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-3 rounded-full">
                <Wine className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  CandLShake
                </h1>
                <p className="text-purple-200 text-sm">AI-Powered Cocktail Generator</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {showMenu && (
                <button
                  onClick={printMenu}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Print className="h-4 w-4" />
                  <span>Print Menu</span>
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-purple-200 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* API Key Configuration Modal */}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-900/95 backdrop-blur-md border-b border-purple-500/20">
          <div className="px-4 py-4 space-y-3">
            {showMenu && (
              <button
                onClick={printMenu}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 w-full"
              >
                <Print className="h-4 w-4" />
                <span>Print Menu</span>
              </button>
            )}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showMenu ? (
          /* Ingredient Selection */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Generate Your Perfect Cocktail Menu
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
                Describe your ideal cocktail and select available ingredients. Our AI will craft a personalized menu 
                featuring unique cocktail recipes tailored just for you.
              </p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center space-x-2 text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-300 text-sm mt-1">{error}</p>
              </div>
            )}

            {/* Cocktail Prompt Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Describe Your Perfect Cocktail
              </h3>
              <p className="text-purple-200 mb-6">
                Tell us what kind of cocktail you're in the mood for. Be as specific or creative as you want!
              </p>
              <div className="space-y-4">
                <textarea
                  value={cocktailPrompt}
                  onChange={(e) => setCocktailPrompt(e.target.value)}
                  placeholder="e.g., 'Something strong and smoky for a cold night' or 'A refreshing tropical drink with a kick' or 'Sweet and fruity but not too girly'"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                  rows={3}
                />
                <div className="flex flex-wrap gap-2">
                  {[
                    "Strong & Bold",
                    "Light & Refreshing", 
                    "Sweet & Fruity",
                    "Smoky & Complex",
                    "Tropical Paradise",
                    "Classic with a Twist",
                    "Something Dangerous",
                    "Smooth & Sophisticated"
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setCocktailPrompt(suggestion)}
                      className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-sm rounded-full transition-colors duration-200 border border-purple-400/30 hover:border-purple-400/50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                Available Ingredients
                <span className="ml-3 px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                  {selectedIngredients.length} selected
                </span>
              </h3>

              {Object.entries(categorizedIngredients).map(([category, ingredients]) => (
                <div key={category} className="mb-8 last:mb-0">
                  <h4 className="text-lg font-medium text-purple-200 mb-4 border-b border-purple-500/30 pb-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {ingredients.map((ingredient) => (
                      <button
                        key={ingredient.name}
                        onClick={() => toggleIngredient(ingredient.name)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          selectedIngredients.includes(ingredient.name)
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-400 text-white shadow-lg transform scale-105'
                            : 'bg-white/5 border-purple-300/30 text-purple-100 hover:bg-white/10 hover:border-purple-300/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{ingredient.name}</span>
                          {selectedIngredients.includes(ingredient.name) ? (
                            <Minus className="h-4 w-4 ml-2 flex-shrink-0" />
                          ) : (
                            <Plus className="h-4 w-4 ml-2 flex-shrink-0 opacity-60" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-purple-500/20">
                <button
                  onClick={generateMenu}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating Cocktails...</span>
                    </>
                  ) : (
                    <span>Generate AI Cocktail Menu</span>
                  )}
                </button>
                
                {selectedIngredients.length > 0 && (
                  <button
                    onClick={() => setSelectedIngredients([])}
                    className="sm:w-auto bg-purple-700 hover:bg-purple-800 text-purple-200 font-medium py-4 px-6 rounded-xl transition-colors duration-200"
                  >
                    Clear All
                  </button>
                )}
                
                {cocktailPrompt.trim() && (
                  <button
                    onClick={() => setCocktailPrompt('')}
                    className="sm:w-auto bg-purple-700 hover:bg-purple-800 text-purple-200 font-medium py-4 px-6 rounded-xl transition-colors duration-200"
                  >
                    Clear Prompt
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Generated Menu */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your AI-Generated Cocktail Menu
              </h2>
              <p className="text-xl text-purple-200 mb-6">
                {generatedMenu.length} AI-generated cocktails designed for your bar
              </p>
              <button
                onClick={() => setShowMenu(false)}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                ← Back to Ingredients
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {generatedMenu.map((cocktail, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {cocktail.name}
                    </h3>
                    <p className="text-purple-200 italic mb-2">{cocktail.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded">
                        {cocktail.glassware}
                      </span>
                      <span className="bg-pink-500/30 text-pink-200 px-2 py-1 rounded">
                        {cocktail.garnish}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Ingredients:</h4>
                    <ul className="space-y-2">
                      {cocktail.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex justify-between text-purple-100">
                          <span>{ingredient}</span>
                          <span className="font-medium text-pink-300">{cocktail.quantities[i]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Instructions:</h4>
                    <ol className="space-y-2">
                      {cocktail.instructions.map((instruction, i) => (
                        <li key={i} className="flex text-purple-100">
                          <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => setShowMenu(false)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Create New Menu
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .no-print {
              display: none !important;
            }
            body {
              background: white !important;
            }
          }
        `
      }} />
    </div>
  );
}

export default App;