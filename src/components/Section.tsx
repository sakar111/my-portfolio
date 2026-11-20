import React from "react";

/**
 * The one layout every section uses, centred in the page:
 *   Heading + blue underline
 *   Body, full width of the centred column
 */
const Section: React.FC<{
  id: string;
  title: string;
  bg?: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({ id, title, bg = "bg-white", dark = false, children }) => (
  <section id={id} className={`${bg} py-16 px-[5%] lg:px-12`}>
    <div className="w-full max-w-6xl mx-auto">
      <h2
        className="heading relative pb-2 inline-block mb-10"
        style={dark ? { color: "#fff" } : undefined}
      >
        {title}
        <span
          className="absolute -bottom-3 left-0 h-[3px] bg-[#149ddd] rounded-full"
          style={{ width: "50px" }}
        ></span>
      </h2>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  </section>
);

export default Section;
