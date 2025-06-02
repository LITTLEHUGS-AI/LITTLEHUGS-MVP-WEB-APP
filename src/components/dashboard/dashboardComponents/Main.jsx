import { useCallback, useEffect, useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import store from "../../../config/storeInstance";
import RightHandSide from "./RightHandSide";
// import './Poppins-Regular-normal';

const Main = () => {

  const [step, setStep] = useState('loading');

  const [data, setData] = useState({});
  const [latestdate, setLatestDate] = useState(null);

  const [domainWellnessScore, setDomainWellnessScore] = useState([]);

  const [profileData, setProfileData] = useState({});
  const [IncompletedAssessments, setIncompleteAssessments] = useState(0);


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

  let userName = "UserName";
  if (profileData.name !== undefined) userName = profileData.name;

  const [assessmentName, setAssessmentName] = useState({});


  const downloadPDF = async () => {

    const doc = new jsPDF({
      orientation: 'portrait',
      format: 'a4'
    });

    // Set background color (light cream)
    doc.setFillColor(255, 248, 240);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    const pageWidth = doc.internal.pageSize.getWidth();


    // doc.setFont("Poppins-Regular");

    // Add logo (circle with segments) - centered
    const imgData = await toBase64('/images/logo.jpg',);
    doc.addImage(imgData, 'JPEG', pageWidth / 2 - 20, 10, 10, 10);

    doc.setFontSize(20);
    doc.setTextColor(65, 105, 225);
    doc.text(`LittleHugs`, pageWidth / 2 + 9, 17, { align: 'center' });


    // Add date text - centered
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Downloaded on : ${assessmentName.created_at}`, pageWidth / 2 + 16, 23, { align: 'center' });

    // Add user details - align left for label, proper spacing for value
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // User Name
    doc.text('User Name', 26, 40);
    doc.text(':', 70, 40);
    doc.text(userName, 80, 40);

    // Assessment Name
    doc.text('Assessment Name', 26, 50);
    doc.text(':', 70, 50);
    doc.text(assessmentName?.assessment_output?.assessment_name || 'N/A', 80, 50);

    // Assessment Date
    doc.text('Assessment Date:', 26, 60);
    doc.text(':', 70, 60);
    doc.text((latestdate && new Date(latestdate).toLocaleString()) || 'N/A', 80, 60);

    // Overall Wellness Score
    doc.setFontSize(18);
    doc.setTextColor(65, 105, 215);
    doc.text('Overall Wellness Score', pageWidth / 2, 90, { align: 'center' });

    // Score
    doc.setFontSize(36);
    doc.setTextColor(80, 80, 70);
    doc.text(`${assessmentName?.assessment_output?.overall_assessment?.score || 'N/A'}/100`, pageWidth / 2, 105, { align: 'center' });

    // Top Five Domains
    doc.setFontSize(18);
    doc.setTextColor(65, 105, 225);
    doc.text('Top Five Domains', pageWidth / 2, 120, { align: 'center' });

    // Domain visualization (simplified with proper spacing)
    const domainWidth = 30;
    const domainSpacing = 8;
    const totalWidth = (domainWidth * 5) + (domainSpacing * 4);
    const domainStartX = (pageWidth - totalWidth) / 2;
    const domainY = 125;











    //     const domainStartX = 20; // Start further from edge
    // const domainY = 50; // Adjust vertical position
    // const domainWidth = 35;
    // const domainSpacing = 2; // Reduced spacing for better fit
    const rectHeight = 40; // Slightly taller rectangles

    domainWellnessScore.forEach((domain, index) => {
      const x = domainStartX + (index * (domainWidth + domainSpacing));

      // Enhanced rectangle with rounded corners effect
      doc.setFillColor(...hexToRgb(domain.flag));
      doc.roundedRect(x, domainY, domainWidth, rectHeight, 2, 2, 'F');

      // Add subtle border for definition
      doc.setDrawColor(0, 0, 0, 0.1);
      doc.setLineWidth(0.2);
      doc.roundedRect(x, domainY, domainWidth, rectHeight, 2, 2, 'S');

      // Domain name with better text wrapping
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);

      // Split long domain names into multiple lines
      const domainText = domain?.domain || '';
      const words = domainText.split(' ');
      const maxWidth = domainWidth - 4;

      if (words.length > 2) {
        // Multi-line text for long domains
        const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');

        doc.text(line1, x + domainWidth / 2, domainY + 8, {
          align: 'center',
          maxWidth: maxWidth
        });
        doc.text(line2, x + domainWidth / 2, domainY + 14, {
          align: 'center',
          maxWidth: maxWidth
        });
      } else {
        // Single line for shorter domains
        doc.text(domainText, x + domainWidth / 2, domainY + 12, {
          align: 'center',
          maxWidth: maxWidth
        });
      }

      // Enhanced circle design
      const circleY = domainY + 26;
      const circleRadius = 7;

      // White background circle
      doc.setFillColor(255, 255, 255);
      doc.circle(x + domainWidth / 2, circleY, circleRadius, 'F');

      // Colored border
      doc.setDrawColor(...hexToRgb(domain.flag));
      doc.setLineWidth(2);
      doc.circle(x + domainWidth / 2, circleY, circleRadius, 'S');

      // Score text with enhanced styling
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(`${domain.score}/10`, x + domainWidth / 2, circleY + 1, {
        align: 'center'
      });


    });

    // Outcome Overview
    doc.setFontSize(18);
    doc.setTextColor(65, 105, 215);
    doc.text('Outcome Overview', pageWidth / 2, 190, { align: 'center' });


    // Table
    const tableX = 6;
    const tableY = 185;
    const tableWidth = pageWidth - 20;
    const rowHeight = 15; // Increased for wrapped text

    // Table headers
    doc.setFillColor(255, 255, 255);
    doc.rect(tableX, tableY, tableWidth, 10, 'F');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Domain', tableX + 10, tableY + 7);
    doc.text('Score', tableX + tableWidth / 2 - 20, tableY + 7);
    doc.text('Insights', tableX + tableWidth / 2 + 10, tableY + 7);

    // Text wrapping helper function
    function wrapText(text, maxWidth, fontSize = 10) {
      doc.setFontSize(fontSize);
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = doc.getTextWidth(testLine);

        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) lines.push(currentLine);
      return lines;
    }

    // Table rows
    if (domainWellnessScore.length > 0) {
      let currentY = tableY + 12;

      domainWellnessScore.forEach((outcome, index) => {
        // Calculate insight text lines
        const insightWidth = tableWidth / 2 - 20;
        const insightLines = outcome.positive_summary ?
          wrapText(outcome.positive_summary, insightWidth, 10) : [];

        // Calculate row height based on text lines
        const actualRowHeight = Math.max(rowHeight, (insightLines.length * 4) + 8);

        // White background for rows
        doc.setFillColor(255, 255, 255);
        doc.rect(tableX, currentY, tableWidth, actualRowHeight, 'F');

        // Domain - wrap if needed
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const domainWidth = tableWidth / 2 - 40;
        const domainLines = wrapText(outcome.domain, domainWidth, 10);

        domainLines.forEach((line, lineIndex) => {
          doc.text(line, tableX + 10, currentY + 7 + (lineIndex * 4));
        });

        // Status indicator
        const statusX = tableX + tableWidth / 2 - 20;
        doc.setFillColor(...hexToRgb(outcome.flag));
        doc.circle(statusX - 5, currentY + 5, 2, 'F');

        // Status text
        const statusText = outcome.flag.charAt(0).toUpperCase() + outcome.flag.slice(1);
        doc.text(statusText, statusX, currentY + 7);

        // Insight - wrapped text
        doc.setFontSize(10);

        insightLines.forEach((line, lineIndex) => {
          if (lineIndex === 0) {
            // Add bullet point to first line only
            doc.text('• ' + line, tableX + tableWidth / 2, currentY + 7 + (lineIndex * 4));
          } else {
            // Indent continuation lines to align with text after bullet
            doc.text(line, tableX + tableWidth / 2 + 8, currentY + 7 + (lineIndex * 4));
          }
        });

        currentY += actualRowHeight + 2; // Add small gap between rows
      });
    }


    doc.addPage();

    // Set background color (light cream) for second page
    doc.setFillColor(255, 248, 240);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    // Insight Cards heading
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Insight Cards', 20, 15);


    const cardY = 25;
    const cardHeight = 25;
    const cardSpacing = 8;
    const cardWidth = pageWidth - 30;

    
    if (assessmentName?.assessment_output?.personality_insight) {
      assessmentName.assessment_output.personality_insight.split('.').forEach((insight, index) => {
        if (insight.trim().length === 0) return;
        const y = cardY + (index * (cardHeight + cardSpacing));

        // Card background (light lavender)
        doc.setFillColor(230, 230, 250);
        doc.roundedRect(20, y, cardWidth, cardHeight, 5, 5, 'F');

        // Card text
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 90);

        // Center text vertically and horizontally in the card
        doc.text(insight || 'N/A', pageWidth / 2, y + cardHeight / 2 + 2, { align: 'center' });
      });
    }


    // Next step suggestions heading
    const nextStepY = cardY + (5 * (cardHeight + cardSpacing));
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
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


  const colorMap = {
    green: [0, 255, 0],
    red: [255, 0, 0],
    yellow: [220, 220, 0],
    blue: [0, 0, 255],
  };

  function hexToRgb(inputColor) { return colorMap[inputColor.toLowerCase()] || [0, 0, 0]; }




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



  function countMissingKey(jsonArray, keyName) {
    if (!Array.isArray(jsonArray)) { return 0 }

    let count = 0;

    for (const obj of jsonArray) {
      if (!obj.hasOwnProperty(keyName) || obj[keyName] === undefined || obj[keyName] === null)
        count++;
    }

    return count;
  }





  const getData = useCallback(async (current) => {
    setStep('loading');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/share-assessment?_type=${current}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      if (data.length === 0) {
        setStep('blur');
        return;
      }

      let domainInsight = null;
      let domainIndex = -1;

      for (let i = 0; i < data.length; i++) {
        const result = data[i];
        if (result.assessment_output?.domain_insights && Object.keys(result.assessment_output.domain_insights).length > 0) {
          domainInsight = result.assessment_output.domain_insights;
          domainIndex = i;
          break;
        }
      }

      setStep('');
      setData(data);
      setAssessmentName(data?.[domainIndex]);
      const domainArray = Object.keys(domainInsight).map(key => domainInsight[key]);
      setDomainWellnessScore(domainArray);
      setLatestDate(data[domainIndex].assessment_output.created_at);

      const incomplete = countMissingKey(data, "assessment_output");
      setIncompleteAssessments(incomplete);
    } catch (err) {
      toast.error(err.message);
      setStep('blur');
    }
  }, [setStep, setData, setAssessmentName, setDomainWellnessScore, setLatestDate, setIncompleteAssessments]);



  useEffect(() => {

    const dd = store.getData();
    if ((Object.keys(dd).length !== 0)) {
      // if (dd.current === 'child') setProfileData(dd.child);
      // if (dd.current === 'women') setProfileData(dd.women);
      // if (dd.current !== undefined) getData(dd.current);
    } else {
      // (async () => {
      //   const res = await getWomenProfileDetails();
      //   res && setProfileData(res);
      //   getData('women');
      // })();
    }

    const unsubscribe = store.subscribe((newData) => {
      if (newData.current === 'child') setProfileData(newData.child);
      if (newData.current === 'women') setProfileData(newData.women);
      if (newData.current !== undefined) { getData(newData.current) };
    });

    return () => unsubscribe();
  }, [getData])


  return (

    <div className="flex flex-col md:flex-row">

      <div className="flex flex-col flex-1 mx-3">
        {/* Welcome Banner */}
        <div className="bg-blue-100 p-6 my-4 rounded-lg">
          <h2 className="text-xl font-medium mb-2">
            Hi {profileData.name ? profileData.name : "UserName"}
          </h2>
          <p className="text-gray-700">
            In this moment, nothing is asked of you. You are allowed to pause. To rest. To simply be.
          </p>
        </div>


        <div className="w-full">


          {(step === 'loading') &&
            <div className="fixed inset-0 flex items-center justify-center z-10 px-2">
              <div className="flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4 bg-white px-6 py-6 rounded-lg shadow-md text-gray-700">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-lg font-medium">Your data is loading...</p>
                </div>
              </div>
            </div>
          }

          {(step === 'blur') && (
            <div className="fixed inset-0 flex items-center justify-center z-10 px-2">
              <div className="bg-white p-6 rounded-lg max-w-md w-full ring-2 text-center">
                <h2 className="text-xl font-semibold">Please Take an Assessment to view your Dashboard</h2>
                <Link to='/personal/assessment' className="block w-52 mt-4 bg-red-500 text-white text-center p-2 mx-auto rounded cursor-pointer"  >
                  Go to Assessment
                </Link>
              </div>
            </div>
          )}

          {/* Dashboard Content */}
          <div className={`p-6 bg-white rounded-lg border border-gray-200 ${(step === 'blur' || step === 'loading') && 'blur'}`}      >
            <h2 className="text-xl font-medium mb-4">Dashboard</h2>


            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <h3 className="text-sm font-medium">Total Assessments</h3>
                <p className="text-5xl font-bold">
                  {data.length ? data.length : "0"}
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Complete</h3>
                <p className="text-5xl font-bold">
                  {(data.length - IncompletedAssessments) || "0"}
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Incomplete</h3>
                <p className="text-5xl font-bold">
                  {IncompletedAssessments || "0"}
                </p>
              </div>
            </div>


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
                              className="inline-block ring ring-1 w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: item.flag }}
                            />
                            <span>{item.flag.charAt(0).toUpperCase() + item.flag.slice(1)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <ul className="list-disc pl-5">
                            {item.positive_summary && (
                              <li>{item.positive_summary}</li>
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

      <div className="w-full mt-5 lg:mt-0 lg:w-72 border-t lg:border-l lg:border-t-0 border-gray-200 p-4 h-[100vh] z-50 overflow-auto scrollbar-thin">
        <RightHandSide show={!!(step === '')} />
      </div>

    </div>
  );
};

export default Main;