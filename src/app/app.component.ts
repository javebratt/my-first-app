import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public installPrompt = null;
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.available) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('A new version is available. Load it?'))
          window.location.reload();
      });
    }
  }

  getInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e;
    });
  }

  askUserToInstallApp() {
    this.installPrompt.prompt();
  }
}
