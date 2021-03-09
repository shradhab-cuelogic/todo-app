import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";


const route: Routes = [
    { path: '', component: AdminComponent },
    { path: 'admindashboard', component: AdmindashboardComponent }
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: []
})
export class AdminRoutingModule {}