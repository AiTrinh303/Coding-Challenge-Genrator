import React from 'react'
import {SignIn, SignUp, SignedIn, SignedOut} from '@clerk/clerk-react'
import { useLocation, Navigate } from 'react-router-dom'

export function AuthPage() {

    const location = useLocation()

    const isSignIn = location.pathname.includes('sign-in')

    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignedOut>
                {isSignIn ? (
                    <SignIn
                        routing="path"
                        path="/sign-in"
                        fallbackRedirectUrl="/generate"
                        signUpUrl="/sign-up"
                    />
                ) : (
                    <SignUp
                        routing="path"
                        path="/sign-up"
                        fallbackRedirectUrl="/generate"
                        signInUrl="/sign-in"
                    />
                )}

            </SignedOut>

            <SignedIn>
                <Navigate to="/generate" replace />
            </SignedIn>

        </div>
    )
}