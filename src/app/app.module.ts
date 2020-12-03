import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { ClientbaseComponent } from './pages/clientbase/clientbase/clientbase.component';
import { ClientdetailComponent } from './pages/clientbase/clientdetail/clientdetail.component';





@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,    
    AuthorizationComponent, ClientbaseComponent, ClientdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
