import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import  'rxjs/add/operator/map';

@Injectable()
export class AppService {

  url = 'http://dymek.utp.edu.pl:8066/';

  constructor(private http: HttpClient) {
  }

  getPerson() {
    return this.http.get(this.url);
  }

  getAED() {
    return this.http.get(this.url + 'photo-aed/get-aed');
  }

  getNotice(selectedOptions: any) {
    let map = {};
    selectedOptions.skills.forEach(x => {
      map[x.id] = x.selected;
    });
    return this.http.get<any>(this.url + 'web/informations/all', {
      params: map,
    });
  }
  
}
