const pool = require('../db')
const { Resend } = require('resend');
const { Request, Response } = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { transporter } = require('../Mail');


//const resend = new Resend("re_Gi6HF8xH_FyvKokTNVq6UhA6u8wu4HH8F");

const getrentResid = async (req, res) =>{
  try {
    const codUsuario = req.params.codUsuario;
    const idUsuarioResult = await pool.query("SELECT id_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
    const idUsuario = idUsuarioResult.rows[0].id_usuario;
    const result = await pool.query(`
    SELECT
    re.id_reserva,
    re.id_residencia,
    re.precio_total_reserva,
    re.fecha_inicio_reserva,
    re.fecha_fin_reserva,
    re.estado_reserva,
    r.id_residencia,
    r.titulo_residencia,
    r.tipo_residencia,
    r.pais_residencia,
    r.ciudad_residencia,
    u.id_usuario,
    u.id_usuario,
    u.codigo_usuario,
    u.nombre_usuario,
    u.correo_usuario,
    u.foto_usuario,
    ARRAY[r.tipo_residencia, r.pais_residencia, r.ciudad_residencia] AS tags
    FROM reserva re
    JOIN residencia r ON re.id_residencia = r.id_residencia
    JOIN usuario u ON re.id_usuario = u.id_usuario
    WHERE r.id_usuario = $1
    GROUP BY re.id_reserva, r.id_residencia, u.id_usuario;
 
      `,[idUsuario]);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error obteniendo la información de la reserva");
  }
  };
  const getrent = async (req, res) =>{
    try {
      const codUsuario = req.params.codUsuario;
      const idUsuarioResult = await pool.query("SELECT id_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
      const idUsuario = idUsuarioResult.rows[0].id_usuario;
      const result = await pool.query(`
      SELECT 
    r.id_residencia, 
    r.titulo_residencia, 
    r.pais_residencia, 
    r.ciudad_residencia, 
    r.precio_residencia, 
    r.ubicacion_residencia,
    ARRAY_AGG(i.imagen_residencia) AS imagenes,
    r.fecha_inicio_publicado,
    r.fecha_fin_publicado,
    re.id_reserva,
    re.precio_total_reserva,
    re.fecha_inicio_reserva,
    re.fecha_fin_reserva,
    re.estado_reserva
FROM residencia r
LEFT JOIN imagen i ON r.id_residencia = i.id_residencia
LEFT JOIN estado e ON r.id_residencia = e.id_residencia
INNER JOIN reserva re ON r.id_residencia = re.id_residencia
INNER JOIN usuario u ON re.id_usuario = u.id_usuario
WHERE u.id_usuario = $1
GROUP BY 
    r.id_residencia, 
    r.titulo_residencia, 
    r.pais_residencia, 
    r.ciudad_residencia, 
    r.precio_residencia, 
    r.ubicacion_residencia,
    r.fecha_inicio_publicado,
    r.fecha_fin_publicado,
    re.id_reserva,
    re.precio_total_reserva,
    re.fecha_inicio_reserva,
    re.fecha_fin_reserva,
    re.estado_reserva;
            
        `,[idUsuario]);
      
      res.json(result.rows);
    } catch (err) {
      res.status(500).send("Error obteniendo la información de las rentas");
    }
    };
    const getrentUser = async (req, res) =>{
      const idResid = req.params.idResid;
      try {
        const resultRent = await pool.query("SELECT r.precio_total_reserva, r.fecha_inicio_reserva, r.fecha_fin_reserva, r.huespedes_reserva, u.nombre_usuario FROM reserva r, usuario u WHERE r.id_usuario = u.id_usuario and id_residencia = $1", [idResid]);
        
        res.json(resultRent.rows); 
      } catch (err) {
        res.status(500).send("Error obteniendo la información mis reservas");
      }
      };
    const getUsuario = async (req, res) =>{
      const codUsuario = req.params.codUsuario;
      try {
        const resultUsr = await pool.query("SELECT * FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
        res.json(resultUsr.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo usuario");
      }
      };
  const getEvaUser = async (req, res) => {
    try{
      const codUsuario = req.params.codUsuario;
      const getEvaUsr = await pool.query(
        "SELECT e.id_evaluacion_usuario, e.calificacion_limpieza_usu, e.calificacion_puntualidad, e.calificacion_comunicacion_usu, e.comentario_usu, e.resenia_usuario, u.nombre_usuario FROM evaluacion_usuario e, usuario u WHERE u.id_usuario=e.id_usuario and e.resenia_usuario = $1 ", 
      [codUsuario]);
      res.json(getEvaUsr.rows);
    }catch{
      res.status(500).send("Error obteniendo la información de las evaluaciones");  
    }
  }
  const getevalu = async (req, res) =>{
    const idResid = req.params.idResid;
    try {
      const resultEvalu = await pool.query("SELECT e.id_evaluacion, e.calificacion_limpieza, e.calificacion_exactitud, e.calificacion_comunicacion, e.comentario, u.nombre_usuario FROM evaluacion e, usuario u WHERE u.id_usuario=e.id_usuario and e.id_residencia = $1 ", 
      [idResid]);
        
        res.json(resultEvalu.rows);
      } catch (err) {
        res.status(500).send("Error obteniendo la información de las evaluaciones");
      }
      };


      const createRent = async (req, res) => {
        try {
          const { idResid, codUsuario } = req.params;
          const {
            precio,
            fechaIni,
            fechaFin,
            huespedes
          } = req.body;
          
          const idUsuarioResult = await pool.query("SELECT id_usuario, correo_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
          const idUsuario = idUsuarioResult.rows[0].id_usuario;
          const userEmail = idUsuarioResult.rows[0].correo_usuario;

          const fechaInicioFormateada = new Date(fechaIni).toISOString().split('T')[0];
          const fechaFinFormateada = new Date(fechaFin).toISOString().split('T')[0];

          const newRent = await pool.query(
            "INSERT INTO reserva (id_residencia, id_usuario, precio_total_reserva, fecha_inicio_reserva, fecha_fin_reserva, huespedes_reserva, estado_reserva) VALUES ($1, $2, $3, $4, $5, $6, 'pendiente')",
            [idResid, idUsuario, precio, fechaIni, fechaFin, huespedes]
          );
          const userHostResult = await pool.query("SELECT u.correo_usuario, re.titulo_residencia, u.nombre_usuario FROM residencia re JOIN usuario u ON u.id_usuario = re.id_usuario WHERE id_residencia=$1",[idResid]);
          const userEmailHost = userHostResult.rows[0].correo_usuario;
          const nombreResid = userHostResult.rows[0].titulo_residencia;
          const userName = userHostResult.rows[0].nombre_usuario;
          

          // Enviar notificación por correo electrónico
          await transporter.sendMail({
          from: '"Confirmación de reserva 🏠" <error.404.qa@gmail.com>', 
          to: [userEmailHost],
          subject: 'Confirmación de reserva',
          html: `
          <div style="border: 2px solid #eaeaea; padding: 20px; border-radius: 10px;">
            <h1 style="color: #333; text-align: center;">¡Solicitud de Reserva!</h1>
            <p style="font-size: 16px; color: #555;">Tu residencia ha recibido una solicitud de reserva. Aquí están los detalles:</p>
            <ul>
              <li><strong>Nombre de la residencia:</strong> ${nombreResid}</li>
              <li><strong>Fechas solicitadas para el alquiler: </strong> ${fechaInicioFormateada}  -  ${fechaFinFormateada}</li>
              <li><strong>Precio total del alquiler : </strong> ${precio}</li>
              <li><strong>Número de huéspedes:</strong> ${huespedes}</li>
              <li><strong>Nombre de la persona que está solicitando la reserva : </strong> ${userName}</li>
              <li><strong>Correo Electrónico de la persona que está solicitando la reserva : </strong> ${userEmail}</li>
              <li><strong>Tu correo Electronico : </strong> ${userEmailHost}</li>
              <li></li>
              <a href="http://localhost:5173/myRents/">Visita EzRental para gestionar tus Residencias</a>
            </ul>
            <p style="text-align: center;">
              <img src="cid:EzRental" alt="Imagen de confirmación" style="max-width: 100%; height: auto;"/>
            </p>
          </div>
          `,
          attachments: [{   // stream as an attachment
            filename: 'EzRental.webp',
            path: __dirname + '/EzRental.webp',
            cid: 'EzRental'
          }]
        }); 
       
          res.json({ message: "La reserva ha sido creado exitosamente", lot: newRent.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar la reserva." });
        }
      };
      const updateRent = async (req, res) => {
        try {
          const {idRent, idResid} = req.params;
          const {
            estado
          } = req.body;

          const newRent = await pool.query(
            "UPDATE reserva SET estado_reserva = $2 WHERE id_reserva = $1",
            [idRent, estado]
          );

          const userResult = await pool.query("SELECT u.correo_usuario, re.titulo_residencia, u.nombre_usuario, r.fecha_inicio_reserva, r.fecha_fin_reserva, r.precio_total_reserva FROM reserva r JOIN usuario u ON u.id_usuario = r.id_usuario JOIN residencia re ON re.id_residencia = r.id_residencia WHERE r.id_reserva= $1",[idRent]);
          const userEmail = userResult.rows[0].correo_usuario;
          const nombreResid = userResult.rows[0].titulo_residencia;
          const userName = userResult.rows[0].nombre_usuario; 
          const fecha_inicio = userResult.rows[0].fecha_inicio_reserva; 
          const fecha_fin = userResult.rows[0].fecha_fin_reserva; 
          const precio = userResult.rows[0].precio_total_reserva;

          const fechaInicioFormateada = new Date(fecha_inicio).toISOString().split('T')[0];
          const fechaFinFormateada = new Date(fecha_fin).toISOString().split('T')[0];
          
          if(estado=='alquilado'){
          // Enviar notificación por correo electrónico
          await transporter.sendMail({
            from: '"Confirmación de reserva 🏠" <error.404.qa@gmail.com>', 
            to: [userEmail],
            subject: 'Confirmación de reserva',
            html: `
            <div style="border: 2px solid #eaeaea; padding: 20px; border-radius: 10px;">
              <h1 style="color: #333; text-align: center;">¡Solicitud de Reserva Aceptada!</h1>
              <p style="font-size: 16px; color: #555;">${userName} su solicitud fue Aceptada</p>
              <ul>
                <li><strong>Nombre de la residencia:</strong> ${nombreResid}</li>
                <li><strong>Fechas del alquiler: </strong> ${fechaInicioFormateada}  -  ${fechaFinFormateada}</li>
                <li><strong>Precio total del alquiler : </strong> ${precio}</li>
                <li><strong>Tu correo Electronico : </strong> ${userEmail}</li>
                <li><strong></strong></li>
                <li></li>
                <a href="http://localhost:5173/mis-reservas/">Visita EzRental para ver tus Reservas</a>
              </ul>
              <p style="text-align: center;">
                <img src="cid:EzRental" alt="Imagen de confirmación" style="max-width: 100%; height: auto;"/>
              </p>
            </div>
            `,
            attachments: [{   // stream as an attachment
              filename: 'EzRental.webp',
              path: __dirname + '/EzRental.webp',
              cid: 'EzRental'
            }]
          }); 
          
          }else{
          if(estado=='cancelado'){
            await pool.query(
              "DELETE FROM reserva WHERE id_reserva = $1", 
            [idRent]);
            }

            await transporter.sendMail({
              from: '"Cancelacion de reserva 🏠" <error.404.qa@gmail.com>', 
              to: [userEmail],
              subject: 'Cancelacion de reserva',
              html: `
              <div style="border: 2px solid #eaeaea; padding: 20px; border-radius: 10px;">
                <h1 style="color: #333; text-align: center;">¡Solicitud de Reserva Cancelada!</h1>
                <p style="font-size: 16px; color: #555;">${userName} su solicitud fue Cancelada</p>
                <ul>
                  <li><strong>Nombre de la residencia:</strong> ${nombreResid}</li>
                  <li><strong>Fechas del alquiler: </strong> ${fechaInicioFormateada}  -  ${fechaFinFormateada}</li>
                  <li><strong>Precio total del alquiler : </strong> ${precio}</li>
                  <li><strong>Tu correo Electronico : </strong> ${userEmail}</li>
                  <li><strong>Lo sentimos, parece que su solicitud fue cancelada por el Host</strong></li>
                  <li><strong></strong></li>
                  <li></li>
                  <a href="http://localhost:5173/mis-reservas/">Visita EzRental para ver tus Reservas</a>
                </ul>
                <p style="text-align: center;">
                  <img src="cid:EzRental" alt="Imagen de confirmación" style="max-width: 100%; height: auto;"/>
                </p>
              </div>
              `,
              attachments: [{   // stream as an attachment
              filename: 'EzRental.webp',
              path: __dirname + '/EzRental.webp',
              cid: 'EzRental'
              }]
            }); 
          }

          res.json({ message: "La reserva ha sido actualizada exitosamente", lot: newRent.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar la reserva." });
        }
      };
      const createEvalu = async (req, res) => {
        try {
          const { idResid, codUsuario, idRent } = req.params;
          const {
            limpieza,
            exactitud,
            comunicacion,
            comentario
          } = req.body;
          const idUsuarioResult = await pool.query("SELECT id_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
          const idUsuario = idUsuarioResult.rows[0].id_usuario;

          const diasDespues = await pool.query(
            "SELECT * FROM reserva WHERE id_reserva = $1 AND fecha_fin_reserva >= CURRENT_DATE - INTERVAL '8 days'",
            [idRent]
          );
          const diasAntes = await pool.query(
            "SELECT * FROM reserva WHERE id_reserva = $1 AND fecha_inicio_reserva < CURRENT_DATE",
            [idRent]
          );
          if (diasDespues.rows.length > 0 ) {
            if (diasAntes.rows.length > 0 ) {
              const newEva = await pool.query(
              "INSERT INTO evaluacion (id_residencia, id_usuario, calificacion_limpieza, calificacion_exactitud, calificacion_comunicacion, comentario) VALUES ($1, $2, $3, $4, $5, $6)",
              [idResid, idUsuario, limpieza, exactitud, comunicacion, comentario]
              );
        
              res.json({ message: "El comentario ha sido creado exitosamente", lot: newEva.rows[0] });
            
            }else{
            return res.status(200).json({ data: 1 }); //si reciben 1 es por que todavía no empezó su reserva
            }
          }else{
            return res.status(200).json({ data: 7 }); //si reciben 7 es por que ya pasaron 7 dias desde su reserva
            }
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar el comentario" });
        }
      };
      const createUsuario = async (req, res) => {
        try {
          const {
            codigo,
            nombre,
            correo,
            foto
          } = req.body;
          
          const codUsr = await pool.query(
            "SELECT * FROM usuario WHERE LOWER(codigo_usuario) = LOWER($1);",
            [codigo]
          );
          if (codUsr.rows.length > 0) {
            return res.status(200).json({ data: 1 }); //si reciben 1 es error por codigo repetido
          }

          const newUsr = await pool.query(
            "INSERT INTO usuario (codigo_usuario, nombre_usuario, correo_usuario, foto_usuario) VALUES ($1, $2, $3, $4)",
            [codigo, nombre, correo, foto]
          );
      
          res.json({ message: "El usuario ha sido creado exitosamente", lot: newUsr.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo crear el usuario" });
        }
      };
      const createEvaluUser = async (req, res) => {
        try {
          const { codUsuario } = req.params;
          const {
            limpieza,
            puntualidad,
            comunicacion,
            comentario,
            codigoAlUsuario
          } = req.body;
          const idUsuarioResult = await pool.query("SELECT id_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
          const idUsuario = idUsuarioResult.rows[0].id_usuario;

            const newEva = await pool.query(
              "INSERT INTO evaluacion_usuario (id_usuario, calificacion_limpieza_usu, calificacion_puntualidad, calificacion_comunicacion_usu, comentario_usu, resenia_usuario) VALUES ($1, $2, $3, $4, $5, $6)",
              [idUsuario, limpieza, puntualidad, comunicacion, comentario, codigoAlUsuario]
            );
        
            res.json({ message: "El comentario ha sido creado exitosamente", lot: newEva.rows[0] });
            
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar el comentario" });
        }
      };
    module.exports = {
        getrent,
        getevalu,
        createRent,
        createEvalu,
        createUsuario,
        getUsuario,
        getrentUser,
        getrentResid,
        getEvaUser,
        createEvaluUser,
        updateRent
    };