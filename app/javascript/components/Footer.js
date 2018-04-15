import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
class Footer extends React.Component {
    render() {
    const Footer = styled.footer`
      margin: 0;
      padding: 0;
      font-size: 0.8em;
      text-align: center;
      color:  rgb(238, 236, 236);
      background-color: #965252;
      position: fixed;
      bottom: 0;
      width: 100%;
    `;

        return (
            <React.Fragment>
                <Footer>Copyright © 2018 Final Project  .::.  Designed and Built By Bloom Diary Group</Footer>
            </React.Fragment>
        );
    }
}

export default Footer
