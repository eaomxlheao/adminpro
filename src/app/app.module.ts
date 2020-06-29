import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Rutas
import { APP_ROUTES } from "./app.routes";

// Modulos
import { PagesModule } from "./pages/pages.module";

// Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Servicios
import { ServiceModule } from "./services/service.module";
import { PagesComponent } from "./pages/pages.component";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./interceptors/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    //Lazy Load
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    //Lazy Load
    //PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    //Lazy Load
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
