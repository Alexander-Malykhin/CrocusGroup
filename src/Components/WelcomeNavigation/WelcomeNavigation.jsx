import {Link, NavLink, useLocation} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';
import {navigationArrayList} from './navigationArrayList.js';

import arrowImage from '../../assets/welcome/navigation-arrow.svg';
import './WelcomeNavigation.css';

const WelcomeNavigation = () => {
    const {pathname, hash} = useLocation();

    const currentPath = useMemo(() => {
        const parts = pathname.split('/').filter(Boolean);
        return parts[1] || parts[0] || '';
    }, [pathname]);

    const initialExpandedId = useMemo(() => {
        const activeItem = navigationArrayList.find(i => i.route === currentPath);
        return activeItem ? activeItem.id : null;
    }, [currentPath]);

    const [expandedId, setExpandedId] = useState(initialExpandedId);

    useEffect(() => {
        setExpandedId(initialExpandedId);
    }, [initialExpandedId]);

    const toggleSection = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };


    return (
        <nav className="welcome__navigation">
            {navigationArrayList.map(item => {
                const isExpanded = item.id === expandedId;

                if (item.id === 2) {
                    return (
                        <div className="welcome__navigation-item" key={item.id}>
                            <div className={`welcome__navigation-header ${isExpanded ? 'header-active' : ''}`}>
                                <Link
                                    to={item.route}
                                    className={`welcome__navigation-title ${currentPath === item.route ? 'welcome__navigation-active' : ''}`}
                                >
                                    {item.title}
                                </Link>

                                <button
                                    style={isExpanded ? {display: 'none'} : {}}
                                    className={`welcome__navigation-arrow ${isExpanded ? 'link-rotate' : ''}`}
                                    onClick={() => toggleSection(item.id)}
                                    aria-label="toggle"
                                    type="button"
                                >
                                    <img src={arrowImage} alt="arrow-icon" className="welcome__navigation-image"/>
                                </button>
                            </div>
                        </div>
                    )
                }


                return (
                    <div onClick={() => toggleSection(item.id)} className="welcome__navigation-item" key={item.id}>
                        <div className={`welcome__navigation-header ${isExpanded ? 'header-active' : ''}`}>
                            <h2 className="welcome__navigation-title">{item.title}</h2>

                            <div
                                className={`welcome__navigation-arrow ${isExpanded ? 'link-rotate' : ''}`}
                            >
                            <img src={arrowImage} alt="arrow-icon" className="welcome__navigation-image"/>
                            </div>
                        </div>

                        {item.list && item.list.length > 0 && (
                            <div className={`welcome__navigation-content-list ${isExpanded ? 'item-active' : ''}`}>
                                {item.list.map(child => (
                                    <NavLink key={child.id}
                                             className={(isActive) => isActive && hash === child.hash ? `welcome__navigation-content-active` : 'welcome__navigation-content-description'}
                                             to={child.link}>
                                        {child.description}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default WelcomeNavigation;
