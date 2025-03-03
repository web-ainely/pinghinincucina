"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function RecipePage() {
  const { slug } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch("/api/add-recipe");
        const recipes = await res.json();
        const foundRecipe = recipes.find((r: any) => r.slug === slug);
        setRecipe(foundRecipe || null);
      } catch (error) {
        console.error("Errore nel caricamento della ricetta:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [slug]);

  if (loading) return <h1 className="text-center text-2xl">📖 Caricamento...</h1>;
  if (!recipe) return <h1 className="text-center text-3xl text-red-500">⚠️ Ricetta non trovata 😢</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-paper shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">{recipe.title}</h1>
      <p className="text-lg text-center text-gray-700">✍️ Autore: {recipe.author} - ⏳ {recipe.time}</p>

      {/* Pulsante Modifica Ricetta */}
      <div className="flex justify-center my-4">
        <button 
          onClick={() => router.push(`/admin?edit=${encodeURIComponent(JSON.stringify(recipe))}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold shadow"
        >
          ✏️ Modifica Ricetta
        </button>
      </div>

      {/* Immagine Principale + Post-it Ingredienti */}
      <div className="flex justify-center my-6 relative">
        <div className="relative">
          <Image src={recipe.image} width={300} height={250} alt="Immagine Ricetta" className="rounded shadow-lg border border-gray-300" />
        </div>
        <div className="sticky-note postit-primi ml-4">
          <h2 className="text-2xl font-bold text-center">🛒 Ingredienti</h2>
          <ul className="list-disc list-inside mt-2">
            {recipe.ingredients.map((ing: string, index: number) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step di Preparazione */}
      <h2 className="text-3xl font-bold mt-6">👨‍🍳 Preparazione</h2>
      <div className="mt-6">
        {recipe.steps.map((step: any, index: number) => (
          <div key={index} className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center space-x-4 space-x-reverse`}>
            <Image src={step.image} width={150} height={150} alt={`Step ${index + 1}`} className="rounded-lg shadow-lg border border-gray-300" />
            <p className="text-lg w-2/3">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
