
CREATE SEQUENCE public.usuario_id_usuario_seq_3;

CREATE TABLE public.USUARIO (
                id_usuario INTEGER NOT NULL DEFAULT nextval('public.usuario_id_usuario_seq_3'),
                codigo_usuario VARCHAR NOT NULL,
                nombre_usuario VARCHAR NOT NULL,
                correo_usuario VARCHAR NOT NULL,
                foto_usuario VARCHAR NOT NULL,
                CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);


ALTER SEQUENCE public.usuario_id_usuario_seq_3 OWNED BY public.USUARIO.id_usuario;

CREATE SEQUENCE public.evaluacion_usuario_id_evaluacion_usuario_seq;

CREATE TABLE public.EVALUACION_USUARIO (
                id_evaluacion_usuario INTEGER NOT NULL DEFAULT nextval('public.evaluacion_usuario_id_evaluacion_usuario_seq'),
                calificacion_limpieza_usu INTEGER NOT NULL,
                calificacion_puntualidad INTEGER NOT NULL,
                calificacion_comunicacion_usu INTEGER NOT NULL,
                comentario_usu VARCHAR NOT NULL,
                resenia_usuario VARCHAR NOT NULL,
                id_usuario INTEGER NOT NULL,
                CONSTRAINT evaluacion_usuario_pk PRIMARY KEY (id_evaluacion_usuario)
);


ALTER SEQUENCE public.evaluacion_usuario_id_evaluacion_usuario_seq OWNED BY public.EVALUACION_USUARIO.id_evaluacion_usuario;

CREATE SEQUENCE public.residencia_id_residencia_seq;

CREATE TABLE public.RESIDENCIA (
                id_residencia INTEGER NOT NULL DEFAULT nextval('public.residencia_id_residencia_seq'),
                titulo_residencia VARCHAR NOT NULL,
                tipo_residencia VARCHAR,
                pais_residencia VARCHAR,
                ciudad_residencia VARCHAR,
                direccion_residencia VARCHAR,
                cama_residencia INTEGER,
                habitacion_residencia INTEGER,
                banio_residencia INTEGER,
                huesped_max_residencia INTEGER,
                descripcion_residencia VARCHAR,
                dias_max_residencia INTEGER,
                precio_residencia REAL,
                check_in_residencia VARCHAR,
                check_out_residencia VARCHAR,
                tipo_alojamiento VARCHAR,
                telefono_usuario VARCHAR,
                ubicacion_residencia VARCHAR,
                id_usuario INTEGER NOT NULL,
                CONSTRAINT id_residencia PRIMARY KEY (id_residencia)
);


ALTER SEQUENCE public.residencia_id_residencia_seq OWNED BY public.RESIDENCIA.id_residencia;

CREATE SEQUENCE public.evaluacion_id_evaluacion_seq;

CREATE TABLE public.EVALUACION (
                id_evaluacion INTEGER NOT NULL DEFAULT nextval('public.evaluacion_id_evaluacion_seq'),
                id_residencia INTEGER NOT NULL,
                calificacion_limpieza INTEGER NOT NULL,
                calificacion_exactitud INTEGER NOT NULL,
                calificacion_comunicacion INTEGER NOT NULL,
                comentario VARCHAR NOT NULL,
                id_usuario INTEGER NOT NULL,
                CONSTRAINT evaluacion_pk PRIMARY KEY (id_evaluacion)
);


ALTER SEQUENCE public.evaluacion_id_evaluacion_seq OWNED BY public.EVALUACION.id_evaluacion;

CREATE SEQUENCE public.reserva_id_reserva_seq;

CREATE TABLE public.RESERVA (
                id_reserva INTEGER NOT NULL DEFAULT nextval('public.reserva_id_reserva_seq'),
                id_residencia INTEGER NOT NULL,
                precio_total_reserva REAL NOT NULL,
                fecha_inicio_reserva DATE NOT NULL,
                fecha_fin_reserva DATE NOT NULL,
                huespedes_reserva INTEGER NOT NULL,
                estado_reserva VARCHAR NOT NULL,
                id_usuario INTEGER NOT NULL,
                CONSTRAINT reserva_pk PRIMARY KEY (id_reserva)
);


