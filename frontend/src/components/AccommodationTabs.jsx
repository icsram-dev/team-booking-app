import { useState } from "react";
import tabs from "../constants/tabsData";

export default function AccommodationTabs({ onOverviewClick, onFacilitiesClick, onInfoClick, onPrintClick }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabHandlers = {
    'overview': onOverviewClick,
    'facilities': onFacilitiesClick,
    'important': onInfoClick,
    'smallprint': onPrintClick
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabHandlers[tabId]) {
      tabHandlers[tabId]();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-around border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 transition-colors duration-300 ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
              } sm:w-auto w-full`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};