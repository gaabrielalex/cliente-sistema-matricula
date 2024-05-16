import { HttpHeaders } from "@angular/common/http";

export class GlobalConstants {
  //Message
  public static GenereicErrorMessage: string = "Ocorreu um erro inesperado, tente novamente mais tarde.";

  //Regex
  public static nameRagex: string = "^[a-zA-Z ]*$";
  public static EmailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public static ContactNumberRegex: string = "[9]{1}[0-9]{7}";

  //Variable
  public static error: string = "error";
  public static success: string = "success";

  //Routes default configs
  public static default_headers_routes: any = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', localStorage.getItem('Token') ?? '')
  }
}
