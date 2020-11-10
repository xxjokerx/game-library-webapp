import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductLineService} from '../product-line.service';
import {ProductLineDataService} from '../product-line-data.service';
import {ProductLine} from '../../../model/product-line.model';

@Component({
  selector: 'app-product-line-edit',
  templateUrl: './product-line-edit.component.html',
  styleUrls: ['./product-line-edit.component.css']
})
export class ProductLineEditComponent implements OnInit {
  private subscription: Subscription;
  private editMode: boolean;
  private id: number;
  lineForm: FormGroup;
  label: string;

  constructor(private productLineService: ProductLineService,
              private productLineDataService: ProductLineDataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        const id = 'id';
        this.id = +params[id];
        if (params[id]) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
        this.initFrom();
      }
    );
  }

  onSubmit(): void {
    const name = 'name';
    const newLine = new ProductLine(
      this.lineForm.value[name]
    );

    if (this.editMode) {
      this.productLineDataService
        .editLine(this.id, newLine)
        .subscribe(line => {
          this.productLineService.updateLines(line);
        });
    } else {
      this.productLineDataService
        .addLine(newLine)
        .subscribe(line => {
          this.productLineService.updateLines(line);
        });
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  private initFrom(): void {
    let lineName = '';

    if (this.editMode) {
      const line: ProductLine = this.productLineService.getProductLineById(this.id);
      lineName = line.name;
      this.label = 'Édition du thème \"' + lineName + '\"';
    } else {
      this.label = 'Création d\'un thème';
    }

    this.lineForm = new FormGroup({
      'name': new FormControl(lineName, [Validators.required, Validators.maxLength(50)])
    });
  }
}
