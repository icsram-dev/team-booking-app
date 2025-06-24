import AccommodationTypes from "../components/AccommodationTypes";
import PhotoOverlay from "../components/PhotoOverlay";
import PopularDestinations from "../components/PopularDestinations";

export default function Home() {
    return (
        <>
            <PhotoOverlay />
            <PopularDestinations />
            <AccommodationTypes />
        </>
    );
};