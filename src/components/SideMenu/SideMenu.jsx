import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, Button, Avatar, Tooltip } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, FormOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/authContext';
import Logo from '../Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import './SideMenuStyles.css';

function SideMenu({ sideMenuCollapsed, displaySideMenu, switchMode, setSwitchMode }) {

  const itemsGuest = [
    { key: "/", label: (<Link to="/" onClick={!sideMenuCollapsed ? displaySideMenu : null}>Home</Link>), icon: <HomeOutlined /> },
    { key: "mis-reservas", label: (<Link to="mis-reservas" onClick={!sideMenuCollapsed ? displaySideMenu : null}>Mis Reservas</Link>), icon: <FontAwesomeIcon icon={faCalendarCheck} /> },
  ];

  const itemsHost = [
    { key: "aniadir-anuncio", label: (<Link to="aniadir-anuncio" onClick={!sideMenuCollapsed ? displaySideMenu : null}>Añadir Anuncio</Link>), icon: <FormOutlined /> },
    { key: "mis-anuncios", label: (<Link to="mis-anuncios" onClick={!sideMenuCollapsed ? displaySideMenu : null}>Mis Anuncios</Link>), icon: <FontAwesomeIcon icon={faAddressBook} /> },
    { key: "myRents", label: (<Link to="myRents" onClick={!sideMenuCollapsed ? displaySideMenu : null}>Mis Reservas</Link>), icon: <FontAwesomeIcon icon={faCalendarCheck} /> }
  ];

  const location = useLocation();
  const currentRoute = location.pathname;

  const { logout, user } = useAuth();
  // Eliminar la key seleccionada del almacenamiento local del navegador cada vez que se inicia la pagina
  localStorage.removeItem("selectedTab");

  // Obtener la key seleccionada del almacenamiento local del navegador
  const [selectedTab, setSelectedTab] = useState(localStorage.getItem("selectedTab") || currentRoute);
  localStorage.setItem("selectedTab", selectedTab);
  // Actualizar la key seleccionada en el almacenamiento local del navegador

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <div className={`side-menu-container ${sideMenuCollapsed ? "side-menu-container--collapsed" : ""}`}>
      <div className='button-logo-container'>
        <Button
          className="side-menu__menu-btn--active"
          onClick={displaySideMenu}>
          {sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {sideMenuCollapsed ? null : <Logo />}
      </div>
      <hr />
      <Menu
        className="side-menu__menu-items"
        theme="dark"
        items={switchMode ? itemsHost : itemsGuest}
        onClick={(e) => setSelectedTab(e.key)}
        defaultSelectedKeys={[selectedTab]}
        mode="inline"
      />
      <div className="user-info">
        {sideMenuCollapsed
          ?
          <Link to={`/usuario/${user.uid}`}>
            <Avatar
              src={user.photoURL}
              alt={<UserOutlined />}
              size={50}
            />
          </Link>
          :
          <>
            <div className="avatar-username-container">
              <div>
                <Link to={`/usuario/${user.uid}`}>
                  <Avatar
                    src={user.photoURL}
                    alt={<UserOutlined />}
                    size={50}
                  />
                </Link>
              </div>
              <div className="username-container">
                <h3>{user.displayName}</h3>
              </div>
            </div>
            <div className="email-container">
              <h4>{user.email}</h4>
            </div>
          </>
        }
        <Tooltip title="Cerrar Sesión" arrow={false} placement="right">
          <Button type="primary" onClick={() => { logout() }}>
            {sideMenuCollapsed
              ? <LogoutOutlined />
              :
              <div className="btn-logout">
                <LogoutOutlined /> Cerrar Sesión
              </div>
            }
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};


export default SideMenu;
