'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons'
import type { ProjectSearchProps } from '../interface'

const { Search } = Input

export default function ProjectSearch({ onSearch, initialSearchTerm }: ProjectSearchProps) {
  const [searchValue, setSearchValue] = useState(initialSearchTerm || '')

  useEffect(() => {
    setSearchValue(initialSearchTerm || '')
  }, [initialSearchTerm])

  const handleSearch = useCallback(async (value: string) => {
    await onSearch(value.trim())
  }, [onSearch])

  const clearSearch = () => {
    setSearchValue('')
    handleSearch('')
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Search
          placeholder="Buscar proyectos por nombre..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          style={{ flex: 1 }}
        />
        {searchValue && (
          <Button 
            icon={<ClearOutlined />} 
            onClick={clearSearch}
            size="large"
          >
            Limpiar
          </Button>
        )}
      </div>
    </div>
  )
}
