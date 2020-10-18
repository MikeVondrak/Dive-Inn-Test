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

  private callers: Map<string, boolean> = new Map<string, boolean>();
  private currentCaller: string = '';

  constructor() { }

  /**
   * Enables or disables logging for the calling object (determined via a stack trace)
   * Allows logging to be enabled per class etc
   * @param watch whether or not to print logs coming from caller
   */
  public enableLogger(watch: boolean = false) {
    this.callers.set(this.getCallingFile(), watch);
  }

  public log(text: string, props: { [key: string]: any } = {}, timer?: LogTimer) {
    const caller = this.getCallingFile();
    const logEnabled = this.callers.get(caller);
    debugger;
    if (logEnabled) {
      if (caller !== this.currentCaller) {
        console.groupEnd();
        console.group(caller);
        this.currentCaller = caller;
      }
      if (timer?.action === 'start') {
        debugger;
        console.log('Start timer: ' + timer.label);
        console.time(timer.label);
      } else if (timer?.action === 'stop') {
        debugger;
        console.timeEnd(timer.label);
      }

      if (text) {
        console.log(text + '\n');
      }

      Object.keys(props).forEach(key => {
      //props.forEach(prop => {
        console.log(key + ' = ' + props[key]);
      });
    }
  }

  private getCallingFile(): string {
    const stack = (new Error).stack;
    const stackLines = stack?.split('\n');
    let done = false;
    let file: string;
    let i = 1;

    //debugger;
    do {
      // select/trim the ith line from the stack trace
      const line = stackLines[i].trim();
      // format should be 
      let parts = line.split('at ');
      parts = parts[1].split(' ');
      if (!(parts[0].includes('LoggerService'))) {
        done = true;
        file = parts[0].includes('new') ? parts[1] : parts[0].split('.')[0];
      }
      i++;
    } while (!done);
    //debugger;
    return file;
  }
}

