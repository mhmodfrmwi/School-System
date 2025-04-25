import React, { useState } from "react";
import { useModelData } from "../components/hooks/dashboard";

const StudentPerformanceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { studentModalData } = useModelData();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!studentModalData) {
    return (
      <div className="relative">
        <button
          onClick={toggleModal}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    );
  }

  const { attendance, avg_score, overall_status, subjects, error } =
    studentModalData;
  const scienceData = subjects?.science;

  // Check if we have any meaningful data to display
  const hasBasicData = attendance || avg_score || overall_status;
  const hasScienceData = scienceData && !error;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 left-6 z-40 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        {isModalOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 p-4 pt-10">
          <div
            className="relative mx-auto w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-[#13082F]"
            style={{ maxHeight: "80vh" }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b-2 border-gray-100 bg-white p-4 dark:border-[#3B1E77] dark:bg-[#13082F]">
              <div className="flex items-center">
                <div className="mr-2 h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"></div>
                <h2 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-bold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                  Student Performance Analysis
                </h2>
              </div>
              <button
                onClick={toggleModal}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-[#E0AAEE] dark:hover:bg-[#3B1E77]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {hasBasicData ? (
                <>
                  {/* Overview Section */}
                  <div className="rounded-xl bg-[#F5F5F5] p-4 dark:bg-[#281459]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {overall_status && (
                        <div>
                          <h3 className="font-poppins text-lg font-semibold text-gray-700 dark:text-[#E0AAEE]">
                            Overall Status
                          </h3>
                          <p
                            className={`font-poppins text-xl font-bold ${overall_status === "Pass" ? "text-green-500" : "text-red-500"}`}
                          >
                            {overall_status}
                          </p>
                        </div>
                      )}
                      {avg_score && (
                        <div>
                          <h3 className="font-poppins text-lg font-semibold text-gray-700 dark:text-[#E0AAEE]">
                            Average Score
                          </h3>
                          <div className="flex items-center">
                            <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-[#3B1E77]">
                              <div
                                className="h-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                                style={{ width: `${avg_score}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 font-poppins font-bold text-gray-700 dark:text-[#D1D5DB]">
                              {avg_score}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Attendance Info */}
                    {attendance && (
                      <div
                        className="mt-4 rounded-lg border-4 border-transparent bg-white p-4 dark:bg-[#3B1E77]"
                        style={{
                          borderImage:
                            "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                        }}
                      >
                        <h4 className="mb-2 font-poppins text-lg font-semibold text-gray-700 dark:text-[#E0AAEE]">
                          Attendance
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-poppins text-gray-600 dark:text-[#D1D5DB]">
                              Absent Days
                            </p>
                            <p className="font-poppins font-bold text-gray-700 dark:text-[#D1D5DB]">
                              {attendance.absent_days}
                            </p>
                          </div>
                          {attendance.evaluation && (
                            <>
                              <div>
                                <p className="font-poppins text-gray-600 dark:text-[#D1D5DB]">
                                  Status
                                </p>
                                <p
                                  className={`font-poppins font-bold ${
                                    attendance.evaluation.status ===
                                    "Concerning"
                                      ? "text-yellow-500"
                                      : "text-green-500"
                                  }`}
                                >
                                  {attendance.evaluation.status}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="font-poppins text-gray-600 dark:text-[#D1D5DB]">
                                  Recommendation
                                </p>
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  {attendance.evaluation.recommendation}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Subject Performance Section */}
                  {hasScienceData ? (
                    <div className="mt-6">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"></div>
                        <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-xl font-bold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                          Science Performance
                        </h3>
                      </div>

                      {/* Current and Future Performance */}
                      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Current Evaluation */}
                        {scienceData.current_evaluation && (
                          <div
                            className="rounded-xl border-4 border-transparent bg-[#F5F5F5] p-4 dark:bg-[#281459]"
                            style={{
                              borderImage:
                                "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                            }}
                          >
                            <h4 className="mb-3 font-poppins text-lg font-semibold text-gray-700 dark:text-[#E0AAEE]">
                              Current Evaluation
                            </h4>
                            <div className="space-y-2">
                              {scienceData.current_evaluation.score && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Score:
                                  </span>{" "}
                                  <span className="font-bold">
                                    {scienceData.current_evaluation.score}
                                  </span>
                                </p>
                              )}
                              {scienceData.current_evaluation
                                .performance_level && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Performance:
                                  </span>{" "}
                                  <span className="font-bold">
                                    {
                                      scienceData.current_evaluation
                                        .performance_level
                                    }
                                  </span>
                                </p>
                              )}
                              {scienceData.current_evaluation.status && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Status:
                                  </span>{" "}
                                  <span
                                    className={`font-bold ${
                                      scienceData.current_evaluation.status ===
                                      "Pass"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {scienceData.current_evaluation.status}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Future Prediction */}
                        {scienceData.future_prediction && (
                          <div
                            className="rounded-xl border-4 border-transparent bg-[#F5F5F5] p-4 dark:bg-[#281459]"
                            style={{
                              borderImage:
                                "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                            }}
                          >
                            <h4 className="mb-3 font-poppins text-lg font-semibold text-gray-700 dark:text-[#E0AAEE]">
                              Future Prediction
                            </h4>
                            <div className="space-y-2">
                              {scienceData.future_prediction
                                .predicted_score && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Predicted Score:
                                  </span>{" "}
                                  <span className="font-bold">
                                    {
                                      scienceData.future_prediction
                                        .predicted_score
                                    }
                                  </span>
                                </p>
                              )}
                              {scienceData.future_prediction
                                .predicted_grade && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Predicted Grade:
                                  </span>{" "}
                                  <span className="font-bold">
                                    {
                                      scienceData.future_prediction
                                        .predicted_grade
                                    }
                                  </span>
                                </p>
                              )}
                              {scienceData.future_prediction
                                .potential_improvement && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Improvement Potential:
                                  </span>{" "}
                                  <span className="font-bold text-green-500">
                                    +
                                    {
                                      scienceData.future_prediction
                                        .potential_improvement
                                    }{" "}
                                    points
                                  </span>
                                </p>
                              )}
                              {scienceData.future_prediction
                                .prediction_confidence && (
                                <p className="font-poppins text-gray-700 dark:text-[#D1D5DB]">
                                  <span className="text-gray-600 dark:text-[#D1D5DB]">
                                    Confidence:
                                  </span>{" "}
                                  <span className="font-bold capitalize">
                                    {
                                      scienceData.future_prediction
                                        .prediction_confidence
                                    }
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Improvement Plan */}
                      {scienceData.improvement_plan && (
                        <div className="mt-6">
                          <h4 className="mb-3 font-poppins text-lg font-semibold text-gray-700 dark:text-[#E0AAEE]">
                            Improvement Plan{" "}
                            {scienceData.improvement_plan
                              .improvement_priority && (
                              <span className="ml-2 rounded-full bg-[#BC6FFB] px-3 py-1 text-xs font-bold text-white dark:bg-[#AE45FB]">
                                Priority:{" "}
                                {
                                  scienceData.improvement_plan
                                    .improvement_priority
                                }
                              </span>
                            )}
                          </h4>

                          {/* Standard Suggestions */}
                          {scienceData.improvement_plan.standard_suggestions
                            ?.length > 0 && (
                            <div className="mb-6">
                              <h5 className="mb-2 font-poppins font-semibold text-gray-600 dark:text-[#D1D5DB]">
                                Standard Suggestions
                              </h5>
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {scienceData.improvement_plan.standard_suggestions.map(
                                  (suggestion, index) => (
                                    <div
                                      key={`standard-${index}`}
                                      className="transform rounded-xl border-4 border-transparent bg-white p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-[#4B3B7A]"
                                      style={{
                                        borderImage:
                                          "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                                      }}
                                    >
                                      <div className="flex items-start">
                                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#BC6FFB] text-white dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:to-[#AE45FB]">
                                          {index + 1}
                                        </div>
                                        <div>
                                          <h6 className="font-poppins font-semibold text-gray-700 dark:text-[#E0AAEE]">
                                            {suggestion.action}
                                          </h6>
                                          <p className="mt-1 font-poppins text-sm text-gray-600 dark:text-[#D1D5DB]">
                                            {suggestion.explanation}
                                          </p>
                                          <div className="mt-3 flex items-center justify-between">
                                            {suggestion.expected_points_improvement && (
                                              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-[#3B1E77] dark:text-green-300">
                                                +
                                                {
                                                  suggestion.expected_points_improvement
                                                }{" "}
                                                points
                                              </span>
                                            )}
                                            {suggestion.timeframe && (
                                              <span className="text-xs font-semibold text-gray-500 dark:text-[#D1D5DB]">
                                                {suggestion.timeframe}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          {/* Advanced Suggestions */}
                          {scienceData.improvement_plan
                            .beyond_potential_suggestions?.length > 0 && (
                            <div>
                              <h5 className="mb-2 font-poppins font-semibold text-gray-600 dark:text-[#D1D5DB]">
                                Advanced Suggestions
                              </h5>
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {scienceData.improvement_plan.beyond_potential_suggestions.map(
                                  (suggestion, index) => (
                                    <div
                                      key={`advanced-${index}`}
                                      className="transform rounded-xl border-4 border-transparent bg-white p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-[#4B3B7A]"
                                      style={{
                                        borderImage:
                                          "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                                      }}
                                    >
                                      <div className="flex items-start">
                                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#FD813D] to-[#BC6FFB] text-white dark:from-[#CE4EA0] dark:to-[#AE45FB]">
                                          {index + 1}
                                        </div>
                                        <div>
                                          <h6 className="font-poppins font-semibold text-gray-700 dark:text-[#E0AAEE]">
                                            {suggestion.action}
                                          </h6>
                                          <p className="mt-1 font-poppins text-sm text-gray-600 dark:text-[#D1D5DB]">
                                            {suggestion.explanation}
                                          </p>
                                          <div className="mt-3 flex items-center justify-between">
                                            {suggestion.expected_points_improvement && (
                                              <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800 dark:bg-[#3B1E77] dark:text-purple-300">
                                                +
                                                {
                                                  suggestion.expected_points_improvement
                                                }{" "}
                                                points
                                              </span>
                                            )}
                                            {suggestion.timeframe && (
                                              <span className="text-xs font-semibold text-gray-500 dark:text-[#D1D5DB]">
                                                {suggestion.timeframe}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6 p-6 text-center">
                      <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                          Subject Performance Data Not Available
                        </h3>
                        <p className="mt-2 text-blue-600 dark:text-blue-200">
                          {error ||
                            "We couldn't find performance data for this subject. This might be because the student hasn't completed enough assessments yet."}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center">
                  <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      No Performance Data Available
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      We couldn't find any performance data for this student.
                      This might be because the student is new or data hasn't
                      been collected yet.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPerformanceModal;
