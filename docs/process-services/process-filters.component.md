---
Added: v2.0.0
Status: Active
---

# Process Filters Component

Collection of criteria used to filter process instances, which may be customized by users.

## Contents

-   [Basic Usage](#basic-usage)

-   [Class members](#class-members)

    -   [Properties](#properties)
    -   [Events](#events)

-   [Details](#details)

    -   [How filter the activiti process filters](#how-filter-the-activiti-process-filters)
    -   [FilterParamsModel](#filterparamsmodel)
    -   [How to create an accordion menu with the processes filter](#how-to-create-an-accordion-menu-with-the-processes-filter)

-   [See also](#see-also)

## Basic Usage

```html
<adf-process-instance-filters
    appId="1001">
</adf-process-instance-filters>
```

## Class members

### Properties

| Name | Type | Default value | Description |
| -- | -- | -- | -- |
| appId | `number` |  | Display filters available to the current user for the application with the specified ID. |
| appName | `string` |  | Display filters available to the current user for the application with the specified name. |
| filterParam | [`FilterProcessRepresentationModel`](../../lib/process-services/process-list/models/filter-process.model.ts) |  | The parameters to filter the task filter. If there is no match then the default one (ie, the first filter in the list) is selected. |
| showIcon | `boolean` | true | Toggle to show or hide the filter's icon. |

### Events

| Name | Type | Description |
| -- | -- | -- |
| error | [`EventEmitter`](https://angular.io/api/core/EventEmitter)`<any>` | Emitted when an error occurs. |
| filterClick | [`EventEmitter`](https://angular.io/api/core/EventEmitter)`<`[`ProcessInstanceFilterRepresentation`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-activiti-rest-api/docs/ProcessInstanceFilterRepresentation.md)`>` | Emitted when the user selects a filter from the list. |
| success | `EventEmitter<ProcessInstanceFilterRepresentation[]>` | Emitted when the list of filters has been successfully loaded from the server. |

## Details

This component displays a list of available filters and allows the user to select any given
filter as the active filter.

The most common usage is in driving a process instance list to allow the user to choose which
process instances are displayed in the list.

If both `appId` and `appName` are specified then `appName` will take precedence and `appId` will be ignored.

### How filter the activiti process filters

```html
<adf-process-instance-filters 
   [filterParam]="{index: 0}">
</adf-process-instance-filters>
```

You can use inside the filterParam one of the properties defined by [`FilterParamsModel`](../../lib/process-services/task-list/models/filter.model.ts) (see below).

### FilterParamsModel

```json
{
    "id": "number",
    "name": "string",
    "index": "number"
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The id of the task filter. |
| name | string | The name of the task filter, lowercase is checked. |
| index | number | Zero-based position of the filter in the array. |

### How to create an accordion menu with the processes filter

The process filter often works well as an item in an accordion menu. See the [Accordion component](../core/accordion.component.md)
page for an example of how to do set this up.

## See also

-   [Process Filter service](process-filter.service.md)
-   [Filter model](filter.model.md)
