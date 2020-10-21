import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemesService} from '../themes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Theme} from '../../../model/theme.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ThemesDataService} from '../themes-data.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private editMode: boolean;
  private id: number;
  themeForm: FormGroup;
  label: string;

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initFrom(): void {
    let themeName = '';

    if (this.editMode) {
      const theme: Theme = this.themesService.getThemeById(this.id);
      themeName = theme.name;
      this.label = 'Édition du thème \"' + themeName + '\"';
    } else {
      this.label = 'Création d\'un thème';
    }

    this.themeForm = new FormGroup({
      'name': new FormControl(themeName, [Validators.required, Validators.maxLength(50)])
    });
  }

  onSubmit(): void {
    const name = 'name';
    const newTheme = new Theme(
      this.themeForm.value[name]
    );

    if (this.editMode) {
      this.themesDataService.editTheme(this.id, newTheme).subscribe(theme => {
        console.log('updated themes : ' + theme.name);
        this.themesService.updateThemes(theme);
      });
    } else {
      this.themesDataService.addTheme(newTheme).subscribe();
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
