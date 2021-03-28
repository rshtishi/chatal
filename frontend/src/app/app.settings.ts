
export class AppSettings {

  public static APP_NAME = 'Chatal';

  public static SERVER_URL = "http://localhost:8090";

  public static API_ENDPOINT= "/api";

  public static AUTH_ENDPOINT= AppSettings.SERVER_URL+AppSettings.API_ENDPOINT+"/auth/authenticate";

}
