function Pagination({ page, setPage }) {
    return (
        <div className="flex items-center justify-center gap-6 mt-10">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-40"
            >
                Previous
            </button>

            <span className="text-slate-300">
                Page {page}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-slate-700 rounded-lg"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;