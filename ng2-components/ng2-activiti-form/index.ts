/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdSlideToggleModule, MdTabsModule } from '@angular/material';
import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { ActivitiContentComponent } from './src/components/activiti-content.component';
import { ActivitiForm } from './src/components/activiti-form.component';
import { ActivitiStartFormComponent } from './src/components/activiti-start-form.component';
import { ADFFormListComponent } from './src/components/adf-form-list.component';
import { FormFieldComponent } from './src/components/form-field/form-field.component';
import { MASK_DIRECTIVE, WIDGET_DIRECTIVES } from './src/components/widgets/index';
import { ActivitiAlfrescoContentService } from './src/services/activiti-alfresco.service';
import { ActivitiContentService } from './src/services/activiti-content-service';
import { EcmModelService } from './src/services/ecm-model.service';
import { FormRenderingService } from './src/services/form-rendering.service';
import { FormService } from './src/services/form.service';
import { NodeService } from './src/services/node.service';
import { WidgetVisibilityService } from './src/services/widget-visibility.service';

export * from './src/components/activiti-form.component';
export * from './src/components/adf-form-list.component';
export * from './src/components/activiti-content.component';
export * from './src/components/activiti-start-form.component';
export * from './src/services/form.service';
export * from './src/services/activiti-content-service';
export * from './src/components/widgets/index';
export * from './src/services/ecm-model.service';
export * from './src/services/node.service';
export * from './src/services/form-rendering.service';
export * from './src/events/index';

export const ACTIVITI_FORM_DIRECTIVES: any[] = [
    ActivitiForm,
    ADFFormListComponent,
    ActivitiContentComponent,
    ActivitiStartFormComponent,
    FormFieldComponent,
    ...WIDGET_DIRECTIVES
];

export const ACTIVITI_FORM_PROVIDERS: any[] = [
    FormService,
    ActivitiContentService,
    EcmModelService,
    NodeService,
    WidgetVisibilityService,
    ActivitiAlfrescoContentService,
    FormRenderingService
];

@NgModule({
    imports: [
        CoreModule,
        DataTableModule,
        HttpModule,
        MdCheckboxModule,
        MdTabsModule,
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdSlideToggleModule,
        MdInputModule
    ],
    declarations: [
        ...ACTIVITI_FORM_DIRECTIVES,
        ...MASK_DIRECTIVE
    ],
    entryComponents: [
        ...WIDGET_DIRECTIVES
    ],
    providers: [
        ...ACTIVITI_FORM_PROVIDERS
    ],
    exports: [
        ...ACTIVITI_FORM_DIRECTIVES,
        MdCheckboxModule,
        MdTabsModule,
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdSlideToggleModule,
        MdInputModule
    ]
})
export class ActivitiFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ActivitiFormModule,
            providers: [
                ...ACTIVITI_FORM_PROVIDERS
            ]
        };
    }
}
