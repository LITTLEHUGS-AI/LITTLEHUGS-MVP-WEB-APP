import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import store from "../../../config/storeInstance";
import RightHandSide from "./RightHandSide";
import AssessmetPDF from "./AssessmetPDF";


const Main = () => {


  const [step, setStep] = useState('loading');

  const [data, setData] = useState({});
  const [latestdate, setLatestDate] = useState(null);

  const [domainWellnessScore, setDomainWellnessScore] = useState([]);

  const [profileData, setProfileData] = useState({});
  const [IncompletedAssessments, setIncompleteAssessments] = useState(0);


  // const toBase64 = async (url) => {
  //   const response = await fetch(url, { mode: 'cors' });
  //   const blob = await response.blob();
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // let userName = "UserName";
  // if (profileData.name !== undefined) userName = profileData.name;

  const [assessmentName, setAssessmentName] = useState({});



  // const colorMap = {
  //   green: [0, 255, 0],
  //   red: [255, 0, 0],
  //   yellow: [220, 220, 0],
  //   blue: [0, 0, 255],
  // };

  // function hexToRgb(inputColor) { return colorMap[inputColor.toLowerCase()] || [0, 0, 0]; }




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

      if (domainIndex < 0) {
        setStep('blur');
        return;
      }

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
      if (dd.current === 'women') setProfileData(dd.women);
      if (dd.current === 'child') setProfileData(dd.child);
      if (dd.current === 'men') setProfileData(dd.men);
      if (dd.current !== undefined) getData(dd.current);
    }

    const unsubscribe = store.subscribe((newData) => {
      if (newData.current === 'child') setProfileData(newData.child);
      if (newData.current === 'women') setProfileData(newData.women);
      if (newData.current === 'men') setProfileData(newData.men);
      if (newData.current !== undefined) getData(newData.current);
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
                    color={assessment?.flag || "#22c55e"}
                    index={index + 1}
                  />
                ))}


              </div>
            </div>

            {/* Summary Section */}
            <div className="w-fulll my-8">
              <h2 className="text-xl font-bold mb-6">Wellness Scorecard</h2>

              <div className="overflow-x-auto border border-gray-200 rounded-md">
                <div className="overflow-x-auto border border-gray-200 rounded-md">

                  {/* Desktop View */}
                  <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
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
                              {item.positive_summary && <li>{item.positive_summary}</li>}
                              {item.negative_summary && <li>{item.negative_summary}</li>}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile View */}
                  <div className="sm:hidden space-y-4 p-4">
                    {domainWellnessScore.map((item, index) => (
                      <div key={index} className="border rounded-md p-4 shadow-sm bg-white">
                        <div className="mb-2">
                          <p className="text-sm font-semibold text-gray-700">Domain:</p>
                          <p className="text-sm text-gray-900">{item.domain}</p>
                        </div>
                        <div className="mb-2 flex items-center">
                          <p className="text-sm font-semibold text-gray-700 mr-2">Score:</p>
                          <span
                            className="inline-block ring ring-1 w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: item.flag }}
                          />
                          <span className="text-sm">{item.flag.charAt(0).toUpperCase() + item.flag.slice(1)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Insight:</p>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {item.positive_summary && <li>{item.positive_summary}</li>}
                            {item.negative_summary && <li>{item.negative_summary}</li>}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>


            </div>


            {/* PDF Report Section */}
            <AssessmetPDF name={profileData.name} assessmentName={assessmentName} domainWellnessScore={domainWellnessScore} latestdate={latestdate} />


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