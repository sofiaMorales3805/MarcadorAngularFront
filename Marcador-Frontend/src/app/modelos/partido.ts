import { Equipo } from './equipo';

export interface Partido {
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
  cuartoActual?: number;
  tiempoRestante?: number;   // en segundos
  enProrroga?: boolean;
  numeroProrroga?: number;
  relojCorriendo?: boolean;
}