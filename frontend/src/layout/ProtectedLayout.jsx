import React from 'react'
import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    UserButton
} from '@clerk/clerk-react'

import { Outlet, Link } from 'react-router-dom'

export function ProtectedLayout() {
    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
                <header className="flex justify-between items-center p-4">
                    <nav className="flex gap-4 items-center">
                        <Link to="/">Home</Link>
                        <Link to="/history">History</Link>
                    </nav>

                    <UserButton />
                </header>

                <main className="p-4">
                    <Outlet />
                </main>
            </SignedIn>
        </>
    )
}