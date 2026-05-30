import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    UserButton
} from '@clerk/clerk-react'

import { Outlet, NavLink } from 'react-router-dom'

export function ProtectedLayout() {
    const linkClass = ({ isActive }) =>
    [
        'rounded-lg px-3 py-2 text-sm font-bold transition',
        isActive
            ? 'bg-slate-950 text-white shadow-sm'
            : 'text-slate-600 hover:bg-white hover:text-slate-950'
    ].join(' ')

    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
                <div className="min-h-screen">
                    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
                        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                            <NavLink to="/generate" className="text-base font-black text-slate-950">
                                Challenge Lab
                            </NavLink>

                            <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
                                <NavLink to="/" className={linkClass}>Home</NavLink>
                                <NavLink to="/generate" className={linkClass}>Generate</NavLink>
                                <NavLink to="/history" className={linkClass}>History</NavLink>
                            </nav>

                            <UserButton />
                        </div>
                    </header>

                    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
                        <Outlet />
                    </main>
                </div>
            </SignedIn>
        </>
    )
}
