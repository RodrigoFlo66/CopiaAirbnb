import { Form, Select, DatePicker, Button, Modal, List, InputNumber } from 'antd'

import dayjs from 'dayjs'
import { useState } from 'react'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
 
import './filtercontent.css'
const collSelect = (arr) => {
  return arr.map((item) => ({label: item, value: item}))
}
const countryToCities = {
  Bolivia: ["La Paz", "Oruro", "Potosí", "Chuquisaca", "Cochabamba", "Tarija", "Santa Cruz", "Beni", "Pando"],
  Perú: ["Amazonas", "Arequipa", "Ayacucho", "Cusco", "Junin", "Puno", "San Martín", "Piura", "Tacna", "Lima"],
  Chile: ["Santiago de Chile", "Iquique", "Antofagasta", "Valparaíso", "Concepción", "Temuco", "Punta Arenas"]
}
const FilterContent = ({ setFiltros }) => {

  const [ selectedPais, setSelectedPais ] = useState(null)
  const [ selectedCiudad, setSelectedCiudad ] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [ dateSelected, setDateSelected] = useState({
    inicio: '',
    final: ''
  })

  const [ precios, setPrecios ] = useState({
    min: 0,
    max: 0
  })
  const [ edades, setEdades ] = useState([
    {
      title: 'Adultos',
      subtitle: 'Edad: 13 años o más',
      count: 0
    },
    {
      title: 'Niños',
      subtitle: 'De 2 a 12 años',
      count: 0
    },
    {
      title: 'Bebés',
      subtitle: 'Menos de 2 años',
      count: 0
    },
    {
      title: 'Macotas',
      subtitle: 'perros, gatos, etc...',
      count: 0
    }
  ])

  const { RangePicker } = DatePicker

  const handleDateChange = (values) => {
    const [ i, f ] = values
    setDateSelected((state) => ({
      ...state,
      inicio: `${i.$y}-${i.$M}-${i.$D}`,
      final: `${f.$y}-${f.$M}-${f.$D}`
    }))
  }

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setEdades((state) => state.map(item => ({...item, count: 0})))
  }

  const onChangeContador = (titulo, restar = false) => {
    const nuevoEdades = [...edades];
    const objetoEncontrado = nuevoEdades.find(item => item.title === titulo);

    if (objetoEncontrado) {
      if(restar){
        if(objetoEncontrado.count >= 1){
          objetoEncontrado.count -= 1
        }
      }else{
        objetoEncontrado.count += 1
      }
      setEdades(nuevoEdades)
    }
  }

  const onFilter = () => {
    const lugar = {
      pais: selectedPais,
      ciudad: selectedCiudad
    }

    setFiltros({
      lugar,
      ragoData: dateSelected,
      personas: edades,
      ragoPrecio: precios 
    })
  }

  return(
    <>
      <div className='filters-content'>
        <div className='add-label'>
          <label>Seleccionar Pais</label>
          <Select
            showSearch
            placeholder="Seleccionar Pais"
            optionFilterProp="children"
            onChange={setSelectedPais}
            onSearch={() => {}}
            filterOption={filterOption}
            options={collSelect(Object.keys(countryToCities))}
          />
        </div>

        {
          selectedPais && (
            <div className='add-label'>
              <label>Seleccionar Ciudad</label>
              <Select
                showSearch
                placeholder="Seleccionar ciudad"
                optionFilterProp="children"
                onChange={setSelectedCiudad}
                onSearch={() => {}}
                filterOption={filterOption}
                options={collSelect(countryToCities[selectedPais])}
              />
            </div>
          )
        }

        <div className='add-label range-dates'>
          <label>Rango de fechas</label>
          <Form.Item
            name="rangeDates"
          >
            <RangePicker
              className="range-picker-edit-form"
              placeholder={['Fecha Inicio', 'Fecha Fin']}
              onChange={handleDateChange}
              disabledDate={(current) => {
                return dayjs().add(-1, 'days') >= current;
              }}
            />
          </Form.Item>
        </div>

        <div className='add-label'>
          <label>Cantidad de personas</label>
          <Button type="default" onClick={() => setIsModalOpen(true)}>
            Quien
          </Button>
        </div>
        <Modal 
          title="Quien" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
        >
          <List
            dataSource={edades}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <List.Item.Meta
                  title={item.title}
                  description={item.subtitle}
                />
                <div className='icons-change-count'>
                  {
                    item.count != 0 && 
                    <MinusCircleOutlined className='icon' onClick={() => onChangeContador(item.title, true)} />
                  }
                  <span className='value'>{item.count}</span>
                  <PlusCircleOutlined className='icon' onClick={() => onChangeContador(item.title)} />
                </div>
              </List.Item>
            )}
          />
        </Modal>

        <div className='add-label'>
          <label>Rango de precios</label>
          <div>
            <InputNumber
              name='min'
              value={precios.min}
              onChange={(value) => setPrecios({...precios, min: value})}
            />
            <InputNumber
              name='max'
              value={precios.max}
              onChange={(value) => setPrecios({...precios, max: value})}
            />
          </div>
        </div>
      </div>

      <Button className='btn-send' type="primary" onClick={onFilter}>
        Filtrar Cards
      </Button>
    </>
  )
}

export default FilterContent
