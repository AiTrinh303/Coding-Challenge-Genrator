import { useState } from 'react'

export function MultipleChoiceQuestion({ challenge, showExplanation = false }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [shouldShowExplanation, setShouldShowExplanation] = useState(false)

    if (!challenge) {
        return <div>Loading...</div>
    }

    const parseOptions = (options) => {
        if (!options) return []

        if (Array.isArray(options)) return options

        if (typeof options === 'string') {
            try {
                return JSON.parse(options)
            } catch (err) {
                console.error('Invalid JSON in challenge.options:', err)
                return []
            }
        }

        return []
    }

    const options = parseOptions(challenge.options)


    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }

    const getOptionClass = (index) => {
        if (selectedOption === null) {
            return 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
        }

        if (index === challenge.correct_answer_id) {
            return 'border-emerald-400 bg-emerald-50 text-emerald-800'
        }

        if (index === selectedOption) {
            return 'border-rose-400 bg-rose-50 text-rose-800'
        }

        return 'border-slate-200 bg-slate-50 text-slate-400'
    }

    return (
        <article className="space-y-5 text-left">
            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase text-blue-700">
                    {challenge.language || 'Python'}
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black uppercase text-amber-700">
                    {challenge.difficulty}
                </span>
            </div>

            <h3 className="text-2xl font-black leading-snug text-slate-950">
                {challenge.title}
            </h3>

            <div className="space-y-3">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                        className={`min-h-14 w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${getOptionClass(
                            index
                        )} ${
                            selectedOption === null
                                ? 'cursor-pointer'
                                : 'cursor-default'
                        }`}
                    >
                        <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-500">
                            {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                    </button>
                ))}
            </div>

            {(showExplanation || shouldShowExplanation) && selectedOption !== null && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h4 className="mb-2 text-sm font-black uppercase text-slate-500">Explanation</h4>
                    <p className="text-sm leading-6 text-slate-700">
                        {challenge.explanation}
                    </p>
                </div>
            )}
        </article>
    )
}
