import SearchBar from "./SearchBar";

export default function PhotoOverlay() {
    return (
        <div className="relative">
            <div className="relative h-96 sm:h-80 md:h-96 lg:h-104 bg-black">
                <img src='https://i.pinimg.com/originals/d5/c1/30/d5c1304b49253a11382cc8d3b0599d30.jpg' alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex justify-center items-center text-center">
                    <div className="text-white px-4 sm:px-8 md:px-16">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-snug sm:leading-snug">
                            A tökéletes bázis a<br />különleges utazására
                        </h1>
                        <p className="text-base sm:text-lg mb-4">
                            Válogasson álomszerű nyaralóink közül a világ minden tájáról.
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute inset-x-0 -bottom-10 flex justify-center px-4 sm:px-0">
                <SearchBar />
            </div>
        </div>
    );
};