import React, { useEffect, useState } from "react";
import { getInsightsData } from "../../../api/dashboard-api";
import ProfileUi from "./ProfileUi";

const RightHandSide = () => {
  const [insights, setInsights] = useState({});
  useEffect(() => {
    (async () => {
      const res = await getInsightsData();
      res && setInsights(res);
    })();
  }, []);
  return (
    <>
      <ProfileUi />
      {/* Mood Trend Section */}
      <div className="my-6">
        <h3 className="text-lg font-medium mb-4">Mood trend</h3>
        <div className="h-48 bg-white rounded-lg border border-gray-200"></div>
      </div>

      {/* Insight Cards */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Insight Cards</h3>
        <div className="space-y-4">
          {insights?.results?.length > 0 ? (
            insights.results.map((item) => (
              <div key={item.id} className="p-4 bg-orange-50 rounded-lg">
                <p className="text-gray-800">
                  <span className="font-semibold">Personality Insight:{" "}</span>
                  {item.persnality_insights}
                </p>
                <p className="text-gray-800 mt-2">
                  <span className="font-semibold">Next Step:</span> {item.next_step_suggestions}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No insights available.</p>
          )}
        </div>
      </div>

      {/* Download App Banner */}
      <div className="mt-6">
        <p className="text-center mb-4">
          Download our Mobile App to get personalised nudges for your insights
        </p>
        <button className="bg-blue-500 text-white w-full py-2 rounded-lg">
          Download
        </button>
      </div>
    </>
  );
};

export default RightHandSide;
