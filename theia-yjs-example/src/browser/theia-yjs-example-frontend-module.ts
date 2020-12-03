/**
 * Generated using theia-extension-generator
 */
import { TheiaYjsExampleCommandContribution, TheiaYjsExampleMenuContribution } from './theia-yjs-example-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(TheiaYjsExampleCommandContribution);
    bind(MenuContribution).to(TheiaYjsExampleMenuContribution);
});
