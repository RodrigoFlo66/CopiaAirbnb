import React, { useState } from 'react';
import { Button, Divider, InputNumber, Modal, Popover, Select, Slider, DatePicker, Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEarthAmericas, faBuildingUser, faPersonWalkingLuggage, faSliders } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import './adsFilterModalStyles.css';

function AdsFilterModal({ selectedCountry, handleCountryChange, countries, selectedCity, cities, handleCityChange, dateRange, handleDateRangeChange, guestsCount, handleGuestsCountChange, priceRange, marks, handlePriceRangeChange, handleResetFilters, residences, filteredResidences, setFilteredResidences,search,handleSearchChange,onSearch }) {
  const { RangePicker } = DatePicker;
  const { Search } = Input;
  const [filterModal, setFilterModal] = useState(false);
  const openFilterModal = () => {
    setFilterModal(true);
  }

  const closeFilterModal = () => {
    setFilterModal(false);
  }
  return (
    <div className="display-ads-filter-modal">
      <div className="btnAdsFilterModal">
        <Button onClick={openFilterModal}><FontAwesomeIcon icon={faSliders} /></Button>
      </div>
      <Modal
        className="modal-filter-ads"
        open={filterModal}
        onCancel={closeFilterModal}
        footer={null}
        destroyOnClose="true"
        closable={false}
        maskClosable={false}
      >
        <div className="modal-filter-ads-container">
          <Divider className="divider">Busque anuncio(s)</Divider>
          <Search
            className="modal-search-keyword"
            placeholder="Ingrese palabra clave"
            value={search}
            onChange={handleSearchChange}
            onSearch={onSearch}
            allowClear
          >

          </Search>
          <Divider className="divider">Seleccione un País</Divider>
          <Select
            className="modal-filter-country"
            placeholder={
              <>
                <FontAwesomeIcon icon={faGlobe} /> <span>País</span>
              </>
            }
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries.map(country => (
              <Option key={country}>{country}</Option>
            ))}
          </Select>
          <Divider className="divider">Seleccione una Ciudad</Divider>
          <Select
            className="modal-filter-city"
            placeholder={
              <>
                <FontAwesomeIcon icon={faEarthAmericas} /> <span>Ciudad</span>
              </>
            }
            value={selectedCity}
            onChange={handleCityChange}
          >
            {cities.map(city => (
              <Option key={city} value={city}>{city}</Option>
            ))}
          </Select>
          <Divider className="divider">Seleccione las fechas de su llegada y salida</Divider>
          <RangePicker
            className="modal-filter-range-dates"
            placeholder={["Llegada", "Salida"]}
            superNextIcon={<FontAwesomeIcon icon={faPersonWalkingLuggage} />}
            superPrevIcon={<FontAwesomeIcon icon={faPersonWalkingLuggage} />}
            value={dateRange}
            onChange={handleDateRangeChange}
            disabledDate={(current) => {
              return dayjs().add(-1, 'days') >= current;
            }}
          />
          <Divider className="divider">Ingrese la cantidad de huéspedes</Divider>
          <InputNumber
            className="modal-filter-count-guest"
            placeholder="Huéspedes"
            prefix={<FontAwesomeIcon icon={faBuildingUser} style={{ color: '#BFBFBF' }} />}
            value={guestsCount}
            type='number'
            min={1}
            max={10}
            onChange={handleGuestsCountChange}
          />
          <Divider className="divider">Ingrese el rango de precios</Divider>

          <Popover
            content={
              <div style={{ textAlign: 'center' }}>
                Rango de Precios: <span style={{ fontWeight: '600' }}>{priceRange[0]} (Bs.)  ⇀ {priceRange[1]} (Bs.) </span>
              </div>
            }
            trigger="hover"
            placement="bottom"
          >
            <div className="modal-filter-range-price-container">
              {/*  <div>Precio (Bs): {priceRange[0]} &mdash; {priceRange[1]}</div> */}
              <Slider
                value={priceRange}
                range
                marks={marks}
                min={0}
                max={10000}
                step={100}
                defaultValue={priceRange}
                onChange={handlePriceRangeChange}
                tooltip={{ open: false }}
              />
            </div>
          </Popover>
          <Divider className="divider-without-text" />
          <div className="btns-filter-modal-container">
            <Button
              type="primary"
              onClick={closeFilterModal}
            >
              Mostrar {filteredResidences.filter(residence => residence.estado_residencia === "Publicado" || residence.estado_residencia === "Alquilado" || residence.estado_residencia === "Pausado").length}  Lugares
            </Button>

            <Button
              type="default"
              onClick={handleResetFilters}
            >
              <FilterOutlined /> Restablecer Búsqueda
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdsFilterModal