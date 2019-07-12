import React from "react";

export const ShortUrl = ({ shortenUrl }) => {
  console.log(shortenUrl);
  return (
    <div>
      <a
        className="App-link"
        href={shortenUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {shortenUrl === null || shortenUrl === undefined
          ? null
          : String(shortenUrl)}
      </a>
    </div>
  );
};
