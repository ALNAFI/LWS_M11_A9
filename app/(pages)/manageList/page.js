import React from 'react'
import Footer from '@/app/components/paymentProcess/Footer'
import {
  ManageListHeader,
  ManageListPageIntro,
  ManageListFilters,
  ManageListTable,
  ManageListPagination,
} from '@/app/components/manageList'
import { manageListPageData } from '@/app/data'

export default function ManageListPage() {
  const { footer } = manageListPageData

  return (
    <>
      <ManageListHeader />

      <main className="w-full p-6">
        <div className="max-w-[1500px] mx-auto">
          <ManageListPageIntro />
          <ManageListFilters />
          <ManageListTable />
          <ManageListPagination />
        </div>
      </main>

      <Footer
        copyrightText={`{{year}} ${footer.copyrightText}`}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1500px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}
