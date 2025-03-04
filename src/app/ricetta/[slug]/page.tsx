"use client"; 
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// Definizione tipi
interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Step {
  text: string;
  image: string;
}

interface Recipe {
  title: string;
  image: string;
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  slug: string;
  prepTime: number;
  restTime: number;
  cookTime: number;
  totalTime: number;
}

export default function RecipePage() {
  const { slug } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch("/api/add-recipe");
        const recipes: Recipe[] = await res.json();
        const foundRecipe = recipes.find((r) => r.slug === slug);
        if (foundRecipe) {
          setRecipe(foundRecipe);
          setServings(foundRecipe.servings || 1);
        }
      } catch (error) {
        console.error("Errore nel caricamento della ricetta:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [slug]);

  const adjustServings = (change: number) => {
    setServings((prev) => Math.max(1, prev + change));
  };

  if (loading) return <h1 className="text-center text-2xl">📖 Caricamento...</h1>;
  if (!recipe) return <h1 className="text-center text-3xl text-red-500">⚠️ Ricetta non trovata 😢</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-paper shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">{recipe.title}</h1>

      {/* Tempi su una riga sotto il titolo */}
<p className="text-lg text-gray-700 text-center mb-4">
  ⏱️ Prep: {recipe.prepTime} min · ⏸️ Riposo: {recipe.restTime} min · 🔥 Cottura: {recipe.cookTime} min · ⏳ Totale: {recipe.totalTime} min
</p>


    

      {/* Pulsante Modifica Ricetta */}
      <div className="flex justify-center my-4">
        <button 
          onClick={() => router.push(`/admin?edit=${encodeURIComponent(JSON.stringify(recipe))}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold shadow"
        >
          ✏️ Modifica Ricetta
        </button>
      </div>

      {/* Sezione immagine con post-it ingredienti */}
<div className="flex justify-center my-6 relative">
  <Image 
    src={recipe.image} 
    width={300} 
    height={250} 
    alt="Immagine Ricetta" 
    className="rounded shadow-lg border border-gray-300" 
  />
  
  {/* Post-it Ingredienti con Numero di Persone */}
<div className="sticky-note postit-primi">
  <h2 className="text-2xl font-bold text-center">🛒 Ingredienti</h2>
  <div className="flex justify-center items-center my-2 space-x-2 text-lg font-semibold">
    <button 
      onClick={() => adjustServings(-1)} 
      className="px-2 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
    >
      ➖
    </button>
    <span className="text-xl font-bold">🍽️ {servings} persone</span>
    <button 
      onClick={() => adjustServings(1)} 
      className="px-2 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
    >
      ➕
    </button>
  </div>
  {recipe.ingredients.map((ingredient, index) => (
    <div key={index} className="flex space-x-2">
      <span>{ingredient.name} - {(ingredient.quantity * servings / recipe.servings).toFixed(2)} {ingredient.unit}</span>
    </div>
  ))}
</div>



  
</div>


      {/* Step di Preparazione */}
      <h2 className="text-3xl font-bold mt-6">👨‍🍳 Preparazione</h2>
      <div className="mt-6">
        {recipe.steps.map((step, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center space-x-4 space-x-reverse`}>
            <Image src={step.image} width={150} height={150} alt={`Step ${index + 1}`} className="rounded-lg shadow-lg border border-gray-300" />
            <p className="text-lg w-2/3">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
