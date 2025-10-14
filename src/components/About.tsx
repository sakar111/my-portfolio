import React from "react";
import profileImg from "../assets/my-profile-img.jpg"; // relative to Navbar.tsx
import { MdKeyboardArrowRight } from "react-icons/md";

const About: React.FC = () => {
  // A helper component to keep the list clean
  const InfoItem: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <li className="flex items-center">
      {/* Icon: Using a proper React component */}
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
              {/* The actual line is created here using a pseudo-element */}
              <span
                className="absolute -bottom-3 left-0 h-[3px] bg-[#149ddd]"
                style={{ width: "50px" }} // Adjust this width as needed
              ></span>
            </h2>
          </div>{" "}
          <p className="text-left description">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="md:w-1/3">
            <img
              src={profileImg}
              alt="Profile"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-2/3">
            <h3 className="subHeading mb-4">
              UI/UX Designer &amp; Web Developer
            </h3>
            <p className="italic description mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm description">
              <ul className="space-y-4">
                <InfoItem label="Birthday" value="1 May 1995" />
                <InfoItem label="Website" value="www.example.com" />
                <InfoItem label="Phone" value="+123 456 7890" />
                <InfoItem label="City" value="New York, USA" />
              </ul>
              <ul className="space-y-4">
                <InfoItem label="Age" value="30" />
                <InfoItem label="Degree" value="Master" />
                <InfoItem label="Email" value="email@example.com" />
                <InfoItem label="Freelance" value="Available" />
              </ul>
            </div>
            <p className="mt-6 description">
              Officiis eligendi itaque labore et dolorum mollitia officiis optio
              vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor
              incidunt officia tempore. Et eius omnis. Cupiditate ut dicta
              maxime officiis quidem quia. Sed et consectetur qui quia
              repellendus itaque neque.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
