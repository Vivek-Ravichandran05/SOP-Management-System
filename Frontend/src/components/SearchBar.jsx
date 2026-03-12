function SearchBar({search, setSearch, setPage}) {
    return(
        <div className="mb-6">
            <input
            type="text"
            placeholder="Search SOP..."
            value={search}
            onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
            }}
            className="w-full px-4 py-3 text-white bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
        </div>
    );
}

export default SearchBar;