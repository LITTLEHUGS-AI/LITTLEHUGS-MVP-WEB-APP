import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AcceptInviteTeam() {
    const { inviteId } = useParams();
    const navigate = useNavigate();

    useEffect   (() => {
        navigate(`/signup?invite-type=partner-team&token=${inviteId}`);
    }, [navigate, inviteId]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-700 text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
}

export default AcceptInviteTeam;
