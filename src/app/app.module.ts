import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private readonly injector: Injector) { }
  ngDoBootstrap() {
    const elements: any[] = [[AppComponent, 'pos']];

    for (const [component, name] of elements) {
      const el = createCustomElement(component, { injector: this.injector });
      if (!customElements.get(name)) {
        customElements.define(name, el);
      }
    }

  }
}
