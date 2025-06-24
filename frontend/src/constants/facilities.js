import { FaCoffee, FaCogs, FaShuttleVan, FaSwimmingPool, FaUtensils, FaWifi } from 'react-icons/fa'
import { GrSwim } from "react-icons/gr";
import { GiFamilyHouse } from "react-icons/gi";
import { MdRoomService, MdSmokeFree } from "react-icons/md";
import { PiFlowerTulip } from "react-icons/pi";

const facilities = [
  { icon: GrSwim, text: 'kültéri medence'},
  { icon: FaWifi, text: 'ingyenes wifi'},
  { icon: FaShuttleVan, text: 'reptéri transzfer'},
  { icon: GiFamilyHouse, text: 'családi szobák'},
  { icon: FaUtensils, text: 'étterem'},
  { icon: MdSmokeFree, text: 'nemdohányzó szobák'},
  { icon: MdRoomService, text: 'szobaszerviz'},
  { icon: FaCogs, text: 'légkondicionálás'},
  { icon: PiFlowerTulip, text: 'kert'},
  { icon: FaCoffee, text: 'nagyon jó reggeli'},
]

export default facilities;