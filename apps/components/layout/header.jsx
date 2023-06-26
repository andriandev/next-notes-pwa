import { useState } from 'react';
import Link from 'next/link';
import { siteTitle } from '@/config/setting';
import ActiveLink from '@/components/shared/active-link';
import { getAllNavItem } from '@/config/nav-items';
import { CloseIcon, MenuIcon } from '@/components/shared/icons';

function Header() {
  const [collapse, setCollapse] = useState(false);
  const NAV_ITEMS = getAllNavItem();

  const handleClick = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
        aria-label="Main navigation"
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            {siteTitle()}
          </Link>
          <div
            className="navbar-toggler p-0 border-0"
            type="button"
            id="navbarSideCollapse"
            aria-label="Toggle navigation"
            onClick={handleClick}
          >
            {collapse ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div
            className={`navbar-collapse offcanvas-collapse${
              collapse ? ' open' : ''
            }`}
            id="navbarsExampleDefault"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {NAV_ITEMS.map((item, i) => (
                <li className="nav-item" onClick={handleClick} key={i}>
                  <ActiveLink
                    href={item.link}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {item.title}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
