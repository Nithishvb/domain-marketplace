"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { fetchDomains } from "@/lib/features/filter/filterSlice"
import { useAppSelector } from "@/lib/hooks"
import { AppDispatch } from "@/lib/store/store"
import DomainsFilter from "@/ui/domains/domains-filter"
import DomainsListing from "@/ui/domains/domains-listing"
import DomainSearch from "@/ui/domains/domains-search"
import Header from "@/ui/header/header"
import { SpinningLoader } from "@repo/ui"

export default function DomainListing() {
  const dispatch = useDispatch<AppDispatch>()
  const { domains } = useAppSelector((state) => state.filter)

  useEffect(() => {
    dispatch(fetchDomains())
  }, [dispatch])

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header - Fixed at top */}
      <Header />
      
      <div className="border-b border-gray-700" />

      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed */}
        <aside className="w-[310px] flex-shrink-0">
          <DomainsFilter />
        </aside>

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            <DomainSearch />
            <div className="px-4 py-4">
              {domains.length === 0 ? (
                <div className="flex justify-center">
                  <SpinningLoader />
                </div>
              ) : (
                <DomainsListing domains={domains} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

