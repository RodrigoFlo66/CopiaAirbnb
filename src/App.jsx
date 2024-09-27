import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutEzRental from './layouts/LayoutEzRental/LayoutEzRental';
import Home from './pages/Home';
import Addad from './pages/AddAd';
import MyAds from './pages/MyAds';
import MoreInfoMyAds from './pages/MoreInfoMyAds';
import MoreInfoAds from './pages/MoreInfoAds';
import EditMyAds from './pages/EditMyAds';
import LayoutBasic from './layouts/LayoutBasic/LayoutBasic';
import PaymentSimulation from './pages/PaymentSimulation';
import './App.css';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/authContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PasswordRecovery from './pages/PasswordRecovery';
import MyReserves from './pages/MyReserves';
import MyRents from './pages/MyRents';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>
      {/* 
        Cuando se ingrese a la ruta /, se renderizará el componente LayoutEzRental.
        La ruta / envuelve a todas las demas rutas, por lo que si está dentro de esta
        ruta, se renderizará el componente LayoutEzRental junto a las diferentes pages.

        La prop index indica que cuando el path sea igual al de su padre, 
        además de renderizar el componente padre, el primer componente que yo vea, 
        será el que lleve la prop index. Se usa para no repetir / en el componente Home
        Indica que si se hace match con el path /, se montarán ambos componentes en el Outlet.


        Las demás rutas no llevan el / porque son rutas relativas (anidadas), la ruta absoluta seria /, 
        es decir que como me encuentro en / que es la raiz, el path aniadir-anuncio ya tendrá el /. 
        Es como si estuviera anidando la ruta aniadir-anuncio a la ruta /. Ejemplo: /anidadir-anuncio.


        En el caso de la ruta mis-anuncios, dicha ruta se volveria ruta padre, dentro de esta ruta
        utilizo la prop index para decir que cuando se haga match con la ruta padre, lo primero que yo vea
        sea el componente MyAds.
        Luego, dentro de la ruta padre mis-anuncios se tiene un path :id que indica que es una ruta dinamica 
        ó parametrizada que hará referencia al id de cada card, para luego capturar ese id que viajará por el path o url mediante
        el hook useParams y agregar ese id al endpoint. La ruta quedaria de esta forma: /mis-anuncios/23 ó 
        en el caso de a vista para editar un anuncio: /mis-anuncios/editar-anuncio/23.
        Si deseo implementar rutas dinamicas o parametrizadas optativas, es decir que puede o no existir esa variable,
        Se lo realiza con anidamiento de rutas dinamicas o parametrizadas. Es decir, en vez de :id/:otraVariable/:otraMas,
        se realizaria el anidamiento.


        Si es que desearia manejar algunas rutas dentro de otro componente, en la ruta padre se necesitaria
        declarara lo siguiente: ruta-padre/*. Esto me habilita a las anidaciones solo cuando las rutas se encuentran
        en otro componente. Esto solo es cuando las rutas hijo se encuentran en otro componente/
      */}
      <AuthProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute>   <LayoutEzRental />   </ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path=":idAd" element={<MoreInfoAds />} />
            <Route path="mis-reservas" element={ <MyReserves /> }></Route>
            <Route path="aniadir-anuncio" element={<Addad />} />
            <Route path="mis-anuncios">
              <Route index element={<MyAds />} />
              <Route path=":idMyAd" element={<MoreInfoMyAds />} />
              <Route path="editar-anuncio">
                <Route path=":idMyAd" element={<EditMyAds />} />
              </Route>
            </Route>
            <Route path="myRents" element={<MyRents/>}/>
            <Route path="usuario/:userId" element={<UserProfile />} />
          </Route>
          <Route path='/ez-rental' element={<LayoutBasic />}>
            <Route path='pago-residencia' element={<PaymentSimulation />} />
          </Route>
          <Route path='/iniciar-sesion' element={<LoginPage />} />
          <Route path='/cambiar-contrasenia' element={<PasswordRecovery />} />
        </Routes>
      </AuthProvider>
    </>
  );
};


export default App;
