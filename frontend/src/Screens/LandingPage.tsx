
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Video {
  id: string;
  videoUrl: string;
  thumbnail: string;
  userId: string;
  user: {
    id: string;
    username: string;
    ChannelName: string;
  };
}

export default function LandingPage() {
 
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    async function getVideos() {
      try {
        const response = await fetch("http://localhost:3001/videos");
        const data = await response.json();
        setVideos(data);
        console.log(videos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getVideos();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        YouTube Clone
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={video.thumbnail}
              alt="thumbnail"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: "15px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: "10px",
                }}
              >
                {video.user.ChannelName}
              </h3>

              <p
                style={{
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                @{video.user.username}
              </p>

              <button onClick={() => navigate(`/watch/${video.id}`)}></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
