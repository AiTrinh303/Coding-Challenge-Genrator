import { Link } from 'react-router-dom'

export function LandingPage() {
    return (
        <main className="min-h-screen overflow-hidden">
            <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                        AI Challenge Generator
                    </div>

                    <h1 className="max-w-4xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                        Practice sharper. Learn faster.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                        Generate focused coding questions, answer them in a clean quiz flow,
                        and build a history of your practice sessions.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/sign-up"
                            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Start practicing
                        </Link>

                        <Link
                            to="/sign-in"
                            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
                        >
                            Sign in
                        </Link>
                    </div>

                    <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                        {[
                            ['3', 'Levels'],
                            ['24h', 'Quota cycle'],
                            ['AI', 'Question engine'],
                        ].map(([value, label]) => (
                            <div key={label} className="rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm">
                                <div className="text-2xl font-black text-slate-950">{value}</div>
                                <div className="mt-1 text-xs font-semibold uppercase text-slate-500">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 shadow-2xl shadow-slate-900/20">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-300" />
                            <span className="h-3 w-3 rounded-full bg-emerald-400" />
                            <span className="ml-3 text-xs font-semibold text-slate-400">challenge.session</span>
                        </div>

                        <div className="rounded-xl bg-white p-5 text-left">
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Python</span>
                                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Medium</span>
                            </div>

                            <h2 className="text-xl font-black leading-snug text-slate-950">
                                What does this list comprehension return?
                            </h2>

                            <pre className="mt-4 overflow-hidden rounded-lg bg-slate-100 p-4 text-sm text-slate-800">
{`nums = [1, 2, 3, 4]
[n * n for n in nums if n % 2 == 0]`}
                            </pre>

                            <div className="mt-4 space-y-2">
                                {['[1, 4, 9, 16]', '[4, 16]', '[2, 4]', '[1, 9]'].map((option, index) => (
                                    <div
                                        key={option}
                                        className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
                                            index === 1
                                                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                                : 'border-slate-200 bg-white text-slate-600'
                                        }`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
