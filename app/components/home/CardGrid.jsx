'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { cardGridData } from '@/app/data'

export default function CardGrid() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
      return
    }
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
  }, [session, status])

  useEffect(() => {
    function onLogout() {
      setUser(null)
    }
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  const isLoggedIn = !!(session?.user || user)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardGridData.map((card, index) => {
        if (card.type === 'grid') {
          const href = card.category ? `${card.href}?category=${encodeURIComponent(card.category)}` : card.href
          return (
            <Link
              key={card.title}
              href={href}
              className="group bg-white p-4 flex flex-col gap-4 shadow-sm z-20 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold">{card.title}</h2>
              <div className="grid grid-cols-2 gap-2 h-full">
                {card.images.map((img) => (
                  <div key={img} className="overflow-hidden">
                    <img
                      src={img}
                      className="w-full h-full object-cover mb-1 transition-transform duration-300 ease-out group-hover:scale-110"
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <span className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto">
                {card.linkText}
              </span>
            </Link>
          )
        }

        if (card.type === 'single') {
          if (card.title === 'View all products' && !isLoggedIn) return null
          const href = card.category ? `${card.href}?category=${encodeURIComponent(card.category)}` : card.href
          return (
            <Link
              key={card.title}
              href={href}
              className="group bg-white p-4 flex flex-col gap-4 shadow-sm z-20 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold">{card.title}</h2>
              <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={card.image}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  alt=""
                />
              </div>
              <span className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto">
                {card.linkText}
              </span>
            </Link>
          )
        }

        if (card.type === 'signin') {
          if (isLoggedIn) return null
          return (
            <Link
              key={index}
              href="/auth/login"
              className="group bg-white p-4 flex flex-col gap-4 shadow-sm z-20 justify-between hover:shadow-md transition-shadow"
            >
              <div className="shrink-0">
                <h2 className="text-xl font-bold">{card.title}</h2>
                <span className="inline-block bg-amazon-yellow w-full py-2 rounded-md shadow-sm mt-4 text-sm hover:bg-amazon-yellow_hover text-center font-medium">
                  {card.buttonText}
                </span>
              </div>
              <div className="mt-4 grow h-full overflow-hidden">
                <img src={card.image} alt="" className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110" />
              </div>
            </Link>
          )
        }

        return null
      })}
    </div>
  )
}
