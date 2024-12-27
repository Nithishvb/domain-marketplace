import React from "react";

const DomainSearch = () => {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="relative w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OrjjrwcMDgHA0_zR4wigtP1-KPrXZC3MlA&s')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black object-cover"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20">
          <div className="mb-2 text-sm font-medium text-white/80">
            DOMAIN NAME SEARCH
          </div>
          <h1 className="mb-8 text-5xl font-bold text-white">
            Find the domain that defines your brand
          </h1>

          {/* Search Form */}
          <div className="max-w-3xl">
            <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Find a domain name"
                  className="h-14 w-full rounded-lg border-0 bg-white pl-12 pr-4 text-lg text-gray-900 placeholder:text-gray-400"
                />
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button className="rounded-lg bg-red-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-red-600">
                SEARCH
              </button>
            </form>

            {/* Transfer Link */}
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex items-center text-sm text-white/80 hover:text-white"
              >
                I want to transfer my domain instead{" "}
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSearch;
