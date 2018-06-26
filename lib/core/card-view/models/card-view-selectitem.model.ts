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

import { CardViewItem } from '../interfaces/card-view-item.interface';
import { DynamicComponentModel } from '../../services/dynamic-component-mapper.service';
import { CardViewBaseItemModel } from './card-view-baseitem.model';
import { CardViewSelectItemProperties, CardViewSelectItemOption } from '../interfaces/card-view.interfaces';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export class CardViewSelectItemModel extends CardViewBaseItemModel implements CardViewItem, DynamicComponentModel {
    type: string = 'select';
    options$: Observable<CardViewSelectItemOption[]>;

    constructor(obj: CardViewSelectItemProperties) {
        super(obj);

        this.options$ = obj.options$;
    }

    get displayValue() {
        return this.options$.pipe(
            switchMap((options) => {
                const option = options.find((o) => o.key === this.value);
                return of(option ? option.label : '');
            })
        );
    }
}
