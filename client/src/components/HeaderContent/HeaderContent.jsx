import React from 'react';
import { Button, Switch } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './headerContentStyles.css';
import { useNavigate } from 'react-router-dom';

function HeaderContent({ sideMenuCollapsed, displaySideMenu, switchMode, setSwitchMode }) {
  const navigate = useNavigate();
  const onChange = (checked) =>{
    if(checked){
      setSwitchMode();
      navigate('mis-anuncios');
    }else{
      setSwitchMode();
      navigate('/');
    }
  }
  return (
    <div className="header-container">
      <div>
        <Button
          className="header__menu-btn--inactive"
          type="primary"
          onClick={displaySideMenu}>
          {sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="title-web-site-container">
        <h1>Sistema de Alquileres</h1>
      </div>
      <div className="switch-mode-container">
        <Switch
          className="switch-mode"
          onChange={onChange}
          checkedChildren="Anfitrión"
          unCheckedChildren="Huésped"
        />
      </div>
    </div>
  );
}

export default HeaderContent;