function SkeletonCard() {
    return (
        <div className="p-6 rounded-xl bg-slate-800 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-slate-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-1/3"></div>
        </div>
    );
}

export default SkeletonCard;