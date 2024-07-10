import React from "react";
import AnalyzerContainer from "@/components/AnalyzerContainer";

const Home: React.FC = () => {
  return (
    <div className="main-content max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Image Analyzer</h1>
      <AnalyzerContainer />
    </div>
  );
};

export default Home;
