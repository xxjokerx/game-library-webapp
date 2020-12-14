import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Theme} from '../../../model/theme.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ThemeDataService} from '../theme-data.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {
  private subscription: Subscription;
  private editMode: boolean;
  private id: number;
  themeForm: FormGroup;
  label: string;
  existingThemes: string[];

  constructor(private themesService: ThemeService,
              private themesDataService: ThemeDataService,
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
        this.existingThemes = this.themesService.getExistingThemes();
        this.initFrom();
      }
    );
  }

  onSubmit(): void {
    const name = 'name';
    const newTheme = new Theme(
      this.themeForm.value[name]
    );

    if (this.editMode) {
      this.themesDataService
        .editTheme(this.id, newTheme)
        .subscribe(theme => {
          this.themesService.updateThemes(theme);
        });
    } else {
      this.themesDataService
        .addTheme(newTheme)
        .subscribe(theme => {
          this.themesService.updateThemes(theme);
        });
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
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
      'name': new FormControl(themeName, [
        Validators.required,
        Validators.maxLength(50),
        this.nameAlreadyExists.bind(this)])
    });
  }

  nameAlreadyExists(control: FormControl): { [s: string]: boolean } {
    /* We need spit the case edit mode or not to allow save the current edited name */
    if (
      (
        !this.editMode
        &&
        this.themesService.getExistingThemes().indexOf(control.value.toLowerCase().trim()) !== -1
      )
      || (
        this.editMode
        &&
        control.value.toLowerCase().trim() !== this.themesService.getThemeById(this.id).name.toLowerCase().trim()
        &&
        this.themesService.getExistingThemes().indexOf(control.value.toLowerCase().trim()) !== -1
      )
    ) {
      return {'nameAlreadyExists': true};
    }
    return null;
  }
}
