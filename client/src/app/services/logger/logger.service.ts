// tslint:disable: no-console
import { Injectable } from '@angular/core';

export type TimerActionType = 'start' | 'stop';
export interface LogTimer {
  label: string;
  action: TimerActionType;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  // private callers: Map<string, boolean> = new Map<string, boolean>();
  // private currentCaller: string = '';

  // constructor() { }

  // public enableLogger(watch: boolean = false) {
  //   const stack = new Error().stack;
  //   const caller = this.getCallingFile(stack);
  //   this.callers.set(caller, watch);
  // }

  // public log(text: string, props: { [key: string]: any } = {}, timer?: LogTimer) {
  //   const stack = new Error().stack;
  //   const caller = this.getCallingFile(stack);
  //   const logEnabled = this.callers.get(caller);
  //   debugger;
  //   if (logEnabled) {
  //     if (caller !== this.currentCaller) {
  //       console.groupEnd();
  //       console.group(caller);
  //       this.currentCaller = caller;
  //     }
  //     if (timer?.action === 'start') {
  //       debugger;
  //       console.log('Start timer: ' + timer.label);
  //       console.time(timer.label);
  //     } else if (timer?.action === 'stop') {
  //       debugger;
  //       console.timeEnd(timer.label);
  //     }

  //     if (text) {
  //       console.log(text + '\n');
  //     }

  //     Object.keys(props).forEach(key => {
  //     //props.forEach(prop => {
  //       console.log(key + ' = ' + props[key]);
  //     });
  //   }
  // }

  // private getCallingFile(stack: string): string {
  //   let done = false;
  //   let file: string;
  //   let i = 1;
  //   //debugger;
  //   do {
  //     const line = stack?.split('\n')[i].trim();
  //     let parts = line.split('at ');
  //     parts = parts[1].split(' ');
  //     if (!(parts[0].includes('LoggerService'))) {
  //       done = true;
  //       file = parts[0].includes('new') ? parts[1] : parts[0].split('.')[0];
  //     }
  //     i++;
  //   } while (!done);
  //   //debugger;
  //   return file;
  // }
}

