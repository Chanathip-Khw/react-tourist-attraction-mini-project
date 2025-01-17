import { useEffect, useState } from "react";
import axios from "axios";
import copyLinkIcon from "../assets/copyLinkIcon.png";

function Article() {
  const [inputLocation, setInputLocation] = useState("");
  const [sortedLocation, setSortedLocation] = useState([]);

  const handleInput = async () => {
    try {
      const locations = await axios.get(
        `http://localhost:4001/trips?keywords=${inputLocation}`
      );
      setSortedLocation(locations.data.data);
      console.log(inputLocation);
      console.log(sortedLocation);
    } catch {
      alert("can not get data");
    }
  };

  const handleTagButton = (tag) => {
    const newInputLocation = `${inputLocation} ${tag}`.trim();
    setInputLocation(newInputLocation);
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link.");
    }
  };

  const LocationCard = ({ location }) => {
    return (
      <div className="location-card flex gap-10 mx-10">
        <img
          className="major-image w-[480px] h-[240px] rounded-xl object-cover overflow-hidden"
          src={location.photos[0]}
          alt={location.title}
        ></img>
        <div className="detail flex flex-col gap-3 w-full">
          <div className="title text-[24px] font-[600]">
            <a
              className="more-detail-button"
              href={location.url}
              target="_blank"
            >
              {location.title}
            </a>
          </div>
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
              <button
                className="underline mr-1 ml-1"
                onClick={() => handleTagButton(tag)}
              >
                {tag}
              </button>
            ))}
            และ{" "}
            <button
              className="underline mr-1 ml-1"
              onClick={() =>
                handleTagButton(location.tags[location.tags.length - 1])
              }
            >
              {location.tags[location.tags.length - 1]}
            </button>
          </p>
          <div className="flex justify-between">
            <div className="minor-image flex gap-5">
              {location.photos.slice(1, 4).map((photo) => (
                <img
                  src={photo}
                  alt="minor-photo"
                  className="w-20 h-20 rounded-xl object-cover"
                ></img>
              ))}
            </div>
            <button onClick={() => copyToClipboard(location.url)}>
              <img src={copyLinkIcon} className="w-10 h-10"></img>
            </button>
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
