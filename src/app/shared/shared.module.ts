import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { ContentPreviewPipe } from "./pipes/content-preview.pipe";
import { AuthService } from "../modules/auth/services/auth.service";
import { AuthButtonComponent } from './components/auth-button/auth-button.component'; 
import { ControlMessages } from "./components/control-messages/control-messages.component";
import { SharedRoutingModule } from "./shared-routing.module";
import { ImageComponent } from './components/image/image.component';

@NgModule({
    imports: [SharedRoutingModule, CommonModule, MatMenuModule],
    declarations: [ContentPreviewPipe, AuthButtonComponent, ControlMessages, ImageComponent],
    exports: [ContentPreviewPipe, AuthButtonComponent, ControlMessages, ImageComponent],
    providers: [AuthService]
})
export class SharedModule{}