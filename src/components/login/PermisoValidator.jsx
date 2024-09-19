import React from "react";

import { useAuth } from "./AuthContext";

function PermisoValidator({ permiso, children }) {
  const { permissions } = useAuth();

  if (permissions.includes(permiso)) {
    return <>{children}</>;
  }
  return null;
}

export default PermisoValidator;
