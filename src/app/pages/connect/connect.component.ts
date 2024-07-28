import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      from_name: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    const formData = this.contactForm.value;
    const templateParams = {
      to_name: 'Hakan İSMAİL',
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message
    };

    emailjs.send(environment.emailjs.serviceID, environment.emailjs.templateID, templateParams, environment.emailjs.userID)
      .then((response: EmailJSResponseStatus) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your message has been sent successfully!');
        this.contactForm.reset(); // Reset the form after successful submission
      }, (err) => {
        console.error('FAILED...', err);
        alert('There was an error sending your message. Please try again later.');
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
