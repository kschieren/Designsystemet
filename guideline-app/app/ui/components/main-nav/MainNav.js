import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import routeConfig from './../../../utils/routing/routes.config';

import './styles.less';

const MainNav = () => (
    <nav className="mainNav">
        <div className="mainNav__wrapper">
            <ul>
                {
                    routeConfig.map((item, index) => 
                        (
                            <li key={index}>
                                <NavLink
                                    exact={index === 0}
                                    activeClassName="active"
                                    to={item.path}
                                >
                                    { item.title }
                                </NavLink>
                            </li>
                        )
                    )
                }
            </ul>
            <ul>
                <li><a href="#">Github</a></li>
            </ul>
        </div>
    </nav>
);

export default MainNav;