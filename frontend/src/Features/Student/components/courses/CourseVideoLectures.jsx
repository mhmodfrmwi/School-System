import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaEdit, FaDownload } from "react-icons/fa";

const VideoSection = () => {
  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white md:border-r border-gray-300 p-6 mt-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
          English
          <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h2>
        <ul className=" md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col ">
          <li>
            <Button 
              variant="solid" 
              className="md:w-11/12 bg-gray-400 text-white font-medium py-4 rounded-lg ">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">01</span> Video Lectures
            </Button>
          </li>
          <li>
            <Button 
              variant="solid" 
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">02</span> Course Material
            </Button>
          </li>
          <li>
            <Button 
              variant="solid" 
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">03</span> Discussion Rooms
            </Button>
          </li>
          <li>
            <Button 
              variant="solid" 
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">04</span> Assignments
            </Button>
          </li>
          <li>
            <Button 
              variant="solid" 
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">05</span> Exams
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Video Lectures</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-4 md:px-6 py-2 rounded-full"
          >
            All (3)
          </Button>
          <Button
            variant="solid"
            className="border border-gray-500 text-gray-800 px-4 md:px-6 py-2 rounded-full"
          >
            Bookmarks (1)
          </Button>
          <Button
            variant="outline"
            className="border border-gray-500 text-gray-800 px-4 md:px-6 py-2 rounded-full"
          >
            Notes (1)
          </Button>
        </div>

        {/* Lecture Cards */}
        <div className="space-y-4">
          <Card className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-600 font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-gray-800">Lecture 1</h2>
                  <p className="text-sm text-gray-600">Essay Writing</p>
                  <p className="text-sm text-gray-400">19 Oct, 3:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3 text-gray-500">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaBookmark className="text-gray-800" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaEdit className="text-blue-600" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaDownload className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-green-200 rounded-full text-green-600 font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-gray-800">Lecture 2</h2>
                  <p className="text-sm text-gray-600">Past, Present, and Future Tenses</p>
                  <p className="text-sm text-gray-400">21 Oct, 3:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3 text-gray-500">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaBookmark className="text-gray-800" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaEdit className="text-blue-600" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaDownload className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-200 rounded-full text-yellow-600 font-bold">
                  3
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-gray-800">Lecture 3</h2>
                  <p className="text-sm text-gray-600">Beauty and the Beast Story</p>
                  <p className="text-sm text-gray-400">19 Oct, 3:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3 text-gray-500">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaBookmark className="text-gray-800" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaEdit className="text-blue-600" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                  <FaDownload className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;