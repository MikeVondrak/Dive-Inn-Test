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
  public enableLogger(watch: boolean = false, nameOverride?: string) {
    const name = !!nameOverride ? nameOverride : this.getCallingFile();
    this.callers.set(name, watch);
  }

  public log(text: string, props: { [key: string]: any } | string | number = {}, timer?: LogTimer, nameOverride?: string) {
    const caller = !!nameOverride ? nameOverride : this.getCallingFile();
    const logEnabled = this.callers.get(caller);

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

      if (typeof props === 'object') {
        Object.keys(props).forEach(key => {
          console.log('\t' + key + ' = ' + props[key]);
        });
      } else {
        console.log('\t' + props.toString());
      }
    }
  }

  /**
   * Parse the stack trace to find the caller of the logger service
   * - ONLY WORKS FOR CHROME!
   */
  private getCallingFile(): string {
    const stack = (new Error).stack;
    const stackLines = stack?.split('\n');
    let done = false;
    let file: string;
    let i = 1;
    
    do {
      // select/trim the ith line from the stack trace
      const line = stackLines[i].trim();
      // format should be 
      // - Chrome:    "    at LoggerService.getCallingFile (http://localhost:4200/main.js:1855:24)"
      // - FireFox:   "getCallingFile@http://localhost:4200/main.js:1855:24"
      let parts = line.split('at ');
      if (!parts || (parts[0] === undefined) || (parts[1] === undefined)) {
        // invalid format, browser may not be Chrome
        return 'unknown';
      }
      parts = parts[1].split(' ');
      if (!(parts[0].includes('LoggerService'))) {
        done = true;
        file = parts[0].includes('new') ? parts[1] : parts[0].split('.')[0];
      }
      i++;
    } while (!done);

    return file;
  }
}

