import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from '../../views/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FlowEditorComponent } from 'src/app/views/flow-editor/flow-editor.component';
import { CanvasComponent } from 'src/app/shared-components/canvas/canvas.component';
import { EditorComponent } from 'src/app/views/editor/editor.component';
@NgModule({
  declarations: [
    SettingsComponent,
    FlowEditorComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class ViewsModule { }
