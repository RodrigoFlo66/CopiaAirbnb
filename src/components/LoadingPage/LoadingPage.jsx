import { useEffect, useState } from "react";
import { Spin, Typography } from "antd";
import "./LoadingPage.css";
import { LoadingOutlined } from "@ant-design/icons";
import EzRentalLogo from "../../assets/EzRental Transparente v2 _Loading.webp";

function LoadingPage() {
  const [phrases, setPhrases] = useState([
    {
      message:
        "Descubre nuevos horizontes y haz que cada estancia sea una experiencia inolvidable. ¡Bienvenido a tu próximo hogar lejos de casa!",
      author: "LizardTech S.R.L",
    },
  ]);
  const [selectedPhrase, setSelectedPhrase] = useState({});

  useEffect(() => {
    randomPhrase();
  }, [phrases]);

  const randomPhrase = () => {
    setSelectedPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  return (
    <div className="loading-container">
      <img
        src={EzRentalLogo}
        alt="Logo EzRental"
        width={200}
        height={130}
      ></img>
      <Typography.Title level={1} style={{ fontSize: "20px" }}>
        {selectedPhrase.message}
      </Typography.Title>
      <Typography.Text type="secondary" style={{ fontSize: "18px" }}>
        - {selectedPhrase.author} <br />
        <br />{" "}
      </Typography.Text>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 95,
            }}
            spin
          />
        }
      />
      <div className="loading" />
    </div>
  );
}

export default LoadingPage;
