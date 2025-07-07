import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getDashboardMetrics, getDashboardMetricsGraph, getTeamMembers, getUniqueUsers } from '../../../api/partner-apis';
import { Spin } from 'antd';
import PercentageSemiCircle from './PercentageSemiCircle';
import SVGLineChart from './SVGLIneChart';

const CorporateWellnessDashboard = () => {

  const [usersLoading, setUsersLoading] = useState(false);

  const [metrics, setMetrics] = useState([]);
  const [metricsGraph, setMetricsGraph] = useState([]);
  const [domainData, setDomainData] = useState([]);


  const dropdownTimePeriodRef = useRef(null);
  const [timePeriodOpen, setTimePeriodOpen] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState({ value: '', label: 'TIME PERIOD' });
  const timePeriods = [
    { value: '', label: 'All Time' },
    { value: 'this_week', label: 'This Week' },
    { value: 'last_week', label: 'Last Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'this_year', label: 'This Year' },
    { value: 'last_year', label: 'Last Year' }
  ];

  const dropdownDepartmentdRef = useRef(null);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({ id: 0, name: "DEPARTMENT" });
  const [departments, setDepartments] = useState([]);



  // const calculateAssessmentData = useCallback((results) => {
  //   const assessmentStructure = [
  //     { name: "women-wellness-360", value: 0, color: "#A5B4FC" },
  //     { name: "child-wellness-360", value: 0, color: "#FDE68A" },
  //     { name: "sel-assessment-360", value: 0, color: "#FCA5A5" },
  //   ];

  //   return assessmentStructure
  //     .map((assessment) => {
  //       const count = results.filter(
  //         (user) => user.assessment_type === assessment.name
  //       ).length;
  //       return {
  //         ...assessment,
  //         value: count,
  //       };
  //     })
  //     .filter((assessment) => assessment.value !== 0);
  // }, []);

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
        //   const { completedAtLeastOneAssessment, didNotCompleteAnyAssessment } = analyzeAssessmentData(response.results);

        //   setCompletedCount(completedAtLeastOneAssessment);
        //   setIncompleteCount(didNotCompleteAnyAssessment);

        // const assessmentChartData = calculateAssessmentData(response.results);
        // setProgramData(assessmentChartData);

        const domainChartData = calculateDomainData(response.results);
        setDomainData(domainChartData);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }

  }, [calculateDomainData]);


  const fetchMetrics = useCallback(async (time, departmentId) => {
    setUsersLoading(true);

    getDashboardMetrics(time, departmentId).then((data) => {
      setMetrics(data?.results[0]);
    }).finally(() => setUsersLoading(false));

    getDashboardMetricsGraph(time, departmentId).then((data) => {
      if (data.results) setMetricsGraph(data.results);
    }).finally(() => setUsersLoading(false));

    getTeamMembers().then((data) => setDepartments([{ id: 0, name: "All Departments" }, ...data]));

  }, []);


  useEffect(() => { fetchMetrics(); fetchUniqueUsers() }, [fetchMetrics, fetchUniqueUsers]);


  const PieChart = ({ data }) => {
    const size = 240;
    const radius = 45;
    const center = 50;

    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    const normalizedData = Object.fromEntries(
      Object.entries(data).map(([key, val]) => [key, (val / total) * 100])
    );

    let cumulativePercentage = 0;

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    const createPathData = (percentage) => {
      const startAngle = cumulativePercentage * 3.6;
      const endAngle = (cumulativePercentage + percentage) * 3.6;

      const start = polarToCartesian(center, center, radius, endAngle);
      const end = polarToCartesian(center, center, radius, startAngle);
      const largeArcFlag = percentage > 50 ? 1 : 0;

      cumulativePercentage += percentage;

      return `M ${center},${center} L ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag},0 ${end.x},${end.y} Z`;
    };

    const colors = ['#ef4444', '#f97316', '#3b82f6'];

    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="transform rotate-0">
        {Object.entries(normalizedData).map(([key, value], index) => (
          <path
            key={key}
            d={createPathData(value)}
            fill={colors[index % colors.length]}
            className="transition-all duration-500 hover:opacity-80"
          />
        ))}
      </svg>
    );
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownTimePeriodRef.current && !dropdownTimePeriodRef.current.contains(event.target)) {
        setTimePeriodOpen(false);
      }
        if (dropdownDepartmentdRef.current && !dropdownDepartmentdRef.current.contains(event.target)) {
        setDepartmentOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto px-4">

        {/* Main Title */}

        <div className='flex flex-col md:flex-row justify-between gap-4 mb-8'>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">LittleHugs Wellness Summary</h2>

          <div className='flex gap-2'>

            <div className="relative" ref={dropdownTimePeriodRef}>
              <button
                onClick={() => setTimePeriodOpen(!timePeriodOpen)}
                className="flex items-center justify-between px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors min-w-[160px]"
              >
                <span>{selectedTimePeriod.label}</span>
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform ${timePeriodOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {timePeriodOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {timePeriods.map((period) => (
                    <button
                      key={period.label}
                      onClick={() => {
                        setSelectedTimePeriod(period);
                        setTimePeriodOpen(false);
                        fetchMetrics(period.value, selectedDepartment.id);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownDepartmentdRef}>
              <button
                onClick={() => setDepartmentOpen(!departmentOpen)}
                className="flex items-center justify-between px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors min-w-[160px]"
              >
                <span>{selectedDepartment.name}</span>
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform ${departmentOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {departmentOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {departments.map((department) => (
                    <button
                      key={department.id}
                      onClick={() => {
                        setSelectedDepartment(department);
                        setDepartmentOpen(false);
                        fetchMetrics(selectedTimePeriod.value, department.id);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {department.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {usersLoading ?
          <div className="flex items-center justify-center w-full h-[60vh]">
            <Spin size="large" />
          </div> : <>
            {/* Top Row - KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Participation Rate */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 tracking-wide">
                  PARTICIPATION RATE
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <PercentageSemiCircle percentage={metrics?.participation?.percentage} />
                </div>
                <div className={`flex-end flex items-center justify-center gap-2 text-${metrics?.participation?.increase < 0 ? "red" : "green"}-600`}>
                  <span className="font-semibold">{typeof metrics?.participation?.increase === "number" ? metrics?.participation?.increase : "N/A"}%</span>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 tracking-wide">
                  ENGAGEMENT RATE
                </h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {typeof metrics?.engagement?.percentage === "number" ? metrics.engagement.percentage + " %" : "N/A"}
                  </div>
                </div>
                <div className={`flex-end flex items-center justify-center gap-2 text-${metrics?.engagement?.increase < 0 ? "red" : "green"}-600`}>
                  <span className="font-semibold">{typeof metrics?.engagement?.increase === "number" ? metrics.engagement.increase : "N/A"}%</span>
                </div>
              </div>

              {/* Repeat Participation */}
              <div className="bg-white flex flex-col rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 tracking-wide">
                  REPEAT PARTICIPATION
                </h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{typeof metrics?.repeat_engagement?.percentage === "number" ? metrics.repeat_engagement.percentage + " %" : "N/A"}</div>
                </div>
                <div className={`flex-end flex items-center justify-center gap-2 text-${metrics?.repeat_engagement?.increase < 0 ? "red" : "green"}-600`}>
                  <span className="font-semibold">  {typeof metrics?.repeat_engagement?.increase === "number" ? metrics.repeat_engagement.increase : "N/A"}</span>
                </div>
              </div>

              {/* Risk Score */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">{metrics?.risk || 0}</span>
                  </div>
                </div>
                <h3 className="relative bottom-0 text-3xl text-center font-bold tracking-wide">
                  RISK
                </h3>
              </div>
            </div>

            {/* Middle Row - Trend Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Participation & Engagement Trend */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  PARTICIPATION & ENGAGEMENT
                </h3>
                <div className="relative" >
                  <SVGLineChart data={metricsGraph} />
                </div>
              </div>

              {/* Diversity in Wellness Engagement */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  DIVERSITY IN WELLNESS ENGAGEMENT
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="flex flex-col items-center">
                    <PieChart data={metrics?.diversity_engagement || {}} size={240} />
                    <span className="text-sm text-gray-600 mt-2">Distribution</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <PieChart data={metrics?.diversity_distribution || {}} size={120} />
                    <span className="text-sm text-gray-600 mt-2">Engagement</span>
                  </div>
                </div>

                <div className="mt-auto flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
                    Men
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f97316]"></span>
                    Women
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                    Child
                  </div>
                </div>
              </div>



            </div>

            {/* Bottom Row - Bar Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Domain Wise */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-3xl font-bold mb-6">
                  DOMAIN WISE
                </h3>
                <div className="relative w-full overflow-hidden">
                  <div className="flex items-end justify-between pl-4 overflow-x-auto gap-6 h-56">
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
                <h3 className="text-3xl font-bold mb-6">
                  PROGRAM WISE
                </h3>
                <div className="relative w-full overflow-hidden">
                  <div className='flex items-end justify-between pl-4 overflow-x-auto gap-6 h-56'>
                    {Object.entries(metrics?.diversity_engagement || {}).map((program, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        {program[1]}
                        <div
                          className="w-16 rounded-t-lg transition-all duration-1000 ease-out bg-blue-400 relative overflow-hidden hover:shadow-lg"
                          style={{
                            height: `${program[1] * 4}px`,
                          }}
                          title={`${program[0]}: ${program[1]}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">{program[0] + '-wellness-360'}</span>
                      </div>
                    ))}

                  </div>
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