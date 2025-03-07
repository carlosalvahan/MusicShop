import { Routes } from "@angular/router";
import { InstrumentDetailComponent } from "../components/pages/instrument-page/instrument-detail/instrument-detail.component";
import { InstrumentPageComponent } from "../components/pages/instrument-page/instrument-page.component";

export const instrumentRoutes: Routes = [
    {path: '/:id', component: InstrumentDetailComponent}
]