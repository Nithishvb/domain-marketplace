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
    <div className="flex justify-center w-[100%]">
      <table className="w-full border-collapse text-left overflow-auto">
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
            status
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
              <td className="whitespace-nowrap px-4 py-3 text-md">
                {domain.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">{10}</td>
              <td className="whitespace-nowrap px-2 py-3 text-[#FF8AAD] text-sm">{2}</td>
              <td className="whitespace-nowrap px-2 py-3 text-[#92F7CB] text-sm">
                ${domain.price}
              </td>
              <td className="whitespace-nowrap px-2 py-3 text-sm">{"verfied"}</td>
              <td className="whitespace-nowrap px-2 py-3 text-sm">{"john"}</td>
              <td className="whitespace-nowrap px-2 py-3 text-sm">
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
