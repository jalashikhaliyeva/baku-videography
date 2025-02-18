import React from "react";

function IframeVideo({ video }) {
  if (!video) return null;

  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <div
        className="w-full iframe-wrapper"
        dangerouslySetInnerHTML={{ __html: video.iframe }}
      />
      {/* Global style override */}
      <style jsx global>{`
        .iframe-wrapper iframe {
          width: 100% !important;
          height: 550px;
        }
        @media (max-width: 768px) {
          .iframe-wrapper iframe {
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default IframeVideo;
