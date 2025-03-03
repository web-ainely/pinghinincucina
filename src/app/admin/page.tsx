"use client";
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      title,
      author,
      time,
      ingredients: ingredients.split("\n"), // Converti in array
      steps: steps.split("\n").map((step) => ({ text: step, image })),
    };

    const response = await fetch("/api/add-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    if (response.ok) {
      alert("Ricetta salvata con successo!");
      setTitle("");
      setAuthor("");
      setTime("");
      setIngredients("");
      setSteps("");
      setImage("");
    } else {
      alert("Errore nel salvataggio");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Aggiungi una Nuova Ricetta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titolo della Ricetta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Autore"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tempo di Preparazione (es. 40 min)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Ingredienti (uno per riga)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
        <textarea
          placeholder="Passaggi (uno per riga)"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full p-2 border rounded"
          rows={6}
        />
        <input
          type="text"
          placeholder="URL Immagine"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-rosa text-white px-4 py-2 rounded">
          Salva Ricetta
        </button>
      </form>
    </div>
  );
}
