import React, { useState } from "react";
import Container from "../Container";
import Title from "../Title";
import SubTitle from "../SubTitle";
import VideosSlide from "../VideosSlide/EmblaCarousel";
import IframeVideo from "../IframeVideo";

function Projects({ id, data }) {
  console.log(data, "data");
  
  // Ensure data exists before using it
  if (!data || data.length === 0) {
    return <div>No videos available.</div>;
  }

  // Set the first video from props as the default selected video
  const [selectedVideo, setSelectedVideo] = useState(data[0]);

  // This callback will update the selected video
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Filter out the selected video so it doesn't appear in the slider.
  const sliderData = data.filter(
    (video) => video.link !== selectedVideo.link
  );

  return (
    <div id={id} className="border-t border-t-borderColor pb-60">
      <Container>
        <div className="flex flex-row gap-9 items-center pt-60 pb-8">
          <Title>İşlərimiz</Title>
          <SubTitle>
            At our digital marketing agency, we offer a range of services to help
            businesses grow and succeed online. These services include:
          </SubTitle>
        </div>

        {/* Display the selected video */}
        <IframeVideo video={selectedVideo} />

        {/* Pass the filtered video list to VideosSlide */}
        <VideosSlide
          data={sliderData}
          type="project"
          onVideoSelect={handleVideoSelect}
          activeVideo={selectedVideo}
        />
      </Container>
    </div>
  );
}

export default Projects;
