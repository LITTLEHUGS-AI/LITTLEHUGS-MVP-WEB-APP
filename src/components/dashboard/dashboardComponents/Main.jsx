import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  getAssessmentData,
  getShareAssessment,
  getWomenProfileDetails,
} from "../../../api/dashboard-api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Main = () => {

  const [isBlur, setIsBlur] = useState(true);

  const [data, setData] = useState({});
  const [latestdate, setLatestDate] = useState(null);

  const [domainWellnessScore, setDomainWellnessScore] = useState([]);

  const [profileData, setProfileData] = useState({});
  const [assessment, setAssessment] = useState({});
  const [shareAssessmentData, setShareAssessmentData] = useState({});

  useEffect(() => {

    getData();

    (async () => {
      const res = await getWomenProfileDetails();
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
    // (async () => {
    //   const res = await getInsightsData();
    //   res && setInsights(res);
    // })();
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

  const getColorByScore = (score) => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#facc15'; // yellow
    if (score >= 40) return '#fb923c'; // red
    return '#ef4444'; // red-500
  };


  const CircleScore = ({ index, title, score }) => {
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
                stroke={getColorByScore(score)}
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

  async function getData() {

    fetch('https://api.ourlittlehugs.com/v1/api/share-assessment', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('accessToken'),
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.count === 0) {
          setIsBlur(true);
          return;
        }
        setIsBlur(false);
        setData(data);
        const domainInsights = data.results[0].assessment_output.domain_insights;
        const domainArray = Object.keys(domainInsights).map(key => domainInsights[key]);
        setDomainWellnessScore(domainArray);
        setLatestDate(data.results[0].assessment_output.created_at);
        console.log(domainArray[0].domain)
      })
      .catch(err => toast.error(err.message));
  }


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


      <div className="w-full">

        {isBlur &&
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Please Take an Assessment to view your Dashboard</h2>
              <Link to='/personal/assessment' className="block w-52 mt-4 bg-red-500 text-white text-center p-2 rounded cursor-pointer"  >
                Go to Assessment
              </Link>
            </div>
          </div>
        }

        {/* Dashboard Content */}
        <div className={`mx-4 p-6 bg-white rounded-lg border border-gray-200 ${isBlur && 'blur'}`}      >
          <h2 className="text-xl font-medium mb-4">Dashboard</h2>


          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium">Total Assessments</h3>
              <p className="text-5xl font-bold">
                {data.count ? data.count : "0"}
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Complete</h3>
              <p className="text-5xl font-bold">
                {assessment.results ? assessment.results.length : "0"}
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Incomplete</h3>
              {Number.isFinite(parseInt(data.count))}
              <p className="text-5xl font-bold">   {Number.isFinite(parseInt(data.count)) && Number.isFinite(parseInt(assessment.results))
                ? parseInt(data.count) - parseInt(assessment.results)
                : ''}</p>
            </div>
          </div>

          {/* <div className="grid grid-cols-12 gap-4 w-full mb-6 items-center">
            <div className="md:col-span-2 col-span-12">
              <div className="w-full cp" onClick={openCalendar}>
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
              {assessment.results && assessment.results.map((asses, i) => {
                return (
                  <div className={`border p-2 rounded-md ${i === 0 ? 'border-blue-400' : 'border-gray-600'} inline-block`}>
                    <p className="text-blue-400">{asses.assessment_name} </p>
                  </div>
                )
              })}
            </div>
          </div> */}

          <div className="flex justify-between">
            <div className="my-4"><b>Lastest Assessment Name </b> : {assessment?.results?.[0]?.assessment_name ?? 'N/A'} </div>
            <div className="my-4"><b>Lastest Assessment Date </b> : {latestdate && new Date(latestdate).toLocaleString()} </div>
          </div>

          {/* Domain Wellness Score */}
          <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Domain Wellness Score</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

              {domainWellnessScore.map((assessment, index) => (
                <CircleScore
                  key={index}
                  title={assessment?.domain || 'fetching'}
                  score={assessment?.score || '0'}
                  color="#22c55e"
                  index={index + 1}
                />
              ))}


            </div>
          </div>

          {/* Summary Section */}
          <div className="w-fulll my-8">
            <h2 className="text-xl font-bold mb-6">Wellness Scorecard</h2>

            <div className="overflow-hidden border border-gray-200 rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Domain</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Insight</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {domainWellnessScore.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.domain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span
                            className="inline-block w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: getColorByScore(item.score) }}
                          />
                          <span>{item.flag.charAt(0).toUpperCase() + item.flag.slice(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <ul className="list-disc pl-5">
                          {item.positive_summary && (
                            <li>                           {item.positive_summary}                            </li>
                          )}
                          {item.negative_summary && (
                            <li>{item.negative_summary}                            </li>
                          )}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      </div>



    </>
  );
};

export default Main;