---
Added: v2.0.0
Status: Active
Last reviewed: 2018-04-05
---

# Folder Actions service

Implements the folder menu actions for the [Document List component](../content-services/document-list.component.md).

## Class members

### Methods

-   **canExecuteAction**(obj: `any` = `null`): `boolean`<br/>
    Checks if an action is available for a particular item.
    -   _obj:_ `any`  - Item to check
    -   **Returns** `boolean` - True if the action is available, false otherwise
-   **getHandler**(key: `string` = `null`): [`ContentActionHandler`](../../lib/content-services/document-list/models/content-action.model.ts)<br/>
    Gets the handler function for an action.
    -   _key:_ `string`  - Identifier for the action
    -   **Returns** [`ContentActionHandler`](../../lib/content-services/document-list/models/content-action.model.ts) - The handler function
-   **setHandler**(key: `string` = `null`, handler: [`ContentActionHandler`](../../lib/content-services/document-list/models/content-action.model.ts) = `null`): `boolean`<br/>
    Sets a new handler function for an action.
    -   _key:_ `string`  - Identifier for the action
    -   _handler:_ [`ContentActionHandler`](../../lib/content-services/document-list/models/content-action.model.ts)  - The new handler function
    -   **Returns** `boolean` - True if the key was a valid action identifier, false otherwise

## Details

This service implements the built-in actions that can be applied to a folder
shown in a [Document List component](document-list.component.md): **delete**,
**download**, **copy** and **move** (see the
[Content Action component](content-action.component.md) for further details and examples
of these menu items). However, you can also use the service to add extra actions or
replace the built-in ones with your own implementation.

### Registering an action

In the example below, a custom handler called `my-handler` is registered with the service.
This action will invoke the `myFolderActionHandler` function each time it is selected
from the Document List menu.

```ts
import { FolderActionsService } from '@alfresco/adf-content-services';

export class MyView {

    constructor(folderActions: FolderActionsService) {
        folderActions.setHandler(
            'my-handler',
            this.myFolderActionHandler.bind(this)
        );
    }

    myFolderActionHandler(obj: any) {
        window.alert('my custom action handler');
    }
}
```

The action can then be used from the component in the usual way:

```html
<adf-document-list ...>
    <content-actions>

        <content-action
            target="folder"
            title="My action"
            handler="my-handler">
        </content-action>

    </content-actions>
</adf-document-list>
```

You can also override a built-in handler (eg, 'download') with your own function:

```ts
export class MyView {

    constructor(folderActions: FolderActionsService) {
        folderActions.setHandler(
            'download',
            this.customDownloadBehavior.bind(this)
        );
    }

    customDownloadBehavior(obj: any) {
        window.alert('my custom download behavior');
    }
}
```

You will probably want to set up all your custom actions at the application root level or
with a custom application service.

## See also

-   [Document actions service](document-actions.service.md)
-   [Content action component](content-action.component.md)
