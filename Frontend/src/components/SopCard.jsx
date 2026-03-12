function SopCard({ sop, navigate }) {
    return (
        <div
            onClick={() => navigate(`/sops/${sop.id}`)}
            className="p-6 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
        >
            <h3 className="text-lg font-semibold text-white">
                {sop.title}
            </h3>

            <div className="mt-2 text-sm text-slate-400">
                <p>Category: {sop.category}</p>
                <p>Version: {sop.version}</p>
            </div>
        </div>
    );
}

export default SopCard;