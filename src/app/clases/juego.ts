export abstract class Juego {

  public Juego: string;
  public Jugador: string;
  public Data: string;

  constructor() {

  }
  

  public abstract verificar(  ):boolean; 
  
  public retornarAyuda() {
    
    return "NO hay Ayuda definida";

  }

}
