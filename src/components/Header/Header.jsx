import { MdLocationPin, MdLogout } from "react-icons/md";
import {
  HiBookmark,
  HiCalendar,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useRef, useState } from "react";
import useCloserOptions from "../../Hooks/useCloserOptions";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [isGuestOptionVisible, setIsGuestOptionVisible] = useState(false);
  const [guestOptions, setGuestOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [isDateOptionVisible, setIsDateOptionVisible] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRangeRef = useRef();
  useCloserOptions(dateRangeRef, "dateDropDownId", () =>
    setIsDateOptionVisible(false)
  );
  const navigate = useNavigate();
  function guestOptionsHandler(type, operation) {
    setGuestOptions({
      ...guestOptions,
      [type]:
        operation === "inc" ? guestOptions[type] + 1 : guestOptions[type] - 1,
    });
  }

  function searchHandler() {
    const encodedParams = createSearchParams({
      destination: destination,
      date: JSON.stringify(dateRange),
      options: JSON.stringify(guestOptions),
    });
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  }
  return (
    <div className="header">
      <NavLink to="/bookmarks">
        Bookmarks
        <HiBookmark className="icon" />
      </NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationPin className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="headerSearchInput"
            placeholder="Where to go?"
            type="text"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            id="dateDropDownId"
            onClick={() => setIsDateOptionVisible(!isDateOptionVisible)}
          >{`${format(dateRange[0].startDate, "MM/dd/yyyy")} to ${format(
            dateRange[0].endDate,
            "MM/dd/yyyy"
          )}`}</div>
          {isDateOptionVisible && (
            <div ref={dateRangeRef}>
              <DateRange
                className="date"
                ranges={dateRange}
                onChange={(item) => setDateRange([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            </div>
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => setIsGuestOptionVisible(!isGuestOptionVisible)}
          >
            {guestOptions.adult} adult &bull; {guestOptions.children} children
            &bull; {guestOptions.room} room
          </div>
          {isGuestOptionVisible && (
            <GuestOptions
              guestOptionsHandler={guestOptionsHandler}
              options={guestOptions}
              setIsGuestOptionVisible={setIsGuestOptionVisible}
            />
          )}
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={searchHandler}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <UserStatus />
    </div>
  );
}

function GuestOptions({
  options,
  guestOptionsHandler,
  setIsGuestOptionVisible,
}) {
  const ref = useRef();
  useCloserOptions(ref, "optionDropDown", () => setIsGuestOptionVisible(false));
  return (
    <div className="guestOptions" ref={ref}>
      <GuestOptionItem
        type={"adult"}
        options={options}
        minLimit={1}
        guestOptionsHandler={guestOptionsHandler}
      />
      <GuestOptionItem
        type={"children"}
        options={options}
        minLimit={0}
        guestOptionsHandler={guestOptionsHandler}
      />
      <GuestOptionItem
        type={"room"}
        options={options}
        minLimit={1}
        guestOptionsHandler={guestOptionsHandler}
      />
    </div>
  );
}

function GuestOptionItem({ type, options, minLimit, guestOptionsHandler }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => guestOptionsHandler(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => guestOptionsHandler(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function UserStatus() {
  const { user, isAuthenticated, logout } = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <strong>{user.userName}</strong>
          <button>
            &nbsp; <MdLogout onClick={handleLogout} className="logout icon" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  );
}
