import { useState, useEffect } from 'react'
import { MultipleChoiceQuestion } from './MultibleChoiceQuestion.jsx'
import {useApi} from '../utils/app.js'

export function Generator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState('easy')
    const [language, setLanguage] = useState('Python')
    const [quota, setQuota] = useState({ quota_remaining: 0})
    const {makeRequest} = useApi()

    useEffect(() => {
        let isMounted = true

        const loadQuota = async () => {
            try {
                const data = await makeRequest("quota")
                if (isMounted) {
                    setQuota(data)
                }
            } catch (err) {
                console.log(err)
            }
        }

        loadQuota()

        return () => {
            isMounted = false
        }
    }, [makeRequest])

    const fetchQuota = async () => {
        try {
            const data = await makeRequest("quota")
            setQuota(data)
        } catch (err) {
            console.log(err)
        }
    }

    const generateChallenge = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("generate-challenge", {
                method: "POST",
                body: JSON.stringify({difficulty, language})
                }
            )
            setChallenge(data)
            fetchQuota()
        } catch (err) {
            setError(err.message || "Failed to generate challenge.")
        } finally {
            setIsLoading(false)
        }
    }

    const getNextResetTime = () => {
        if (!quota?.last_reset_date) return null
        const resetDate = new Date(quota.last_reset_date)
        resetDate.setHours(resetDate.getHours() + 24)
        return resetDate
    }

    const isQuotaEmpty = quota?.quota_remaining === 0

   const handleDifficultyChange = (e) => {
        const newDifficulty = e.target.value
        setDifficulty(newDifficulty)
        setChallenge(null)
        setError(null)
    }

   const handleLanguageChange = (e) => {
        const newLanguage = e.target.value
        setLanguage(newLanguage)
        setChallenge(null)
        setError(null)
    }
        
   return (
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="space-y-4">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase text-blue-700">
                        Practice room
                    </span>

                    <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950">
                        Generate your next challenge
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Pick a language, choose a level, and get one focused question at a time.
                    </p>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-bold text-slate-600">Remaining today</span>
                            <span className={`text-3xl font-black ${isQuotaEmpty ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {quota?.quota_remaining ?? 0}
                            </span>
                        </div>

                        {isQuotaEmpty && (
                            <div className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                                Next reset: {getNextResetTime()?.toLocaleString()}
                            </div>
                        )}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="language" className="mb-2 block text-xs font-black uppercase text-slate-500">
                                Language
                            </label>
                            <select
                                id="language"
                                value={language}
                                onChange={handleLanguageChange}
                                disabled={isLoading}
                                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                            >
                                <option value="Python">Python</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Java">Java</option>
                                <option value="C++">C++</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="mb-2 block text-xs font-black uppercase text-slate-500">
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={handleDifficultyChange}
                                disabled={isLoading}
                                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <button
                            onClick={generateChallenge}
                            disabled={isLoading || quota?.quota_remaining === 0}
                            className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                        >
                            {isLoading ? 'Generating...' : 'Generate challenge'}
                        </button>
                    </div>
                </section>
            </aside>

            <section className="min-h-[520px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                {error && (
                    <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                        {error}
                    </div>
                )}

                {challenge ? (
                    <MultipleChoiceQuestion
                        key={challenge.id}
                        challenge={challenge}
                    />
                ) : (
                    <div className="flex min-h-[460px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                        <div className="mb-4 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-500 shadow-sm">
                            {language} / {difficulty}
                        </div>
                        <h2 className="max-w-md text-3xl font-black leading-tight text-slate-950">
                            Your challenge will appear here
                        </h2>
                        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                            A clean multiple-choice card with instant feedback and explanation.
                        </p>
                    </div>
                )}
            </section>
        </div>
)}
