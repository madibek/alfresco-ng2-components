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

var AdfLoginPage = require('./pages/adf/loginPage.js');
var ProcessServicesPage = require('./pages/adf/process_services/processServicesPage.js');
var NavigationBarPage = require('./pages/adf/navigationBarPage.js');

var BasicAuthorization = require('./restAPI/httpRequest/BasicAuthorization');
var CONSTANTS = require('./util/constants');

var TestConfig = require('./test.config.js');
var resources = require('./util/resources.js');
var apps = require('./restAPI/APS/reusableActions/apps');
var users = require('./restAPI/APS/reusableActions/users');

xdescribe('Attachment list', () => {

    var adfLoginPage = new AdfLoginPage();
    var navigationBarPage = new NavigationBarPage();
    var processServicesPage = new ProcessServicesPage();
    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
    var basicAuth;
    var processUserModel;
    var app = resources.Files.APP_WITH_PROCESSES;

    beforeAll(function (done) {
        users.createTenantAndUser(basicAuthAdmin)
            .then(function (user) {
                processUserModel = user;
                basicAuth = new BasicAuthorization(user.email, user.password);
                apps.importPublishDeployApp(basicAuth, app.file_location)
                    .then(function () {
                        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
                        done();
                    })
                    .catch(function (error) {
                        done.fail('Create test precondition failed: ' + error);
                    });
            });
    });

    it('[C260198]Publish on ADF side', () => {
        navigationBarPage.clickProcessServicesButton();
        processServicesPage.checkApsContainer();
        expect(processServicesPage.getAppIconType(app.title)).toEqual('ac_unit');
        expect(processServicesPage.getBackgroundColor(app.title)).toEqual(CONSTANTS.APP_COLOR.BLUE);
        expect(processServicesPage.getDescription(app.title)).toEqual('Description for app');
    });

});









