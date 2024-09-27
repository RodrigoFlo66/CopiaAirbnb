import dayjs from 'dayjs';
export const analyze = (text) => {
    if(text.includes('hola') || text.includes('hoola') || text.includes('holas'))
        return 'Bienvenido, como puedo ayudarte?'
    else if(text.includes('fecha'))
        return dayjs().format('MMM Do YYYY')
    else if(text.includes('hora'))
        return dayjs().format('h:mm:ss a')
    else if(text.includes('ayuda') || text.includes('6'))
        return <>Contáctanos <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lizardtech.info@gmail.com&su=Asunto&body=Necesito%20ayuda%20respecto%20a%20..." target="_blank">lizardtech.info@gmail.com</a></>
    else if(text.includes('Historial de Reservas') || text.includes('2'))
        return 'Historial de Reservas';
    else if(text.includes('Home') || text.includes('1'))
        return 'Home';
    else if(text.includes('Mis Anuncios') || text.includes('4'))
        return 'Mis Anuncios';
    else if(text.includes('Añadir Anuncio') || text.includes('3'))
        return 'Añadir Anuncio';
    else if(text.includes('Gestionar Residencias Reservadas') || text.includes('5'))
        return 'Gestionar Residencias Reservadas';
    else if (text.toLowerCase().includes('salir') || text.includes('7'))
        return '¡Gracias por usar nuestro servicio! Esperamos verte pronto.';
    return "No puedo responderte. Si necesita ayuda ingrese la opción 6"
}