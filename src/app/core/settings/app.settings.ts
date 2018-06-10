import { environment } from './../../../environments/environment';

export class AppSettings {
  public static get host(): any {
    return {
      apiUrl: environment.mlsHost,
      apiUrlMob: environment.mlsMobHost
    };
  }
}
