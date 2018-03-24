import React from 'react';

export default function Highlights (props) {
  return (
      <li key={props.index} className="highlights">
        <a target="_blank" href={'https://www.youtube.com/watch?v=' + props.highlight.id.videoId}>
          <img src={props.highlight.snippet.thumbnails.medium.url} alt="youtube thumbnail" />
        </a>
        <h3>{props.highlight.snippet.title}</h3>
      </li>
  );

}

