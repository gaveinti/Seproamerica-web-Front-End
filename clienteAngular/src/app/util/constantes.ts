
export class Constantes{


    public static correoAdmin="bryanloor.21@gmail.com"




    /*PARA DESARROLLO*/
    public static HOST_DESARROLLO="http://127.0.0.1:8000/"
    
    
    //URLS PARA INICIO DE SESION
    public static URL_INICIO_SESION=this.HOST_DESARROLLO+"api/usuarioInicioSesion"
    public static URL_REGISTRO_USUARIO=this.HOST_DESARROLLO+"api/usuarioRegistro"
    
    
    //URLS PARA MENSAJERIA
    
    public static URL_CHAT="http://127.0.0.1:8000/api/chat/"
    public static URL_CHAT_INBOX="http://localhost:8000/api/chat/inbox/"
    
    
    
    /*PARA PRODUCCION*/
    
    public static HOST_SERVER="https://seproamerica2022.pythonanywhere.com/"
    
    public static DOMINIO_SERVER="seproamerica2022.pythonanywhere.com"  

    public static DOMINIO_SERVER_WEB_SOCKET="sepro-chat-server.herokuapp.com"  //  //https://sepro-chat-server.herokuapp.com/

    
    
    //URLS PARA MENSAJERIA
    
    public static URL_CHAT_PRODUCCION=this.HOST_SERVER+"api/chat/"
    public static URL_CHAT_INBOX_PRODUCCION=this.HOST_SERVER+"api/chat/inbox/"
    
    
    
    }