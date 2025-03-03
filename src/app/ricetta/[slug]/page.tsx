"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function RecipePage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch("/api/add-recipe");  // 🔹 Cambiato percorso API
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

  if (loading) return <h1 className="text-center text-2xl">Caricamento...</h1>;
  if (!recipe) return <h1 className="text-center text-3xl text-red-500">Ricetta non trovata 😢</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{recipe.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Di {recipe.author} - ⏳ {recipe.time}</p>

      <h2 className="text-2xl mt-6">🛒 Ingredienti</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ing: string, index: number) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl mt-6">👨‍🍳 Preparazione</h2>
      {recipe.steps.map((step: any, index: number) => (
        <div key={index} className="mt-4">
          <Image src={step.image} width={300} height={200} alt={`Step ${index + 1}`} className="rounded" />
          <p className="mt-2">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
