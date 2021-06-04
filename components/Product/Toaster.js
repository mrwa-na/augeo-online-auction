import { Position, Toaster } from "@blueprintjs/core";
 
/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
    className: "toaster",
    position: Position.TOP,
    usePortal:true
});

export const Toast = (typeof window !== 'undefined')
   ? Toaster.create({
    className: "toaster",
    position: Position.TOP,
    usePortal:true
   })
  : null