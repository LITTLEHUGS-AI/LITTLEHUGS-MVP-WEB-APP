import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  getAssessmentData,
  getWomenProfileDetails,
} from "../../../api/dashboard-api";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import store from "../../../config/storeInstance";
import RightHandSide from "./RightHandSide";

const Main = () => {

  const [isBlur, setIsBlur] = useState(true);
  const [dataLoading, setIsDataLoading] = useState(true);

  const [data, setData] = useState({});
  const [latestdate, setLatestDate] = useState(null);

  const [domainWellnessScore, setDomainWellnessScore] = useState([]);

  const [profileData, setProfileData] = useState({});
  const [assessment, setAssessment] = useState({});
  // const [shareAssessmentData, setShareAssessmentData] = useState({});

  useEffect(() => {

    getData();

    (async () => {
      const res = await getAssessmentData();
      res && setAssessment(res);
    })();

    // (async () => {
    //   const res = await getShareAssessment();
    //   res && setShareAssessmentData(res);
    // })();
    // (async () => {
    //   const res = await getInsightsData();
    //   res && setInsights(res);
    // })();
  }, []);






  const toBase64 = async (url) => {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const userName = 'Ritesh Singh';
  const [assessmentName, setAssessmentName] = useState({});
  const assessmentDate = '09/05/2025';

  // Domain data
  const [domains] = [
    { name: 'Emotional Regulation & Mood', score: 100, color: '#2e7d32', backgroundColor: '#e0f2f1' }, // green
    { name: 'Sensory Processing & Preferences', score: 68.75, color: '#fbc02d', backgroundColor: '#fff9c4' }, // yellow
    { name: 'Family & Environmental Stressors', score: 68.75, color: '#fbc02d', backgroundColor: '#fff9c4' }, // yellow
    { name: 'Coping Skills & Resilience', score: 62.5, color: '#fbc02d', backgroundColor: '#fff9c4' }, // yellow
    { name: 'Attention, Focus & Memory', score: 81.25, color: '#2e7d32', backgroundColor: '#e0f7fa' } // green
  ];

  // Outcome data
  const outcomes = [
    {
      domain: 'Emotional Regulation & Mood',
      status: 'Green',
      insight: 'Your child rarely feels annoyed or grouchy and is able to manage their irritability well.'
    },
    {
      domain: 'Sensory Processing & Preferences',
      status: 'Yellow',
      insight: 'Your child shows good ability to handle sensory inputs in busy or noisy places and responds to sounds, lights, or smells with minimal difficulty.'
    },
    {
      domain: 'Family & Environmental Stressors',
      status: 'Yellow',
      insight: 'Your child demonstrates a good ability to show they feel safe or calm during tensions by effectively managing conflicts in ways appropriate for their age.'
    },
    {
      domain: 'Coping Skills & Resilience',
      status: 'Yellow',
      insight: 'Your child demonstrates a good ability to manage stress by using appropriate coping strategies suitable for their age, reflecting minimal difficulty in handling feelings of being overwhelmed.'
    },
    {
      domain: 'Attention, Focus & Memory',
      status: 'Green',
      insight: 'Your child shows a strong ability to remember and follow multi-step instructions with ease, managing tasks that involve several steps independently.'
    }
  ];

  const downloadPDF = async () => {

    // Create new PDF document (A4 size)
    const doc = new jsPDF({
      orientation: 'portrait',
      format: 'a4'
    });


    // Set background color (light cream)
    doc.setFillColor(255, 248, 240);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    const pageWidth = doc.internal.pageSize.getWidth();


    // Add logo (circle with segments) - centered
    const imgData = await toBase64('/images/logo.jpg',);
    doc.addImage(imgData, 'JPEG', pageWidth / 2 - 20, 10, 10, 10);

    doc.setFontSize(20);
    doc.setTextColor(65, 105, 225);
    doc.setFont('helvetica', 'bold');
    doc.text(`LittleHugs`, pageWidth / 2 + 9, 17, { align: 'center' });


    // Add date text - centered
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Downloaded on : ${assessmentDate}`, pageWidth / 2 + 16, 21, { align: 'center' });

    // Add user details - align left for label, proper spacing for value
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // User Name
    doc.text('User Name', 26, 50);
    doc.text(':', 70, 50);
    doc.text(userName, 80, 50);

    // Assessment Name
    doc.text('Assessment Name', 26, 60);
    doc.text(':', 70, 60);
    doc.text(assessmentName?.assessment_output?.assessment_name || 'N/A', 80, 60);

    // Assessment Date
    doc.text('Assessment Date:', 26, 70);
    doc.text(':', 70, 70);
    doc.text(assessmentName?.created_at || 'N/A', 80, 70);

    // Overall Wellness Score
    doc.setFontSize(18);
    doc.setTextColor(65, 105, 225);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Wellness Score', pageWidth / 2, 90, { align: 'center' });

    // Score
    doc.setFontSize(36);
    doc.setTextColor(80, 80, 80);
    doc.text(`${assessmentName?.assessment_output?.overall_assessment?.score || 'N/A'}/100`, pageWidth / 2, 105, { align: 'center' });

    // Top Five Domains
    doc.setFontSize(18);
    doc.setTextColor(65, 105, 225);
    doc.text('Top Five Domains', pageWidth / 2, 130, { align: 'center' });

    // Domain visualization (simplified with proper spacing)
    const domainWidth = 30;
    const domainSpacing = 8;
    const totalWidth = (domainWidth * 5) + (domainSpacing * 4);
    const domainStartX = (pageWidth - totalWidth) / 2;
    const domainY = 135;

    domains.forEach((domain, index) => {
      const x = domainStartX + (index * (domainWidth + domainSpacing));

      // Rectangle background
      doc.setFillColor(hexToRgb(domain.backgroundColor).r, hexToRgb(domain.backgroundColor).g, hexToRgb(domain.backgroundColor).b);
      doc.rect(x, domainY, domainWidth, 38, 'F');

      // Domain name
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(domain.name, x + domainWidth / 2, domainY + 10, { align: 'center' });

      // Circle for score
      doc.setDrawColor(hexToRgb(domain.color).r, hexToRgb(domain.color).g, hexToRgb(domain.color).b);
      doc.setLineWidth(1.5);
      doc.circle(x + domainWidth / 2, domainY + 22, 10, 'S');

      // Score text
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(`${domain.score}/10`, x + domainWidth / 2, domainY + 24, { align: 'center' });
    });

    // Outcome Overview
    doc.setFontSize(18);
    doc.setTextColor(65, 105, 225);
    doc.setFont('helvetica', 'bold');
    doc.text('Outcome Overview', pageWidth / 2, 190, { align: 'center' });

    // Table
    const tableX = 10;
    const tableY = 195;
    const tableWidth = pageWidth - 20;

    // Table headers
    doc.setFillColor(255, 255, 255);
    doc.rect(tableX, tableY, tableWidth, 10, 'F');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Domain', tableX + 10, tableY + 7);
    doc.text('Score', tableX + tableWidth / 2 - 20, tableY + 7);
    doc.text('Insights', tableX + tableWidth / 2 + 20, tableY + 7);

    // Table rows
    outcomes.forEach((outcome, index) => {
      const y = tableY + 12 + (index * 12);

      // White background for rows
      doc.setFillColor(255, 255, 255);
      doc.rect(tableX, y, tableWidth, 10, 'F');

      // Domain
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(outcome.domain, tableX + 10, y + 7);

      // Status indicator
      const statusX = tableX + tableWidth / 2 - 20;
      doc.setFillColor(getStatusColor(outcome.status));
      doc.circle(statusX - 5, y + 5, 2, 'F');

      // Status text
      doc.text(outcome.status, statusX, y + 7);

      // Insight
      doc.text(outcome.insight, tableX + tableWidth / 2 + 20, y + 7);
    });


    doc.addPage();

    // Set background color (light cream) for second page
    doc.setFillColor(255, 248, 240);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    // Insight Cards heading
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Insight Cards', 20, 15);

    // Insight Cards
    const insightCards = [
      "You're carrying emotional load without enough release",
      "Your physical wellness is affecting your mood more than you realize",
      "You're doing better than you think—but you deserve more ease"
    ];

    const cardY = 25;
    const cardHeight = 25;
    const cardSpacing = 8;
    const cardWidth = pageWidth - 30;

    insightCards.forEach((insight, index) => {
      const y = cardY + (index * (cardHeight + cardSpacing));

      // Card background (light lavender)
      doc.setFillColor(230, 230, 250);
      doc.roundedRect(20, y, cardWidth, cardHeight, 5, 5, 'F');

      // Card text
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 90);
      doc.setFont('helvetica', 'normal');

      // Center text vertically and horizontally in the card
      doc.text(insight, pageWidth / 2, y + cardHeight / 2 + 2, { align: 'center' });
    });

    // Next step suggestions heading
    const nextStepY = cardY + (3 * (cardHeight + cardSpacing));
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Next step suggestions', 10, nextStepY);

    // Next step suggestions list
    const suggestions = [
      "Self-nudge packs (affirmations, sleep ritual, mini-care planner)",
      "Smart nudges activated for flagged domain",
      "Next Check-In Reminder: 7 days or custom schedule",
      "Journaling prompt",
      "Talk to our therapist"
    ];

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 90);
    doc.setFont('helvetica', 'normal');

    suggestions.forEach((suggestion, index) => {
      const y = nextStepY + 10 + (index * 10);

      // Bullet point
      doc.text('•', 35, y);

      // Suggestion text
      doc.text(suggestion, 45, y);
    });

    // Download App section
    const appSectionY = doc.internal.pageSize.getHeight() - 70;
    const buttonWidth = 130;
    const buttonHeight = 40;
    const buttonX = (pageWidth - buttonWidth) / 2;
    const buttonY = appSectionY + 20;

    // Button background
    doc.setFillColor(80, 80, 100);
    doc.roundedRect(buttonX - 30, buttonY - 10, buttonWidth + 60, buttonHeight + 20, 5, 5, 'F');

    // Button text "Download Our Mobile App"
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Download Our Mobile App', pageWidth / 2, buttonY + 5, { align: 'center' });

    // Download button
    doc.setFillColor(65, 105, 225);
    doc.roundedRect(buttonX, buttonY + 15, buttonWidth, buttonHeight - 15, 10, 10, 'F');

    // Download button text
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('Download', pageWidth / 2, buttonY + 27, { align: 'center' });

    // Save PDF
    try {
      doc.save(`${userName}-LittleHugs-Assessment.pdf`);
    } catch (error) {
      alert('Error saving PDF:');
    }
  };

  function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  // Helper function to get status color
  function getStatusColor(status) {
    switch (status) {
      case 'Red': return '#d32f2f';
      case 'Amber': return '#ff9800';
      case 'Green': return '#2e7d32';
      default: return '#000000';
    }
  }




















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
    setIsDataLoading(true);
    fetch('https://api.ourlittlehugs.com/v1/api/share-assessment', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('accessToken'),
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');

        return response.json();
      })
      .then(data => {
        if (data.count === 0) {
          setIsBlur(true);
          return;
        }

        let domainInsight = null;
        let domainIndex = -1;

        for (let i = 0; i < data.results.length; i++) {
          const result = data.results[i];
          if (result.assessment_output?.domain_insights && Object.keys(result.assessment_output.domain_insights).length > 0) {
            domainInsight = result.assessment_output.domain_insights;
            domainIndex = i;
            break;
          }
        }

        setIsBlur(false);
        setData(data);
        setAssessmentName(data?.results?.[domainIndex]);
        const domainArray = Object.keys(domainInsight).map(key => domainInsight[key]);
        setDomainWellnessScore(domainArray);
        setLatestDate(data.results[domainIndex].assessment_output.created_at);
      })
      .catch(err => toast.error(err.message))
      .finally(() => setIsDataLoading(false));
  }


  useEffect(() => {
    const dd = store.getData();
    if ((Object.keys(dd).length !== 0)) {
      if (dd.current === 'child') setProfileData(dd.child)
      if (dd.current === 'women') setProfileData(dd.women)
    } else {
      (async () => {
        const res = await getWomenProfileDetails();
        res && setProfileData(res);
      })();
    }

    const unsubscribe = store.subscribe((newData) => {
      if (newData.current === 'child') setProfileData(newData.child);
      if (newData.current === 'women') setProfileData(newData.women);
    });

    return () => unsubscribe();
  }, [])


  return (

    <div className="flex">

      <div className="flex flex-col flex-1">
        {/* Welcome Banner */}
        <div className="bg-blue-100 p-6 mx-4 my-4 rounded-lg">
          <h2 className="text-xl font-medium mb-2">
            Hi {profileData.name ? profileData.name : "UserName"}
            {/* <p>{JSON.stringify(profileData)}</p> */}
          </h2>
          <p className="text-gray-700">
            In this moment, nothing is asked of you. You are allowed to pause. To rest. To simply be.
          </p>
        </div>


        <div className="w-full">


          {dataLoading &&
            <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
              <div className="flex flex-col items-center gap-4 bg-white px-6 py-6 rounded-lg shadow-md text-gray-700">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium">Your data is loading...</p>
              </div>
            </div>
          }

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
                <p className="text-5xl font-bold">   {Number.isFinite(parseInt(data.count)) && Number.isFinite(parseInt(assessment.count))
                  ? parseInt(data.count) - parseInt(assessment.count)
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
              <div className="my-4"><b>Lastest Assessment Name </b> : {assessmentName?.assessment_output?.assessment_name ?? 'N/A'} </div>
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
      </div>

      <div className="w-full mt-5 lg:mt-0 lg:w-72 border-t lg:border-l lg:border-t-0 border-gray-200 p-4 h-[100vh] overflow-auto scrollbar-thin">
        <RightHandSide show={!isBlur} />
      </div>

    </div>
  );
};

export default Main;