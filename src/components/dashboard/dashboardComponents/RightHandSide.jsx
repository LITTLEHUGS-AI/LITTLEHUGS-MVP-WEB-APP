import { useEffect, useState } from "react";
import { getShareAssessment } from "../../../api/dashboard-api";
import ProfileUi from "./ProfileUi";

const RightHandSide = ({show}) => {
  const [insight, setInsight] = useState('N/A');
  useEffect(() => {
    (async () => {
      const res = await getShareAssessment();
      setInsight(res?.results?.[0]?.assessment_output?.personality_insight || 'N/A');
    })();
  }, []);

  return (
    <>
      <ProfileUi />
      {show && <div className="my-6">
        <h3 className="text-lg font-medium mb-4">Insight Cards</h3>
        <div className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-800">
              <div className="mb-2">
                <span className="font-semibold">Personality Insight:</span> {insight}
              </div>
            </p>
            <p className="text-gray-800 mt-2">
              <span className="font-semibold">Next Step Suggestions :</span>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Self-nudge packs (affirmations, sleep ritual, mini-care planner)</li>
                <li>Smart nudges activated for flagged domains</li>
                <li>Next check-in reminder: 7 days or custom schedule</li>
                <li>Journaling prompt</li>
                <li>Talk to our therapist</li>
              </ul>
            </p>
          </div>
        </div>
      </div>}


    </>
  );
};

export default RightHandSide;
