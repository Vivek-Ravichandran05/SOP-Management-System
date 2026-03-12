import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import api from "../Services/api"

function EditSop() {
    const {id} = useParams();
    const navigate = useNavigate();

    const[title,setTitle] = useState("");
    const[category,setCategory] = useState("");
    const[description,setDescription] = useState("");
    const[content,setContent] = useState("");
    const[version,setVersion] = useState("");

    useEffect(() => {
            fetchSop();
    },[id]);

    const fetchSop = async() => {
        try {
            const response = await api.get(`/sops/${id}`);
            const sop = response.data;

            setTitle(sop.title);
            setCategory(sop.category);
            setDescription(sop.description);
            setContent(sop.content);
            setVersion(sop.version);
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();

        try {
            await api.patch(`/sops/${id}`, {
                title,
                category,
                description,
                content,
                version,
            });

            alert("SOP updated successfully");
            navigate(`/sops/${id}`);
        }
        catch(err) {
            console.log(err);
            alert("Error updating SOP!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white ">

            {/* Navbar */}
            <nav className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    <span className="text-lg font-bold">Edit SOP</span>
                    <button onClick={() => navigate(`/sops/${id}`)} className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300" >
                        Back
                    </button>
                </div>
            </nav>

            {/* Form Container */}
            <main className="max-w-3xl mx-auto px-6 py-10 bg-slate-800/80 rounded-2xl shadow-xl">
                <form id="sopUpdate" onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Title</label>
                        <input
                        type="text"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Category</label>
                        <input
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Description</label>
                        <textarea
                        rows="4"
                        placeholder="Short description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Content</label>
                        <textarea
                        rows="6"
                        placeholder="Full SOP content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Version</label>
                        <input
                        type="text"
                        placeholder="version"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </form>
                <div className="flex justify-center">
                    <button
                    type="submit"
                    form="sopUpdate"
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-green-600 hover:bg-green-500 transition-all duration-300"
                    >
                        Save
                    </button>
                </div>
            </main>
        </div>
    )


} 

export default EditSop;