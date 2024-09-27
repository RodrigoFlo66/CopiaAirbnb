import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import SideMenu from '../../components/SideMenu/SideMenu';
import PagesContainer from '../../components/PagesContainer/PagesContainer';
import FooterContent from '../../components/FooterContent/FooterContent';
import Chatbot from '../../components/Chatbot/Chatbot';
import './layoutEzRentalStyles.css';


function LayoutEzRental() {
  const { Header, Content, Sider, Footer } = Layout;
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(true);
  const [switchMode, setIsSwitchMode] = useState(false);

  const displaySideMenu = () => {
    setSideMenuCollapsed(!sideMenuCollapsed);
  };

  const setSwitchMode = () => {
    setIsSwitchMode(!switchMode);
  }

  return (
    <Layout className="app-layout-container">
      <Sider className={`app-sider-container ${sideMenuCollapsed ? "app-sider-container--collapsed" : ""}`} collapsed={sideMenuCollapsed} width={'17%'} collapsedWidth={'70'}  >
        <SideMenu sideMenuCollapsed={sideMenuCollapsed} displaySideMenu={displaySideMenu} switchMode={switchMode} setSwitchMode={setSwitchMode}/>
      </Sider>
      <Layout /* onClick={!sideMenuCollapsed ? displaySideMenu: null} */>
        <Header className={sideMenuCollapsed?"app-header-container--collapsed": "app-header-container"}>
          <HeaderContent sideMenuCollapsed={sideMenuCollapsed} displaySideMenu={displaySideMenu} switchMode={switchMode} setSwitchMode={setSwitchMode}/>
        </Header>
        <Content className="app-content-container" >
          <PagesContainer>
            <Chatbot/>
            {/* 
              Contenido de las distintas vistas mediante rutas.
              El componente Outlet de react-router-dom funciona como un placeholder,
              en el que se reemplazá las distintas rutas declaradas en el componente
              principal App
            */}
            <Outlet />
          </PagesContainer>
        </Content>
        <Footer className="app-footer-container">
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};


export default LayoutEzRental;
