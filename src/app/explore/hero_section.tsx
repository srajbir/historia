'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, Filter as FilterIcon } from 'lucide-react';
import { allowedCollections as filterOptions } from '@/lib/types';

const Hero_section = (params: {search: boolean; filter: boolean}) => {
  const router = useRouter();
  const path = usePathname();

  // ─── Search ───────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');

  // ─── Filter modal ─────────────────────────────────────────
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState<string[]>(filterOptions); // Start with all selected
  const modalRef = useRef<HTMLDivElement | null>(null);

  // When unchecked, remove from selected
  const toggleFilter = (opt: string) => {
    setSelected((prev) => prev.includes(opt) 
      ? prev.filter((o) => o !== opt) 
      : [...prev, opt]
    );
  };

  const closeModal = () => setShowFilter(false);

  // Close on Escape or clicking outside
  // Initialize with all filters selected and trigger initial filter event
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('filter-change', {
        detail: {
          searchTerm: searchTerm.trim(),
          filter: selected,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (!showFilter) return;

    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    const handleClick = (e: MouseEvent) =>
      modalRef.current && !modalRef.current.contains(e.target as Node) && closeModal();

    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [showFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm.trim());
    if (selected.length) params.set('filter', selected.join(','));

    router.push(`?${params.toString()}`);
    closeModal();

    // 🔥 Emit global event for client components
    window.dispatchEvent(
      new CustomEvent('filter-change', {
        detail: {
          searchTerm: searchTerm.trim(),
          filter: selected,
        },
      })
    );
  };
  
  return (
    <section className="overflow-hidden rounded shadow backdrop-blur-lg my-5 w-full h-48 md:h-72 lg:h-96 relative">
      {/* Scrolling background image */}
      <div className="explore-bg pointer-events-none select-none" />

      {/* Search bar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl mb-1 font-bold text-white" >EXPLORE&nbsp;&nbsp;HISTORY!</h1>
        {/* {path === '/explore' && (<form */}
        {params.search && (<form
          onSubmit={handleSubmit}
          className="border-2 p-1 lg:p-2 flex gap-2 rounded min-w-72 md:min-w-2xl lg:min-w-3xl bg-black/30 text-white"
        >
          <input
            type="text"
            name="search"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-1 outline-none text-xl w-[100px] md:w-auto bg-transparent placeholder-white/70"
          />

          {/* Clear button */}
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            disabled={!searchTerm}
            className={`p-1 rounded hover-scale bg-black/50 transition-opacity cursor-pointer ${
              searchTerm ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <X size={24} />
          </button>

          {/* Submit */}
          <button type="submit" className="bg-black/50 p-1 rounded hover-scale cursor-pointer">
            <Search size={24} />
          </button>

          {/* Filter toggle */}
          {params.filter && (<button
            type="button"
            onClick={() => setShowFilter(true)}
            className="bg-black/50 p-1 rounded hover-scale cursor-pointer"
          >
            <FilterIcon size={24} />
          </button>)}
        </form>)}
      </div>

      {/* ─────────────── Filter Modal ─────────────── */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div
            ref={modalRef}
            className="bg-white/50 dark:bg-[#1f1f1fcc] rounded shadow-xl p-2 lg:p-3 max-w-[250px] md:max-w-sm relative backdrop-blur-lg animate-[fadeIn_200ms_ease-out]"
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-1.5 right-1.5 p-1 rounded hover-scale hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>


            <form onSubmit={handleSubmit} className="space-y-0">
              {filterOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm md:text-lg capitalize cursor-pointer w-fit"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => toggleFilter(opt)}
                    className="h-3 w-3 accent-[#5a78f0] rounded"
                  />
                  {opt}
                </label>
              ))}

              <div className="flex justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelected(filterOptions)} // Select all instead of clearing
                  className="px-3 py-1 bg-[#273a7a] text-white rounded transition-all duration-200 font-medium cursor-pointer hover-scale text-sm md:text-lg hover:bg-[#5a78f0]"
                >
                  Select All
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#273a7a] text-white rounded transition-all duration-200 font-medium cursor-pointer hover-scale text-sm md:text-lg hover:bg-[#5a78f0]"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero_section;
