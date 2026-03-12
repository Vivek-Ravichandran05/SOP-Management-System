import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import SearchBar from "../components/SearchBar";
import SopCard from "../components/SopCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/skeletonCard";

function AllSops(){
    const [sops, setSops] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const [debouncedSearch,setDebouncedSearch] = useState("");

    const limit = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        },300)

        return () => clearTimeout(timer);
    },[search]);

    useEffect(() => {
        fetchSops();
    }, [page,debouncedSearch]);

    const fetchSops = async () => {
        try {
            setLoading(true);
            const skip = (page - 1) * limit;

            const response = await api.get("/sops/",{
                params:{
                    skip:skip,
                    limit:limit,
                    search:debouncedSearch
                }
            });
            setSops(response.data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Navbar */}
            <nav className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    <span className="text-lg font-bold">All SOPs</span>
                    <button onClick={() => navigate("/dashboard")} className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300">
                                Back
                    </button>
                </div>
            </nav>

            {/* Form Container */}
            <main className="max-w-3xl mx-auto px-6 py-10">
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    setPage={setPage}
                    />

            {loading ? (
                <div>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                </div>
            ) :sops.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-6 mt-40">
                <p className="text-slate-300 text-lg">No SOPs found.Start by creating your first SOP.</p>
                <button onClick={() => navigate("/createsop")} className="px-4 py-3 font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                                + Create SOP
                </button>
                </div>
            ) : (
                sops.map((sop) => (
                    <SopCard
                    key={sop.id}
                    sop={sop}
                    navigate={navigate}
                    />
                ))
            )}
            <div className="flex items-center justify-center gap-6 mt-8">
                <Pagination
                    page={page}
                    setPage={setPage}
                    />
            </div>
            </main>
        </div>
    );
}

export default AllSops;