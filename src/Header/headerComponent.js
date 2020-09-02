import React from "react";
// import home from "./home1.png"
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };
    loginRedirect = () => {
        window.location.href = "/"
    }
    render() {
        return (
            <div>
                <div className="topnav">
                    <a className="active" href="/">2048 CLONE</a>
                    <a className="rightAlign">Version : 1.0</a>
                </div>
            </div>
        )
    }
}