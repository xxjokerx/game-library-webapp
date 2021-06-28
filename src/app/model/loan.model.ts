import {Time} from '@angular/common';
import {GameCopy} from './game-copy.model';

export class Loan {
  id: number;
  loanStartTime?: Time;
  loanEndTime?: Time;
  gameCopy?: GameCopy;
  account?: Account;
  isClosed?: boolean;
}
