import React from "react";

interface Props {
  url: string;
}

const YoutubeVideoIframe = ({ url }: Props) => {
  return (
    <iframe
      width="560"
      height="315"
      src={url}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
};

export default YoutubeVideoIframe;
