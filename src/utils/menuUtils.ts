import { MenuItem } from "@/types/route";

/**
 * 根据用户角色过滤菜单
 */
export const filterMenuByRoles = (
  menuItems: MenuItem[],
  userRoles: string[] = []
): MenuItem[] => {
  return menuItems
    .filter((item) => {
      // 如果菜单项没有角色限制，则显示
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      // 检查用户是否有权限访问此菜单
      return item.roles.some((role) => userRoles.includes(role));
    })
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: filterMenuByRoles(item.children, userRoles),
        };
      }
      return item;
    })
    .filter((item) => {
      // 如果是父菜单且所有子菜单都被过滤掉了，则不显示此父菜单
      if (item.children) {
        return item.children.length > 0;
      }
      return true;
    });
};

/**
 * 查找菜单项
 */
export const findMenuItem = (
  menuItems: MenuItem[],
  key: string
): MenuItem | null => {
  for (const item of menuItems) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const found = findMenuItem(item.children, key);
      if (found) return found;
    }
  }
  return null;
};

/**
 * 获取菜单路径
 */
export const getMenuPath = (
  menuItems: MenuItem[],
  key: string
): string | null => {
  const item = findMenuItem(menuItems, key);
  return item?.path || null;
};

/**
 * 生成面包屑
 */
export const generateBreadcrumb = (
  menuItems: MenuItem[],
  currentPath: string
): { title: string; path?: string }[] => {
  const breadcrumb: { title: string; path?: string }[] = [];

  const findPath = (
    items: MenuItem[],
    targetPath: string,
    parents: MenuItem[] = []
  ): boolean => {
    for (const item of items) {
      if (item.path === targetPath) {
        // 添加所有父级到面包屑
        parents.forEach((parent) => {
          breadcrumb.push({ title: parent.label, path: parent.path });
        });
        // 添加当前项到面包屑
        breadcrumb.push({ title: item.label, path: item.path });
        return true;
      }

      if (item.children) {
        if (findPath(item.children, targetPath, [...parents, item])) {
          return true;
        }
      }
    }
    return false;
  };

  findPath(menuItems, currentPath);
  return breadcrumb;
};

/**
 * 扁平化菜单（获取所有叶子节点）
 */
export const flattenMenu = (menuItems: MenuItem[]): MenuItem[] => {
  const result: MenuItem[] = [];

  const flatten = (items: MenuItem[]) => {
    items.forEach((item) => {
      if (item.children && item.children.length > 0) {
        flatten(item.children);
      } else {
        result.push(item);
      }
    });
  };

  flatten(menuItems);
  return result;
};
