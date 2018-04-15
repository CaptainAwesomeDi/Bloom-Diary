import React from "react"
import PropTypes from "prop-types"
import Grid from "./homeGrid/CalendarGrid"
import Sun from "./Sun"

class Home extends React.Component {
constructor(props){
  super(props);
}
  render () {
    return (
      //This will be where we add the Grid for the flowers
      <React.Fragment>
        <div className="container" style={{ display: "block", width: "100%", height: "180px" }}>
          <Sun className="sun" />
          <h3 className="main-title">Bloom Diary</h3>
          <form method="post" action="/watson" />
        </div>
        <h1>{this.props.userSession}</h1>

        {(this.props.userSession!==null)?<Grid/>: ""}

      </React.Fragment>
    );
  }
}

export default Home
