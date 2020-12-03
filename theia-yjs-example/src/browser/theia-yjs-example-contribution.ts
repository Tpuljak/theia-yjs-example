import { injectable } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket';

export const TheiaYjsExampleCommand = {
  id: 'TheiaYjsExample.command',
  label: "Say Hello"
};

export const InsertToArrayCommand = {
  id: 'insert:id',
  label: 'Insert to Array'
}

@injectable()
export class TheiaYjsExampleCommandContribution implements CommandContribution {
  private provider: WebsocketProvider
  private doc: Y.Doc

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(TheiaYjsExampleCommand, {
      execute: () => {
        this.doc = new Y.Doc()

        this.provider = new WebsocketProvider('ws://localhost:1234', '123', this.doc)
        this.provider.connect()

        const array = this.doc.getArray('array')
        array.observe(event => {
          console.log(JSON.stringify(event))
        })
      }
    });
    registry.registerCommand(InsertToArrayCommand, {
      execute: () => {
        const array = this.doc.getArray('array')

        array.push([123])
      }
    });
  }
}

@injectable()
export class TheiaYjsExampleMenuContribution implements MenuContribution {

  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(CommonMenus.EDIT_FIND, {
      commandId: TheiaYjsExampleCommand.id,
      label: TheiaYjsExampleCommand.label
    });
  }
}
