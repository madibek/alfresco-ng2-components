---
Added: v2.0.0
Status: Active
Last reviewed: 2018-04-06
---

# Nodes Api service

Accesses and manipulates ACS document nodes using their node IDs.

## Contents

-   [Class members](#class-members)

    -   [Methods](#methods)

-   [Details](#details)

    -   [Getting node information](#getting-node-information)
    -   [Getting folder node contents](#getting-folder-node-contents)
    -   [Creating and updating nodes](#creating-and-updating-nodes)
    -   [Deleting and restoring nodes](#deleting-and-restoring-nodes)

-   [See also](#see-also)

## Class members

### Methods

-   **createFolder**(parentNodeId: `string` = `null`, nodeBody: `any` = `null`, options: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>`<br/>
    Creates a new folder node inside a parent folder.
    -   _parentNodeId:_ `string`  - ID of the parent folder node
    -   _nodeBody:_ `any`  - Data for the new folder
    -   _options:_ `any`  - Optional parameters supported by JSAPI
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>` - Details of the new folder
-   **createNode**(parentNodeId: `string` = `null`, nodeBody: `any` = `null`, options: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>`<br/>
    Creates a new document node inside a folder.
    -   _parentNodeId:_ `string`  - ID of the parent folder node
    -   _nodeBody:_ `any`  - Data for the new node
    -   _options:_ `any`  - Optional parameters supported by JSAPI
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>` - Details of the new node
-   **deleteNode**(nodeId: `string` = `null`, options: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<void>`<br/>
    Moves a node to the trashcan.
    -   _nodeId:_ `string`  - ID of the target node
    -   _options:_ `any`  - Optional parameters supported by JSAPI
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<void>` - Empty result that notifies when the deletion is complete
-   **getNode**(nodeId: `string` = `null`, options: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>`<br/>
    Gets the stored information about a node.
    -   _nodeId:_ `string`  - ID of the target node
    -   _options:_ `any`  - Optional parameters supported by JSAPI
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>` - Node information
-   **getNodeChildren**(nodeId: `string` = `null`, options: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`NodePaging`](../../lib/content-services/document-list/models/document-library.model.ts)`>`<br/>
    Gets the items contained in a folder node.
    -   _nodeId:_ `string`  - ID of the target node
    -   _options:_ `any`  - Optional parameters supported by JSAPI
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`NodePaging`](../../lib/content-services/document-list/models/document-library.model.ts)`>` - List of child items from the folder
-   **handleError**(error: `any` = `null`): [`Observable`](http://reactivex.io/documentation/observable.html)`<any>`<br/>
    Reports an error.
    -   _error:_ `any`  - Object representing the error
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<any>` - Error information
-   **restoreNode**(nodeId: `string` = `null`): [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>`<br/>
    Restores a node previously moved to the trashcan.
    -   _nodeId:_ `string`  - ID of the node to restore
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>` - Details of the restored node
-   **updateNode**(nodeId: `string` = `null`, nodeBody: `any` = `null`, options: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>`<br/>
    Updates the information about a node.
    -   _nodeId:_ `string`  - ID of the target node
    -   _nodeBody:_ `any`  - New data for the node
    -   _options:_ `any`  - Optional parameters supported by JSAPI
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<MinimalNodeEntryEntity>` - Updated node information

## Details

Each node (ie, document or folder) in an ACS repository is identified by
its own unique node ID value. The ID is a long string of hex values separated
by dashes, eg:

`53ef6110-ed9c-4739-a520-e7b4336229c0`

The string is convenient for storage, for passing as an 
[Angular route parameter](https://angular.io/guide/router)
and other purposes but doesn't enable you to do very much with the node itself.
The [Nodes Api Service](../core/nodes-api.service.md) has methods for getting information about nodes and
managing them within the repository (creating, deleting, etc).

Other lower level interfaces to the ACS nodes API are also available - see the
[Alfresco Api service](alfresco-api.service.md), the 
[Alfresco JS API docs](https://github.com/Alfresco/alfresco-js-api/tree/master/src/alfresco-core-rest-api)
and the
[REST API Explorer](https://api-explorer.alfresco.com/api-explorer/#/nodes)
for more information.

### Getting node information

The `getNode` method gives access to the MinimalNode object that represents the
details of a node:

```ts
interface MinimalNodeEntryEntity extends MinimalNode {
}
interface MinimalNode extends Node {
   id: string;
   parentId: string;
   name: string;
   nodeType: string;
   isFolder: boolean;
   isFile: boolean;
   modifiedAt: Date;
   modifiedByUser: UserInfo;
   createdAt: Date;
   createdByUser: UserInfo;
   content: ContentInfo;
   path: PathInfoEntity;
   properties: NodeProperties;
}
```

This provides useful information about the node, such as its name, creation and
modification dates, etc. Also, the `id` and `parentId` properties contain the node
ID strings for the current node and its enclosing folder.

Sometimes, a MinimalNode is provided directly, for example, the `folderNode` property
of a [Document List component](../content-services/document-list.component.md) or the data context of a
[Document List row](../content-services/document-list.component.md#underlying-node-object). In these cases,
you might pass the `id` or `parentId` as a [route parameter](https://angular.io/guide/router)
to a page describing the node in full detail. The component receiving the node ID can
use the [Nodes Api service](../core/nodes-api.service.md) to "decode" the ID string into a MinimalNodeEntryEntity:

```ts
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NodesApiService } from '@alfresco/adf-core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';
    ...

export class RepositoryDetailsPageComponent implements OnInit {
 nodeId: string;
 nodeName: string;
 isFile: boolean;
    ...

 constructor(private router: Router,
             private activatedRoute: ActivatedRoute,
             private nodeService: NodesApiService) {
 }

 ngOnInit() {
   this.nodeId = this.activatedRoute.snapshot.params['node-id'];
   this.nodeService.getNode(this.nodeId).subscribe((entry: MinimalNodeEntryEntity) => {
     const node: MinimalNodeEntryEntity = entry;
     this.nodeName = node.name;
     this.isFile = node.isFile;
        ...
   });
 }
```

You can supply a number of extra options using the `options` parameter. See the
[getNode](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodesApi.md#getNode)
page in the Alfresco JS API docs for more information.

### Getting folder node contents

The `getNodeChildren` method returns the contents of a folder
as a list of items. See the [Paging section](../content-services/document-library.model.md#paging)
of [Document Library model](../content-services/document-library.model.md) for
more information about the structure of the list. Also, the
[getNodeChildren](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodesApi.md#getNodeChildren)
page in the Alfresco JS API gives more information about the structure of the
`options` parameter.

### Creating and updating nodes

You can use the `createNode` and `createFolder` methods to add new nodes
within a parent folder node, and the `updateNode` method to update an
existing node. See the
[addNode](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodesApi.md#addNode)
and
[updateNode](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodesApi.md#updateNode)
entries in the Alfresco JS API for further information about the available options and 
the format of the new node data.

### Deleting and restoring nodes

The Content Services repository maintains a "trashcan" where items are
temporarily held after they have been deleted. This means you can
restore a deleted item if you remove it from the trashcan before it
gets deleted permanently.

By default, the `deleteNode` method moves an item into the trash, where it can
be retrieved using `restoreNode`. However, you can set an option for `deleteNode`
to delete the node immediately if you have the right permissions. See the
[deleteNode](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodesApi.md#deleteNode)
and
[restoreNode](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodesApi.md#restoreNode)
pages in the Alfresco JS API for further details and options. Note that you can also use the
[Deleted Nodes Api service](deleted-nodes-api.service.md) get a list of all items currently in the trashcan.

## See also

-   [Document library model](../content-services/document-library.model.md)
-   [Deleted nodes api service](deleted-nodes-api.service.md)
-   [Document list component](../content-services/document-list.component.md)
-   [Node service](node.service.md)
