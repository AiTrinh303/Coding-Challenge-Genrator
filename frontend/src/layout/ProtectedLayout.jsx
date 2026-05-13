import React from 'react'
import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    UserButton
} from '@clerk/clerk-react'

import { Outlet, NavLink } from 'react-router-dom'

export function ProtectedLayout() {
    const linkClass = ({ isActive }) =>
    isActive ? 'font-semibold text-blue-600' : undefined
    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
                <header className="flex justify-between items-center p-4">
                    <nav className="flex gap-4 items-center">
                        <NavLink to="/" className={linkClass}>Home</NavLink>
                        <NavLink to="/generate" className={linkClass}>Generate</NavLink>
                        <NavLink to="/history" className={linkClass}>History</NavLink>
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