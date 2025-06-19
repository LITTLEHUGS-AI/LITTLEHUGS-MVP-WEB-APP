import React, { useCallback, useEffect, useState } from 'react';
import {  TrendingUp } from 'lucide-react';
import { analyzeAssessmentData, countUsersByStatus, getUniqueUsers, getUserMembers } from '../../../api/partner-apis';
import { Spin } from 'antd';

const CorporateWellnessDashboard = () => {

  const [usersLoading, setUsersLoading] = useState(false);

  const [programData, setProgramData] = useState([]);
  const [domainData, setDomainData] = useState([]);

  const [accptedUsersCount, setAccptedUsersCount] = useState(0);
  const [pendingUsersCount, setPendingUsersCount] = useState(0);


  const [completedAtLeast1Count, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);


  // Mock data for charts
  const participationTrend = [
    { month: 'Jan', participation: 65, engagement: 22 },
    { month: 'Feb', participation: 68, engagement: 24 },
    { month: 'Mar', participation: 70, engagement: 25 },
    { month: 'Apr', participation: 72, engagement: 26 },
    { month: 'May', participation: 71, engagement: 27 },
    { month: 'Jun', participation: 72, engagement: 28 }
  ];


  const calculateAssessmentData = useCallback((results) => {
    const assessmentStructure = [
      { name: "women-wellness-360", value: 0, color: "#A5B4FC" },
      { name: "child-wellness-360", value: 0, color: "#FDE68A" },
      { name: "sel-assessment-360", value: 0, color: "#FCA5A5" },
    ];

    return assessmentStructure
      .map((assessment) => {
        const count = results.filter(
          (user) => user.assessment_type === assessment.name
        ).length;
        return {
          ...assessment,
          value: count,
        };
      })
      .filter((assessment) => assessment.value !== 0);
  }, []);

  const calculateDomainData = useCallback((results) => {

    const colorPalette = [
      "#B1A4E7", "#D3CBA5", "#D9E4FC", "#69A664", "#FFC655",
      "#FF7F50", "#87CEFA", "#98FB98", "#FFD700", "#E9967A",
      "#20B2AA", "#FFB6C1", "#8A2BE2", "#00CED1", "#FF6347"
    ];

    const domainCounts = {};

    results.forEach(user => {
      if (user.status === "completed") {
        (user.domains ?? []).forEach(domain => {
          if (!domainCounts[domain]) {
            domainCounts[domain] = 0;
          }
          domainCounts[domain]++;
        });
      }
    });

    const domainStructure = Object.entries(domainCounts)
      .map(([name, value], index) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((domain, index) => ({
        ...domain,
        color: colorPalette[index % colorPalette.length]
      }));

    return domainStructure;
  }, []);


  const fetchUniqueUsers = useCallback(async () => {
    try {

      setUsersLoading(true);
      const response = await getUniqueUsers();

      if (response.results.length > 0) {
        const {  completedAtLeastOneAssessment, didNotCompleteAnyAssessment } = analyzeAssessmentData(response.results);

        setCompletedCount(completedAtLeastOneAssessment);
        setIncompleteCount(didNotCompleteAnyAssessment);

        const assessmentChartData = calculateAssessmentData(response.results);
        setProgramData(assessmentChartData);

        const domainChartData = calculateDomainData(response.results);
        setDomainData(domainChartData);
      }

      const response2 = await getUserMembers();
      if (response.results.length > 0) {
        const { accepted, notAccepted } = countUsersByStatus(response2.results);
        setAccptedUsersCount(accepted);
        setPendingUsersCount(notAccepted);
      }



    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
    
  }, [calculateAssessmentData, calculateDomainData ]);


  useEffect(() => { fetchUniqueUsers(); }, [fetchUniqueUsers]);



  const CircularProgress = ({ percentage, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3b82f6"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  const PieChart = ({ data, size = 120 }) => {
    let cumulativePercentage = 0;

    const createPathData = (percentage) => {
      const startAngle = cumulativePercentage * 3.6;
      const endAngle = (cumulativePercentage + percentage) * 3.6;

      const start = polarToCartesian(50, 50, 45, endAngle);
      const end = polarToCartesian(50, 50, 45, startAngle);
      const largeArcFlag = percentage > 50 ? 1 : 0;

      const pathData = `M 50,50 L ${start.x},${start.y} A 45,45 0 ${largeArcFlag},0 ${end.x},${end.y} Z`;
      cumulativePercentage += percentage;

      return pathData;
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="transform rotate-0">
        {data.map((item, index) => (
          <path
            key={index}
            d={createPathData(item.value)}
            fill={index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#3b82f6'}
            className="transition-all duration-500 hover:opacity-80"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          {/* <div className="flex gap-4">
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 hover:shadow-md transition-shadow">
              <span className="text-gray-700">DEPARTMENT</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 hover:shadow-md transition-shadow">
              <span className="text-gray-700">TIME PERIOD</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div> */}

        </div>

        {/* Main Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">LittleHugs Wellness Summary</h2>


        {usersLoading ?
          <div className="flex items-center justify-center w-full h-[60vh]">
            <Spin size="large" />
          </div> : <>
            {/* Top Row - KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Participation Rate */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  PARTICIPATION RATE
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <CircularProgress percentage={(accptedUsersCount / (accptedUsersCount + pendingUsersCount)) * 100} />
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  ENGAGEMENT RATE
                </h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {(() => {
                      try {
                        const total = completedAtLeast1Count + incompleteCount;

                        if (!Number.isFinite(completedAtLeast1Count) || !Number.isFinite(incompleteCount)) {
                          throw new Error("Invalid input: counts must be numbers");
                        }

                        if (total === 0) return 0;

                        const percentage = (completedAtLeast1Count / total) * 100;
                        return Math.round(percentage); // Or use parseInt(percentage) or Math.floor()
                      } catch (error) {
                        console.error(error);
                        return 0; // Fallback value
                      }
                    })()}
                    %</div>
                </div>
                <div className="flex-end flex items-center justify-center gap-2 text-green-600">
                  <span className="font-semibold">+ 2%</span>
                </div>
              </div>

              {/* Repeat Participation */}
              <div className="bg-white flex flex-col rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  REPEAT PARTICIPATION
                </h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">43%</div>
                </div>
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">8%</span>
                </div>
              </div>

              {/* Risk Score */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  RISK
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row - Trend Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Participation & Engagement Trend */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  PARTICIPATION & ENGAGEMENT
                </h3>
                <div className="h-48 relative">
                  <svg width="100%" height="100%" viewBox="0 0 400 180" className="overflow-visible">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line
                        key={i}
                        x1="40"
                        y1={40 + i * 25}
                        x2="380"
                        y2={40 + i * 25}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Participation line */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      points="40,120 100,110 160,105 220,100 280,102 340,100"
                      className="drop-shadow-sm"
                    />

                    {/* Engagement line */}
                    <polyline
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="3"
                      points="40,140 100,135 160,130 220,128 280,125 340,120"
                      className="drop-shadow-sm"
                    />

                    {/* Data points */}
                    {participationTrend.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={40 + index * 60}
                          cy={160 - point.participation * 1.5}
                          r="4"
                          fill="#3b82f6"
                          className="hover:r-6 transition-all cursor-pointer"
                        />
                        <circle
                          cx={40 + index * 60}
                          cy={160 - point.engagement * 3}
                          r="4"
                          fill="#f97316"
                          className="hover:r-6 transition-all cursor-pointer"
                        />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Diversity in Wellness Engagement */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  DIVERSITY IN WELLNESS ENGAGEMENT
                </h3>
                <div className="flex items-center justify-center gap-8 h-48">
                  <div className="flex flex-col items-center">
                    <PieChart data={[{ value: 35 }, { value: 30 }, { value: 35 }]} size={120} />
                    <span className="text-sm text-gray-600 mt-2">Distribution</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <PieChart data={[{ value: 60 }, { value: 40 }]} size={120} />
                    <span className="text-sm text-gray-600 mt-2">Engagement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Bar Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Domain Wise */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  DOMAIN WISE
                </h3>
                <div className="relative w-full overflow-hidden">
                  <div className="flex items-end justify-start pl-4 overflow-x-auto gap-6 h-56">
                    {domainData.map((program, index) => (
                      <div key={index} className="flex flex-col items-center w-20">
                        <div className="flex flex-col justify-end h-48 items-center">
                          <div
                            className="w-16 bg-blue-400 rounded-t-lg transition-all duration-1000 ease-out relative overflow-hidden hover:shadow-lg"
                            style={{ height: `${program.value * 8}px` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                          </div>
                        </div>
                        <span className="mt-2 text-xs text-gray-600 text-center break-words w-full">
                          {program.name.length > 10 ? `${program.name.slice(0, 14)}...` : program.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Program Wise */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  PROGRAM WISE
                </h3>
                <div className="flex items-end justify-center gap-8 h-40">
                  {programData.map((program, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-16 bg-blue-400 rounded-t-lg transition-all duration-1000 ease-out relative overflow-hidden hover:shadow-lg`}
                        style={{ height: `${program.value * 4}px` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
                      </div>
                      <span className="text-xs text-gray-600 text-center">{program.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        }


      </div>
    </div>
  );
};

export default CorporateWellnessDashboard;