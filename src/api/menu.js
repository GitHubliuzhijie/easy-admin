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
        {
          key: 'electronicGiftBook',
          title: '电子礼簿',
          path: '/electronic-gift-book',
          meta: {
            icon: 'ant-design-icon-book-outlined',
            layout: 'main',
            component: 'electronic-gift-book',
          }
        }
      ]);
    }, 100);
  });
}
