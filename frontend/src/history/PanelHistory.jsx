import {useState, useEffect} from 'react'
import { MultipleChoiceQuestion } from '../challenge/MultibleChoiceQuestion.jsx'
import {useApi} from '../utils/app.js'

export function PanelHistory() {
    const {makeRequest} = useApi()
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const loadHistory = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await makeRequest("history")
                if (isMounted) {
                    setHistory(data.challenges)
                }
            } catch (err) {
                console.error(err)
                if (isMounted) {
                    setError("Failed to load history.")
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadHistory()

        return () => {
            isMounted = false
        }
    }, [makeRequest])

    if (loading) {
        return (
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white py-10 text-sm font-semibold text-slate-500 shadow-sm">
                Loading history...
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                Error: {error}
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase text-emerald-700">
                    Practice archive
                </span>
                <h2 className="mt-3 text-4xl font-black text-slate-950">
                    History
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Your previously completed challenges
                </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
                    {history.length} saved
                </div>
            </div>

            {history.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-semibold text-slate-500 shadow-sm">
                    No history available.
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((challenge) => (
                        <div
                            key={challenge.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10"
                        >
                            <MultipleChoiceQuestion
                                challenge={challenge}
                                showExplanation={true}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
