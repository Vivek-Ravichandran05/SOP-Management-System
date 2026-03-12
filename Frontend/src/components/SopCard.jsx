import { useNavigate } from "react-router-dom";

function SopCard({ sop }) {

  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300">

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">
        {sop.title}
      </h3>

      {/* Metadata */}
      <div className="flex gap-3 text-sm text-slate-400 mb-4">

        <span className="px-2 py-1 bg-slate-800 rounded">
          📁 {sop.category}
        </span>

        <span className="px-2 py-1 bg-slate-800 rounded">
          🔖 {sop.version}
        </span>

      </div>

      {/* Button Row */}
      <div className="flex justify-end">

        <button
          onClick={() => navigate(`/sops/${sop.id}`)}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 transition-all"
        >
          View
        </button>

      </div>

    </div>
  );
}

export default SopCard;