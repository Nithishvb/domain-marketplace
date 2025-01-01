import React from "react";

import { Button } from "@repo/ui";
import { IDomainList } from "@/lib/types";

interface DomainListingProps {
  domains: IDomainList[];
}

const DomainsListing = ({ domains }: DomainListingProps) => {
  return (
    <div className="relative w-full">
      <div>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="sticky top-0 z-10 bg-gradient-to-b from-gray-900 to-black">
                <tr className="uppercase text-gray-300">
                  <th
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Domain
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Traffic
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Bids
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Owner
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap text-center px-2 py-3 text-sm font-medium text-gray-300 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-transparent">
                {domains.map((domain) => (
                  <tr
                    key={domain.id}
                    className="transition-colors hover:bg-gray-800/30 cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-md text-white">
                      {domain.domainName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
                      {domain.price}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-[#FF8AAD] text-sm">
                      {2}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-[#92F7CB] text-sm">
                      ${domain.price}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-white">
                      {"verified"}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-white">
                      {"john"}
                    </td>
                    <td className="whitespace-nowrap text-center px-2 py-3 text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default DomainsListing;
