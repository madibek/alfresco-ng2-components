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

import LoginPage = require('./pages/adf/loginPage.js');
import ProcessServicesPage = require('./pages/adf/process_services/processServicesPage.js');
import ProcessFiltersPage = require('./pages/adf/process_services/processFiltersPage.js');
import AttachmentListPage = require('./pages/adf/process_services/attachmentListPage.js');
import FileModel = require('./models/ACS/fileModel.js');

import TestConfig = require('./test.config.js');
import resources = require('./util/resources.js');
import apps = require('./restAPI/APS/reusableActions/apps');
import users = require('./restAPI/APS/reusableActions/users');
import AlfrescoApi = require('alfresco-js-api-node');

describe('Attachment list', () => {

    let loginPage = new LoginPage();
    let processServicesPage = new ProcessServicesPage();
    let attachmentListPage = new AttachmentListPage();
    let processFiltersPage = new ProcessFiltersPage();

    let processUserModel;
    let app = resources.Files.APP_WITH_PROCESSES;
    let jpgFile = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.JPG.file_location,
        'name': resources.Files.ADF_DOCUMENTS.JPG.file_name
    });
    let pdfFile = new FileModel({ 'name': resources.Files.ADF_DOCUMENTS.PDF.file_name });

    beforeAll(async (done) => {
        this.alfrescoJsApi = new AlfrescoApi({
            provider: 'BPM',
            hostBpm: TestConfig.adf.url
        });

        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

        processUserModel = await users.createTenantAndUser(this.alfrescoJsApi);

        await this.alfrescoJsApi.login(processUserModel.email, processUserModel.password);

        await apps.importPublishDeployApp(this.alfrescoJsApi, app.file_location);

        await loginPage.loginToProcessServicesUsingUserModel(processUserModel);

        done();
    });

    it('[C277296]Attach a file to task app - process list', function () {
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processFiltersPage.startProcess().selectFromProcessDropdown(app.process_se_name).clickFormStartProcessButton();
        processFiltersPage.clickRunningFilterButton();
        processFiltersPage.selectFromProcessList('My Default Name');
        attachmentListPage.clickAttachFileButton(jpgFile.location);
        attachmentListPage.checkFileIsAttached(jpgFile.name);
        attachmentListPage.clickAttachFileButton(pdfFile.location);
        attachmentListPage.checkFileIsAttached(jpgFile.name);
        attachmentListPage.checkFileIsAttached(pdfFile.name);
    });

    it('[C277299]Attach a file to custom app - process list', function () {
        processServicesPage.goToProcessServices().goToApp(app.title).clickProcessButton();
        processFiltersPage.startProcess().selectFromProcessDropdown(app.process_se_name).clickFormStartProcessButton();
        processFiltersPage.clickRunningFilterButton();
        processFiltersPage.selectFromProcessList('My Default Name');
        attachmentListPage.clickAttachFileButton(jpgFile.location);
        attachmentListPage.checkFileIsAttached(jpgFile.name);
        attachmentListPage.clickAttachFileButton(pdfFile.location);
        attachmentListPage.checkFileIsAttached(jpgFile.name);
        attachmentListPage.checkFileIsAttached(pdfFile.name);
    });
});
