import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker, message, Divider, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { getImagesByResidence, getOneResidence, updateResidence } from '../../services/residences';
import UploadComponent from '../RentalForm/UploadComponent';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";
import "./editRentalFormStyles.css"
import { getRentalsByResidence } from '../../services/rentals';

function EditRentalForm() {
  let { idMyAd } = useParams();
  const navigate = useNavigate();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [dataAd, setDataAd] = useState([]);
  const [imgsResidence, setImgsResidence] = useState([]);
  const [form] = Form.useForm();
  const [isAtLeastFiveChecked, setIsAtLeastFiveChecked] = useState(false);
  const [rangeDatesBody, setRangeDatesBody] = useState([null, null]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stateAd, setStateAd] = useState("");
  const [rentals, setRentals] = useState([]);
  const [pauseDates, setPauseDates] = useState([]);
  const setImageUploaded = (status) => {
    setIsImageUploaded(status)
  }
  const [editBody, setEditBody] = useState({
    /*     tituloResid: '',
        tipoResid: '',
        paisResid: '',
        ciudadResid: '',
        direcResid: '',
        camaResid: '',
        habitResid: '',
        banioResid: '',
        descripResid: '',
        huesMaxResid: '',
        diasMaxResid: '',
        diasMinResid: '',
        precioResid: '',
        checkInResid: '',
        checkOutResid: '',
        tipoAlojam: '',
        wifi: '',
        lavadora: '',
        cocina: '',
        televisor: '',
        aireAcond: '',
        psicina: '',
        jacuzzi: '',
        estacionamiento: '',
        gim: '',
        parrilla: '',
        camaras: '',
        detectorHumo: '',
        estado: '',
        fechaIniEst: '',
        fechaFinEst: '',
        imagen: urls */
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBody({ ...editBody, [name]: value });
  }

  const handleSelectChange = (value, name) => {
    if (name === "tipoAlojam") {
      setEditBody({ ...editBody, [name]: value });
    } else if (name === "tipoResid") {
      setEditBody({ ...editBody, [name]: value });
    } else if (name === "estadoAnuncio") {
      setEditBody({ ...editBody, ["estado"]: value });
    } else if (name === "paisResid") {
      setEditBody({ ...editBody, [name]: value, ciudadResid: null });
    } else if (name === "ciudadResid") {
      setEditBody({ ...editBody, [name]: value });
    }
  }

  const handleCheckedChange = (name) => {
    setEditBody((prevEditBody) => {
      const updatedEditBody = {
        ...prevEditBody,
        [name]: prevEditBody[name] === "true" ? "false" : "true",
      };
      const atLeastFiveChecked = Object.values(updatedEditBody).filter(((value) => value === "true")).length >= 5; //Object.values(updatedEditBody).some((value) => value === "true");
      setIsAtLeastFiveChecked(atLeastFiveChecked);
      return updatedEditBody;
    });
  };


  const handleDateChange = (dates) => {
    const [initialDate, finalDate] = dates;
    const rangeDatesFormat = [dayjs(initialDate, 'YYYY-MM-DD'), dayjs(finalDate, 'YYYY-MM-DD')]
    setEditBody((prevEditBody) => {
      const updatedEditBody = {
        ...prevEditBody, rangeDates: rangeDatesFormat,
      }
      setRangeDatesBody(updatedEditBody.rangeDates);
      setSelectedStartDate(updatedEditBody.rangeDates[0]);
      setSelectedEndDate(updatedEditBody.rangeDates[1]);
      return updatedEditBody;
    })
  };

  const countryToCities = {
    Bolivia: ["La Paz", "Oruro", "Potosí", "Chuquisaca", "Cochabamba", "Tarija", "Santa Cruz", "Beni", "Pando"],
    Perú: ["Amazonas", "Arequipa", "Ayacucho", "Cusco", "Junin", "Puno", "San Martín", "Piura", "Tacna", "Lima"],
    Chile: ["Santiago de Chile", "Iquique", "Antofagasta", "Valparaíso", "Concepción", "Temuco", "Punta Arenas"]
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOneResidence(idMyAd);
      console.log(data);
      setDataAd(data);
      setPauseDates(data.fechas_pausado);
      setLoading(false);
    }
    fetchData();
  }, [idMyAd])



  useEffect(() => {
    const fetchImgs = async () => {
      const data = await getImagesByResidence(idMyAd);
      setUrls(data);
      setFileList(data.map((imagen, index) => ({
        uid: `-1-${index}`,
        name: `File ${index}`,
        status: 'done',
        url: imagen.imagen_residencia,
      }))
      )
    }
    setIsImageUploaded(true);
    setLoading(false);
    fetchImgs();
  }, [idMyAd]);

  useEffect(() => {
    setEditBody({
      tituloResid: dataAd.titulo_residencia,
      tipoResid: dataAd.tipo_residencia,
      paisResid: dataAd.pais_residencia,
      ciudadResid: dataAd.ciudad_residencia,
      direcResid: dataAd.direccion_residencia,
      camaResid: dataAd.cama_residencia,
      habitResid: dataAd.habitacion_residencia,
      banioResid: dataAd.banio_residencia,
      descripResid: dataAd.descripcion_residencia,
      huesMaxResid: dataAd.huesped_max_residencia,
      diasMaxResid: dataAd.dias_max_residencia,
      precioResid: dataAd.precio_residencia,
      checkInResid: dataAd.check_in_residencia,
      checkOutResid: dataAd.check_out_residencia,
      tipoAlojam: dataAd.tipo_alojamiento,
      telefono: dataAd.telefono_usuario,
      ubicacion: dataAd.ubicacion_residencia,
      wifi: dataAd.wifi_residencia,
      lavadora: dataAd.lavadora_residencia,
      cocina: dataAd.cocina_residencia,
      televisor: dataAd.televisor_residencia,
      aireAcond: dataAd.aire_acond_residencia,
      psicina: dataAd.psicina_residencia,
      jacuzzi: dataAd.jacuzzi_residencia,
      estacionamiento: dataAd.estacionamiento_residencia,
      gim: dataAd.gimnasio_residencia,
      parrilla: dataAd.parrilla_residencia,
      camaras: dataAd.camaras_segurid_residencia,
      detectorHumo: dataAd.humo_segurid_residencia,
      estado: dataAd.estado_residencia,
      fechaIniEst: dataAd.fecha_inicio_publicado,
      fechaFinEst: dataAd.fecha_fin_publicado,
      imagen: urls,
      rangeDates: [dayjs(dataAd.fecha_inicio_publicado), dayjs(dataAd.fecha_fin_publicado)],
    })
    setIsAtLeastFiveChecked(true);
  }, [dataAd, urls]);

  useEffect(() => {
    form.setFieldsValue(editBody);
    setStateAd(editBody.estado);
    setLoading(false);
  }, [editBody]);

  const onFinish = async () => {
    try {
      if (stateAd === "Inactivo") {
        editBody.fechaIniEst = null;
        editBody.fechaFinEst = null;
      } else if ((rangeDatesBody[0] && rangeDatesBody[1]) !== null) {
        editBody.fechaIniEst = rangeDatesBody[0];
        editBody.fechaFinEst = rangeDatesBody[1];
      }
      delete editBody.rangeDates;
      await updateResidence(editBody, idMyAd);
      navigate("/mis-anuncios");
      message.success("Modificación exitosa!");
    } catch (error) {
      message.error("Algo salió mal. Inténtelo más tarde");
    }
  };

  const onCancel = () => {
    navigate("/mis-anuncios");
    message.info("No se realizó ninguna modificación", 2);
  }


  useEffect(() => {
    getRentalsByResidence(idMyAd).then((data) => {
      setRentals(data);
      setLoading(false);
    })

  }, [idMyAd])

  const isDateDisabled = (current) => { //current es un dia del calendario, esta funcion se ejecuta por cada dia y evalua si debe estar deshabilitado
    const startDate = dayjs(dataAd.fecha_inicio_publicado);
    
    let endDate;
    if(stateAd==="Publicado"){
      endDate = dayjs(dataAd.fecha_fin_publicado).add(1000, 'day')
    }else if(stateAd==="Pausado"){
      endDate = dayjs(dataAd.fecha_fin_publicado).add(1, 'day')
    } // Se incrementa un dia para asegurar que la fecha final este incluida o habilitada
    const actualDate = dayjs();

    // booleano que determina si el current esta dentro de algun rango de reserva
    const isWithinReservationRange = rentals.some((rental) => { // Verifica si al menos un elemento del arreglo de objetos rentals cumple con cierta condicion
      const startPrevRental = dayjs(rental.fecha_inicio_reserva);
      const endPrevRental = dayjs(rental.fecha_fin_reserva).add(1, 'day'); // Se incrementa un dia para asegurar que la fecha final este incluida

      return (current.isAfter(startPrevRental) || current.isSame(startPrevRental)) && (current.isBefore(endPrevRental) || current.isSame(endPrevRental)); // Retorna true si la fecha_inicio_reserva se encuentra antes  o igual que el current y la fecha_fin_reserva se encuentra despues o igual que el current
    });

    const isWithinPauseRange = pauseDates.some((pause) => { // Verifica si al menos un elemento del arreglo de objetos rentals cumple con cierta condicion
      
      if(pause[0] && pause[1]){
        const startPrevPause = dayjs(pause[0]);
        const endPrevPause = dayjs(pause[1]).add(1, 'day'); // Se incrementa un dia para asegurar que la fecha final este incluida
        
        return (current.isAfter(startPrevPause) || current.isSame(startPrevPause)) && (current.isBefore(endPrevPause) || current.isSame(endPrevPause)); // Retorna true si la fecha_inicio_reserva se encuentra antes  o igual que el current y la fecha_fin_reserva se encuentra despues o igual que el current
      }
      
    });

    // Entra al condicional cuando el usuario selecciona una fecha de inicio 
    if (selectedStartDate !== null) {
      const nextReservation = rentals.reduce((accumulator, rental) => { // Devuelve una fecha de inicio de la reservacion mas cercana, el reduce acumula segun la condicion
        const startRental = dayjs(rental.fecha_inicio_reserva);
        if (startRental.isAfter(selectedStartDate) && startRental.isBefore(accumulator)) {
          return startRental;
        }
        return accumulator;
      }, dayjs().add(1000, 'years'));// Valor inicial del acumulador, que representa una fecha futura muy lejana, se utiliza para garantizar que cualquier fecha futura sea considerada mas cercana que la fecha inicial ficticia

      const nextPause = pauseDates.reduce((accumulator, pause) => {
        const startPause = dayjs(pause[0]);
        if (startPause.isAfter(selectedStartDate) && startPause.isBefore(accumulator)) {
          return startPause;
        }
        return accumulator;
      }, dayjs().add(1000, 'years'));

      let limitDate;
      if(nextPause.isBefore(nextReservation)){
        limitDate = nextPause;
      }else{
        limitDate = nextReservation;
      }

      // const limitDate = nextReservation; // El limite de la fecha fin cuando se selecciona una fecha de inicio será la fecha inicio de la reserva mas cercana si la fecha maxima esta antes de la reservacion mas cercana, caso contrario el limite de la fecha fin será la fecha maxima que el usuario pueda seleccionar
      //Determina si una fecha (current) está deshabilitada o no
      if (selectedStartDate.isBefore(limitDate) || selectedStartDate.isSame(limitDate)) { // Si la fecha limite que es la reserva mas cercana o la fecha maxima permitida por el host es menor o igual a la fecha final del anuncio, significa que hay disponibilidad
        return current.isBefore(selectedStartDate) || current.isAfter(limitDate) || isWithinReservationRange || isWithinPauseRange; // Evalua si la fecha actual es anterior a la fecha de inicio seleccionada ||  Evalua si la fecha actual es posterior a la fecha limite (reserva mas cercana o fecha maxima permitida por el host)  || Evalua si la fecha actual esta dentro de alguna de las reservas existentes
      } else {
        return current.isBefore(selectedStartDate) || current.isAfter(endDate) || isWithinReservationRange || isWithinPauseRange; // Evalua si la fecha actual es anterior a la fecha de inicio seleccionada ||  Evalua si la fecha actual es posterior a la fecha limite del anuncio (reserva mas cercana o fecha maxima permitida por el host)  || Evalua si la fecha actual esta dentro de alguna de las reservas existentes
      }
    }

    // Determina las fechas deshabilitadas al abrir el calendario de reserva
    if (startDate && endDate) {
      return (
        // (current.isBefore(actualDate, 'day') || isWithinReservationRange)
        (current.isBefore(startDate, 'day') || current.isAfter(endDate)) || isWithinReservationRange || isWithinPauseRange
      );
    }

    return false; // Habilita las fechas que no se hayan considerado en los condicionales
  }

  return (
    <Spin spinning={loading} tip="Cargando...">
      <div className="edit-form-container">
        <h2><FontAwesomeIcon icon={faScrewdriverWrench} /> Edite su anuncio</h2>
        <Divider />
        <Form
          name="formularioEdicion"
          labelCol={{ xs: 14, sm: 8, md: 11, lg: 11, xl: 10, xxl: 11 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <div className="flex-container-col-1-2-edit-form">
            <div className='col-1-edit-form'>
              <Form.Item
                label="Estado del anuncio"
                name="estado"
                rules={[{ required: true, message: 'Por favor, seleccione un estado del anuncio.' }]}

              >
                <Select
                  className="select"
                  placeholder="Seleccione el estado del anuncio"
                  onChange={(value) => handleSelectChange(value, "estadoAnuncio")}
                >
                  {
                    dataAd.estado_residencia === "Alquilado" ? (
                      <>
                        <Option value="Pausado"> Pausado </Option>
                        <Option value="Inactivo"> Inactivo </Option>
                      </>
                    ) : dataAd.estado_residencia === "Pausado" ? (
                      <>
                        <Option value="Pausado"> Pausado </Option>
                        <Option value="Inactivo"> Inactivo </Option>
                        <Option value="Publicado"> Publicado </Option>
                      </>
                    ) : dataAd.estado_residencia === "Inactivo" ? (
                      <>
                        <Option value="Inactivo"> Inactivo </Option>
                        <Option value="Pausado"> Pausado </Option>
                        <Option value="Publicado"> Publicado </Option>
                      </>
                    ) : (
                      <>
                        <Option value="Publicado"> Publicado </Option>
                        <Option value="Pausado"> Pausado </Option>
                        <Option value="Inactivo"> Inactivo </Option>
                      </>
                    )
                  }
                </Select>
              </Form.Item>
              <h3>Datos de la residencia</h3>
              <Form.Item
                name="tituloResid"
                label="Título de la Residencia"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "En Construcción") || (stateAd === "Previsualización") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el título de la residencia.',
                  }, {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject("Debe ingresar solo letras");
                        }
                      }
                    },
                  }, {
                    whitespace: true,
                    message: "No puede dejar en blanco este campo",
                  },
                  {
                    min: 10,
                    message: "Debe ingresar mínimo 10 caracteres",
                  },
                  {
                    max: 50,
                    message: "Solo puede ingresar 50 caracteres",
                  },
                ]
                }
                hasFeedback
              >
                <Input
                  name="tituloResid"
                  className='input'
                  placeholder="Introduce el título de la residencia"
                  showCount
                  minLength={10}
                  maxLength={50}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="telefono"
                label="Número de Whatsapp"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingrese su número de Whatsapp.'
                  }, {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.resolve();
                      }
                      const regularPhrase = /^\+?\d+$/;
                      const validLength = value.length >= 8 && value.length <= 15;
                      const validExtensions = ["+591", "+51", "+56"];
                      if (regularPhrase.test(value) && validLength) {
                        const isStartsWithValidExtension = validExtensions.some((extension) => value.startsWith(extension));
                        return isStartsWithValidExtension
                          ? Promise.resolve()
                          : Promise.reject("Por favor, ingrese la extensión de su país. Ej. +591...")
                      } else {
                        return Promise.reject("Por favor, ingrese un número de Whatsapp válido");
                      }
                    }
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="telefono"
                  className="input"
                  placeholder="Ingrese su número de Whatsapp (+591...)"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Descripción del Espacio"
                name="descripResid"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa una descripción del espacio.'
                  }, {
                    whitespace: true,
                    message: "No puede dejar en blanco este campo"
                  },
                ]}
                hasFeedback
              >
                <Input.TextArea
                  name="descripResid"
                  className='textArea'
                  placeholder="Ingresa una descripción del espacio"
                  showCount
                  maxLength={200}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="direcResid"
                label="Dirección"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa la dirección.'
                  }, {
                    whitespace: true,
                    message: "No puede dejar este espacio en blanco",
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="direcResid"
                  className='input'
                  placeholder="Ingresa la dirección de la residencia"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="ubicacion"
                label="Ubicación"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingrese un enlace de google maps.'
                  }, {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.resolve();
                      }
                      const regularPhrase = /^https:\/\/maps\.app\.goo\.gl\/.*$/;
                      if (regularPhrase.test(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Por favor, ingrese un enlace válido");
                      }
                    }
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="ubicacion"
                  className="input"
                  placeholder="https://www.google.com/maps/..."
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="paisResid"
                label="País"
                rules={[{ required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, seleccione su país.' }]
                }
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Seleccione su país"
                  options={Object.keys(countryToCities).map((country) => {
                    return {
                      label: `${country}`,
                      value: `${country}`,
                    };
                  })}
                  onChange={(value) => handleSelectChange(value, "paisResid")}
                >
                </Select>
              </Form.Item>

              <Form.Item
                name="ciudadResid"
                label="Ciudad"
                rules={[{ required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, seleccione su ciudad.' }]
                }
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Seleccione su ciudad"
                  options={
                    countryToCities[editBody.paisResid]?.map((city) => ({
                      label: `${city}`,
                      value: `${city}`
                    }))
                  }
                  onChange={(value) => handleSelectChange(value, "ciudadResid")}
                >
                </Select>
              </Form.Item>

              <Form.Item
                name="precioResid"
                label="Precio"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el precio de la residencia.'
                  }, {
                    validator: (_, value) =>
                      value && /^\d+$/.test(value) && parseInt(value, 10) <= 10000
                        ? Promise.resolve()
                        : Promise.reject(
                          new Error(
                            "Debe ingresar solo números y un valor igual o menor a 10,000"
                          )
                        ),
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="precioResid"
                  className="input"
                  placeholder="Ingresa el precio de la residencia"
                  type="number"
                  addonBefore="Bs"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="tipoResid"
                label="Tipo de Residencia"
                rules={[{ required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, seleccione el tipo de residencia.' }]
                }
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Seleccione el tipo de residencia"
                  onChange={(value) => handleSelectChange(value, "tipoResid")}
                >
                  <Option value="Casa">Casa</Option>
                  <Option value="Departamento">Departamento</Option>
                  <Option value="Habitacion">Habitacion</Option>
                  <Option value="Hotel">Hotel</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="tipoAlojam"
                label="Tipo de Alojamiento"
                rules={[{ required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, seleccione el tipo de alojamiento.' }]}
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Seleccione el tipo de alojamiento"
                  onChange={(value) => handleSelectChange(value, "tipoAlojam")}
                >
                  <Option value="Compartido">Compartido</Option>
                  <Option value="Entero">Entero</Option>
                </Select>
              </Form.Item>


              <Form.Item
                name="diasMaxResid"
                label="Número Máximo de dias"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el numero maximo de dias.'
                  }, {
                    validator: (_, value) => {
                      const max = 10; // Establece el valor máximo permitido aquí
                      if (value && parseInt(value, 10) <= max) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            `Debe ingresar solo números y un valor mayor a cero, pero no mayor que ${max} días`
                          )
                        );
                      }
                    },
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="diasMaxResid"
                  className='input'
                  placeholder="Ingresa el número máximo de dias"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="huesMaxResid"
                label="Número Máximo de Huéspedes"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el numero maximo de Huesped.'
                  }, {
                    validator: (_, value) => {
                      const max = 10; // Establece el valor máximo permitido aquí
                      if (value && parseInt(value, 10) <= max) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            `Debe ingresar solo números y un valor mayor a cero, pero no mayor que ${max}`
                          )
                        );
                      }
                    },
                  },
                ]
                }
                hasFeedback
              >
                <Input
                  name="huesMaxResid"
                  className='input'
                  placeholder="Ingresa el número máximo de huéspedes"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="camaResid"
                label="Número de Camas"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el número de camas.'
                  }, {
                    validator: (_, value) => {
                      const max = 100; // Establece el valor máximo permitido aquí
                      if (value && parseInt(value, 10) <= max) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            `Debe ingresar solo números, un valor mayor a cero y no mayor que ${max}.`
                          )
                        );
                      }
                    },
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="camaResid"
                  className='input'
                  placeholder="Ingresa el número de camas"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="habitResid"
                label="Número de Habitaciones"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el número de habitaciones.'
                  }, {
                    validator: (_, value) => {
                      const max = 100; // Establece el valor máximo permitido aquí
                      if (value && parseInt(value, 10) <= max) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            `Debe ingresar solo números, un valor mayor a cero y no mayor que ${max}.`
                          )
                        );
                      }
                    },
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="habitResid"
                  className='input'
                  placeholder="Ingresa el número de habitaciones"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="banioResid"
                label="Número de Baños"
                rules={[
                  {
                    required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingresa el número de baños.'
                  }, {
                    validator: (_, value) => {
                      const max = 10; // Establece el valor máximo permitido aquí
                      if (value && parseInt(value, 10) <= max) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            `Debe ingresar solo números, un valor mayor a cero y no mayor que ${max}.`
                          )
                        );
                      }
                    },
                  },
                ]}
                hasFeedback
              >
                <Input
                  name="banioResid"
                  className='input'
                  placeholder="Ingresa el número de baños"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

            </div>
            <div className="col-2-edit-form">
              <h3>Servicios</h3>
              <Form.Item
                name="servicios"
                label="Comodidades"
                rules={[
                  { required: ((stateAd === "Publicado") || (stateAd === "En Construcción") || (stateAd === "Previsualización") || (stateAd === "Pausado") || (stateAd === "Inactivo")) && !isAtLeastFiveChecked },
                  {
                    validator: (_, values) => {
                      if (isAtLeastFiveChecked) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                    }
                  }
                ]}
              >
                <div className="amenities-group">
                  <div className="amenities-row">
                    <Checkbox
                      value="wifi"
                      checked={editBody.wifi === "true"}
                      onChange={() => { handleCheckedChange("wifi") }}
                    >
                      Wi-Fi
                    </Checkbox>
                    <Checkbox
                      value="lavadora"
                      name="lavadora"
                      checked={editBody.lavadora === "true"}
                      onChange={() => { handleCheckedChange("lavadora") }}
                    >
                      Lavadora
                    </Checkbox>
                    <Checkbox
                      value="cocina"
                      name="cocina"
                      checked={editBody.cocina === "true"}
                      onChange={() => { handleCheckedChange("cocina") }}
                    >
                      Cocina
                    </Checkbox>
                    <Checkbox
                      value="aireAcond"
                      name="aireAcond"
                      checked={editBody.aireAcond === "true"}
                      onChange={() => { handleCheckedChange("aireAcond") }}
                    >
                      Aire Acondicionado
                    </Checkbox>
                    <Checkbox
                      value="televisor"
                      name="televisor"
                      checked={editBody.televisor === "true"}
                      onChange={() => { handleCheckedChange("televisor") }}
                    >
                      Televisor
                    </Checkbox>
                  </div>
                </div>

              </Form.Item>

              <Form.Item
                name="servicios"
                label="Caracteristicas"
                rules={[
                  { required: ((stateAd === "Publicado") || (stateAd === "En Construcción") || (stateAd === "Previsualización") || (stateAd === "Pausado") || (stateAd === "Inactivo")) && !isAtLeastFiveChecked },
                  {
                    validator: (_, values) => {
                      if (isAtLeastFiveChecked) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                    }
                  }
                ]}
              >
                <div className="amenities-group">
                  <div className="amenities-row">
                    <Checkbox
                      value="psicina"
                      name="psicina"
                      checked={editBody.psicina === "true"}
                      onChange={() => { handleCheckedChange("psicina") }}
                    >
                      Piscina
                    </Checkbox>
                    <Checkbox
                      value="jacuzzi"
                      name="jacuzzi"
                      checked={editBody.jacuzzi === "true"}
                      onChange={() => { handleCheckedChange("jacuzzi") }}
                    >
                      Jacuzzi
                    </Checkbox>
                    <Checkbox
                      value="estacionamiento"
                      name="estacionamiento"
                      checked={editBody.estacionamiento === "true"}
                      onChange={() => { handleCheckedChange("estacionamiento") }}
                    >
                      Estacionamiento
                    </Checkbox>
                    <Checkbox
                      value="gim"
                      name="gim"
                      checked={editBody.gim === "true"}
                      onChange={() => { handleCheckedChange("gim") }}
                    >
                      Gimnasio
                    </Checkbox>
                    <Checkbox
                      value="parrilla"
                      name="parrilla"
                      checked={editBody.parrilla === "true"}
                      onChange={() => { handleCheckedChange("parrilla") }}
                    >
                      Parrilla
                    </Checkbox>
                  </div>
                </div>

              </Form.Item>

              <Form.Item
                name="servicios"
                label="Seguridad"
                rules={[
                  { required: ((stateAd === "Publicado") || (stateAd === "En Construcción") || (stateAd === "Previsualización") || (stateAd === "Pausado") || (stateAd === "Inactivo")) && !isAtLeastFiveChecked },
                  {
                    validator: (_, values) => {
                      if (isAtLeastFiveChecked) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Por favor, seleccione al menos cinco servicios");
                      }
                    }
                  }
                ]}
              >
                <div className="amenities-group">
                  <div className="amenities-row">
                    <Checkbox
                      value="camaras"
                      name="camaras"
                      checked={editBody.camaras === "true"}
                      onChange={() => { handleCheckedChange("camaras") }}
                    >
                      Cámara de seguridad
                    </Checkbox>
                    <Checkbox
                      value="detectorHumo"
                      name="detectorHumo"
                      checked={editBody.detectorHumo === "true"}
                      onChange={() => { handleCheckedChange("detectorHumo") }}
                    >
                      Detector de humo
                    </Checkbox>
                  </div>
                </div>

              </Form.Item>

              {stateAd !== "En Construcción" && stateAd !== "Previsualización" && stateAd !== "Inactivo" && stateAd !== "Alquilado" ?
                (
                  <div className="dates-edit-form-container">
                    <h3>{stateAd === "Pausado"? "Fechas de duracion del pausado del anuncio":"Fechas de duracion del anuncio"}</h3>
                    <Form.Item
                      name="rangeDates"
                      label="Fechas Inicio/Fin"
                      rules={[
                        { required: ((stateAd === "Publicado") || (stateAd === "Pausado")), message: "" },
                        {
                          validator: (_, values) => {
                            if ((rangeDatesBody[0] && rangeDatesBody[1]) !== null) {
                              editBody.fechaIniEst = rangeDatesBody[0];
                              editBody.fechaFinEst = rangeDatesBody[1];
                              if ((editBody.fechaIniEst && editBody.fechaFinEst) !== null) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject("Por favor, seleccione fechas");
                              }
                            } else if ((editBody.fechaIniEst && editBody.fechaFinEst) !== null) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject("Por favor, seleccione fechas");
                            }

                          }
                        }
                      ]}
                      hasFeedback
                    >
                      <RangePicker
                        className="range-picker-edit-form"
                        placeholder={['Fecha Inicio', 'Fecha Fin']}
                        onChange={handleDateChange}
                        disabledDate={isDateDisabled}
                        onCalendarChange={(val) => { val ? setSelectedStartDate(val[0]) && setSelectedEndDate(val[1]) : null }}
                        onOpenChange={(open) => { if (open) { setSelectedStartDate(null); setSelectedEndDate(null) } }}
                        changeOnBlur
                      />
                    </Form.Item>
                  </div>
                ) : null
              }


              <div className="checkin-checkout-edit-form-container">
                <h3> Instrucciones de Check In y Check Out</h3>
                <Form.Item
                  name="checkInResid"
                  label="Check In"

                  rules={[
                    {
                      required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingrese las intrucciones de check-in.'
                    }, {
                      whitespace: true,
                      message: "No puede dejar en blanco este campo"
                    }
                  ]}
                  hasFeedback
                >
                  <Input.TextArea
                    name="checkInResid"
                    className='textArea'
                    placeholder="Ingresa las instrucciones de check-in"
                    showCount
                    maxLength={800}
                    autoSize={{ minRows: 9, maxRows: 9 }}
                    onChange={handleChange}

                  />
                </Form.Item>
                <Form.Item
                  name="checkOutResid"
                  label="Check Out"
                  rules={[
                    {
                      required: ((stateAd === "Publicado") || (stateAd === "Pausado") || (stateAd === "Inactivo")), message: 'Por favor, ingrese las instrucciones de check-out.'
                    }, {
                      whitespace: true,
                      message: "No puede dejar en blanco este campo"
                    }
                  ]}
                  hasFeedback
                >
                  <Input.TextArea
                    name="checkOutResid"
                    className='textArea'
                    placeholder="Ingrese las instrucciones de check-out"
                    showCount
                    maxLength={800}
                    autoSize={{ minRows: 9, maxRows: 9 }}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="imgs-edit-form-flex-container">
            <Form.Item
              name="imagen"
              rules={[
                { required: ((stateAd === "Publicado") || (stateAd === "En Construcción") || (stateAd === "Previsualización") || (stateAd === "Pausado") || (stateAd === "Inactivo")) && !isImageUploaded, message: "" },
                {
                  validator: (_, value) => {
                    if (isImageUploaded) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Por favor, suba minimamente 5 imágenes");
                    }
                  }
                }
              ]}
            >
              <UploadComponent
                urls={urls}
                setUrls={setUrls}
                fileList={fileList}
                setFileList={setFileList}
                setImageUploaded={setImageUploaded}
              />
            </Form.Item>
          </div>
          <Divider />
          <Form.Item>
            <div className="btns-edit-form-flex-container">
              <div>
                <Button type="primary" htmlType="submit" className="btn-save-changes">
                  Guardar Cambios
                </Button>
              </div>
              <div>
                <Button htmlType="button" onClick={onCancel} className="btn-cancel-changes">
                  Cancelar
                </Button>
              </div>
            </div>
          </Form.Item>

        </Form >
      </div >
    </Spin>
  );

}
export default EditRentalForm;
