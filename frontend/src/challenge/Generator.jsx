import React, { useState } from 'react'
import { MultipleChoiceQuestion } from './MultibleChoiceQuestion.jsx'

export function Generator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState('easy')
    const [quota, setQuota] = useState({ quota_remaining: 3 })

    const generateChallenge = async () => {}

    const getNextResetTime = () => {}

    const isQuotaEmpty = quota?.quota_remaining === 0

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Generator Challenge
                </h1>
                <p className="text-gray-500 mt-1">
                    Generate AI-powered questions 
                </p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">
                        <span className="mr-2">Challenges remaining today : </span>
                        <span className="font-semibold text-green-500">{quota?.quota_remaining || 0}</span>
                    </p>
                </div>

                {isQuotaEmpty && (
                    <p className="text-sm text-red-500 text-right">
                        Quota exhausted <br />
                        Reset: {getNextResetTime()}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="difficulty" className="text-sm font-medium">
                    Level:
                </label>

                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={isLoading || isQuotaEmpty}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button
                    onClick={generateChallenge}
                    disabled={isLoading || isQuotaEmpty}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generating...' : 'Generate'}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {challenge && (
                <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold leading-relaxed">
                        {challenge.question}
                    </h2>

                    <MultipleChoiceQuestion
                        options={challenge.options}
                        correctAnswer={challenge.correctAnswer}
                    />
                </div>
            )}
        </div>
    )
}