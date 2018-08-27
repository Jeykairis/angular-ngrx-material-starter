import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Validators,
  FormBuilder,
  AbstractControl,
  FormGroup,
  FormControl
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'anms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  minDate: Date;
  maxDate: Date;

  form = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]
    ],
    wannagift: [''],
    age: ['', [Validators.min(18), Validators.max(99)]],
    dob: [''],
    address: this.fb.group({
      country: [''],
      state: [''],
      city: [''],
      street: [''],
      zip: [''],
      numero: ['']
    })
  });

  countries = ['Belgium', 'UK'];

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe((f: FormGroup) => {
      const today = new Date();
      this.minDate = new Date(
        today.getFullYear() - (f['age'] + 1),
        today.getMonth(),
        today.getDate()
      );
      this.maxDate = new Date(
        today.getFullYear() - f['age'],
        today.getMonth(),
        today.getDate()
      );

      // Add custom validators for date onChange of age
      // f.setControl('dob', new FormControl(f['dob'], [CustomValidator.minDate(this.minDate)]))
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.warn(this.form.value);
  }

  save() {
    console.log('save', this.form);
  }

  reset() {
    this.form.reset();
  }
}
