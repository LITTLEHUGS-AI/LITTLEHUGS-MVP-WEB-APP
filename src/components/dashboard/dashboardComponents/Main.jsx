import React, { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import {
  getAssessmentData,
  getInsightsData,
  getProfileDetails,
  getShareAssessment,
} from "../../../api/dashboard-api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Main = () => {
  const [profileData, setProfileData] = useState({});
  const [assessment, setAssessment] = useState({});
  const [shareAssessmentData, setShareAssessmentData] = useState({});
  const [insights, setInsights] = useState({});

  const inputRef = useRef(null);
  const openCalendar = () => {
    inputRef.current?.showPicker(); // Only works in modern Chromium browsers
  };

  useEffect(() => {
    (async () => {
      const res = await getProfileDetails();
      res && setProfileData(res);
    })();

    (async () => {
      const res = await getAssessmentData();
      res && setAssessment(res);
    })();

    (async () => {
      const res = await getShareAssessment();
      res && setShareAssessmentData(res);
    })();
    (async () => {
      const res = await getInsightsData();
      res && setInsights(res);
    })();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Assessment Report", 14, 20);

    if (
      shareAssessmentData &&
      shareAssessmentData.results &&
      shareAssessmentData.results.length > 0
    ) {
      let currentY = 30; // initial y position

      shareAssessmentData.results.forEach((item, index) => {
        doc.setFontSize(14);
        doc.text(`Assessment #${index + 1}`, 14, currentY);

        const summary = item.summary || {};
        const output = item.assessment_output || {};

        autoTable(doc, {
          startY: currentY + 5,
          margin: { left: 14 },
          body: [
            ["Assessment Name", output.assessment_name || "N/A"],
            ["Assessment Status", output.assessment_status || "N/A"],
            ["Wellness Score", output.wellness_score || "N/A"],
            ["Personality Insights", output.persnality_insights || "N/A"],
            ["Next Step Suggestions", output.next_step_suggestions || "N/A"],
            ["Development Stage", summary.developmental_stage || "N/A"],
            ["Emotional Tone", summary.emotional_tone || "N/A"],
          ],
          theme: "striped",
          styles: {
            fontSize: 11,
            cellPadding: 4,
          },
          didDrawPage: function (data) {
            currentY = data.cursor.y + 20; // add more vertical space after each table
          },
        });
      });
    } else {
      doc.text("No assessment data available.", 14, 30);
    }

    doc.save("assessment-report.pdf");
  };

  const CircleScore = ({ title, score, color, bgColor }) => (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <div className="flex justify-center">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={283 - (score / 10) * 283}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
            >
              {score}/10
            </text>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-blue-100 p-6 mx-4 my-4 rounded-lg">
        <h2 className="text-xl font-medium mb-2">
          Hi {profileData.name ? profileData.name : "UserName"}
        </h2>
        <p className="text-gray-700">
          In this moment, nothing is asked of you.
          <br />
          You are allowed to pause. To rest. To simply be.
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="mx-4 p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-medium mb-4">Dashboard</h2>
        <div className="grid grid-cols-12 gap-4 w-full mb-6 items-center">
          <div className="md:col-span-2 col-span-12">
            <div className="w-full cp"  onClick={openCalendar}>
              <input
               ref={inputRef}
                type="date"
                className="w-full cp px-4 py-3 text-sm border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="2025-09-05"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-10 col-span-12 p-3 flex-1 flex items-center justify-start gap-4 rounded-md border overflow-x-auto whitespace-nowrap scrollbar-thin">
            <div className="border p-2 rounded-md border-blue-400 inline-block">
              <p className="text-blue-400">360 Women’s Wellness Assessment </p>
            </div>
            <div className="border p-2 rounded-md inline-block">
              <p>360 Women’s Wellness Assessment </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Total Assessments</h3>
            <p className="text-5xl font-bold">
              {assessment.count ? assessment.count : "0"}
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Incomplete</h3>
            <p className="text-5xl font-bold">0</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Complete</h3>
            <p className="text-5xl font-bold">
              {assessment.results ? assessment.results.length : "0"}
            </p>
          </div>
        </div>

        {/* RAG Wellness Score */}
        <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">RAG Wellness Score</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <CircleScore
              title={
                shareAssessmentData?.results?.[0]?.domains?.[0] || "fetching"
              }
              score={8}
              color="#22c55e"
              bgColor="bg-orange-100"
            />
            <CircleScore
              title={
                shareAssessmentData?.results?.[0]?.domains?.[1] || "fetching"
              }
              score={4}
              color="#ef4444"
              bgColor="bg-green-100"
            />
            <CircleScore
              title={
                shareAssessmentData?.results?.[0]?.domains?.[2] || "fetching"
              }
              score={6}
              color="#a78bfa"
              bgColor="bg-purple-100"
            />
            <CircleScore
              title={
                shareAssessmentData?.results?.[0]?.domains?.[3] || "fetching"
              }
              score={6}
              color="#f59e0b"
              bgColor="bg-yellow-100"
            />
            <CircleScore
              title={
                shareAssessmentData?.results?.[0]?.domains?.[4] || "fetching"
              }
              score={3}
              color="#f87171"
              bgColor="bg-red-100"
            />
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-6 p-6 bg-orange-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Short summary</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {insights?.results?.map((el) => (
              <div key={el.id} className="p-4 bg-white rounded shadow-md">
                <p className="font-semibold mb-1">{el.assessment_name}</p>
                <p className="text-gray-700">
                  Wellness Score:{" "}
                  <span className="font-bold">{el.wellness_score}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Report Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="bg-red-500 p-2 rounded">
              <span className="text-white text-xs">PDF</span>
            </div>
            <span className="ml-3">Here is your detailed summary</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="p-2 border border-gray-300 rounded-lg"
              onClick={downloadPDF}
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
