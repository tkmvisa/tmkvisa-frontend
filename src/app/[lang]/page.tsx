import {getDictionary} from "../[lang]/dictionaries"

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  console.log("🚀 ~ Home ~ lang:", lang)
  const t = await getDictionary(lang);
  console.log("🚀 ~ Home ~ t:", t)

  return (
    <main className="bg-primary">
      main
    </main>
  );
}
