import React from 'react'
import { Logo, Search, Language, Account, Cart } from './SubNavbar'
export default function Navbar() {
    return (
        <nav className="bg-amazon text-white">
            {/* Top Nav */}
            <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
                {/* Logo */}
                <Logo />
                {/* Search */}
                <Search />
                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Language */}
                    <Language />
                    {/* Account */}
                    <Account />
                    {/* Cart */}
                    <Cart />
                </div>
            </div>
        </nav>
    )
}
