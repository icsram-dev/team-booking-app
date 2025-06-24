import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Dropdown } from "flowbite-react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="px-4 sm:px-8 md:px-16 lg:px-32 py-3 bg-blue-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-lg">
      <Link to="/"><h1 className="text-white text-2xl font-bold tracking-wide">BestBooking.</h1></Link>
      <div className="flex items-center justify-center gap-4 text-white flex-wrap">
        {!user && (
          <>
            <Link className="sm:ml-2" to={"/registration"}>
              <button>Regisztráció</button>
            </Link>
            <Link to={"/login"}>Bejelentkezés</Link>
          </>
        )}
        <Link className="sm:ml-2" to="/accommodations">
          <button>Szállások</button>
        </Link>
        {user && (
          <>
        <Link className="sm:ml-2" to={"/user/profilesettings"}>Fiókbeállítások</Link>
          <Dropdown label="Profilom" inline={true} className="relative z-50">
            {user.isAdmin && (
              <Link to="/admin">
                <Dropdown.Item>Admin</Dropdown.Item>
              </Link>
            )}
            <Link to="/favourites">
              <Dropdown.Item>Kedvenceim</Dropdown.Item>
            </Link>
            <Link to={`accommodation/user/${user.id}`}>
              <Dropdown.Item>Szállásaim</Dropdown.Item>
            </Link>
            <Link to={`user/bookings/`}>
              <Dropdown.Item>Foglalásaim</Dropdown.Item>
            </Link>
            <Link to={`accommodation/user/${user.id}/createaccommodation`}>
              <Dropdown.Item>Új szállás létrehozása</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={() => logout()}>Kijelentkezés</Dropdown.Item>
          </Dropdown>
          </>
        )}
      </div>
    </header>
  );
};