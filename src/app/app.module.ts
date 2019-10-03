import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { LeftsidenavComponent } from './leftsidenav/leftsidenav.component';
import { CenterContentComponent } from './center-content/center-content.component';
import { RightsidenavComponent } from './rightsidenav/rightsidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    LeftsidenavComponent,
    CenterContentComponent,
    RightsidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
