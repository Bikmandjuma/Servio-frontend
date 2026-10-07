import { Navigate } from "react-router-dom";

// Kept so any bookmarked /admin/login links keep working — the actual
// sign-in form now lives at the public /login page, reachable from the
// account icon in the top nav (and the mobile "More" sheet).
export default function AdminLogin() {
  return <Navigate to="/login" replace />;
}
