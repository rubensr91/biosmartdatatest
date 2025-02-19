import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatIcon,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class UserListComponent {
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'address',
    'phone',
    'website',
    'company',
    'actions',
  ];

  #dataService = inject(DataService);

  users: Signal<any[]> = toSignal(this.#dataService.getUsers(), {
    initialValue: [],
  });

  totalUsers = computed(() => this.users()?.length);

  pageSize = signal(5);
  currentPage = signal(0);

  filteredUsers = computed(() => {
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    return this.users().slice(start, end);
  });

  applyUserFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.currentPage.set(0);
    this.filteredUsers = computed(() => {
      const start = this.currentPage() * this.pageSize();
      const end = start + this.pageSize();
      return (
        this.users()
          ?.filter(
            (user: any) =>
              user.name?.toLowerCase()?.includes(filterValue?.toLowerCase()) ||
              user.email?.toLowerCase()?.includes(filterValue?.toLowerCase()) ||
              user.username?.toLowerCase()?.includes(filterValue?.toLowerCase())
          )
          .slice(start, end) || []
      );
    });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
