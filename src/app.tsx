// 运行时配置

import axios from "axios";
import VersionPage from "./pages/VersionPage/Version";
import UpdatesPage from "./pages/Updates";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return {
    name: 'Luban MotorSDK',
  };
}

export const patchClientRoutes = async ({ routes }) => {
  console.log(' --- routes ', routes);
  const version = `./Updates/meta.json?v=${new Date().getTime()}`
  const versionRes = await axios.get(version)
  console.log(versionRes);

  const route = routes[0].routes;
  let updateRoute;
  route.map((item: any) => {
    if (item.name === '更新日志') {
      updateRoute = item;
    }
  });

  if (versionRes.status === 200) {
    const data = versionRes.data && versionRes.data.updateAry
    if (Array.isArray(data) && data.length > 0) {
      if (updateRoute.children === undefined) {
        updateRoute.children = [
        ];
      }
      const childrenRoutes = data.map((ver: string, index: number) => {
        if(index > 4){
          return false
        }
        return {
          path: `/updates/${ver}`,
          name: ver,
          element: <VersionPage ver={ver} />,
          exact: true,
        }
      }).filter(item=>{
        return item !== false
      })
      updateRoute.children = childrenRoutes;
      updateRoute.children.unshift(
        {
          path: `/updates/all`,
          name: '更新总览',
          element: <UpdatesPage />,
          exact: true,
        }
      )
    }
  }
};

export const layout = (config: any) => {
  console.log(' config --- -', config);
  return {
    ...config,
    logo: './logo.png',
    rightRender: (props: any) => {
      return null
    },
    menu: {
      locale: false,
    }
  };
};
