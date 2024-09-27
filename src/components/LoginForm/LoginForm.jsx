import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import { GoogleOutlined, FacebookFilled, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/authContext";
import ezRental from '../../assets/EzRental Transparente v2.webp';
import "./LoginForm.css";
import { createUser } from "../../services/users";

function LoginForm({ formFlag, switchForm }) {
  const { login, googleLogin } = useAuth();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log("name:" + e.target.name + " y value:"+e.target.value);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFinish = async () => {
    try {
      await login(userData.email, userData.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-login-credentials":
          message.error("Credenciales incorrectos");
          break;
        case "auth/invalid-email":
          message.error("El correo ingresado es inválido")
          break;

        default:
          break;
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      await createUser({codigo: user.uid, nombre: user.displayName, correo: user.email, foto: user.photoURL});
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <div className="login-form-container">
      <Form
        onFinish={handleFinish}
        labelCol={{ xs: 10, sm: 9, md: 8, lg: 7, xl: 7, xxl: 6 }}
        // wrapperCol={{ span: 16 }}
        className="login-form"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Typography.Title level={1} style={{ fontSize: '40px' }}>¡Bienvenido!</Typography.Title>
        <div className="logo-ez-rental-login-container">
          <img src={ezRental} ></img>
        </div>
        <Typography.Text type="secondary" style={{ fontSize: '20px' }}>Ingrese sus datos de acceso <br /><br /> </Typography.Text>

        <Form.Item label="Email" name="email" hasFeedback rules={[{ required: true, message: "Ingrese un correo electrónico" }]}>
          <Input
            name="email"
            placeholder="Ingrese su correo electrónico"
            onChange={handleChange}
            className="login-input"
          ></Input>
        </Form.Item>

        <Form.Item name="password" label="Contraseña" hasFeedback rules={[{ required: true, message: "Debe ingresar una contraseña" }]}>
          <Input.Password
            name="password"
            placeholder="Ingrese su contraseña"
            onChange={handleChange}
            className="login-input"
          ></Input.Password>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="login-button">
            <LoginOutlined /> Iniciar sesión
          </Button>
        </Form.Item>
        <Divider style={{borderColor: 'black', fontSize: '18px'}}>
          <Button onClick={()=>{navigate('/cambiar-contrasenia')}} type='link' className="forgot-password-button">¿Olvidaste tu contraseña?</Button>
        </Divider>
        <Divider style={{borderColor: 'black', fontSize: '18px'}}>O ingrese con</Divider>
        <div className="social-login">
          <div onClick={handleGoogleLogin} style={{cursor:"pointer"}}>
            <GoogleOutlined className="social-icon" style={{color: "#EA4335"}}></GoogleOutlined>
            <b style={{color: "#EA4335"}}>oogle</b>
            {/* <FacebookFilled className="social-icon" style={{color: 'blue'}} onClick={()=>{message.info("Aún en desarrollo ( ͡° ͜ʖ ͡°)")}}></FacebookFilled> */}
          </div>
        </div>
        <Divider style={{ borderColor: 'black', fontSize: '18px' }}>¿Aún no tiene una cuenta?</Divider>
        <div>
          <Button onClick={switchForm} className="login-button"> <UserAddOutlined /> Registrarse</Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
