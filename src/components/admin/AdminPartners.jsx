import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { toast } from "react-toastify";

export default function AdminPartners() {

    const [loading, setLoading] = useState(false);
    const [partners, setPartners] = useState([]);
    const [newPartner, setNewPartner] = useState({ name: '', email: '', partnerType: 'Clinic' });
    const [showInvitePopup, setShowInvitePopup] = useState(false);

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
    };

    const Badge = ({ label, type }) => {
        const badgeStyles = {
            success: 'bg-green-100 text-green-800',
            warning: 'bg-yellow-100 text-yellow-800',
            default: 'bg-gray-100 text-gray-800'
        };

        return (
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${badgeStyles[type] || badgeStyles.default}`}>
                {label}
            </span>
        );
    };

    const handleInviteSubmit = (e) => {
        e.preventDefault();
        setNewPartner({ name: newPartner.name, email: newPartner.email, partnerType: newPartner.partnerType });
    };



    async function fetchPartners() {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/v1/api/invite-partner/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                "Authorization": localStorage.getItem('authToken')
            },
        }).then((res) => {
            if (res.status === 404) {
                toast.warn('No Partners, Please Add one.');
                return [];
            }
            return res.json();
        })
            .then((json) => { if (json.results) setPartners(json.results) })
            .catch((err) => toast.error(err))
            .finally(() => setLoading(false));
    }


    const invitePartner = () => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/api/invite-partner/`, {
            method: 'POST',
            body: JSON.stringify({ name: newPartner.name, email: newPartner.email, partner_type: newPartner.partnerType }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Partners Invited');
                    setShowInvitePopup(false);
                }
                else toast.error('Error in Inviting Partners');
            })
            .catch((err) => toast.error(err));
    }


    const handleNewPartnerChange = (e) => {
        const { name, value } = e.target;
        setNewPartner(prev => ({
            ...prev,
            [name]: value
        }));
    };


    async function deletePartner(partner) {
        const confirmed = window.confirm('Are you sure you want to delete this Partner?');
        if (!confirmed) return;

        try {
            setLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}/v1/api/invite-partner/${partner.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
            }).then((res) => {
                if (res.status === 204) { toast.success('Partners Deleted'); fetchPartners(); }
                else toast.error('Error in Deleting Partners');
            });
        }
        catch {
            toast.error('Failed to Delete Partner')
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => { fetchPartners(); }, []);


    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 flex flex-col p-6 md:p-10">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Partners</h1>

                <section className="flex-1 bg-gradient-to-r from-blue-100 to-pink-100 p-6 rounded-xl shadow-md">
                    <div className="w-full mb-2 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Invited Partners</h2>
                        <span onClick={() => setShowInvitePopup(true)} className="px-6 py-2 rounded-2xl text-white bg-blue-500 hover:bg-blue-700">Invite</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="text-left">
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Email</th>
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Name</th>
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Invited On</th>
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Invite Accepted</th>
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Invited User</th>
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Partner Type</th>
                                    <th className="px-6 py-3 text-lg font-bold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="py-10">
                                            <div className="flex justify-center items-center">
                                                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    partners.map((partner, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 text-sm text-gray-700">{partner.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{partner.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{formatDate(partner.created_at)}</td>
                                            <td className="px-6 py-4 text-sm">
                                                {partner.status === "accepted" ? (
                                                    formatDate(partner.updated_at)
                                                ) : (
                                                    <Badge label="Pending" type="warning" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{partner.user_count}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{partner.partner_type}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                <button
                                                    onClick={() => deletePartner(partner)}
                                                    className="p-2 rounded-xl text-white font-semobold bg-red-400"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {showInvitePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Invite New Partner</h2>
                        <form onSubmit={handleInviteSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPartner.name}
                                    onChange={handleNewPartnerChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newPartner.email}
                                    onChange={handleNewPartnerChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Partner Type</label>
                                <select
                                    name="partnerType"
                                    value={newPartner.partnerType}
                                    onChange={handleNewPartnerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option value="Clinics">Clinic</option>
                                    <option value="Schools">School</option>
                                    <option value="NGO">NGO</option>
                                    <option value="Therapy Center">Therapy Center</option>
                                    <option value="Corporate">Corporate</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowInvitePopup(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={invitePartner}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}