import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const menuPermission = (name, type = 'read') => {
  const permissions_json = Cookies.get('permissions') ?? "[]";
  const permissions = JSON.parse(permissions_json);
  for (const ele of permissions) {
    if (ele.permission_name.toLowerCase() === name.toLowerCase()) {
      if (type === 'read') return ele.read_access
      else if (type === 'edit') return ele.edit_access
    }
  }

  return false;
}

const viewPermission = (name) => {
  const history = useHistory();
  if (!menuPermission(name)) history.push('/admin/403');
}

const ellipsis = (input, size = 30) => input.length > size ? `${input.substring(0, size)}...` : input;


export { ellipsis, menuPermission, viewPermission };


