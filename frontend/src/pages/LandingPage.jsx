import { Link } from 'react-router-dom'

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-5xl font-bold mb-6">
                AI Challenge Generator
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Generate coding challenges instantly with AI,
                save your history, and improve your skills.
            </p>

            <div className="flex gap-4">
                <Link
                    to="/sign-in"
                    className="px-6 py-3 bg-black text-white rounded-lg"
                >
                    Sign In
                </Link>

                <Link
                    to="/sign-up"
                    className="px-6 py-3 border rounded-lg"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    )
}