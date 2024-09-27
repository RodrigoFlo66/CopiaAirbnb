import React, { useEffect, useState } from 'react';
import { Select, DatePicker, InputNumber, Slider, Button, Divider, Popover, Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEarthAmericas, faBuildingUser, faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import AdsFilterModal from './AdsFilterModal';
import './adsFilterStyles.css';

function AdsFilter({ residences, filteredResidences, setFilteredResidences, countries, setCountries }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [guestsCount, setGuestsCount] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [search, setSearch] = useState("");
  const { RangePicker } = DatePicker;
  const { Search } = Input;
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    // Si la cadena de búsqueda está vacía, restablece las residencias filtradas
    if (value === "") {
      setFilteredResidences(residences);
    }
  }

  const onSearch = () => {
    // Obtén la cadena de búsqueda en minúsculas
    const searchLower = search.toLowerCase();

    // Filtra las residencias basadas en la cadena de búsqueda
    const searchResults = residences.filter((residence) => {
      // Convierte el título de la residencia a minúsculas para realizar una comparación insensible a mayúsculas y minúsculas
      const residenceTitleLower = residence.titulo_residencia.toLowerCase();

      // Verifica si la oración completa del título contiene la cadena de búsqueda
      return residenceTitleLower.includes(searchLower);
    });

    // Actualiza las residencias filtradas
    setFilteredResidences(searchResults);
  }



  const handleCountryChange = (value) => {
    setSelectedCountry(value); //Agrega el pais seleccionado al estado selectedCountry
    const citiesForCountry = [...new Set(residences.filter(residence => //Se crea una estructura Set (similar a un array pero elimina duplicados automaticamente)
      residence.pais_residencia === value).map(residence => // Se realiza una iteracion del estado residences que tiene todas las residencias registradas y se compara si el valor seleccionado es igual que pais de la bd
        residence.ciudad_residencia))]; //Luego, se realiza un mapeo de las ciudades del pais seleccionado.
    setCities(citiesForCountry); // Se copia el resultado del set, y se lo envuelve en un [] para manipularlo como un arreglo, y se guarda en el estado cities
    setFilteredResidences(residences.filter(residence => // Se realiza un mapeo de las residencias y se guarda en un arreglo solo los que cumplan con las condiciones, posteriormente se guarda en el estado local filteredResidences
      (!value || residence.pais_residencia === value) && // Si value es falsy (null, undefined, etc.) entonces toda la expresion en true, sino se evalua la segunda expresion residence.pais_residencia === value
      (!selectedCity || residence.ciudad_residencia === selectedCity) &&// Si value es falsy (null, undefined, etc.) entonces toda la expresion en true, sino se evalua la segunda expresion residence.ciudad_residencia === selectedCity
      (!dateRange || (
        (
          dateRange[0] >= dayjs(residence.fecha_inicio_publicado) &&
          dateRange[1] <= dayjs(residence.fecha_fin_publicado).add(1, 'day')
        ) &&
        !residence.fechas_renta.some(fechaRenta =>
          dayjs(dateRange[0]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD') && dayjs(dateRange[0]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') ||
          dayjs(dateRange[1]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') && dayjs(dateRange[1]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD')
        ))
      ) &&
      (!guestsCount || residence.huesped_max_residencia >= guestsCount) &&
      (!priceRange || ((priceRange[0] <= residence.precio_residencia) && (residence.precio_residencia <= priceRange[1])))
    ));
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setFilteredResidences(residences.filter(residence =>
      (!selectedCountry || residence.pais_residencia === selectedCountry) &&
      (!value || residence.ciudad_residencia === value) &&
      (!dateRange || (
        (
          dateRange[0] >= dayjs(residence.fecha_inicio_publicado) &&
          dateRange[1] <= dayjs(residence.fecha_fin_publicado).add(1, 'day')
        ) &&
        !residence.fechas_renta.some(fechaRenta =>
          dayjs(dateRange[0]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD') && dayjs(dateRange[0]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') ||
          dayjs(dateRange[1]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') && dayjs(dateRange[1]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD')
        ))
      ) &&
      (!guestsCount || residence.huesped_max_residencia >= guestsCount) &&
      (!priceRange || ((priceRange[0] <= residence.precio_residencia) && (residence.precio_residencia <= priceRange[1])))
    ));
  };


  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setFilteredResidences(residences.filter(residence =>
      (!selectedCountry || residence.pais_residencia === selectedCountry) &&
      (!selectedCity || residence.ciudad_residencia === selectedCity) &&
      (!dates || (
        (
          dates[0] >= dayjs(residence.fecha_inicio_publicado) &&
          dates[1] <= dayjs(residence.fecha_fin_publicado).add(1, 'day')
        ) &&
        // Utilizamos el método some para verificar si alguna de las fechas_renta coincide con el rango de fechas seleccionado uwu
        !residence.fechas_renta.some(fechaRenta =>
          dayjs(dates[0]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD') && dayjs(dates[0]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') ||
          dayjs(dates[1]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') && dayjs(dates[1]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD')
        ))
      ) &&
      (!guestsCount || residence.huesped_max_residencia >= guestsCount) &&
      (!priceRange || ((priceRange[0] <= residence.precio_residencia) && (residence.precio_residencia <= priceRange[1])))
    ));
  };

  const handleGuestsCountChange = (value) => {
    setGuestsCount(value);
    setFilteredResidences(residences.filter(residence =>
      (!selectedCountry || residence.pais_residencia === selectedCountry) &&
      (!selectedCity || residence.ciudad_residencia === selectedCity) &&
      (!dateRange || (
        (
          dateRange[0] >= dayjs(residence.fecha_inicio_publicado) &&
          dateRange[1] <= dayjs(residence.fecha_fin_publicado).add(1, 'day')
        ) &&
        !residence.fechas_renta.some(fechaRenta =>
          dayjs(dateRange[0]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD') && dayjs(dateRange[0]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') ||
          dayjs(dateRange[1]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') && dayjs(dateRange[1]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD')
        ))
      ) &&
      (!value || residence.huesped_max_residencia >= value) &&
      (!priceRange || priceRange[0] <= residence.precio_residencia && residence.precio_residencia <= priceRange[1])
    ));
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    setFilteredResidences(residences.filter(residence =>
      (!selectedCountry || residence.pais_residencia === selectedCountry) &&
      (!selectedCity || residence.ciudad_residencia === selectedCity) &&
      (!dateRange || (
        (
          dateRange[0] >= dayjs(residence.fecha_inicio_publicado) &&
          dateRange[1] <= dayjs(residence.fecha_fin_publicado).add(1, 'day')
        ) &&
        !residence.fechas_renta.some(fechaRenta =>
          dayjs(dateRange[0]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD') && dayjs(dateRange[0]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') ||
          dayjs(dateRange[1]).format('YYYY-MM-DD') <= dayjs(fechaRenta[1]).format('YYYY-MM-DD') && dayjs(dateRange[1]).format('YYYY-MM-DD') >= dayjs(fechaRenta[0]).format('YYYY-MM-DD')
        ))
      ) &&
      (!guestsCount || residence.huesped_max_residencia >= guestsCount) &&
      (value[0] <= residence.precio_residencia && residence.precio_residencia <= value[1])
    ));
  };

  const marks = {
    0: 'Bs.0',
    2000: '2000',
    4000: '4000',
    6000: '6000',
    8000: '8000',
    10000: 'Bs.10000',
  }

  const handleResetFilters = () => {
    setSelectedCountry(null);
    const uniqueCountries = [...new Set(residences.map(residence => residence.pais_residencia))];
    setCountries(uniqueCountries);
    setSelectedCity(null);
    setCities([]);
    setDateRange(null);
    setGuestsCount(null);
    setPriceRange([0, 10000]);
    setFilteredResidences(residences);
  };

  return (
    <>
      <AdsFilterModal
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        countries={countries}
        selectedCity={selectedCity}
        cities={cities}
        handleCityChange={handleCityChange}
        dateRange={dateRange}
        handleDateRangeChange={handleDateRangeChange}
        guestsCount={guestsCount}
        handleGuestsCountChange={handleGuestsCountChange}
        priceRange={priceRange}
        marks={marks}
        handlePriceRangeChange={handlePriceRangeChange}
        handleResetFilters={handleResetFilters}
        residences={residences}
        filteredResidences={filteredResidences}
        setFilteredResidences={setFilteredResidences}
        search={search}
        handleSearchChange={handleSearchChange}
        onSearch={onSearch}
      />
      <div className="display-filter-ads">
        <div className="filter-ads-container">
          <Search
            className="filter-search-keyword"
            placeholder="Buscar anuncio(s)"
            value={search}
            onChange={handleSearchChange}
            onSearch={onSearch}
            allowClear
          >

          </Search>
          <Divider type='vertical' />
          <Select
            className="filter-country"
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
          <Divider type='vertical' />
          <Select
            className="filter-city"
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

          <Divider type='vertical' />

          <RangePicker
            className="filter-range-dates"
            placeholder={["Llegada", "Salida"]}
            superNextIcon={<FontAwesomeIcon icon={faPersonWalkingLuggage} />}
            superPrevIcon={<FontAwesomeIcon icon={faPersonWalkingLuggage} />}
            value={dateRange}
            onChange={handleDateRangeChange}
            disabledDate={(current) => {
              return dayjs().add(-1, 'days') >= current;
            }}
          />
          <Divider type='vertical' />
          <InputNumber
            className="filter-count-guest"
            placeholder="Huéspedes"
            prefix={<FontAwesomeIcon icon={faBuildingUser} style={{ color: '#BFBFBF' }} />}
            value={guestsCount}
            type='number'
            min={1}
            max={10}
            onChange={handleGuestsCountChange}
          />
          <Divider type='vertical' />
          <Popover
            content={
              <div style={{ textAlign: 'center' }}>
                Rango de Precios: <span style={{ fontWeight: '600' }}>{priceRange[0]} (Bs.)  ⇀ {priceRange[1]} (Bs.) </span>
              </div>
            }
            trigger="hover"
            placement="bottom"
          >
            <div className="filter-range-price-container">
              {/*  <div className="range-price-selected">Precio (Bs): {priceRange[0]} &mdash; {priceRange[1]}</div> */}
              <Slider
                className="filter-range-price"
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
          <Divider type='vertical' />
          <Button
            className="btn-reset-filters"
            type="primary"
            onClick={handleResetFilters}
          >
            <FilterOutlined /><span className="btn-reset-filters-text">Restablecer</span>
          </Button>
        </div>
        <div className="places-count">
          <h3>Lugares ( {filteredResidences.filter(residence => residence.estado_residencia === "Publicado" || residence.estado_residencia === "Alquilado" || residence.estado_residencia === "Pausado").length} )</h3>
        </div>
      </div>
    </>
  )
}

export default AdsFilter