import { usePDF } from 'react-to-pdf';
import { Download } from "lucide-react";
import { useState } from 'react';


const AssessmetPDF = ({ name, assessmentName, domainWellnessScore = [], latestdate }) => {

  const [showPDF, setShowPDF] = useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: 'Assessment.pdf', options: {
      format: [595.28, 841.89],
      orientation: 'portrait',
      unit: 'pt',
      scale: 2,
    },
  });

  const CircleScore = ({ index, title, score, color }) => {
    let bgColor = 'bg-green-100';
    switch (index) {
      case 1: bgColor = '#F9BD87'; break;
      case 2: bgColor = '#A5D3C6'; break;
      case 3: bgColor = '#E7E1F9'; break;
      case 4: bgColor = '#FFFAE2'; break;
      case 5: bgColor = '#F8DBDB'; break;
      default: bgColor = 'bg-green-100';
    }
    return (
      <div style={{ backgroundColor: bgColor }} className={`flex flex-col p-4 rounded-lg`}>
        <h4 className="flex-1 text-sm font-medium mb-2">{title}</h4>
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
                strokeDashoffset={283 - (score / 100) * 283}
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#333"
              >
                {Math.ceil(score)}/100
              </text>
            </svg>
          </div>
        </div>
      </div>);
  }

  const handleDownload = async () => {
    setShowPDF(true);

    setTimeout(async () => {
      const element = targetRef.current;

      if (element) {
        toPDF();
        setShowPDF(false);
      }
    }, 1000);
  };

  return (
    <>
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
            onClick={handleDownload}
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {showPDF && (
        <div ref={targetRef} className="bg-[#fff8f0] h-[780mm] font-[quicksand] mx-auto p-8 font-sans shadow-lg">

          <div className='max-w-4xl mx-auto'>


            <div className="w-full flex flex-col items-center p-4">
              <div className="flex items-center">
                <img src="/images/logo.jpg" alt="Logo" className="h-8 w-8" />
                <span className="ml-2 text-xl font-semibold text-blue-600">
                  LittleHugs
                </span>
              </div>
              <div className="ml-28 text-gray-600 text-[14px]">Downloaded on : {assessmentName?.created_at?.split('T')[0] || ""}</div>
            </div>


            {/* Header Information */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-40">User Name</span>
                <span className="text-gray-700 mr-4">:</span>
                <span className="text-gray-900 font-medium">{name}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-40">Assessment Name</span>
                <span className="text-gray-700 mr-4">:</span>
                <span className="text-gray-900 font-medium">{assessmentName?.assessment_output?.assessment_name || 'N/A'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-40">Assessment Date:</span>
                <span className="text-gray-700 mr-4">:</span>
                <span className="text-gray-900 font-medium">{(latestdate && new Date(latestdate).toDateString())}</span>
              </div>
            </div>

            {/* Overall Wellness Score Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-500 mb-6">Overall Wellness Score</h2>
              <div className="text-5xl font-bold italic text-gray-800">
                64<span className="text-gray-600">/100</span>
              </div>
            </div>

            {/* Top Five Domains Section */}
            <h2 className="text-2xl font-bold text-blue-500 text-center mt-12">Top Five Domains</h2>

            {/* Domain Wellness Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-4">
              {domainWellnessScore.map((assessment, index) => (
                <CircleScore
                  key={index}
                  title={assessment?.domain || 'fetching'}
                  score={assessment?.score || '0'}
                  color={assessment?.flag || "#22c55e"}
                  index={index + 1}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold text-blue-500 text-center mt-12">Outcome Overview</h2>

            {/* Table Header */}
            <table className="min-w-full divide-y divide-gray-200 mt-4 hidden sm:table">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Domain</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Insight</th>
                </tr>
              </thead>


              {/* Table Rows */}
              <tbody className="bg-white divide-y divide-gray-200">
                {domainWellnessScore.map((outcome, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{outcome.domain}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span
                          className="inline-block ring ring-1 w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: outcome.flag }}
                        />
                        <span>{outcome.flag.charAt(0).toUpperCase() + outcome.flag.slice(1)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      <ul className="list-disc pl-5">
                        {outcome.positive_summary && <li>{outcome.positive_summary}</li>}
                        {outcome.negative_summary && <li>{outcome.negative_summary}</li>}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            {/* Insight Cards Section */}
            <div className="mt-12">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Insight Cards</h3>

              <div className="space-y-4">
                {assessmentName?.assessment_output?.personality_insight?.split('.').slice(0, -1).map((insight, index) => (
                  <div key={index} className="bg-purple-100 rounded-lg p-6 text-center">
                    <p className="text-gray-700 font-medium">
                      {insight || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Suggestions Section */}
            <div className="mt-28">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Next step suggestions</h3>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Self-nudge packs (affirmations, sleep ritual, mini-care planner)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Smart nudges activated for flagged domain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Next Check-in Reminder: 7 days or custom schedule</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Journaling prompt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Talk to our therapist</span>
                </li>
              </ul>
            </div>


            <div className="relative bottom-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-2xl pt-4 pb-2 text-center mt-20 shadow-lg">
              <h2 className="text-white text-xl font-medium mb-4">
                Download Our Mobile App
              </h2>
              <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white font-medium py-2 px-12 rounded-full text-lg">
                Download
              </button>
            </div>


          </div>


        </div>)}
    </>
  );
};

export default AssessmetPDF;