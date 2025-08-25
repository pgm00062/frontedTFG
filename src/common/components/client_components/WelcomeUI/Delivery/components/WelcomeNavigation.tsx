'use client'
import React from 'react';
import { Menu } from 'antd';
import { 
  HomeOutlined, 
  ProjectOutlined, 
  FieldTimeOutlined, 
  BarChartOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';

interface WelcomeNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const WelcomeNavigation: React.FC<WelcomeNavigationProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    {
      key: 'inicio',
      icon: <HomeOutlined />,
      label: 'Inicio',
    },
    {
      key: 'proyectos',
      icon: <ProjectOutlined />,
      label: 'Proyectos',
    },
    {
      key: 'tiempo',
      icon: <FieldTimeOutlined />,
      label: 'Tiempo',
    },
    {
      key: 'estadisticas',
      icon: <BarChartOutlined />,
      label: 'Estadísticas',
    },
    {
      key: 'facturas',
      icon: <FileTextOutlined />,
      label: 'Facturas',
    },
  ];

  return (
    <div style={{ 
      width: '100%', 
      borderBottom: '1px solid #f0f0f0',
      marginBottom: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Menu
        mode="horizontal"
        selectedKeys={[activeTab]}
        onClick={({ key }) => onTabChange(key)}
        items={menuItems}
        style={{
          borderBottom: 'none',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          fontSize: '16px',
          fontWeight: 500,
        }}
      />
    </div>
  );
};

export default WelcomeNavigation;
