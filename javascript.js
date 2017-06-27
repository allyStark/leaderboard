let topRecent = {};
let topAllTime = {};

$.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function(
  data
) {
  topRecent = data;
});

$.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function(
  data
) {
  topAllTime = data;
});

var Title = React.createClass({
  render: function() {
    return (
      <div>

        <div className="row">

          <div className="heading-row text-center col-12 text">

            freeCodeCamp Leaderboard!
           
            <i className="fa fa-free-code-camp text" aria-hidden="true" />

          </div>

        </div>

        <div className="row title-row">

          <div className="col-3 titles text-center text">Profile Pic</div>
          <div className="col-3 titles text-center text">User Name</div>
          <div className="col-3 titles text-center text">All Time Points</div>
          <div className="col-3 titles text-center text">Recent Points</div>

        </div>

      </div>
    );
  }
});

var ScoreBoard = React.createClass({
  getInitialState: function() {
    return { profiles: topRecent };
  },

  handleClick: function() {
    if (this.state.profiles === topRecent) {
      this.setState({ profiles: topAllTime });
    } else {
      this.setState({ profiles: topRecent });
    }
  },

  createAllProfiles: function() {
    var userArr = Object.values(this.state);

    userArr = userArr[0];

    var toReturn = [];

    for (var i = 0; i < userArr.length; i++) {
      toReturn.push(this.createUserProfile(userArr[i], i));
    }

    return toReturn;
  },

  createUserProfile: function(user, index) {
    return (
        <div className="row bordered">

            <div className="col-3 text-center">

                <img className="profile-pictures" src={user.img} />

            </div>

            <div className="col-3 text-center table-text text">{user.username}</div>
            <div className="col-3 text-center table-text text">{user.alltime}</div>
            <div className="col-3 text-center table-text text">{user.recent}</div>

        </div>
    );
  },

  showState: function() {
    var message = this.state.profiles === topRecent

      ? "Top Recent Points"
      : "Top All Time Points";

    return message;
  },

  render: function() {
    return (
      <div className="everything">

        <div className="row">

          <div className="col-4 text-center switch-div">

            <label className="switch">

              <input type="checkbox" onClick={this.handleClick} />

              <div className="slider" />

            </label>
          </div>

          <div className="col-8 text-center toggle">

            Sort by {this.showState()}

          </div>

        </div>

        {this.createAllProfiles()}

      </div>
    );
  }
});

$(document).ajaxStop(function() {
  ReactDOM.render(<Title />, document.getElementById("container1"));
  ReactDOM.render(<ScoreBoard />, document.getElementById("container"));
});