import {CreatorRoleEnum} from './creator-role.enum';
import {Contact} from './contact.model';

export class Creator {
  id?: number;
  firstName: string;
  lastName: string;
  role: CreatorRoleEnum;
  contact?: Contact;
}
