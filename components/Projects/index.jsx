import React, { useState } from "react";
import Container from "../Container";
import Title from "../Title";
import SubTitle from "../SubTitle";
import VideosSlide from "../VideosSlide/EmblaCarousel";
import mockVideoSlide from "../../data/mockVideoSlide";
import IframeVideo from "../IframeVideo";

function Projects() {
  // Set the first video as the default selected video
  const [selectedVideo, setSelectedVideo] = useState(mockVideoSlide[0]);

  // This callback will be passed to the slider so that when a slide is clicked,
  // the selected video is updated.
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Filter out the selected video so it doesn't appear in the slider.
  const sliderData = mockVideoSlide.filter(
    (video) => video.slug !== selectedVideo.slug
  );

  return (
    <div className="border-t border-t-borderColor">
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
