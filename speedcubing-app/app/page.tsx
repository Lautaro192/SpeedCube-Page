import Timer from '../components/timer/Timer';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl border border-zinc-900 bg-zinc-900/20 rounded-2xl p-8 backdrop-blur-sm">
        <Timer />
      </div>
    </main>
  );
}