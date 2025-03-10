import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "recipes.json");

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(fileData);

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Errore API add-recipe:", error);
    return NextResponse.json({ error: "Errore nel caricamento delle ricette" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const recipe = await req.json();

    // Validazione dei dati ricevuti
    if (!recipe.title || !recipe.ingredients || !recipe.steps) {
      return NextResponse.json({ error: "Dati mancanti nel form" }, { status: 400 });
    }

    let recipes = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      recipes = JSON.parse(fileData);
    }

    // Creiamo lo slug dal titolo (es: "Pizza Margherita" → "pizza-margherita")
    const slug = recipe.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Salviamo la nuova ricetta
    recipes.push({ ...recipe, slug });

    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

    return NextResponse.json({ message: "✅ Ricetta salvata!", slug }, { status: 200 });

  } catch (error) {
    console.error("Errore API add-recipe:", error);
    return NextResponse.json({ error: "Errore nel salvataggio della ricetta" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const updatedRecipe = await req.json();

    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Nessuna ricetta trovata" }, { status: 404 });

    const fileData = fs.readFileSync(filePath, "utf-8");
    let recipes = JSON.parse(fileData);

    // Trova la ricetta esistente e aggiornala
    const index = recipes.findIndex((r: any) => r.slug === updatedRecipe.slug);
    if (index === -1) return NextResponse.json({ error: "Ricetta non trovata" }, { status: 404 });

    recipes[index] = updatedRecipe;
    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

    return NextResponse.json({ message: "Ricetta aggiornata con successo!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
  }
}