export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface ILogger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export class DefaultLogger implements ILogger {
  constructor(private prefix: string = '[Spaces]', private minLevel: LogLevel = 'INFO') {}

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private format(level: LogLevel, message: string): string {
    return `${this.prefix} [${level}] ${message}`;
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog('DEBUG')) console.debug(this.format('DEBUG', message), ...args);
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog('INFO')) console.info(this.format('INFO', message), ...args);
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog('WARN')) console.warn(this.format('WARN', message), ...args);
  }

  error(message: string, ...args: any[]) {
    if (this.shouldLog('ERROR')) console.error(this.format('ERROR', message), ...args);
  }
}

export const logger = new DefaultLogger();
