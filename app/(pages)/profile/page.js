import React from 'react'
import Footer from '@/app/components/paymentProcess/Footer'
import { ProfileHeader, ProfileContent } from '@/app/components/profile'
import { profilePageData } from '@/app/data'

export default function ProfilePage() {
  const { footer } = profilePageData

  return (
    <>
      <ProfileHeader />

      <main className="max-w-[1200px] mx-auto w-full p-6">
        <ProfileContent />
      </main>

      <Footer
        copyrightText={`{{year}} ${footer.copyrightText}`}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1200px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}
