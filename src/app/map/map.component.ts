import {Component, OnInit, Renderer, Renderer2, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import {AppService} from '../service/app.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  form;
  aed;
  selectedOptions;
  chosenPeople: any;
  modalRef: BsModalRef;
  visibleCircle = false;
  openSlider = false;
  latCircle = 53.121534059282546;
  lonCircle = 17.997387216635712;
  radiusCircle = 500;
  people: any[];

  marginLeft = 0;
  widthBox = 0;

  user = {
    skills: [
      {name: 'Zagrożenie życia', selected: true, id: 'danger-live'},
      {name: 'Zagrożenie zdrowia', selected: true, id: 'danger-health'},
      {name: 'Potrzebna pomoc', selected: true, id: 'help'},
      {name: 'Inne', selected: true, id: 'other'},
      {name: 'Ratownik', selected: true, id: 'rescuer'},
      {name: 'Ratownik medyczny', selected: true, id: 'medical-rescuer'},
      {name: 'Niewykwalifikowany', selected: true, id: 'other-person'},
    ]
  };


  constructor(private modalService: BsModalService, private fb: FormBuilder, private appService: AppService, private rd: Renderer2) {
    console.clear();

    this.form = this.fb.group({
      skills: this.buildSkills()
    });


  }

  ngOnInit() {
    let refreshObservable = Observable.interval(1000);

    this.selectedOptions = Object.assign({}, {}, {
      skills: this.user.skills.map((s, i) => {
        return {
          id: this.user.skills[i].id,
          selected: s.selected
        };
      })
    });

    this.appService.getAED().subscribe(data => this.aed = data);
    this.appService.getNotice(this.selectedOptions).subscribe(data => this.people = data);
    refreshObservable.subscribe(i => {
      this.refresh();
    });

  }

  openModal(template: TemplateRef<any>) {
    // this.chosenPeople = people;
    this.modalRef = this.modalService.show(template);
  }


  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  };

  openSliderBox(people: any) {
    this.visibleCircle = true;
    this.lonCircle = people.lng;
    this.latCircle = people.lat;
    this.openSlider = true;
    this.chosenPeople = people;

    document.getElementById('mySidenav').style.width = '400px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeSlider() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }


  buildSkills() {
    const arr = this.user.skills.map(s => {
      return this.fb.control(s.selected);
    });
    return this.fb.array(arr);
  }


  submit(value) {
    this.selectedOptions = Object.assign({}, value, {
      skills: value.skills.map((s, i) => {
        return {
          id: this.user.skills[i].id,
          selected: s
        };
      })
    });
    this.refresh();
  }

  refresh() {
    this.appService.getNotice(this.selectedOptions).subscribe(data => {

      if (this.people.length <= data.length) {
        this.people.forEach((x, i, a) => Object.assign(a[i], data[i]));
        for (let i = this.people.length; i < data.length; i++) {
          this.people.push(data[i]);
        }
      } else {
        data.forEach((x, i, a) => Object.assign(this.people[i], a[i]));
        this.people.splice(data.length, this.people.length - data.length);
      }
    });

  }


}
