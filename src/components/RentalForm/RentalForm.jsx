import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Divider } from 'antd';
import UploadComponent from './UploadComponent';
import { useNavigate } from 'react-router-dom';
import { createResidence } from '../../services/residences';
import { useAuth } from '../../contexts/authContext';
import './rentalFormStyles.css';

function RentalForm() {
  const { Option } = Select;
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const setImageUploaded = (status) => {
    setIsImageUploaded(status)
  }

  const { user } = useAuth();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isAtLeastFiveChecked, setIsAtLeastFiveChecked] = useState(false);
  const [body, setBody] = useState({
    tituloResid: '',
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
    precioResid: '',
    checkInResid: '',
    checkOutResid: '',
    tipoAlojam: '',
    telefono:'',
    ubicacion:'',
    wifi: 'false',
    lavadora: 'false',
    cocina: 'false',
    televisor: 'false',
    aireAcond: 'false',
    psicina: 'false',
    jacuzzi: 'false',
    estacionamiento: 'false',
    gim: 'false',
    parrilla: 'false',
    camaras: 'false',
    detectorHumo: 'false',
    fechaIniciEst: null,
    fechaFinEst: null,
    imagen: urls,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value })
    // console.log(body);
  }

  const handleSelectChange = (value, name) => {
    if (name === "tipoAlojam") {
      setBody({ ...body, [name]: value });
    } else if (name === "tipoResid") {
      setBody({ ...body, [name]: value });
    } else if (name === "paisResid") {
      setBody({ ...body, [name]: value, ciudadResid: null });
    } else if (name === "ciudadResid") {
      setBody({ ...body, [name]: value });
    }
  };

  const handleCheckedChange = (name) => {
    setBody((prevBody) => {
      const updatedBody = {
        ...prevBody,
        [name]: prevBody[name] === "true" ? "false" : "true",
      };
      console.log(updatedBody);
      const atLeastFiveChecked = Object.values(updatedBody).filter(((value) => value === "true")).length >= 5; //Object.values(updatedEditBody).some((value) => value === "true");
      setIsAtLeastFiveChecked(atLeastFiveChecked);
      return updatedBody;
    });
  };

  const onFinish = async () => {
    // const formData = new FormData();
    // formData.append(body);
    console.log(body);
    try {
      await createResidence(body, user.uid).then(response => {

        if(response.data.data === 1){
          message.warning("El titulo de la residencia ya se encuentra registrado")
        }else{
          // await createResidence(body, 1);
          navigate('/mis-anuncios');
          message.success("Anuncio creado exitosamente!");
        }
      })
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue(body);
  }, [body]);
  
  const deleteFields = () => {
    form.resetFields();
    setBody({
      wifi: 'false',
      lavadora: 'false',
      cocina: 'false',
      televisor: 'false',
      aireAcond: 'false',
      psicina: 'false',
      jacuzzi: 'false',
      estacionamiento: 'false',
      gim: 'false',
      parrilla: 'false',
      camaras: 'false',
      detectorHumo: 'false'})
    setFileList([]);
    setUrls([]);
  }

  const countryToCities = {
    Bolivia: ["La Paz", "Oruro", "Potosí", "Chuquisaca", "Cochabamba", "Tarija", "Santa Cruz", "Beni", "Pando"],
    Perú: ["Amazonas", "Arequipa", "Ayacucho", "Cusco", "Junin", "Puno", "San Martín", "Piura", "Tacna", "Lima"],
    Chile: ["Santiago de Chile", "Iquique", "Antofagasta", "Valparaíso", "Concepción", "Temuco", "Punta Arenas"]
  };

  return (
    <div className="margen">
      <h1 className="form-title">Registro</h1>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        autoComplete='off'
      >
        <h3 className="subtitulos">Datos de la residencia</h3>
        <Form.Item
          label="Título de la Residencia"
          name="tituloResid"
          rules={[
            {
              validator: (_, value) => {
                if (value) {
                  if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Debe ingresar solo letras");
                  }
                }
              },
            },
            {
              required: true,
              message: "Por favor, ingresa el título de la residencia.",
            },
            {
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
          ]}
          hasFeedback
        >
          <Input
            className="inputsize"
            name="tituloResid"
            placeholder="Introduce el título de la residencia"
            onChange={handleChange}
            showCount
          />
        </Form.Item>

        <Form.Item
                name="telefono"
                label="Número de Whatsapp"
                rules={[
                    {
                    required: true,
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
                  className="inputsize"
                  placeholder="Ingrese su número de Whatsapp (+591...)"
                  onChange={handleChange}
                />
              </Form.Item>

        <Form.Item
          label="Precio"
          name="precioResid"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa el precio de la residencia.",
            },
            {
              validator: (_, value) => {
                
                const numericValue = parseInt(value, 10);
          
                if (numericValue < 0) {
                  return Promise.reject(new Error("El valor mínimo es 0."));
                }
          
                if (numericValue > 10000) {
                  return Promise.reject(new Error("El valor máximo es 10,000."));
                }
          
                return Promise.resolve();
              },
            },
          ]}
          
          hasFeedback
        >
          <Input
            className="inputsize"
            name="precioResid"
            placeholder="Ingresa el precio de la residencia"
            type="number"
            addonBefore="Bs"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="tipoResid"
          label="Tipo de Residencia"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona el tipo de residencia.",
            },
          ]}
          hasFeedback
        >
          <Select
            name="tipoResid"
            placeholder="Selecciona el tipo de residencia"
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
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de alojamiento.' }]}
          hasFeedback
        >
          <Select
            name="tipoAlojam"
            placeholder="Selecciona el tipo de alojamiento"
            onChange={(value) => handleSelectChange(value, "tipoAlojam")}
          >
            <Option value="Compartido">Compartido</Option>
            <Option value="Entero">Entero</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="huesMaxResid"
          label="Número Máximo de Huéspedes"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa el número máximo de huéspedes.",
            },
            {
              validator: (_, value) => {
                const max = 10; // Establece el valor máximo permitido aquí
                const numericValue = parseInt(value, 10)
          
                if (numericValue <= 0) {
                  return Promise.reject(new Error("El valor debe ser mayor a cero."));
                }
          
                if (numericValue > max) {
                  return Promise.reject(new Error(`El valor máximo permitido es ${max}.`));
                }
          
                return Promise.resolve();
              },
            },
          ]}
          
          hasFeedback
        >
          <Input
            className="inputsize"
            name="huesMaxResid"
            placeholder="Ingresa el número máximo de huéspedes"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="diasMaxResid"
          label="Número Máximo de dias"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa el número máximo de días.",
            },
            {
              validator: (_, value) => {
                const max = 10; // Establece el valor máximo permitido aquí
                if (value && value.match("^0*[1-9][0-9]*") && parseInt(value, 10) <= max) {
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
            className="inputsize"
            name="diasMaxResid"
            placeholder="Ingresa el número máximo de dias"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="paisResid"
          label="País"
          rules={[{ required: true, message: 'Por favor, selecciona el pais.' }]}
          hasFeedback
        >
          <Select

            placeholder="Selecciona tu país"
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
          rules={[{ required: true, message: 'Por favor, selecciona el pais.' }]}
          hasFeedback
        >
          <Select
            placeholder="Selecciona tu ciudad"
            value={body.ciudadResid}
            options={countryToCities[body.paisResid]?.map((city) => ({
              label: city,
              value: city,
            }))}
            onChange={(value) => handleSelectChange(value, "ciudadResid")}
          >
          </Select>
        </Form.Item>

        <Form.Item
          name="direcResid"
          label="Dirección"
          rules={[
            { required: true, message: "Por favor, ingresa la dirección." },
            {
              whitespace: true,
              message: "No puede dejar este espacio en blanco",
            },
          ]}
          hasFeedback
        >
          <Input
            className="inputsize"
            name="direcResid"
            placeholder="Ingresa la dirección de la residencia"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
                name="ubicacion"
                label="Ubicación"
                rules={[
                  {
                    required: true,
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
                  className="inputsize"
                  placeholder="https://www.google.com/maps/..."
                  onChange={handleChange}
                />
              </Form.Item>

        <Form.Item
          name="camaResid"
          label="Número de Camas"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa el número de camas.",
            },
            {
              validator: (_, value) => {
                const max = 100; // Establece el valor máximo permitido aquí
                if (value && value.match("^0*[1-9][0-9]*") && parseInt(value, 10) <= max) {
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
            className="inputsize"
            name="camaResid"
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
              required: true,
              message: "Por favor, ingresa el número de habitaciones.",
            },
            {
              validator: (_, value) => {
                const max = 100; // Establece el valor máximo permitido aquí
                if (value && value.match("^0*[1-9][0-9]*") && parseInt(value, 10) <= max) {
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
            className="inputsize"
            name="habitResid"
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
              required: true,
              message: "Por favor, ingresa el número de baños.",
            },
            {
              validator: (_, value) => {
                const max = 10; // Establece el valor máximo permitido aquí
                if (value && value.match("^0*[1-9][0-9]*") && parseInt(value, 10) <= max) {
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
            className="inputsize"
            name="banioResid"
            placeholder="Ingresa el número de baños"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="descripResid"
          label="Descripción del Espacio"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa una descripción del espacio.",
            }, {
              whitespace: true,
              message: "No puede dejar en blanco este campo"
            },
          ]}
          hasFeedback
        >
          <Input.TextArea
            className="inputsize"
            name="descripResid"
            placeholder="Ingresa una descripción del espacio"
            showCount
            maxLength={200}
            autoSize={{ minRows: 5, maxRows: 20 }}
            onChange={handleChange}
          />
        </Form.Item>

        <h3 className="subtitulos">Servicios</h3>
        <Form.Item
          label="Comodidades"
          name="servicios"
          rules={[
            { required: !isAtLeastFiveChecked, message: "" },
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
          <div className="fila-checkbox">
            <div className="columna-checkbox">
              <Checkbox
                value="wifi"
                name="wifi"
                checked={body.wifi === "true"}
                onChange={() => { handleCheckedChange("wifi") }}
              >
                Wi-Fi
              </Checkbox>
              <Checkbox
                value="lavadora"
                name="lavadora"
                checked={body.lavadora === "true"}
                onChange={() => { handleCheckedChange("lavadora") }}
              >
                Lavadora
              </Checkbox>
              <Checkbox
                value="cocina"
                name="cocina"
                checked={body.cocina === "true"}
                onChange={() => { handleCheckedChange("cocina") }}
              >
                Cocina
              </Checkbox>
              <Checkbox
                value="aireAcond"
                name="aireAcond"
                checked={body.aireAcond === "true"}
                onChange={() => { handleCheckedChange("aireAcond") }}
              >
                Aire Acondicionado
              </Checkbox>
              <Checkbox
                value="televisor"
                name="televisor"
                checked={body.televisor === "true"}
                onChange={() => { handleCheckedChange("televisor") }}
              >
                Televisor
              </Checkbox>
            </div>
          </div>
        </Form.Item>

        <Form.Item
          label="Caracteristicas"
          name="servicios"
          rules={[
            { required: !isAtLeastFiveChecked, message: "" },
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
          <div className="fila-checkbox">
            <div className="columna-checkbox">
              <Checkbox
                value="psicina"
                name="psicina"
                checked={body.psicina === "true"}
                onChange={() => { handleCheckedChange("psicina") }}
              >
                Piscina
              </Checkbox>
              <Checkbox
                value="jacuzzi"
                name="jacuzzi"
                checked={body.jacuzzi === "true"}
                onChange={() => { handleCheckedChange("jacuzzi") }}
              >
                Jacuzzi
              </Checkbox>
              <Checkbox
                value="estacionamiento"
                name="estacionamiento"
                checked={body.estacionamiento === "true"}
                onChange={() => { handleCheckedChange("estacionamiento") }}
              >
                Estacionamiento
              </Checkbox>
              <Checkbox
                value="gim"
                name="gim"
                checked={body.gim === "true"}
                onChange={() => { handleCheckedChange("gim") }}
              >
                Gimnasio
              </Checkbox>
              <Checkbox
                value="parrilla"
                name="parrilla"
                checked={body.parrilla === "true"}
                onChange={() => { handleCheckedChange("parrilla") }}
              >
                Parrilla
              </Checkbox>
            </div>
          </div>

        </Form.Item>

        <Form.Item
          label="Seguridad"
          name="servicios"
          rules={[
            { required: !isAtLeastFiveChecked, message: "" },
            {
              validator: (_, values) => {
                if (isAtLeastFiveChecked) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Por favor seleccione al menos cinco servicios");
                }
              }
            }
          ]}
        >
          <div className="fila-checkbox">
            <div className="columna-checkbox">
              <Checkbox
                value="camaras"
                name="camaras"
                checked={body.camaras === "true"}
                onChange={() => { handleCheckedChange("camaras") }}
              >
                Cámara de seguridad
              </Checkbox>
              <Checkbox
                value="detectorHumo"
                name="detectorHumo"
                checked={body.detectorHumo === "true"}
                onChange={() => { handleCheckedChange("detectorHumo") }}
              >
                Detector de humo
              </Checkbox>
            </div>
          </div>

        </Form.Item>
        <h3 className="subtitulos">Instrucciones de Check In y Check Out</h3>
        <div className="fila-check-input">
          <div className="columna-check-input">
            <Form.Item
              name="checkInResid"
              label="Check In"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese las instrucciones de check-in.",
                }, {
                  whitespace: true,
                  message: "No puede dejar en blanco este campo"
                }
              ]}
              hasFeedback
              className="check-in-item" // Agrega una clase aquí
            >
              <Input.TextArea
                className="input-check"
                name="checkInResid"
                placeholder="Ingrese las instrucciones de check-in"
                showCount
                maxLength={800}
                autoSize={{ minRows: 5, maxRows: 5 }}
                onChange={handleChange}
              />
            </Form.Item>

          </div>
          <div className="columna-check-input">
            <Form.Item
              name="checkOutResid"
              label="Check Out"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese las instrucciones de check-out.",
                }, {
                  whitespace: true,
                  message: "No puede dejar en blanco este campo"
                }
              ]}
              hasFeedback
            >
              <Input.TextArea
                className="input-check"
                name="checkOutResid"
                placeholder="Ingrese las instrucciones de check-out"
                showCount
                maxLength={800}
                autoSize={{ minRows: 5, maxRows: 5 }}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>

        <div className="imgs-register-form-flex-container">
          <Form.Item
            wrapperCol={{}}
            name="imagen"
            rules={[
              { required: !isImageUploaded, message:'' },
              {
                validator: (_, value) => {
                  if (isImageUploaded) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Por favor, suba al menos 5 imagenes");
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

        <Form.Item
          wrapperCol={{}}
        >
          <div className="button-container">
            <Button type="primary" htmlType="submit" >
              Completar
            </Button>
            <Button htmlType="button" onClick={deleteFields}>
              Cancelar
            </Button>
          </div>
        </Form.Item>
        <Divider dashed />
      </Form>
    </div>
  );

}
export default RentalForm;