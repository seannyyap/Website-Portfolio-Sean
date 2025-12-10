import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  isOpen = signal(false);

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'About', route: '/about', icon: 'person' },
    { label: 'Projects', route: '/projects', icon: 'work' },
    { label: 'Skills', route: '/skills', icon: 'code' },
    { label: 'Contact', route: '/contact', icon: 'mail' },
  ];

  toggleMenu(): void {
    this.isOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}
