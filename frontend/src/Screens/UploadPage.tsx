import { useState } from "react";
import axios from "axios";

export function UploadPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  async function uploadVideo() {
    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        {
          videoUrl,
          thumbnail,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);
      alert("Upload successful");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>

      <button onClick={uploadVideo}>
        Upload
      </button>
    </>
  );
}