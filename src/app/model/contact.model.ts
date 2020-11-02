import {ModelInterface} from './interface/model.interface';

export class Contact implements ModelInterface {
  id?: number;
  postalCode?: string;
  street?: string;
  city?: string;
  country: string;
  streetNumber?: string;
  phoneNumber?: string;
  website?: string;
  mailAddress?: string;
}
