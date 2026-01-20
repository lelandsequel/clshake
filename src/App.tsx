export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />

      <main>
        <Hero />
        <Divider />
        <FeatureGrid />
        <Divider />
        <HowItWorks />
        <Divider />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">clshake</div>
            <div className="text-xs text-white/50">vite template throw</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#features">Features</a>
          <a href="#how">How</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            href="#cta"
          >
            Shake It
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            deployed on vercel • no adult supervision
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            A template throw,
            <span className="text-white/60"> instantly.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            You built this drunk at a bar and it used to be called{" "}
            <span className="text-white/90">Christinasgarbagebartending.com</span>.
            Now we give it a clean “template vibe” in 2 files.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Let’s go
            </a>
            <a
              href="#features"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              What changed?
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            <MiniKPI label="Files touched" value="2" />
            <MiniKPI label="Fake stats" value="0" />
            <MiniKPI label="Vibe" value="∞" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="grid gap-4">
              <Card
                title="Template swap"
                body="Replace App.tsx + index.css and watch the whole thing become a different product."
              />
              <Card
                title="Vercel deploy"
                body="Push commits and it instantly updates production. No friction. No stress."
              />
              <Card
                title="Next step"
                body="Add shadcn components and a real UI kit, then keep throwing skins like a maniac."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold tracking-tight">What you just did</h2>
      <p className="mt-3 max-w-2xl text-white/70">
        This is the same underlying app. We just replaced presentation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card title="New layout shell" body="Nav + hero + sections are now structured like a real product." />
        <Card title="New style system" body="Dark UI + spacing rules + clean typography = instant upgrade." />
        <Card title="Still your app" body="No rebuild, no rewrite, no drama. Just a reskin." />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Step n="1" title="Deploy baseline" body="Import the repo into Vercel and deploy main." />
        <Step n="2" title="Touch 2 files" body="App.tsx + index.css define most of the “vibe.”" />
        <Step n="3" title="Push" body="Vercel rebuilds instantly. You see the new skin live." />
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card title="Did we break anything?" body="Probably not. But even if we did, it’s for science." />
        <Card title="Is this a real template?" body="It’s a template *throw*: we slapped a clean shell on top." />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 md:p-14">
        <h2 className="text-3xl font-semibold tracking-tight">Ship it.</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Commit, push, refresh production. Then throw another one. That’s the entire experiment.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#features"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Done
          </a>
          <a
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Again
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/50">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} clshake</div>
          <div className="text-white/40">formerly christinasgarbagebartending.com</div>
        </div>
      </div>
    </footer>
  );
}

function Divider() {
  return <div className="mx-auto max-w-6xl border-t border-white/10 px-4" />;
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{body}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">
          {n}
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{body}</div>
    </div>
  );
}

function MiniKPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}
