var React = require('react');

module.exports = Tweet = React.createClass({
  render: function(){
    var tweet = this.props.tweet;
    return (
      <li className={"tweet" + (tweet.active ? ' active' : '')}>
        <img src={tweet.avatar} className="avatar"/>
        <blockquote>
          <cite>
            <a href={"http://www.twitter.com/" + tweet.screenname}>{tweet.author}</a> 
            <span className="screen-name">@{tweet.screenname}</span> 
          </cite>
          <span className="content">{tweet.body}</span>
        </blockquote>
        <span>
          <small>Keywords: </small>
          {tweet.track} &nbsp;
          <small>Location: </small>
          {tweet.location} &nbsp;
          <small>Sentimenal Score: </small>
          {tweet.score}
        </span>
      </li>
    )
  }
});