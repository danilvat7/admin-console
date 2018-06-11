import { environment } from './../../../environments/environment';
import { hostUrls } from './host-urls';
export class AppSettings {
  public static get host(): any {
    return {
      apiUrls: hostUrls[environment['envType']].mlsHosts,
      apiUrlMob: hostUrls[environment['envType']].mlsMobHost
    };
  }
}
