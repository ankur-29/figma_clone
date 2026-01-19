import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Link
        href="/editor"
        className="px-6 py-3 bg-black text-white rounded"
      >
        Open DesignKit Editor
      </Link>
    </main>
  );
}
