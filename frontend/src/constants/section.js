import {
    FaWifi, FaShuttleVan, FaSwimmingPool, FaUtensils, FaCogs,
   FaShieldAlt, FaSpa,
    FaLock,
    FaMountain,
    FaCouch,
    FaInfoCircle
  } from 'react-icons/fa';
  import { GiGolfFlag, GiWashingMachine } from "react-icons/gi";
  import { MdBathroom, MdBedroomChild } from "react-icons/md";
  import { IoIosChatbubbles } from "react-icons/io";
  
  const sections = [
    {
      title: 'Konyha',
      icon: FaUtensils,
      items: ['Étkezőasztal']
    },
    {
      title: 'Parkolás',
      icon: FaShuttleVan,
      items: ['Parkolási lehetőség.']
    },
    {
      title: 'Beszélt nyelvek',
      icon: IoIosChatbubbles,
      items: ['Angol']
    },
    {
      title: 'Hálószoba',
      icon: MdBedroomChild,
      items: ['Ágynemű', 'Ruhásszekrény']
    },
    {
      title: 'Biztonság',
      icon: FaLock,
      items: ['Bejutás kulccsal', 'Éjjel-nappali biztonsági szolgálat']
    },
    {
      title: 'Internet',
      icon: FaWifi,
      items: ['A szálláshely teljes területén Wifi internet-hozzáférés díjmentesen.']
    },
    {
      title: 'Nappali',
      icon: FaCouch,
      items: ['Ülősarok', 'Íróasztal']
    },
    {
      title: 'Étkezés',
      icon: FaUtensils,
      items: ['Reggeli a szobában', 'Étterem']
    },
    {
      title: 'Szobafelszereltség',
      icon: FaCogs,
      items: ['Konnektor az ágy közelében', 'Ruhaszárító állvány', 'Ruhatartó állvány']
    },
    {
      title: 'Takarítási szolgáltatások',
      icon: GiWashingMachine,
      items: ['Takarítás naponta', 'Nadrágvasaló', 'Vasalási szolgáltatás', 'Vegytisztítás', 'Mosoda'],
      extra: 'Felár ellenében'
    },
    {
      title: 'Fürdőszoba',
      icon: MdBathroom,
      items: ['Vécépapír', 'Törölközők', 'Törölköző | ágynemű felár ellenében', 'Vendég vécé', 'Saját fürdőszoba', 'Vécé', 'Ingyen pipereholmi', 'Zuhany']
    },
    {
      title: 'Általános',
      icon: FaInfoCircle,
      items: ['Italautomata', 'Légkondicionálás', 'Összes közös- és magánhelyiség nemdohányzó', 'Ébresztés', 'Járólap | márványpadló', 'Ventilátor', 'Családi szobák', 'Reptéri transzfer', 'Nemdohányzó szobák', 'Ébresztő-szolgáltatás | ébresztőóra', 'Szobaszerviz'],
      extra: 'Felár ellenében'
    },
  ];
  
  export default sections;