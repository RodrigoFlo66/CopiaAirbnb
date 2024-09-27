import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Result,
  Typography,
  message,
} from "antd";
import { MailTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./PasswordResetForm.css";

function PasswordResetForm() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    // console.log("name:" + e.target.name + " y value:"+e.target.value);
    const { value } = e.target;
    setEmail(value);
  };

  const handleFinish = async () => {
    try {
      await resetPassword(email);
      setShowResult(true);
    } catch (error) {
      console.log(error.code);

      if (error.code == "auth/invalid-email") {
        message.error("El correo ingresado es inválido");
      }
    }
  };

  return (
    <div className="reset-pass-container">
      <Form
        onFinish={handleFinish}
        labelCol={{ xs: 5, sm: 5, md: 8, lg: 7, xl: 6, xxl: 5 }}
        initialValues={{ remember: true }}
        className="password-recovery-form"
        autoComplete="off"
      >
        <Typography.Title level={1} style={{ fontSize: "40px" }}>
          ¡Bienvenido!
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: "20px" }}>
          Ingrese su correo electrónico para recuperación de contraseña <br />
          <br />{" "}
        </Typography.Text>

        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[{ required: true, message: "Ingrese un correo electrónico" }]}
        >
          <Input
            name="email"
            placeholder="Ingrese su correo electrónico"
            onChange={handleChange}
            className="recovery-input"
          ></Input>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="recovery-button"
          >
            Enviar correo de recuperación
          </Button>
        </Form.Item>

        <Divider style={{ borderColor: "black", fontSize: "18px" }}>
          ¿No desea cambiar su contraseña?
        </Divider>
        <div>
          <Button
            onClick={() => {
              navigate("/iniciar-sesion");
            }}
            className="recovery-button"
          >
            Volver atrás
          </Button>
        </div>
      </Form>

      {showResult ? (

        <Modal
            open={showResult}
            closeIcon={false}
            centered={true}
            footer={null}
            closable={null}
        >
            <Result
                icon={<MailTwoTone />}
                title="Se envió un enlace de recuperación al correo"
                extra={
                    <Button
                        type="primary"
                        className="continue-button"
                        key="console"
                        onClick={() => navigate("/iniciar-sesion")}
                    >
                        Continuar
                    </Button>
                }
            />
        </Modal>
        
      ) : null }
    </div>
  );
}

export default PasswordResetForm;
