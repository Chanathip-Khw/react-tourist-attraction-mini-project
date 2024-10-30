import { useEffect, useState } from "react";
import axios from "axios";

function Article() {
  const [inputLocation, setInputLocation] = useState("");
  const [sortedLocation, setSortedLocation] = useState([]);

  const handleInput = async () => {
    try {
      const locations = await axios.get(
        `http://localhost:4001/trips?keywords=${inputLocation}`
      );
      setSortedLocation(locations.data.data);
      console.log(locations.data.data);
    } catch {
      alert("can not get data");
    }
  };

  const LocationCard = ({ location }) => {
    return (
      <div className="location-card flex flex-row gap-10 mx-10 ">
        <img
          className="major-image w-[360px] h-[240px] rounded-xl object-cover"
          src={location.photos[0]}
          alt={location.title}
        ></img>
        <div className="detail flex flex-col gap-3">
          <h1 className="title text-[24px] font-[600]">{location.title}</h1>
          <p className="description text-gray-500">
            {location.description.slice(0, 100)}...
          </p>
          <div>
            <a
              className="more-detail-button text-blue-400 underline"
              href={location.url}
              target="_blank"
            >
              อ่านต่อ
            </a>
          </div>
          <p className="text-gray-500">
            หมวด{" "}
            {location.tags.slice(0, location.tags.length - 1).map((tag) => (
              <span className="underline mr-1 ml-1">{tag}</span>
            ))}
            และ{" "}
            <span className="underline mr-1 ml-1">
              {location.tags[location.tags.length - 1]}
            </span>
          </p>
          <div className="minor-image flex gap-5">
            {location.photos.slice(1, 4).map((photo) => (
              <img
                src={photo}
                alt="minor-photo"
                className="w-20 h-20 rounded-xl object-cover"
              ></img>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    handleInput();
  }, [inputLocation]);

  return (
    <div className="Article">
      <h1 className="text-blue-400 text-[48px] text-center font-extrabold">
        เที่ยวไหนดี
      </h1>
      <div className="search-part mx-32 my-5">
        <h2>ค้นหาที่เที่ยว</h2>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={inputLocation}
          onChange={(event) => setInputLocation(event.target.value)}
          className="w-full border-b text-center focus:outline-none"
        ></input>
      </div>
      <div className="locations flex flex-col gap-10">
        {sortedLocation.map((location) => {
          return <LocationCard location={location} key={location.eid} />;
        })}
      </div>
    </div>
  );
}

export default Article;
