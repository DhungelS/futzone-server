import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

export class Highlights extends Component {
  


  resultsEle() {
    if (this.props.highlights) {

      const videos = this.props.highlights.map((highlight, index) => {
        return (
     
          <li key={index} className="highlights">
            <a target="_blank" href={'https://www.youtube.com/watch?v=' + highlight.id.videoId}>
              <img src={highlight.snippet.thumbnails.medium.url} alt="youtube thumbnail" />
            </a>
            <h3>{highlight.snippet.title}</h3>
          </li>
         
        );
      });
      return videos;
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.resultsEle()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  highlights: state.highlights.highlightVids
});

export default connect(mapStateToProps, actions)(Highlights);
