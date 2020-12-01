import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdStore as iconStore } from 'react-icons/md';

// build a custom sidebar for sanity

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item

      S.listItem().title(`Home Page`).icon(iconStore).child(
        S.editor()
          .schemaType('storeSettings')
          // make a document ID so we don't have a string of numbers
          .documentId('downtown')
      ),
      // add the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
