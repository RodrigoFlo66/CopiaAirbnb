import React from 'react'
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import PagesContainer from '../../components/PagesContainer/PagesContainer';
import './layoutBasicStyles.css'

function LayoutBasic() {
  const { Content } = Layout;
  return (
    <>
      <Layout className='layout-basic-container'>
        <Content className="layout-basic-content-container">
          <PagesContainer>
            <Outlet />
          </PagesContainer>
        </Content>
      </Layout>
    </>
  )
}

export default LayoutBasic