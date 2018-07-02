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

import TestConfig = require('./test.config.js');
import CONSTANTS = require('./util/constants');
import resources = require('./util/resources.js');
import AdfLoginPage = require('./pages/adf/loginPage.js');
import AdfNavigationBarPage = require('./pages/adf/navigationBarPage.js');
import AdfProcessServicesPage = require('./pages/adf/process_services/processServicesPage.js');
import AdfStartProcessPage = require('./pages/adf/process_services/startProcessPage.js');
import AdfProcessFiltersPage = require('./pages/adf/process_services/processFiltersPage.js');
import AdfAppNavigationBarPage = require('./pages/adf/process_services/appNavigationBarPage.js');
import AdfProcessDetailsPage = require('./pages/adf/process_services/processDetailsPage.js');

import AlfrescoApi = require('alfresco-js-api-node');
import { AppsActions } from './actions/APS/apps.actions';
import { UsersActions } from './actions/users.actions';

describe('Process Filters Test', () => {

    let adfLoginPage = new AdfLoginPage();
    let adfNavigationBarPage = new AdfNavigationBarPage();
    let adfProcessServicesPage = new AdfProcessServicesPage();
    let adfStartProcessPage = new AdfStartProcessPage();
    let adfProcessFiltersPage = new AdfProcessFiltersPage();
    let adfAppNavigationBarPage = new AdfAppNavigationBarPage();
    let adfProcessDetailsPage = new AdfProcessDetailsPage();

    let app = resources.Files.APP_WITH_DATE_FIELD_FORM;
    let appId, modelId, response, procUserModel, basicAuth, tenantId;

    let processTitle = {
        running: 'Test_running',
        completed: 'Test_completed'
    };
    let processFilter = {
        running: 'Running',
        all: 'All',
        completed: 'Completed'
    };

    beforeAll(async (done) => {
        let apps = new AppsActions();
        let users = new UsersActions();

        this.alfrescoJsApi = new AlfrescoApi({
            provider: 'BPM',
            hostBpm: TestConfig.adf.url
        });

        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

        let user = await users.createTenantAndUser(this.alfrescoJsApi);

        await this.alfrescoJsApi.login(user.email, user.password);

        await apps.importPublishDeployApp(this.alfrescoJsApi, app.file_location);

        await adfLoginPage.loginToProcessServicesUsingUserModel(user);

        done();
    });

    it('Navigate to Running filter', () => {
        adfNavigationBarPage.clickProcessServicesButton();
        adfProcessServicesPage.checkApsContainer();
        adfProcessServicesPage.goToApp(app.title);
        adfAppNavigationBarPage.clickProcessButton();
        adfProcessFiltersPage.clickCreateProcessButton();
        adfProcessFiltersPage.clickNewProcessDropdown();
        adfStartProcessPage.enterProcessName(processTitle.completed);
        adfStartProcessPage.selectFromProcessDropdown(app.process_title);
        adfStartProcessPage.clickFormStartProcessButton();
        adfProcessDetailsPage.clickCancelProcessButton();
        adfNavigationBarPage.clickProcessServicesButton();
        adfProcessServicesPage.goToApp(app.title);
        adfAppNavigationBarPage.clickProcessButton();
        adfProcessFiltersPage.clickCreateProcessButton();
        adfProcessFiltersPage.clickNewProcessDropdown();
        adfStartProcessPage.enterProcessName(processTitle.running);
        adfStartProcessPage.selectFromProcessDropdown(app.process_title);
        adfStartProcessPage.clickFormStartProcessButton();
        adfProcessFiltersPage.checkFilterIsHighlighted(processFilter.running);
        adfProcessFiltersPage.selectFromProcessList(processTitle.running);
        adfProcessDetailsPage.checkProcessDetailsCard();
    });

    it('Navigate to All filter', () => {
        adfProcessFiltersPage.clickAllFilterButton();
        adfProcessFiltersPage.checkFilterIsHighlighted(processFilter.all);
        adfProcessFiltersPage.selectFromProcessList(processTitle.running);
        adfProcessFiltersPage.selectFromProcessList(processTitle.completed);
        adfProcessDetailsPage.checkProcessDetailsCard();
    });

    it('Navigate to Completed filter', () => {
        adfProcessFiltersPage.clickCompletedFilterButton();
        adfProcessFiltersPage.checkFilterIsHighlighted(processFilter.completed);
        adfProcessFiltersPage.selectFromProcessList(processTitle.completed);
        adfProcessDetailsPage.checkProcessDetailsCard();
    });
});
