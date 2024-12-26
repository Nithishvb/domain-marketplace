import React from "react";
import { Button } from "@repo/ui";

interface DomainList {
  id: number;
  name: string;
  price: number;
  category: string;
  age: number;
}

interface DomainListingProps {
  domains: DomainList[];
}

const DomainsListing = ({ domains }: DomainListingProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-800 uppercase text-gray-300">
            <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-300">
              Domain
            </th>
            <th className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300">
              Traffic
            </th>
            <th className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300">
              Bids
            </th>
            <th className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300">
              Price
            </th>
            <th className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300">
              Onwer
            </th>
            <th className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <tr
              key={domain.id}
              className="transition-colors hover:bg-gray-800/30 cursor-pointer"
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium text-lg">
                {domain.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3">{10}</td>
              <td className="whitespace-nowrap px-2 py-3 text-rose-400">{2}</td>
              <td className="whitespace-nowrap px-2 py-3 text-emerald-400">
                ${domain.price}
              </td>
              <td className="whitespace-nowrap px-2 py-3">{"john"}</td>
              <td className="whitespace-nowrap px-2 py-3">
                <Button
                  variant="secondary"
                  className="bg-purple-600 text-white transition-colors hover:bg-purple-700"
                >
                  Make Offer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainsListing;
