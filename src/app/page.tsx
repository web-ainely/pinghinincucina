import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rosa to-azzurro text-gray-900 p-6">
      {/* Sezione di Benvenuto */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-md">🍽️ PinghinInCucina</h1>
        <p className="text-lg mt-4 max-w-xl mx-auto text-gray-800">
          Il tuo ricettario personale con un tocco di magia e un pizzico di divertimento! 🧑‍🍳🐧
        </p>
      </div>

      {/* Immagine Animata */}
      <Image
        src="/pingup.jpg" // Devi aggiungere questa immagine in public/
        width={280}
        height={280}
        alt="Pinghino chef"
        className="mt-6 animate-fadeIn"
      />

      {/* Barra di Ricerca */}
      <div className="mt-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Cerca una ricetta..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-rosa focus:outline-none"
        />
      </div>

      {/* Categorie di Ricette */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <Link
          href="/primi"
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform"
        >
          <span className="text-4xl">🍝</span>
          <span className="mt-2 text-lg font-semibold">Primi Piatti</span>
        </Link>
        <Link
          href="/secondi"
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform"
        >
          <span className="text-4xl">🥩</span>
          <span className="mt-2 text-lg font-semibold">Secondi Piatti</span>
        </Link>
        <Link
          href="/dolci"
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform"
        >
          <span className="text-4xl">🍰</span>
          <span className="mt-2 text-lg font-semibold">Dolci</span>
        </Link>
      </div>

      {/* Ultime Ricette Aggiunte (Placeholder) */}
      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">📜 Ultime Ricette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🍕 Pizza Margherita</h3>
            <p className="text-sm text-gray-600 mt-1">La classica pizza italiana, fatta in casa!</p>
            <Link href="/ricetta/pizza-margherita" className="text-rosa font-medium mt-2 inline-block">
              Leggi di più →
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🍩 Ciambelle Morbide</h3>
            <p className="text-sm text-gray-600 mt-1">Dolci soffici e irresistibili.</p>
            <Link href="/ricetta/ciambelle" className="text-rosa font-medium mt-2 inline-block">
              Leggi di più →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
