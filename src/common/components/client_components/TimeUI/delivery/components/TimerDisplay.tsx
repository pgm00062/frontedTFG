'use client'
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import type { TimerDisplayProps } from '../interface';

const { Text } = Typography;

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  isActive, 
  startTime, 
  totalTime 
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && startTime) {
      // Calcular tiempo desde que empezó la sesión actual
      const startTimestamp = new Date(startTime).getTime();
      
      const updateTime = () => {
        const now = Date.now();
        const sessionTime = Math.floor((now - startTimestamp) / 1000);
        setCurrentTime(totalTime + sessionTime);
      };

      updateTime(); // Actualizar inmediatamente
      interval = setInterval(updateTime, 1000);
    } else {
      setCurrentTime(totalTime);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, startTime, totalTime]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Text 
        strong 
        style={{ 
          fontSize: 18, 
          color: isActive ? '#52c41a' : '#666',
          fontFamily: 'monospace'
        }}
      >
        {formatTime(currentTime)}
      </Text>
      <div>
        <Text 
          type="secondary" 
          style={{ fontSize: 12 }}
        >
          {isActive ? 'En progreso' : 'Total acumulado'}
        </Text>
      </div>
    </div>
  );
};

export default TimerDisplay;
