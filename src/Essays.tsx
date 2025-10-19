import React, { useState } from "react";
import { BiArrowBack, BiHome } from "react-icons/bi";
import { Link } from "react-router-dom"; // assuming you're using react-router

// Dynamically import all txt files from /src/content
const essays = import.meta.glob("./content/*.txt", { as: "raw" });

type Essay = {
  title: string;
  content: string;
};

const Essays: React.FC = () => {
  const [essayList, setEssayList] = useState<Essay[]>([]);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);

  // Load essays dynamically once
  React.useEffect(() => {
    const loadEssays = async () => {
      const loaded: Essay[] = [];
      for (const path in essays) {
        const content = await essays[path]();
        // extract filename as title
        const parts = path.split("/");
        const fileName = parts[parts.length - 1].replace(".txt", "");
        loaded.push({ title: fileName, content });
      }
      setEssayList(loaded);
    };
    loadEssays();
  }, []);

  if (selectedEssay) {
    // Show selected essay content
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedEssay(null)}
          className="flex items-center gap-2 mb-4 text-blue-500 hover:text-blue-700"
        >
          <BiArrowBack size={20} />
          Back
        </button>
        <h1 className="text-xl font-bold mb-4">{selectedEssay.title}</h1>
        <pre className="description whitespace-pre-wrap bg-gray-100 p-4 rounded-md">
          {selectedEssay.content}
        </pre>
      </div>
    );
  }

  // Show essay cards
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
        >
          <BiHome size={20} />
          Home
        </Link>
      </div>
      <h1 className="subHeading mb-8">Essays</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {essayList.map((essay) => (
          <div
            key={essay.title}
            onClick={() => setSelectedEssay(essay)}
            className="cursor-pointer p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold ">{essay.title}</h2>
            <p className="mt-2 description">{essay.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Essays;
