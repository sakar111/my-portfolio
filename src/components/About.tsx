import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Section from "./Section";

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <li className="flex items-start">
    <MdKeyboardArrowRight className="text-blue-500 text-xl shrink-0 mr-1 mt-0.5" />
    <p>
      <strong className="font-semibold text-gray-800">{label}:</strong> {value}
    </p>
  </li>
);

const About: React.FC = () => (
  <Section id="about" title="About">
    <p className="description leading-relaxed">
      I'm a robotics and hardware engineer who works across the whole stack: I design the PCBs,
      write the firmware, and tune the control loops. Right now I'm a graduate researcher at UNR,
      leading hardware for an underwater acoustic modem and building the flight platform for a
      UV-disinfection drone. Before that, I co-founded an educational robotics company in Nepal and
      shipped kits that taught 1,000+ students to build robots.
    </p>

    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="w-64 md:w-72 shrink-0">
        <img src="/photo/my-profile2.jpg" alt="Sakar Pathak" className="rounded-lg shadow-lg" />
      </div>

      <div className="flex-1">
        <h3 className="subHeading mb-4">Robotics &amp; Hardware Engineer</h3>
        <ul className="space-y-4 text-sm description">
          <InfoItem label="Now" value="M.S. Electrical Engineering, University of Nevada, Reno" />
          <InfoItem label="Focus" value="PCB & analog hardware · embedded firmware · drones & controls" />
          <InfoItem label="Location" value="Reno, NV" />
          <InfoItem label="Email" value="sakar.pathak111@gmail.com" />
          <InfoItem label="Phone" value="+1 (775) 223-5742" />
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
                <span className="text-gray-800 text-sm">I'm not a robot</span>
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
  </Section>
);

export default About;
