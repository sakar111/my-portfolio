import React from "react";
import { education, honors, skills } from "../assets/copies";
import Section from "./Section";

const Education: React.FC = () => (
  <Section id="education" title="Education & Skills" bg="bg-white">
    {/* Degrees */}
    <div className="flex flex-col gap-5">
      {education.map((e) => (
        <div key={e.school} className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
          <div className="flex flex-wrap justify-between gap-x-4">
            <h3 className="subHeading text-lg">{e.school}</h3>
            <span className="font-Roboto text-sm text-gray-600">{e.date}</span>
          </div>
          <p className="description">{e.degree}</p>
          {e.detail.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1 font-Roboto text-sm text-gray-600 list-disc pl-5">
              {e.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>

    {/* Honors */}
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
      <h3 className="subHeading text-lg mb-2">Honors</h3>
      <ul className="flex flex-col gap-2 description list-disc pl-5">
        {honors.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </div>

    {/* Skills */}
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5 flex flex-col gap-4">
      {skills.map((g) => (
        <div key={g.group}>
          <p className="font-Poppins text-xs uppercase tracking-[0.15em] text-[#149ddd] font-semibold mb-2">
            {g.group}
          </p>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span
                key={s}
                className="font-Roboto text-sm text-gray-800 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Education;
