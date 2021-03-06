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

import { AlfrescoApiService } from '../../services/alfresco-api.service';
import { LogService } from '../../services/log.service';
import { Injectable } from '@angular/core';
import { RelatedContentRepresentation } from 'alfresco-js-api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessContentService {

    static UNKNOWN_ERROR_MESSAGE: string = 'Unknown error';
    static GENERIC_ERROR_MESSAGE: string = 'Server error';

    constructor(private apiService: AlfrescoApiService,
                private logService: LogService) {
    }

    private get contentApi(): any {
        return this.apiService.getInstance().activiti.contentApi;
    }

    /**
     * Create temporary related content from an uploaded file.
     * @param file File to use for content
     * @returns The created content data
     */
    createTemporaryRawRelatedContent(file: any): Observable<RelatedContentRepresentation> {
        return Observable.fromPromise(this.contentApi.createTemporaryRawRelatedContent(file)).catch(err => this.handleError(err));
    }

    /**
     * Gets the metadata for a related content item.
     * @param contentId ID of the content item
     * @returns Metadata for the content
     */
    getFileContent(contentId: number): Observable<RelatedContentRepresentation> {
        return Observable.fromPromise(this.contentApi.getContent(contentId)).catch(err => this.handleError(err));
    }

    /**
     * Gets raw binary content data for a related content file.
     * @param contentId ID of the related content
     * @returns Binary data of the related content
     */
    getFileRawContent(contentId: number): Observable<Blob> {
        return Observable.fromPromise(this.contentApi.getRawContent(contentId)).catch(err => this.handleError(err));
    }

    /**
     * Gets the preview for a related content file.
     * @param contentId ID of the related content
     * @returns Binary data of the content preview
     */
    getContentPreview(contentId: number): Observable<Blob> {
        return new Observable(observer => {
            this.contentApi.getContentPreview(contentId).then(
                (result) => {
                    observer.next(result);
                    observer.complete();
                },
                () => {
                    this.contentApi.getRawContent(contentId).then(
                        (data) => {
                            observer.next(data);
                            observer.complete();
                        },
                        (err) => {
                            observer.error(err);
                            observer.complete();
                        }
                    );
                }
            );
        });
    }

    /**
     * Gets a URL for direct access to a related content file.
     * @param contentId ID of the related content
     * @returns URL to access the content
     */
    getFileRawContentUrl(contentId: number): string {
        return this.contentApi.getRawContentUrl(contentId);
    }

    /**
     * Gets the thumbnail for a related content file.
     * @param contentId ID of the related content
     * @returns Binary data of the thumbnail image
     */
    getContentThumbnail(contentId: number): Observable<Blob> {
        return Observable.fromPromise(this.contentApi.getContentThumbnail(contentId)).catch(err => this.handleError(err));
    }

    /**
     * Gets related content items for a task instance.
     * @param taskId ID of the target task
     * @returns Metadata for the content
     */
    getTaskRelatedContent(taskId: string): Observable<any> {
        return Observable.fromPromise(this.contentApi.getRelatedContentForTask(taskId))
            .catch(err => this.handleError(err));
    }

    /**
     * Gets related content items for a process instance.
     * @param processId ID of the target process
     * @returns Metadata for the content
     */
    getProcessRelatedContent(processId: string): Observable<any> {
        return Observable.fromPromise(this.contentApi.getRelatedContentForProcessInstance(processId))
            .catch(err => this.handleError(err));
    }

    /**
     * Deletes related content.
     * @param contentId Identifier of the content to delete
     * @returns Null response that notifies when the deletion is complete
     */
    deleteRelatedContent(contentId: number): Observable<any> {
        return Observable.fromPromise(this.contentApi.deleteContent(contentId))
            .catch(err => this.handleError(err));
    }

    /**
     * Associates an uploaded file with a process instance.
     * @param processInstanceId ID of the target process instance
     * @param content File to associate
     * @param opts Options supported by JSAPI
     * @returns Details of created content
     */
    createProcessRelatedContent(processInstanceId: string, content: any, opts?: any): Observable<any> {
        return Observable.fromPromise(this.contentApi.createRelatedContentOnProcessInstance(processInstanceId, content, opts))
            .catch(err => this.handleError(err));
    }

    /**
     * Associates an uploaded file with a task instance.
     * @param taskId ID of the target task
     * @param file File to associate
     * @param opts Options supported by JSAPI
     * @returns Details of created content
     */
    createTaskRelatedContent(taskId: string, file: any, opts?: any) {
        return Observable.fromPromise(this.contentApi.createRelatedContentOnTask(taskId, file, opts))
            .catch(err => this.handleError(err));
    }

    /**
     * Creates a JSON representation of data.
     * @param res Object representing data
     * @returns JSON object
     */
    toJson(res: any) {
        if (res) {
            return res || {};
        }
        return {};
    }

    /**
     * Creates a JSON array representation of data.
     * @param res Object representing data
     * @returns JSON array object
     */
    toJsonArray(res: any) {
        if (res) {
            return res.data || [];
        }
        return [];
    }

    /**
     * Reports an error message.
     * @param error Data object with optional `message` and `status` fields for the error
     * @returns Callback when an error occurs
     */
    handleError(error: any): Observable<any> {
        let errMsg = ProcessContentService.UNKNOWN_ERROR_MESSAGE;
        if (error) {
            errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : ProcessContentService.GENERIC_ERROR_MESSAGE;
        }
        this.logService.error(errMsg);
        return Observable.throw(errMsg);
    }

}
