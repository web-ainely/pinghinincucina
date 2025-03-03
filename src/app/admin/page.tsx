"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editData = searchParams.get("edit");

  const [slug, setSlug] = useState(""); // Per identificare la ricetta in modifica
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("primi");
  const [mainImage, setMainImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState([{ text: "", image: "" }]);
  const [message, setMessage] = useState("");

  // 🔹 Se siamo in modalità modifica, carichiamo i dati della ricetta
  useEffect(() => {
    if (editData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(editData));
        setSlug(parsedData.slug); // Manteniamo lo stesso slug
        setTitle(parsedData.title);
        setAuthor(parsedData.author);
        setTime(parsedData.time);
        setCategory(parsedData.category || "primi");
        setMainImage(parsedData.image);
        setIngredients(parsedData.ingredients.join("\n"));
        setSteps(parsedData.steps);
      } catch (error) {
        console.error("Errore nel parsing della ricetta:", error);
      }
    }
  }, [editData]);

  const handleStepChange = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { text: "", image: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      slug, // 🔹 Manteniamo lo stesso slug per non duplicarla
      title,
      author,
      time,
      category,
      image: mainImage,
      ingredients: ingredients.split("\n"),
      steps,
    };

    const response = await fetch("/api/add-recipe", {
      method: editData ? "PUT" : "POST", // 🔹 Usa PUT se stiamo modificando
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    if (response.ok) {
      setMessage(editData ? "✅ Ricetta modificata con successo!" : "✅ Ricetta salvata con successo!");
      router.push(`/ricetta/${slug}`); // 🔹 Torna alla pagina della ricetta
    } else {
      setMessage("❌ Errore nel salvataggio della ricetta.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-paper shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
        {editData ? "✏️ Modifica Ricetta" : "📖 Crea la tua Ricetta"}
      </h1>
      {message && <p className="text-center text-lg font-semibold">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titolo della Ricetta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
        />
        <input
          type="text"
          placeholder="Autore"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
        />
        <input
          type="text"
          placeholder="Tempo di Preparazione"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
        />
        <input
          type="text"
          placeholder="URL Immagine Principale"
          value={mainImage}
          onChange={(e) => setMainImage(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
        />
        <textarea
          placeholder="Ingredienti (uno per riga)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
          rows={4}
        />
        <h2 className="text-2xl font-bold text-gray-900">📌 Passaggi</h2>
        {steps.map((step, index) => (
          <div key={index} className="space-y-2">
            <textarea
              placeholder={`Passaggio ${index + 1}`}
              value={step.text}
              onChange={(e) => handleStepChange(index, "text", e.target.value)}
              className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
              rows={2}
            />
            <input
              type="text"
              placeholder="URL Immagine (opzionale)"
              value={step.image}
              onChange={(e) => handleStepChange(index, "image", e.target.value)}
              className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
            />
          </div>
        ))}
        <button type="button" onClick={addStep} className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-bold shadow">
          ➕ Aggiungi un altro passaggio
        </button>
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-bold text-xl shadow">
          📌 {editData ? "Salva Modifiche" : "Salva la Ricetta"}
        </button>
      </form>
    </div>
  );
}
