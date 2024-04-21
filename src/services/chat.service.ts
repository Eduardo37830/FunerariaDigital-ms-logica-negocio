import { BindingScope, injectable } from '@loopback/core';
import { io } from "socket.io-client";

@injectable({scope: BindingScope.TRANSIENT})
export class ChatService {
  private socket: ReturnType<typeof io> | undefined;

  constructor() {}

  async enviarCodigoUnico(codigo: string): Promise<void> {
    this.socket = io("http://localhost:3010", {
      // Opciones adicionales si es necesario, como reintentos, timeout, etc.
    });

    this.socket.on("connect", () => {
      console.log("Conectado al servidor de chat.");
      // Enviar el código único para crear una sala de chat
      this.socket?.emit("crearSala", codigo);
      // Desconectar después de enviar el código
      this.desconectar();
    });

    this.socket.on("connect_error", (err) => {
      console.error("Error de conexión:", err.message); // Manejo de errores de conexión
      this.desconectar(); // Asegura que la conexión se cierre en caso de error
    });
  }

  private desconectar(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Desconectado del servidor de chat.");
      this.socket = undefined;
    }
  }
}
