import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Router} from '@angular/router';
import { AppModule } from './app/app.module';

let router: Router;

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    console.log('Application Started');
  })
  .catch(err => console.error(err));
