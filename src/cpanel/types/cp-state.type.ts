import { CPSessionExpiryModal } from "./cp-session-expiry-modal.type";
import { CPSidebarOffcanvas } from "./cp-sidebar-off-canvas.type";

export type CPState  = {
    sessionExpiryModal: CPSessionExpiryModal,
    sidebarOffcanvas: CPSidebarOffcanvas,
    sidebar: CPSidebar
}