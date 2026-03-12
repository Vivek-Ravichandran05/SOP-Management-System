import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import api from "../Services/api"
import SkeletonCard from "../components/skeletonCard";

function ViewSop() {
    const [sop,setSop] = useState(null);
    const [loading,setLoading] = useState(true);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect (() => {
        if (id) {
        fetchsop();
        }
    },[id]);

    const fetchsop= async() =>{
        try {
            setLoading(true);
            const response = await api.get(`/sops/${id}`);
            setSop(response.data);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = async() => {
        const confirmed = window.confirm("Are you sure you want to delete this SOP?");

        if (confirmed) {
            try {
                const response = await api.delete(`/sops/${id}`);
                navigate("/allsops");
            }
            catch(err) {
                console.log(err);
            }
        };
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Navbar */}
            <nav className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    <span className="text-lg font-bold">View SOP</span>
                    <button onClick={() => navigate("/allsops")} className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300" >
                        Back
                    </button>
                </div>
            </nav>
        
            {/* Form Container */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {loading ? (

            <div className="text-center text-slate-400">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

        ) : !sop ? (

            <div className="text-center text-red-400">
                SOP not found
            </div>

        ) : (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-10 shadow-2xl">
                
                {/* Title */}
                <h2 className="text-4xl font-bold mb-4">
                    {sop.title}
                </h2>

                {/* Metadata Row */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-8">
                <span className="px-3 py-1 bg-slate-800 rounded-lg">
                    📁 {sop.category}
                </span>
                <span className="px-3 py-1 bg-slate-800 rounded-lg">
                    🔖 {sop.version}
                </span>
                <span className="px-3 py-1 bg-slate-800 rounded-lg">
                    🕒 {new Date(sop.created_at).toLocaleDateString()}
                </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        📝 Description
                    </h3>
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                    {sop.description}
                </p>
                </div>

                {/* Content */}
                <div className="mb-10">
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        📄 Content
                    </h3>
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                    {sop.content}
                </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                    onClick={() => navigate(`/edit/${id}`)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20">
                        Edit
                    </button>

                    <button
                    onClick={handleDelete}
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-300 shadow-lg shadow-red-500/20">
                        Delete
                    </button>
                </div>
                </div>
        )}
            </main>
        </div>
    );
}

export default ViewSop;