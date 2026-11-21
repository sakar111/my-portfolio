import React from "react";
import { FiExternalLink } from "react-icons/fi";

/** The one style for every outbound link (GitHub, report, company site): blue pill + ↗ arrow. */
const LinkButton: React.FC<{ title: string; link: string }> = ({ title, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-[#149ddd] hover:bg-[#1287bf] text-white font-Poppins text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-colors"
  >
    {title} <FiExternalLink size={14} />
  </a>
);

export default LinkButton;
