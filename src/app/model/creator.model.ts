import {CreatorRoleEnum} from './enum/creator-role.enum';
import {Contact} from './contact.model';
import {ModelInterface} from './interface/model.interface';

export class Creator implements ModelInterface {
  id?: number;
  firstName: string;
  lastName: string;
  role: CreatorRoleEnum;
  contact?: Contact;
}
