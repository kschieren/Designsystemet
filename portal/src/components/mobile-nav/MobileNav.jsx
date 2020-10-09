import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "gatsby";
import useKeypress from "react-use-keypress";

import classnames from "classnames";

import { useMainMenu } from "../../useSiteStructure";
import { Xknapp } from "nav-frontend-ikonknapper";

import { GithubLogo } from "../assets/images/svg";

import "./styles.less";

const cls = (props, hidden) =>
  classnames("mobile-nav", {
    "mobile-nav--open": props.open,
    "mobile-nav--hidden": hidden,
  });

const MobileNavMenuItem = ({ ...props }) => {
  return (
    <li className={classnames({ open: props.open })}>
      <Link to={props.route.link}>{props.route.title}</Link>
      {props.route.routes && [props.children]}
    </li>
  );
};

const MobileNav = ({ ...props }) => {
  const [hidden, setHidden] = useState(true);
  const lukkBtn = useRef();
  const bg = useRef();
  const timer = useRef();

  // Timer is needed here to wait for transition animation to finish
  useEffect(() => {
    if (props.open) {
      clearTimeout(timer.current);
      timer.current = null;
      setHidden(false);

      ReactDOM.findDOMNode(lukkBtn.current).focus();
    } else {
      timer.current = setTimeout(() => {
        setHidden(true);
      }, 200);
    }
  }, [props.open]);

  useKeypress("Escape", () => {
    props.open && props.toggle();
  });

  const handleClick = (e) => {
    if (!hidden && e.target !== bg.current) {
      props.toggle();
    }
  };

  const renderRoute = (route, index) => {
    // const open =
    //   props.location.pathname.indexOf(route.path) !== -1 && route.routes;
    return (
      <MobileNavMenuItem route={route} index={index} key={index}>
        {route.routes && (
          <ul>
            {/* {route.routes
              .filter((subRoute) => subRoute.path !== "/new-project")
              .map((filteredRoute, i) => renderRoute(filteredRoute, i))} */}
          </ul>
        )}
      </MobileNavMenuItem>
    );
  };

  const menu = useMainMenu();

  return (
    <div
      className={cls(props, hidden)}
      aria-hidden={hidden}
      onClick={(e) => handleClick(e)}
    >
      <nav
        className="mobile-nav__drawer"
        aria-label="main mobile"
        ref={(node) => {
          bg.current = node;
        }}
      >
        <Xknapp
          className="mobile-nav__close-btn"
          onClick={props.toggle}
          ref={(node) => {
            lukkBtn.current = node;
          }}
        >
          <span className="sr-only">Lukk meny</span>
        </Xknapp>
        <ul className="nav-list">
          {menu.map((route, index) => renderRoute(route, index))}
          <li>
            <a
              href="https://github.com/navikt/nav-frontend-moduler"
              className="github"
            >
              <GithubLogo />
              Github
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
