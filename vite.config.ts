import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { tr } from 'element-plus/es/locale'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env: any = loadEnv(mode, process.cwd(), '')
  console.log(command);

  return {
    base: './',
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ['vue', 'vue-router'],
        //存放的位置
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 引入组件的,包括自定义组件
        resolvers: [ElementPlusResolver()],
        // 存放的位置
        dts: "src/components.d.ts",
      }),
    ],

    server: {
      host: '0.0.0.0',
      port: env.VITE_APP_PORT, // 设置服务启动端口号
      // open: true, // 设置服务启动时是否自动打开浏览器
      // cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        [env.VITE_APP_BASE_API]: { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
          target: 'http://localhost:8000',
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '') //重写匹配的字段，如果不需要放在请求路径上，可以重写为""
        }
      }
    },


    resolve: {
      // Vite路径别名配置
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }
})



// export default defineConfig({
//   // base: "./",
//   plugins: [

//     vue(),
//     VueSetupExtend(),
//     AutoImport({
//       //安装两行后你会发现在组件中不用再导入ref，reactive等
//       imports: ['vue', 'vue-router'],
//       //存放的位置
//       dts: "src/auto-import.d.ts",
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       // 引入组件的,包括自定义组件
//       resolvers: [ElementPlusResolver()],
//       // 存放的位置
//       dts: "src/components.d.ts",
//     }),
//   ],
//   resolve: {
//     // Vite路径别名配置
//     alias: {
//       '@': resolve(__dirname, './src')
//     }
//   }
// })
