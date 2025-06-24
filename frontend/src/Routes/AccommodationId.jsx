import React, { useEffect, useRef, useState } from 'react';
import AccommodationTabs from '../components/AccommodationTabs';
import AccommodationOverview from '../components/AccommodationOverview';
import AccommodationFacilities from '../components/AccommodationFacilities';
import AccommodationInfo from '../components/AccommodationInfo';
import AccommodationFinePrint from '../components/AccommodationFinePrint';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useParams } from 'react-router';
import { getAccommodationId } from '../services/accommodationIdService';

export default function AccommodationId() {
  const overviewRef = useRef(null);
  const availabilityRef = useRef(null);
  const facilitiesRef = useRef(null);
  const infoRef = useRef(null);
  const printRef = useRef(null);

  const [ accommodationData, setAccommodationData ] = useState("");

  let { id } = useParams();

  useEffect(() => {
     getAccommodationId(id)
     .then(setAccommodationData)
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToOverview = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAvailability = () => {
    if (availabilityRef.current) {
      availabilityRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFacilities = () => {
    if (facilitiesRef.current) {
      facilitiesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInfo = () => {
    if (infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPrint = () => {
    if (printRef.current) {
      printRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <AccommodationTabs
        onOverviewClick={scrollToOverview}
        onAvailabilityClick={scrollToAvailability}
        onFacilitiesClick={scrollToFacilities}
        onInfoClick={scrollToInfo}
        onPrintClick={scrollToPrint}
      />
      <div ref={overviewRef} className="w-full">
        <AccommodationOverview onAvailabilityClick={scrollToAvailability} 
        accommodation={accommodationData} />
      </div>
      <div ref={facilitiesRef} className="w-full">
        <AccommodationFacilities onAvailabilityClick={scrollToAvailability} />
      </div>
      <div ref={infoRef} className="w-full">
        <AccommodationInfo onAvailabilityClick={scrollToAvailability} />
      </div>
      <div ref={printRef} className='w-full'>
        <AccommodationFinePrint onAvailabilityClick={scrollToAvailability} />
      </div>
      <div className="fixed bottom-8 right-8 cursor-pointer text-gray-500" onClick={scrollToTop}>
        <FaArrowCircleUp size={30} />
      </div>
    </div>
  );
};