ALTER SEQUENCE public.reserva_id_reserva_seq OWNED BY public.RESERVA.id_reserva;

CREATE SEQUENCE public.estado_id_estado_seq;

CREATE TABLE public.ESTADO (
                id_estado INTEGER NOT NULL DEFAULT nextval('public.estado_id_estado_seq'),
                id_residencia INTEGER NOT NULL,
                estado_residencia VARCHAR NOT NULL,
                fecha_inicio_estado DATE,
                fecha_fin_estado DATE,
                CONSTRAINT estado_pk PRIMARY KEY (id_estado)
);


ALTER SEQUENCE public.estado_id_estado_seq OWNED BY public.ESTADO.id_estado;

CREATE SEQUENCE public.imagen_id_imagen_seq;

CREATE TABLE public.IMAGEN (
                id_imagen INTEGER NOT NULL DEFAULT nextval('public.imagen_id_imagen_seq'),
                id_residencia INTEGER NOT NULL,
                imagen_residencia VARCHAR,
                descripcion_imagen VARCHAR,
                CONSTRAINT id_imagen PRIMARY KEY (id_imagen)
);


ALTER SEQUENCE public.imagen_id_imagen_seq OWNED BY public.IMAGEN.id_imagen;

CREATE SEQUENCE public.servicio_id_servicio_seq;

CREATE TABLE public.SERVICIO (
                id_servicio INTEGER NOT NULL DEFAULT nextval('public.servicio_id_servicio_seq'),
                id_residencia INTEGER NOT NULL,
                wifi_residencia VARCHAR,
                cocina_residencia VARCHAR,
                televisor_residencia VARCHAR,
                lavadora_residencia VARCHAR,
                aire_acond_residencia VARCHAR,
                psicina_residencia VARCHAR,
                jacuzzi_residencia VARCHAR,
                estacionamiento_residencia VARCHAR,
                gimnasio_residencia VARCHAR,
                parrilla_residencia VARCHAR,
                camaras_segurid_residencia VARCHAR,
                humo_segurid_residencia VARCHAR,
                CONSTRAINT id_servicio PRIMARY KEY (id_servicio)
);


ALTER SEQUENCE public.servicio_id_servicio_seq OWNED BY public.SERVICIO.id_servicio;

ALTER TABLE public.RESERVA ADD CONSTRAINT usuario_reserva_fk
FOREIGN KEY (id_usuario)
REFERENCES public.USUARIO (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.EVALUACION ADD CONSTRAINT usuario_evaluacion_fk
FOREIGN KEY (id_usuario)
REFERENCES public.USUARIO (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.RESIDENCIA ADD CONSTRAINT usuario_residencia_fk
FOREIGN KEY (id_usuario)
REFERENCES public.USUARIO (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.EVALUACION_USUARIO ADD CONSTRAINT usuario_evaluacion_usuario_fk
FOREIGN KEY (id_usuario)
REFERENCES public.USUARIO (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.SERVICIO ADD CONSTRAINT residencia_servicio_fk
FOREIGN KEY (id_residencia)
REFERENCES public.RESIDENCIA (id_residencia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.IMAGEN ADD CONSTRAINT residencia_imagen_fk
FOREIGN KEY (id_residencia)
REFERENCES public.RESIDENCIA (id_residencia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.ESTADO ADD CONSTRAINT residencia_estado_fk
FOREIGN KEY (id_residencia)
REFERENCES public.RESIDENCIA (id_residencia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.RESERVA ADD CONSTRAINT residencia_reserva_fk
FOREIGN KEY (id_residencia)
REFERENCES public.RESIDENCIA (id_residencia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.EVALUACION ADD CONSTRAINT residencia_evaluacion_fk
FOREIGN KEY (id_residencia)
REFERENCES public.RESIDENCIA (id_residencia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;