import Sidebar from "./Sidebar";

const Plans = () => {

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">

      <Sidebar />

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto">

      <div className="flex-1 flex-grow flex items-center justify-start p-2 m-4 border border-gray-400 rounded-md">
            <p className="p-0 text-[20px] text-slate-500">
                In this moment, nothing is asked of you. You are allowed to pause. To rest. To simply be
            </p>
        </div>


        <div className="max-w-6xl mx-auto">

          {/* Plans Card */}
          <div className="flex flex-col md:flex-row gap-6 mx-4">

            {/* Wellness Starter Plan */}
            <div className="bg-white rounded-lg border-2 border-blue-400 p-8 flex flex-col items-center text-center flex-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Wellness Starter
              </h2>
              <p className="text-gray-600 mb-6">
                For first-time users exploring basic check-ins
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-400 line-through">Rs. 138/-</span>
                <span className="text-2xl font-bold">Rs. 69/-</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-full mb-8">
                Choose Plan
              </button>
              <ul className="space-y-3 mb-8 w-full">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">1 Assessment</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Basic emotional insights
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    15-day access to progress tracking
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Limited access to the resource library
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 mt-auto">
                Counselling available at an additional charge
              </p>
            </div>

            {/* Self-Wellness Plan */}
            <div className="bg-white rounded-lg border-2 border-blue-400 p-8 flex flex-col items-center text-center flex-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Self-Wellness Plan
              </h2>
              <p className="text-gray-600 mb-6">
                For women & caregivers focused on emotional well-being
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-400 line-through">Rs. 258/-</span>
                <span className="text-2xl font-bold">Rs. 129/-</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-full mb-8">
                Choose Plan
              </button>
              <ul className="space-y-3 mb-8 w-full">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">1 Assessment/month</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Personalized insights</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Progress tracking</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Full access to the resource library
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Regular emotional check-ins
                  </span>
                </li>
              </ul>
              <div className="mt-auto space-y-3">
                <p className="text-gray-600">
                  Push notifications to stay on track
                </p>
                <p className="text-gray-600">
                  Counselling available at an additional charge
                </p>
              </div>
            </div>

            {/* Co-Care Plan */}
            <div className="bg-white rounded-lg border-2 border-blue-400 p-8 flex flex-col items-center text-center flex-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Co-Care Plan
              </h2>
              <p className="text-gray-600 mb-6">
                For families caring for both the child and the caregiver's
                wellness
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-400 line-through">Rs. 498/-</span>
                <span className="text-2xl font-bold">Rs. 249/-</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-full mb-8">
                Choose Plan
              </button>
              <ul className="space-y-3 mb-8 w-full">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">2 Assessments/month</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600 text-start">
                    Personalized insights for the caregiver and child
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Progress dashboards</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Full access to the resources
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Regular emotional check-ins
                  </span>
                </li>
              </ul>
              <div className="mt-auto space-y-3">
                <p className="text-gray-600">
                  Notifications tailored to both journeys
                </p>
                <p className="text-gray-600">
                  Counselling available at an additional charge
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Plans;