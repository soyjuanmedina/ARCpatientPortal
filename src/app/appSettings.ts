import { environment } from "../environments/environment";

// Variables de colores en app/sass/_variables.scss

export class AppSettings {

  // Settings de ARC
  public static LOGO = 'assets/img/logo_anatomy_white.png';
  public static ADDRESS = 'Golden Mile 1, Office 30. Palm Jumeirah - Dubai';
  public static NAME = 'Antomy Rehab Clinic';
  public static PHONE = '04-556 8356';
  public static EMAIL = 'info@anatomyrehab.ae';
  public static SITETITLE = 'Patient Portal - Anatomy Rehab Clinic';
  public static FAVICON = 'assets/img/faviconARC.png';

  // Settings de SK
  // public static LOGO = 'assets/img/logo-schon-clinic-trans.png';
  // public static ADDRESS = '11 Weymouth Street - London - UK';
  // public static NAME = 'Schoen Clinic';
  // public static PHONE = '+44 20 3355 2693';
  // public static EMAIL = 'info@schoen-clinic.co.uk';
  // public static SITETITLE = 'Patient Portal - Schoen Clinic';
  // public static FAVICON = 'assets/img/faviconSK.png';

  // Settings de CEMTRO
  // public static LOGO = 'assets/img/cemtro-logo.png';
  // public static ADDRESS = 'Av. Ventisquero de la Condesa, 42, 28035, Madrid, España';
  // public static NAME = 'Clínica CEMTRO';
  // public static PHONE = '91 735 57 57';
  // public static EMAIL = 'info@clinicacemtro.com';
  // public static SITETITLE = 'Portal del Paciente - Clínica CEMTRO';
  // public static FAVICON = 'assets/img/faviconCEMTRO.png';

  public static DATABASEURL = environment.DATABASEURL;

  // public static DATABASEURL = 'http://portaltest.anatomyrehab.ae:8082/patient-portal/';

}