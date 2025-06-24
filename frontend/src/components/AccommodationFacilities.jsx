import { MdDone } from "react-icons/md";
import sections from "../constants/section";

export default function AccommodationFacilities() {
    return (
        <div className='w-full max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-2xl font-semibold mb-8'>Az alábbi szolgáltatásainkat valamennyi szálláshelyünk biztosítja:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center mb-2">
                            <section.icon className="text-xl text-black mr-2" />
                            <h2 className="text-lg font-semibold">{section.title}</h2>
                        </div>
                        <ul className="list-none list-inside space-y-1">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-center">
                                    <MdDone className="text-black mr-2" />
                                    <span>{item} {section.extra && <span className="text-sm text-gray-500">({section.extra})</span>}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};