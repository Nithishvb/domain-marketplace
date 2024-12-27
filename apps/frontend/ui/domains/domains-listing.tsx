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
              category
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
              <td className="whitespace-nowrap px-4 py-3 text-lg">
                {domain.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3">{10}</td>
              <td className="whitespace-nowrap px-2 py-3 text-[#FF8AAD]">{2}</td>
              <td className="whitespace-nowrap px-2 py-3 text-[#92F7CB]">
                ${domain.price}
              </td>
              <td className="whitespace-nowrap px-2 py-3">{"verfied"}</td>
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
