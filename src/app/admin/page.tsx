"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editData = searchParams.get("edit");

  const [slug, setSlug] = useState(""); // Per identificare la ricetta in modifica
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("primi");
  const [mainImage, setMainImage] = useState("");
  const [servings, setServings] = useState(2);

// Tempi di preparazione
const [prepTime, setPrepTime] = useState(0);
const [restTime, setRestTime] = useState(0);
const [cookTime, setCookTime] = useState(0);
const [totalTime, setTotalTime] = useState(0);

const [ingredients, setIngredients] = useState([{ name: "", quantity: 0, unit: "g" }]);
const [steps, setSteps] = useState([{ text: "", image: "" }]);
const [message, setMessage] = useState("");

  // 🔹 Se siamo in modalità modifica, carichiamo i dati della ricetta
  useEffect(() => {
    if (editData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(editData));
        setSlug(parsedData.slug);
        setTitle(parsedData.title);
        setCategory(parsedData.category || "primi");
        setMainImage(parsedData.image);
        setServings(parsedData.servings || 2);
        setPrepTime(parsedData.prepTime || 0);
        setRestTime(parsedData.restTime || 0);
        setCookTime(parsedData.cookTime || 0);
        setTotalTime(parsedData.prepTime + parsedData.restTime + parsedData.cookTime);
        setIngredients(parsedData.ingredients);
        setSteps(parsedData.steps);
      } catch (error) {
        console.error("Errore nel parsing della ricetta:", error);
      }
    }
  }, [editData]);

  useEffect(() => {
    setTotalTime(prepTime + restTime + cookTime);
  }, [prepTime, restTime, cookTime]);

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

 const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "g" }]);
  };

  const addStep = () => {
    setSteps([...steps, { text: "", image: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      slug,
      title,
      category,
      image: mainImage,
      servings,
      prepTime,
      restTime,
      cookTime,
      totalTime,
      ingredients,
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
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded">
          <option value="primi">Primi</option>
          <option value="secondi">Secondi</option>
          <option value="dolci">Dolci</option>
        </select>
        <input type="text" placeholder="URL Immagine Principale" value={mainImage} onChange={(e) => setMainImage(e.target.value)} className="w-full p-3 border rounded" />

{/* Tempi di preparazione */}
<h2 className="text-2xl font-bold">🕒 Tempi</h2>
        <div className="grid grid-cols-4 gap-4">
          <input type="number" placeholder="Preparazione (min)" value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))} className="p-2 border rounded" />
          <input type="number" placeholder="Riposo (min)" value={restTime} onChange={(e) => setRestTime(Number(e.target.value))} className="p-2 border rounded" />
          <input type="number" placeholder="Cottura (min)" value={cookTime} onChange={(e) => setCookTime(Number(e.target.value))} className="p-2 border rounded" />
          <input type="number" placeholder="Totale (auto)" value={totalTime} readOnly className="p-2 border bg-gray-100 rounded" />
        </div>
        
        {/* Ingredienti */}
<h2 className="text-2xl font-bold">🛒 Ingredienti</h2>
{ingredients.map((ingredient, index) => (
  <div key={index} className="flex space-x-2">
    <input
      type="text"
      placeholder="Ingrediente"
      value={ingredient.name || ""}  // ✅ Assicuriamoci che sia una stringa
      onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
      className="flex-1 p-2 border rounded"
    />
    <input
      type="number"
      placeholder="Quantità"
      value={ingredient.quantity || 0}  // ✅ Assicuriamoci che sia un numero
      onChange={(e) => handleIngredientChange(index, "quantity", Number(e.target.value))}
      className="w-20 p-2 border rounded"
    />
    <select
      value={ingredient.unit || "g"}  // ✅ Assicuriamoci che sia una stringa
      onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
      className="w-24 p-2 border rounded"
    >
      <option value="g">g</option>
      <option value="ml">ml</option>
      <option value="tazza">tazza</option>
      <option value="cucchiaio">cucchiaio</option>
    </select>
  </div>
))}

        <button type="button" onClick={addIngredient} className="w-full bg-gray-200 px-4 py-2 rounded">➕ Aggiungi Ingrediente</button>
     
        {/* Passaggi */}
<h2 className="text-2xl font-bold">📌 Passaggi</h2>
{steps.map((step, index) => (
  <div key={index} className="space-y-2">
    <textarea
      placeholder={`Passaggio ${index + 1}`}
      value={step.text || ""} // ✅ Evitiamo errori con `undefined`
      onChange={(e) => handleStepChange(index, "text", e.target.value)}
      className="w-full p-3 border border-gray-400 rounded bg-transparent text-lg font-semibold shadow-inner"
      rows={2}
    />
    <input
      type="text"
      placeholder="URL Immagine (opzionale)"
      value={step.image || ""} // ✅ Evitiamo errori con `undefined`
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