"use client";

import DomainsFilter from "@/ui/domains/domains-filter";
import DomainsListing from "@/ui/domains/domains-listing";
import DomainSearch from "@/ui/domains/domains-search";
import Header from "@/ui/header/header";

const domains = [
  {
    id: 1,
    name: "example.com",
    price: 2999,
    category: "Business",
    age: 5,
  },
  {
    id: 2,
    name: "startup.io",
    price: 1499,
    category: "Technology",
    age: 2,
  },
  {
    id: 3,
    name: "brand.store",
    price: 899,
    category: "E-commerce",
    age: 1,
  },
  {
    id: 4,
    name: "crypto.finance",
    price: 4999,
    category: "Finance",
    age: 3,
  },
];

export default function DomainListing() {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-auto">
      <div className="container">
        {/* Search Section */}
        <Header />

        <div className="border border-gray-700"></div>

        <div className="grid md:grid-cols-[280px_1fr] bor">
          {/* Filter Section */}
          <DomainsFilter />

          {/* Domain Listings */}
          <div>
            <DomainSearch />
            <div className="px-4 py-4">
              <DomainsListing domains={domains} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
