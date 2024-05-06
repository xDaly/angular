import { Injectable, signal } from '@angular/core';
import { SOCKET_URL } from '@api/api.constants';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  lastData = signal("initial")
  socket: Socket;
  constructor() {}

  connect(id: string) {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      query: {
        caller_id: id,
        type: 'staff',
      },
    });
    this.socketIOListeners();
  }

  listen(event: string): any {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        this.lastData.set(event)
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    this.socket.disconnect();
  }

  socketIOListeners() {
    this.socket.on('connect', () => {
      console.log('connected');
    });
    this.socket.on('connect_error', (error) => {
      console.log('connect_error', error);
    });
    this.socket.on('disconnect', (reason) => {
      console.log('disconnected', reason);
    });
    this.socket.on('error', (error) => {
      console.log('error', error);
    });
    this.socket.on('ping', () => {
      console.log('ping');
    });
    this.socket.on('reconnect', (attempt) => {
      console.log('reconnect', attempt);
    });
    this.socket.on('reconnect_attempt', (attempt) => {
      console.log('reconnect_attempt', attempt);
    });
    this.socket.on('reconnect_error', () => {
      console.log('reconnect_error');
    });
    this.socket.on('reconnect_failed', () => {
      console.log('reconnect_failed');
    });
  }
}
