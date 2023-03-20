import ConnectedLayout from "./ConnectedLayout";
import NotConnectedLayout from "./NotConnectedLayout";

export const Layouts = {
    Connected: ConnectedLayout,
    NotConnected: NotConnectedLayout
}
export type LayoutKeys = keyof typeof Layouts