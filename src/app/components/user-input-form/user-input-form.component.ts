import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-input-form',
  templateUrl: './user-input-form.component.html',
  styleUrls: ['./user-input-form.component.scss'],
})
export class UserInputFormComponent {
  username: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  imageUrl = '';

  onSubmit() {
    if (this.username.trim()) {
      this.apiService.getUser(this.username).subscribe({
        next: (response) => {
          this.apiService.userName = this.username.trim();
          this.apiService.userDetail = response;
          this.router.navigate(['/user-details']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Error');
        },
      });
    } else {
      this.toastr.error('Please enter a valid GitHub username.');
    }
  }
}