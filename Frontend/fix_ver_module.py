import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the VerificationModule from start to end and replace it entirely to be safe
start_str = "const VerificationModule = () => {"
end_str = "const ModerationModule = () => ("

import re
pattern = re.compile(re.escape(start_str) + r'.*?(?=' + re.escape(end_str) + ')', re.DOTALL)

correct_module = """const VerificationModule = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Fetch from real backend
        fetch('http://localhost:5000/api/admin/verifications/pending')
            .then(res => res.json())
            .then(data => {
                if(data.success) setUsers(data.data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    const handleVerify = async (id, status) => {
        try {
            await fetch(`http://localhost:5000/api/admin/verifications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {}
    };

    return (
        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">UC-29: Pending Verifications</h3>
            
            <div className="flex space-x-4 mb-6 border-b border-gray-800 pb-2">
                {['Students', 'Faculty', 'Institutions', 'Companies', 'Recruiters'].map((tab, i) => (
                    <button key={tab} className={`px-4 py-2 text-sm font-medium ${i === 0 ? 'text-red-400 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-300'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {loading ? <p className="text-gray-500 text-sm">Loading pending verifications...</p> : users.length === 0 ? <p className="text-gray-500 text-sm">No pending verifications found in database.</p> : users.map((u, i) => (
                    <div key={u._id || i} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20 uppercase">
                                {(u.name || 'U').charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">{u.name} <span className="text-gray-500 text-[10px] uppercase ml-2 border border-gray-700 px-1.5 py-0.5 rounded">{u.role}</span></p>
                                <p className="text-gray-500 text-xs">{u.email} &bull; {u.institutionCode || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleVerify(u._id, 'approved')} className="px-3 py-1.5 bg-green-900/30 text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-900/50 flex items-center cursor-pointer transition-colors">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                            </button>
                            <button onClick={() => handleVerify(u._id, 'rejected')} className="px-3 py-1.5 bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-medium hover:bg-red-900/50 flex items-center cursor-pointer transition-colors">
                                <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};\n\n"""

content = pattern.sub(correct_module, content)

# Remove the dangling }; if there is one that was left behind
content = content.replace("};};", "};") 
# Or if it's sitting somewhere random:
content = re.sub(r'};\s*};', '};', content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
