import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const About: React.FC = () => {
  const InfoItem: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <li className="flex items-center">
      <MdKeyboardArrowRight className="text-blue-500 text-xl flex-shrink-0 mr-1" />
      <p>
        <strong className="font-semibold text-gray-800">{label}:</strong>{" "}
        {value}
      </p>
    </li>
  );

  return (
    <section id="about" className="py-16 px-6 lg:px-30 bg-white text-gray-800">
      <div className="container mx-auto">
        <div className="mb-12">
          <div className="flex flex-col items-start mb-10">
            <h2 className="heading relative pb-2 inline-block">
              About
              <span
                className="absolute -bottom-3 left-0 h-[3px] bg-[#149ddd]"
                style={{ width: "50px" }}
              ></span>
            </h2>
          </div>
          <p className="text-left description">
            I build robots to improve people’s lives. I prefer my robots to have
            their own intelligence and show movement – pushing the limits of
            physics with stability and control.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="md:w-1/3">
            <img
              src="/photo/my-profile2.jpg"
              alt="Profile"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-2/3">
            <h3 className="subHeading mb-4">Robotics Engineer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm description">
              <ul className="space-y-4">
                <InfoItem label="Birthday" value="&nbsp;04 April 2001" />
                <InfoItem label="City" value="&nbsp;Kathmandu, Nepal" />
                <InfoItem
                  label="Email"
                  value="&nbsp;sakar.pathak111@gmail.com"
                />
                <InfoItem label="Phone" value="&nbsp;+977 9841671676" />
                {/* Captcha Checkbox */}
                <li className="mt-4">
                  <div className="flex items-center justify-between w-full max-w-xs p-2 border rounded-md border-gray-300 bg-gray-50 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center bg-white">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-800 text-sm">
                        I'm not a robot
                      </span>
                    </div>
                    <div className="flex flex-col items-end text-xs text-gray-500">
                      <span>reCAPTCHA</span>
                      <span className="text-[10px]">Privacy - Terms</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
