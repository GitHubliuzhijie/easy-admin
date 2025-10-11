/**
 * 模拟从后端获取菜单
 * @returns {Promise<Array>}
 */
export function getMenu() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: 'doc',
          title: '代码地址',
          meta: {
            icon: 'ant-design-icon-file-text-outlined',
            outlink: 'https://gitee.com/boss-zhijie/easy-admin.git',
          },
        },
      ]);
    }, 100);
  });
}
