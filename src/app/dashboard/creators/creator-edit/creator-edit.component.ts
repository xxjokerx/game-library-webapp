import {Component, OnInit} from '@angular/core';
import {CreatorService} from '../creator.service';
import {CreatorsDataService} from '../creators-data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Creator} from '../../../model/creator.model';
import {CreatorRoleEnum} from '../../../model/enum/creator-role.enum';
import {CountryDataService} from '../../../shared/country-data.service';

@Component({
  selector: 'app-creator-edit',
  templateUrl: './creator-edit.component.html',
  styleUrls: ['./creator-edit.component.css']
})
export class CreatorEditComponent implements OnInit {
  private editMode: boolean;
  hasContact: boolean;
  editContact: boolean;
  private subscription: Subscription;
  private id: number;
  creatorForm: FormGroup;
  storedCreator: Creator;
  label: string;
  rolesList: Array<string>;
  actualEnumType;
  countries: string[];

  constructor(private creatorsService: CreatorService,
              private creatorsDataService: CreatorsDataService,
              private countryDataService: CountryDataService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.editContact = false;
    this.populateCountriesAndRoles();
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        const id = 'id';
        this.id = +params[id];
        if (params[id]) {
          this.editMode = true;
          this.hasContact = this.creatorsService.hasContact;
        } else {
          this.editMode = false;
          this.hasContact = false;
        }
        this.initFrom();
      }
    );
  }

  onAddContactForm(): void {
    this.addContactForm();
    this.hasContact = true;
  }

  onSubmit(): void {
    const newCreator = new Creator();
    newCreator.firstName = this.creatorForm.value.firstname;
    newCreator.lastName = this.creatorForm.value.lastname;
    newCreator.role = this.creatorForm.value.role;
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private populateCountriesAndRoles(): void {
    this.rolesList = Object.keys(CreatorRoleEnum);
    this.actualEnumType = CreatorRoleEnum;

    if (this.countryDataService.countries.length === 0) {
      this.countryDataService.getList();
    }
    this.countries = this.countryDataService.countries;
  }

  private initFrom(): void {
    let firstname = '';
    let lastname = '';
    let role = 'AUTHOR';
    let postalCode = '';
    let street = '';
    let city = '';
    let country = '';
    let streetNumber = '';
    let phoneNumber = '';
    let website = '';
    let mailAddress = '';

    if (this.editMode) {
      const creator: Creator = this.creatorsService.getCreatorById(this.id);
      firstname = creator.firstName;
      lastname = creator.lastName;
      role = creator.role;

      if (creator.contact) {
        postalCode = creator.contact.postalCode;
        street = creator.contact.street;
        city = creator.contact.city;
        country = creator.contact.country;
        streetNumber = creator.contact.streetNumber;
        phoneNumber = creator.contact.phoneNumber;
        website = creator.contact.website;
        mailAddress = creator.contact.mailAddress;
      }

      let firstnamePlaceholder = firstname;
      if (firstname) {
        firstnamePlaceholder = firstname + ' ';
      }
      this.label = 'Édition de l\'auteur \"' + firstnamePlaceholder + lastname + '\"';
    } else {
      this.label = 'Création d\'un auteur';
    }

    if (this.hasContact) {
      this.editContact = true;
      this.creatorForm = new FormGroup({
        'firstname': new FormControl(firstname, [Validators.maxLength(50)]),
        'lastname': new FormControl(lastname, [Validators.required, Validators.maxLength(50)]),
        'role': new FormControl(role, [Validators.required, Validators.maxLength(50)]),
        'postalCode': new FormControl(postalCode, [Validators.maxLength(50)]),
        'street': new FormControl(street, [Validators.maxLength(255)]),
        'city': new FormControl(city, [Validators.maxLength(50)]),
        'country': new FormControl(country, [Validators.required, Validators.maxLength(50)]),
        'streetNumber': new FormControl(streetNumber, [Validators.maxLength(10)]),
        'phoneNumber': new FormControl(phoneNumber, [Validators.maxLength(50)]),
        'website': new FormControl(website, [Validators.maxLength(75)]),
        'mailAddress': new FormControl(mailAddress, [Validators.maxLength(320)])
      });
    } else {
      this.editContact = false;
      this.creatorForm = new FormGroup({
        'firstname': new FormControl(firstname, [Validators.maxLength(50)]),
        'lastname': new FormControl(lastname, [Validators.required, Validators.maxLength(50)]),
        'role': new FormControl(role, [Validators.required, Validators.maxLength(50)])
      });
    }
  }

  private addContactForm(): void {
    this.editContact = true;
    this.creatorForm.addControl('postalCode', new FormControl('', [Validators.maxLength(50)]));
    this.creatorForm.addControl('street', new FormControl('', [Validators.maxLength(255)]));
    this.creatorForm.addControl('city', new FormControl('', [Validators.maxLength(50)]));
    this.creatorForm.addControl('street', new FormControl('', [Validators.maxLength(255)]));
    this.creatorForm.addControl('country', new FormControl('France', [Validators.required, Validators.maxLength(50)]));
    this.creatorForm.addControl('streetNumber', new FormControl('', [Validators.maxLength(10)]));
    this.creatorForm.addControl('phoneNumber', new FormControl('', [Validators.maxLength(50)]));
    this.creatorForm.addControl('website', new FormControl('', [Validators.maxLength(75)]));
    this.creatorForm.addControl('mailAddress', new FormControl('', [Validators.maxLength(320)]));
  }
}
