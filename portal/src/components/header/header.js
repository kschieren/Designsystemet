import React from "react";
import ReactDOM from "react-dom";
import { Link } from "gatsby";

import "./header.less";
import { NAVLogo } from "../assets/images/svg";

import { getViewportDimensions } from "nav-frontend-js-utils";

import MainNav from "../main-nav/MainNav";
import MobileNav from "../mobile-nav/MobileNav";
import MobileNavToggle from "../mobile-nav-toggle/MobileNavToggle";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: false,
      mobileNavOpen: false,
    };

    window.addEventListener("resize", this.checkViewport);
  }

  componentDidMount() {
    this.checkViewport();
  }

  checkViewport = () => {
    const viewport = getViewportDimensions();
    if (viewport.w < 1094 && !this.state.mobile) {
      this.setState({ mobile: true });
    } else if (viewport.w >= 1094 && this.state.mobile) {
      this.setState({ mobile: false });
    }
  };

  toggleMobileNav = () => {
    this.setState(
      {
        mobileNavOpen: !this.state.mobileNavOpen,
      },
      () => {
        if (!this.state.mobileNavOpen) {
          ReactDOM.findDOMNode(this.toggleBtn).focus();
        }
      }
    );
  };

  render() {
    const ariaHidden = this.state.mobile
      ? { "aria-hidden": !!this.state.mobileNavOpen }
      : undefined;
    return (
      <React.Fragment>
        <header className="header">
          <a href="#hovedinnhold" id="skip-link">
            Hopp til innhold
          </a>
          <div className="header__content">
            <Link to="/" className="header__logo">
              <NAVLogo />
              <div className="header__title">Designsystemet</div>
            </Link>
            <MobileNavToggle
              innerRef={(node) => {
                this.toggleBtn = node;
              }}
              onClick={() => this.toggleMobileNav()}
              {...ariaHidden}
            />
            <MainNav />
          </div>
        </header>
        <MobileNav
          open={this.state.mobileNavOpen}
          toggle={this.toggleMobileNav}
        />
      </React.Fragment>
    );
  }
}

export default Header;
