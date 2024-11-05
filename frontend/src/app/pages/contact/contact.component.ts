import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser'; // Import emailjs
import { RouteshowComponent } from '../../components/routeshow/routeshow.component';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'contact-us',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [ReactiveFormsModule, RouteshowComponent, CommonModule]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  currentItem = 'Contact';

  ngOnInit(): void {
    // Initialize the reactive form with controls and validators
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  // Send email using emailjs
  public sendEmail(e: Event) {
    // console.log(e.target);
    
    // e.preventDefault();

    if (this.contactForm.valid) {
     
      emailjs
        .sendForm(
          'adkumargmail',  
          'template_o3q8fxc',  
          e.target as HTMLFormElement,
          'Qf2Vq9GGZ7_QZOAUI'  
        )
        .then(
          () => {
            console.log('SUCCESS!');
            alert('Message sent successfully!');
            this.contactForm.reset();
          },
          (error) => {
            console.error('FAILED...', error.text);
            alert('Failed to send message, please try again.');
          }
        );
    }
     else {
      alert('Please fill in all required fields.');
    }
  }
}
