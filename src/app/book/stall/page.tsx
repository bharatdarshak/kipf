import type { Metadata } from "next";
import StallBookingPage from "../../../components/stall-booking/StallBookingPage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Stall Booking — Hall Map | 12th KIPF 2026",
  description:
    "Interactive floor map for stall selection and booking at the 12th Kolkata International Poultry Fair 2026. View Hall A and Hall B layouts, check availability, and book your stall.",
};

export default function StallBookingRoute() {
  return (
    <div className={styles.page}>
      <StallBookingPage />
    </div>
  );
}
